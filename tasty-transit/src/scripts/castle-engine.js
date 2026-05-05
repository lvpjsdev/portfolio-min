import { pointsOfInterest } from '../data/points-of-interest.js';

// Part 1: Performance guard
let lowPerf = false;
let perfCheckDone = false;
let perfCallback = null;

export function checkPerformance(callback) {
  perfCallback = callback || null;
  
  // Synchronous checks
  if (navigator.deviceMemory && navigator.deviceMemory < 4) {
    lowPerf = true;
    perfCheckDone = true;
    if (perfCallback) perfCallback();
    return;
  }
  
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    lowPerf = true;
    perfCheckDone = true;
    if (perfCallback) perfCallback();
    return;
  }
  
  // Asynchronous FPS check
  let frameCount = 0;
  const startTime = performance.now();
  
  function countFrame() {
    frameCount++;
    if (frameCount < 60) {
      requestAnimationFrame(countFrame);
    } else {
      const elapsed = performance.now() - startTime;
      const fps = (frameCount / elapsed) * 1000;
      if (fps < 30) {
        lowPerf = true;
      }
      perfCheckDone = true;
      if (perfCallback) perfCallback();
    }
  }
  
  requestAnimationFrame(countFrame);
}

export function isLowPerf() {
  return lowPerf;
}

export function isPerfCheckDone() {
  return perfCheckDone;
}

export function isLowPerf() {
  return lowPerf;
}

// Part 2: Theme detection and management
let currentTheme = 'day';
const listeners = [];

export function initTheme() {
  const stored = localStorage.getItem('castle-theme');
  if (stored === 'day' || stored === 'night') {
    currentTheme = stored;
    return;
  }
  
  const hour = new Date().getHours();
  currentTheme = (hour >= 6 && hour < 18) ? 'day' : 'night';
}

export function toggleTheme() {
  currentTheme = currentTheme === 'day' ? 'night' : 'day';
  localStorage.setItem('castle-theme', currentTheme);
  listeners.forEach(fn => fn(currentTheme));
  return currentTheme;
}

export function getTheme() {
  return currentTheme;
}

export function onThemeChange(fn) {
  listeners.push(fn);
}

// Part 3: Viewport and animation system
let viewport = { x: 0.5, y: 0.5, zoom: 1.0 };
let targetViewport = { ...viewport };
let animating = false;

export function setViewport(x, y, zoom, animate = true) {
  targetViewport = { x, y, zoom };
  
  if (!animate || lowPerf) {
    viewport = { ...targetViewport };
    return;
  }
  
  animateViewport();
}

function animateViewport() {
  if (animating) return;
  animating = true;
  
  const start = { ...viewport };
  const duration = 1000;
  const startTime = performance.now();
  
  function tick() {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    
    viewport.x = start.x + (targetViewport.x - start.x) * eased;
    viewport.y = start.y + (targetViewport.y - start.y) * eased;
    viewport.zoom = start.zoom + (targetViewport.zoom - start.zoom) * eased;
    
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      animating = false;
    }
  }
  
  requestAnimationFrame(tick);
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function getViewport() {
  return { ...viewport };
}

// Part 4: Canvas rendering logic
let canvas, ctx;
let castleDayImg, castleNightImg, starsImg;
let imagesLoaded = false;

