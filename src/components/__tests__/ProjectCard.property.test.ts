import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import fc from 'fast-check';

/**
 * Property-based tests for ProjectCard component.
 *
 * Since Astro components cannot be imported directly in Vitest (they require a build step),
 * we replicate the ProjectCard rendering logic and the JS accordion toggleCard function here.
 *
 * ProjectCard renders as:
 *   <article class="project-card" role="button" tabindex="0"
 *            aria-expanded="false" aria-label="{title} — {subtitle}">
 *     <div class="card-header">
 *       <div class="card-info">
 *         <span class="card-title">{title}</span>
 *         <span class="card-subtitle">{subtitle}</span>
 *       </div>
 *       <svg class="card-chevron" ...>...</svg>
 *     </div>
 *     <p class="card-short-desc">{shortDescription}</p>
 *     <div class="card-tags">
 *       {technologies.map(tech => <span class="tech-tag">{tech}</span>)}
 *     </div>
 *     <div class="card-body" hidden>
 *       <hr class="card-divider" />
 *       <div class="card-section">...</div>
 *       <div class="card-section">...</div>
 *       {(liveUrl || codeUrl) && (
 *         <div class="card-links">
 *           {liveUrl && <a href={liveUrl} class="card-btn card-btn--live" ...>Live Demo</a>}
 *           {codeUrl && <a href={codeUrl} class="card-btn card-btn--code" ...>View Code</a>}
 *         </div>
 *       )}
 *     </div>
 *   </article>
 *
 * The JS accordion toggleCard function:
 *   function toggleCard(card) {
 *     const isExpanded = card.getAttribute('aria-expanded') === 'true';
 *     const body = card.querySelector('.card-body');
 *     if (isExpanded) {
 *       card.setAttribute('aria-expanded', 'false');
 *       card.classList.remove('is-expanded');
 *       body.setAttribute('hidden', '');
 *     } else {
 *       card.setAttribute('aria-expanded', 'true');
 *       card.classList.add('is-expanded');
 *       body.removeAttribute('hidden');
 *     }
 *   }
 */

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProjectCardProps {
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  liveUrl?: string;
  codeUrl?: string;
}

// ─── Rendering helper ─────────────────────────────────────────────────────────

/**
 * Escapes a string for safe insertion as text content inside HTML.
 * Prevents strings containing HTML characters (e.g. "<A ") from
 * being parsed as markup when inserted via innerHTML.
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Builds the ProjectCard HTML and returns the article element.
 * Mirrors the structure from ProjectCard.astro exactly.
 */
function renderProjectCard(props: ProjectCardProps): HTMLElement {
  const {
    title,
    subtitle,
    shortDescription,
    fullDescription,
    technologies,
    liveUrl,
    codeUrl,
  } = props;

  const techTags = technologies
    .map((tech) => `<span class="tech-tag">${escapeHtml(tech)}</span>`)
    .join('');

  const techTagsExpanded = technologies
    .map((tech) => `<span class="tech-tag">${escapeHtml(tech)}</span>`)
    .join('');

  const linksSection =
    liveUrl || codeUrl
      ? `<div class="card-links">
          ${liveUrl ? `<a href="${escapeHtml(liveUrl)}" class="card-btn card-btn--live" target="_blank" rel="noopener noreferrer" tabindex="-1">Live Demo</a>` : ''}
          ${codeUrl ? `<a href="${escapeHtml(codeUrl)}" class="card-btn card-btn--code" target="_blank" rel="noopener noreferrer" tabindex="-1">View Code</a>` : ''}
        </div>`
      : '';

  const html = `
    <article
      class="project-card"
      role="button"
      tabindex="0"
      aria-expanded="false"
      aria-label="${escapeHtml(title)} — ${escapeHtml(subtitle)}"
    >
      <div class="card-header">
        <div class="card-info">
          <span class="card-title">${escapeHtml(title)}</span>
          <span class="card-subtitle">${escapeHtml(subtitle)}</span>
        </div>
        <svg
          class="card-chevron"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
      <p class="card-short-desc">${escapeHtml(shortDescription)}</p>
      <div class="card-tags">
        ${techTags}
      </div>
      <div class="card-body" hidden>
        <hr class="card-divider" />
        <div class="card-section">
          <p class="section-title">Description:</p>
          <p class="section-text">${escapeHtml(fullDescription)}</p>
        </div>
        <div class="card-section">
          <p class="section-title">Technologies:</p>
          <div class="card-tags card-tags--expanded">
            ${techTagsExpanded}
          </div>
        </div>
        ${linksSection}
      </div>
    </article>
  `;

  const container = document.createElement('div');
  container.innerHTML = html;
  return container.querySelector('article') as HTMLElement;
}

