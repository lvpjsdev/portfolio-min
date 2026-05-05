import { pointsOfInterest } from '../data/points-of-interest.js';

// Part 1: Performance guard
let lowPerf = false;

export function checkPerformance() {
  if (navigator.deviceMemory && navigator.deviceMemory < 4) {
    lowPerf = true;
    return;
  }
  
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    lowPerf = true;
    return;
  }
  
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
    }
  }
  
  requestAnimationFrame(countFrame);
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

export function initCanvas(canvasElement) {
  if (!canvasElement || !canvasElement.getContext) {
    console.warn('Canvas not supported, falling back to static background');
    document.body.style.backgroundColor = getTheme() === 'day' ? '#87CEEB' : '#191970';
    return;
  }
  
  canvas = canvasElement;
  ctx = canvas.getContext('2d');
  
  castleDayImg = new Image();
  castleDayImg.src = '/src/assets/castle/castle-day.png';
  
  castleNightImg = new Image();
  castleNightImg.src = '/src/assets/castle/castle-night.png';
  
  starsImg = new Image();
  starsImg.src = '/src/assets/castle/stars-overlay.png';
  
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
    if (ctx) {
      ctx.fillStyle = getTheme() === 'day' ? '#87CEEB' : '#191970';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
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