function showFallbackBackground() {
  if (!ctx) return;
  ctx.fillStyle = getTheme() === 'day' ? '#87CEEB' : '#191970';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function initCanvas(canvasElement) {
  if (!canvasElement || !canvasElement.getContext) {
    console.warn('Canvas not supported, falling back to static background');
    document.body.style.backgroundColor = getTheme() === 'day' ? '#87CEEB' : '#191970';
    return;
  }
  
  canvas = canvasElement;
  ctx = canvas.getContext('2d');
  
  castleDayImg = new Image();
  castleDayImg.onerror = () => {
    console.error('Failed to load castle-day.png');
    showFallbackBackground();
  };
  castleDayImg.src = '/castle/castle-day.png';
  
  castleNightImg = new Image();
  castleNightImg.onerror = () => {
    console.error('Failed to load castle-night.png');
    showFallbackBackground();
  };
  castleNightImg.src = '/castle/castle-night.png';
  
  starsImg = new Image();
  starsImg.onerror = () => {
    console.error('Failed to load stars-overlay.png');
    // Non-critical, just log
  };
  starsImg.src = '/castle/stars-overlay.png';
  
  let loaded = 0;
  const total = 3;
  
  function onLoad() {
    loaded++;
    if (loaded === total) {
      imagesLoaded = true;
      resizeCanvas();
      render();
    }
  }
  
  castleDayImg.onload = onLoad;
  castleNightImg.onload = onLoad;
  starsImg.onload = onLoad;
  
  window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function render() {
  try {
    if (!imagesLoaded) return;
    
    const vp = getViewport();
    const img = getTheme() === 'day' ? castleDayImg : castleNightImg;
    
    const sourceWidth = img.width / vp.zoom;
    const sourceHeight = img.height / vp.zoom;
    const sourceX = vp.x * img.width - sourceWidth / 2;
    const sourceY = vp.y * img.height - sourceHeight / 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      sourceX, sourceY, sourceWidth, sourceHeight,
      0, 0, canvas.width, canvas.height
    );
    
    if (getTheme() === 'night') {
      ctx.globalAlpha = 0.7;
      ctx.drawImage(
        starsImg,
        sourceX, sourceY, sourceWidth, sourceHeight,
        0, 0, canvas.width, canvas.height
      );
      ctx.globalAlpha = 1.0;
    }
  } catch (err) {
    console.error('Render error:', err);
    showFallbackBackground();
  }
  
  requestAnimationFrame(render);
}

// Part 5: Demo mode (flythrough)
let demoInterval = null;

export function startDemo() {
  if (lowPerf) return;
  
  let index = 0;
  demoInterval = setInterval(() => {
    const poi = pointsOfInterest[index % pointsOfInterest.length];
    setViewport(poi.x, poi.y, poi.zoom);
    index++;
  }, 3000);
}

export function stopDemo() {
  if (demoInterval) {
    clearInterval(demoInterval);
    demoInterval = null;
  }
}

export function isDemoRunning() {
  return demoInterval !== null;
}

// Hit areas for secret POI
export function addPOIClickHandler(canvasElement) {
  canvasElement.addEventListener('click', (e) => {
    const rect = canvasElement.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) / rect.width;
    const clickY = (e.clientY - rect.top) / rect.height;
    
    // Convert screen coordinates to castle image coordinates
    const vp = getViewport();
    const imgX = vp.x + (clickX - 0.5) / vp.zoom;
    const imgY = vp.y + (clickY - 0.5) / vp.zoom;
    
    // Check if click is near any bonus POI
    pointsOfInterest.forEach(poi => {
      if (poi.bonus && Math.abs(poi.x - imgX) < 0.05 && Math.abs(poi.y - imgY) < 0.05) {
        // Navigate to secret page or open modal
        window.location.href = `/${poi.id}`;
      }
    });
  });
  
    // Add hover cursor change
  canvasElement.addEventListener('mousemove', (e) => {
    const rect = canvasElement.getBoundingClientRect();
    const hoverX = (e.clientX - rect.left) / rect.width;
    const hoverY = (e.clientY - rect.top) / rect.height;
    
    const vp = getViewport();
    const imgX = vp.x + (hoverX - 0.5) / vp.zoom;
    const imgY = vp.y + (hoverY - 0.5) / vp.zoom;
    
    let isOverPOI = false;
    pointsOfInterest.forEach(poi => {
      if (poi.bonus && Math.abs(poi.x - imgX) < 0.05 && Math.abs(poi.y - imgY) < 0.05) {
        isOverPOI = true;
      }
    });
    canvasElement.style.cursor = isOverPOI ? 'pointer' : 'default';
  });
}