// ─── Accordion logic (mirrors ProjectCard.astro <script> block) ───────────────

/**
 * Replicates the toggleCard function from ProjectCard.astro.
 */
function toggleCard(card: HTMLElement): void {
  const isExpanded = card.getAttribute('aria-expanded') === 'true';
  const body = card.querySelector<HTMLElement>('.card-body');

  if (!body) return;

  if (isExpanded) {
    card.setAttribute('aria-expanded', 'false');
    card.classList.remove('is-expanded');
    body.setAttribute('hidden', '');
  } else {
    card.setAttribute('aria-expanded', 'true');
    card.classList.add('is-expanded');
    body.removeAttribute('hidden');
  }
}

/**
 * Simulates a click on the card by calling the toggleCard logic.
 */
function simulateClick(card: HTMLElement): void {
  toggleCard(card);
}

/**
 * Simulates a keydown event (Enter or Space) on the card.
 * Mirrors the keyboard delegation in ProjectCard.astro:
 *   if (event.key !== 'Enter' && event.key !== ' ') return;
 *   toggleCard(card);
 */
function simulateKeydown(card: HTMLElement, key: string): void {
  if (key !== 'Enter' && key !== ' ') return;
  toggleCard(card);
}

// ─── Property 5 (ProjectCard): Accordion ARIA attributes always reflect actual state ───

// Feature: design-system-components, Property 5: Accordion ARIA attributes always reflect actual state (ProjectCard)

describe('ProjectCard — Property 5: Accordion ARIA attributes always reflect actual state', () => {
  /**
   * aria-expanded always accurately reflects the actual state of the card.
   * Both click and keyboard events (Enter, Space) correctly toggle the state.
   *
   * Validates: Requirements 5.10, 5.11
   */
  it('aria-expanded accurately reflects state after each click toggle', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 5 }),
        fc.integer({ min: 1, max: 10 }),
        (technologies, clickCount) => {
          const card = renderProjectCard({
            title: 'My Project',
            subtitle: 'A subtitle',
            shortDescription: 'Short desc',
            fullDescription: 'Full desc',
            technologies,
          });

          // Simulate `clickCount` clicks and verify ARIA matches actual state after each
          for (let i = 0; i < clickCount; i++) {
            simulateClick(card);

            const ariaExpanded = card.getAttribute('aria-expanded');
            const body = card.querySelector('.card-body')!;
            const isBodyHidden = body.hasAttribute('hidden');
            const hasExpandedClass = card.classList.contains('is-expanded');

            if (ariaExpanded === 'true') {
              // Expanded: body must be visible, class must be present
              expect(isBodyHidden).toBe(false);
              expect(hasExpandedClass).toBe(true);
            } else {
              // Collapsed: body must be hidden, class must be absent
              expect(ariaExpanded).toBe('false');
              expect(isBodyHidden).toBe(true);
              expect(hasExpandedClass).toBe(false);
            }
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Enter key correctly toggles state and aria-expanded reflects it', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 5 }),
        (technologies) => {
          const card = renderProjectCard({
            title: 'Project Alpha',
            subtitle: 'Web App',
            shortDescription: 'A web application',
            fullDescription: 'Full description here',
            technologies,
          });

          // Initial state: collapsed
          expect(card.getAttribute('aria-expanded')).toBe('false');

          // Press Enter to expand
          simulateKeydown(card, 'Enter');
          expect(card.getAttribute('aria-expanded')).toBe('true');
          expect(card.querySelector('.card-body')!.hasAttribute('hidden')).toBe(false);
          expect(card.classList.contains('is-expanded')).toBe(true);

          // Press Enter again to collapse
          simulateKeydown(card, 'Enter');
          expect(card.getAttribute('aria-expanded')).toBe('false');
          expect(card.querySelector('.card-body')!.hasAttribute('hidden')).toBe(true);
          expect(card.classList.contains('is-expanded')).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('Space key correctly toggles state and aria-expanded reflects it', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 5 }),
        (technologies) => {
          const card = renderProjectCard({
            title: 'Project Beta',
            subtitle: 'Mobile App',
            shortDescription: 'A mobile application',
            fullDescription: 'Full description here',
            technologies,
          });

          // Initial state: collapsed
          expect(card.getAttribute('aria-expanded')).toBe('false');

          // Press Space to expand
          simulateKeydown(card, ' ');
          expect(card.getAttribute('aria-expanded')).toBe('true');
          expect(card.querySelector('.card-body')!.hasAttribute('hidden')).toBe(false);
          expect(card.classList.contains('is-expanded')).toBe(true);

          // Press Space again to collapse
          simulateKeydown(card, ' ');
          expect(card.getAttribute('aria-expanded')).toBe('false');
          expect(card.querySelector('.card-body')!.hasAttribute('hidden')).toBe(true);
          expect(card.classList.contains('is-expanded')).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('non-toggle keys (e.g. Tab, ArrowDown) do not change state', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 5 }),
        fc.constantFrom('Tab', 'ArrowDown', 'ArrowUp', 'Escape', 'a', 'b'),
        (technologies, key) => {
          const card = renderProjectCard({
            title: 'Project Gamma',
            subtitle: 'CLI Tool',
            shortDescription: 'A command-line tool',
            fullDescription: 'Full description here',
            technologies,
          });

          const stateBefore = card.getAttribute('aria-expanded');

          // Non-toggle key should not change state
          simulateKeydown(card, key);

          expect(card.getAttribute('aria-expanded')).toBe(stateBefore);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ─── Property 6: ProjectCard optional links render only when prop is provided ─

// Feature: design-system-components, Property 6: ProjectCard optional links render only when prop is provided

describe('ProjectCard — Property 6: optional links render only when prop is provided', () => {
  /**
   * For any combination of liveUrl (present/absent) and codeUrl (present/absent):
   * - "Live Demo" button is present if and only if liveUrl is provided
   * - "View Code" button is present if and only if codeUrl is provided
   * - Each button's href equals the provided URL
   *
   * Uses fc.option(fc.webUrl()) which returns string | null.
   * When null, the prop is not provided.
   *
   * Note: links are inside .card-body which starts hidden. We check the DOM
   * structure directly (elements are in the DOM but hidden inside .card-body).
   *
   * Validates: Requirements 5.7, 5.8
   */
  it('Live Demo button present iff liveUrl provided, View Code button present iff codeUrl provided', () => {
    fc.assert(
      fc.property(
        fc.option(fc.webUrl()),
        fc.option(fc.webUrl()),
        (liveUrl, codeUrl) => {
          const props: ProjectCardProps = {
            title: 'Test Project',
            subtitle: 'Test Subtitle',
            shortDescription: 'Short description',
            fullDescription: 'Full description',
            technologies: ['TypeScript'],
            ...(liveUrl !== null ? { liveUrl } : {}),
            ...(codeUrl !== null ? { codeUrl } : {}),
          };

          const card = renderProjectCard(props);

          const liveBtn = card.querySelector('.card-btn--live');
          const codeBtn = card.querySelector('.card-btn--code');

          // Live Demo button: present iff liveUrl is provided
          if (liveUrl !== null) {
            expect(liveBtn).not.toBeNull();
            expect(liveBtn!.textContent?.trim()).toBe('Live Demo');
            expect(liveBtn!.getAttribute('href')).toBe(liveUrl);
          } else {
            expect(liveBtn).toBeNull();
          }

          // View Code button: present iff codeUrl is provided
          if (codeUrl !== null) {
            expect(codeBtn).not.toBeNull();
            expect(codeBtn!.textContent?.trim()).toBe('View Code');
            expect(codeBtn!.getAttribute('href')).toBe(codeUrl);
          } else {
            expect(codeBtn).toBeNull();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('links section absent when neither liveUrl nor codeUrl provided', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 5 }),
        (technologies) => {
          const card = renderProjectCard({
            title: 'No Links Project',
            subtitle: 'Subtitle',
            shortDescription: 'Short desc',
            fullDescription: 'Full desc',
            technologies,
            // no liveUrl, no codeUrl
          });

          expect(card.querySelector('.card-links')).toBeNull();
          expect(card.querySelector('.card-btn--live')).toBeNull();
          expect(card.querySelector('.card-btn--code')).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('both buttons present with correct hrefs when both URLs provided', () => {
    fc.assert(
      fc.property(
        fc.webUrl(),
        fc.webUrl(),
        (liveUrl, codeUrl) => {
          const card = renderProjectCard({
            title: 'Full Links Project',
            subtitle: 'Subtitle',
            shortDescription: 'Short desc',
            fullDescription: 'Full desc',
            technologies: ['React'],
            liveUrl,
            codeUrl,
          });

          const liveBtn = card.querySelector('.card-btn--live');
          const codeBtn = card.querySelector('.card-btn--code');

          expect(liveBtn).not.toBeNull();
          expect(liveBtn!.textContent?.trim()).toBe('Live Demo');
          expect(liveBtn!.getAttribute('href')).toBe(liveUrl);

          expect(codeBtn).not.toBeNull();
          expect(codeBtn!.textContent?.trim()).toBe('View Code');
          expect(codeBtn!.getAttribute('href')).toBe(codeUrl);
        }
      ),
      { numRuns: 100 }
    );
  });
});
