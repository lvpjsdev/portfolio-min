import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import fc from 'fast-check';

/**
 * Property-based tests for ExperienceCard component.
 *
 * Since Astro components cannot be imported directly in Vitest (they require a build step),
 * we replicate the ExperienceCard rendering logic and the JS accordion toggleCard function here.
 *
 * ExperienceCard renders as:
 *   <article class="experience-card" role="button" tabindex="0"
 *            aria-expanded="false" aria-label="{role} at {company}">
 *     <div class="card-header">
 *       <div class="card-info">
 *         <span class="card-role">{role}</span>
 *         <span class="card-company">{company}</span>
 *         <span class="card-dates">{dates}</span>
 *       </div>
 *       <svg class="card-chevron" ...>...</svg>
 *     </div>
 *     <div class="card-body" hidden>
 *       <hr class="card-divider" />
 *       <div class="card-achievements">
 *         <p class="achievements-title">Key Achievements:</p>
 *         {achievements.map(a => (
 *           <div class="achievement-item">
 *             <span class="bullet">•</span>
 *             <span>{a}</span>
 *           </div>
 *         ))}
 *       </div>
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

interface ExperienceCardProps {
  role: string;
  company: string;
  dates: string;
  achievements: string[];
  isCurrent?: boolean;
}

// ─── Rendering helper ─────────────────────────────────────────────────────────

/**
 * Escapes a string for safe insertion as text content inside HTML.
 * Prevents achievement strings containing HTML characters (e.g. "<A ") from
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
 * Builds the ExperienceCard HTML and returns the article element.
 * Mirrors the structure from ExperienceCard.astro exactly.
 * Achievement text is HTML-escaped so that arbitrary strings (including those
 * containing HTML tags) are stored as text nodes, not parsed as markup.
 */
function renderExperienceCard(props: ExperienceCardProps): HTMLElement {
  const { role, company, dates, achievements, isCurrent = false } = props;

  const achievementItems = achievements
    .map(
      (a) => `
      <div class="achievement-item">
        <span class="bullet" aria-hidden="true">•</span>
        <span>${escapeHtml(a)}</span>
      </div>`
    )
    .join('');

  const currentBadge = isCurrent ? '<span class="card-current"> · Current</span>' : '';

  const html = `
    <article
      class="experience-card"
      role="button"
      tabindex="0"
      aria-expanded="false"
      aria-label="${escapeHtml(role)} at ${escapeHtml(company)}"
    >
      <div class="card-header">
        <div class="card-info">
          <span class="card-role">${escapeHtml(role)}</span>
          <span class="card-company">${escapeHtml(company)}</span>
          <span class="card-dates">${escapeHtml(dates)}${currentBadge}</span>
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
      <div class="card-body" hidden>
        <hr class="card-divider" />
        <div class="card-achievements">
          <p class="achievements-title">Key Achievements:</p>
          ${achievementItems}
        </div>
      </div>
    </article>
  `;

  const container = document.createElement('div');
  container.innerHTML = html;
  return container.querySelector('article') as HTMLElement;
}

// ─── Accordion logic (mirrors ExperienceCard.astro <script> block) ────────────

/**
 * Replicates the toggleCard function from ExperienceCard.astro.
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
 * Mirrors the keyboard delegation in ExperienceCard.astro:
 *   if (event.key !== 'Enter' && event.key !== ' ') return;
 *   toggleCard(card);
 */
function simulateKeydown(card: HTMLElement, key: string): void {
  if (key !== 'Enter' && key !== ' ') return;
  toggleCard(card);
}

// ─── Property 3: ExperienceCard expand reveals all achievements ───────────────

// Feature: design-system-components, Property 3: ExperienceCard expand reveals all achievements

describe('ExperienceCard — Property 3: expand reveals all achievements', () => {
  /**
   * For any non-empty array of strings `achievements`, after simulating a click:
   *   1. All achievement strings are visible in the DOM (card body is not hidden).
   *   2. aria-expanded is "true".
   *   3. The card has the `is-expanded` class (chevron points down via CSS rotate(90deg)).
   *
   * Validates: Requirements 4.4, 4.5
   */
  it('all achievements are visible in DOM after expand, aria-expanded is true, chevron points down', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 10 }),
        (achievements) => {
          const card = renderExperienceCard({
            role: 'Software Engineer',
            company: 'Acme Corp',
            dates: '2020–2023',
            achievements,
          });

          // Initial state: collapsed
          expect(card.getAttribute('aria-expanded')).toBe('false');

          // Simulate click to expand
          simulateClick(card);

          // aria-expanded must be "true"
          expect(card.getAttribute('aria-expanded')).toBe('true');

          // card-body must not have the hidden attribute
          const body = card.querySelector('.card-body');
          expect(body).not.toBeNull();
          expect(body!.hasAttribute('hidden')).toBe(false);

          // All achievement strings must be visible in the DOM
          achievements.forEach((achievement) => {
            expect(card.textContent).toContain(achievement);
          });

          // is-expanded class must be present (chevron points down via CSS rotate(90deg))
          expect(card.classList.contains('is-expanded')).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ─── Property 4: ExperienceCard collapse round-trip ──────────────────────────

// Feature: design-system-components, Property 4: ExperienceCard collapse round-trip

describe('ExperienceCard — Property 4: collapse round-trip', () => {
  /**
   * After two consecutive clicks (expand → collapse), the component returns to its
   * initial state:
   *   1. aria-expanded is "false".
   *   2. card-body has the hidden attribute.
   *   3. is-expanded class is absent (chevron points right).
   *
   * Validates: Requirements 4.6
   */
  it('double click (expand then collapse) returns component to initial collapsed state', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 1 }), { minLength: 1 }),
        (achievements) => {
          const card = renderExperienceCard({
            role: 'Product Manager',
            company: 'Beta Inc',
            dates: '2019–2021',
            achievements,
          });

          // Verify initial collapsed state
          expect(card.getAttribute('aria-expanded')).toBe('false');
          expect(card.querySelector('.card-body')!.hasAttribute('hidden')).toBe(true);
          expect(card.classList.contains('is-expanded')).toBe(false);

          // First click: expand
          simulateClick(card);
          expect(card.getAttribute('aria-expanded')).toBe('true');

          // Second click: collapse
          simulateClick(card);

          // Must be back to initial state
          expect(card.getAttribute('aria-expanded')).toBe('false');
          expect(card.querySelector('.card-body')!.hasAttribute('hidden')).toBe(true);
          expect(card.classList.contains('is-expanded')).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ─── Property 5: Accordion ARIA attributes always reflect actual state ────────

// Feature: design-system-components, Property 5: Accordion ARIA attributes always reflect actual state

describe('ExperienceCard — Property 5: Accordion ARIA attributes always reflect actual state', () => {
  /**
   * aria-expanded always accurately reflects the actual state of the card.
   * Both click and keyboard events (Enter, Space) correctly toggle the state.
   *
   * Validates: Requirements 4.9, 4.10
   */
  it('aria-expanded accurately reflects state after each click toggle', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 5 }),
        fc.integer({ min: 1, max: 10 }),
        (achievements, clickCount) => {
          const card = renderExperienceCard({
            role: 'Designer',
            company: 'Gamma Ltd',
            dates: '2022–2024',
            achievements,
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
        (achievements) => {
          const card = renderExperienceCard({
            role: 'Engineer',
            company: 'Delta Co',
            dates: '2021–2023',
            achievements,
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
        (achievements) => {
          const card = renderExperienceCard({
            role: 'Analyst',
            company: 'Epsilon LLC',
            dates: '2018–2020',
            achievements,
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
        (achievements, key) => {
          const card = renderExperienceCard({
            role: 'Lead',
            company: 'Zeta Corp',
            dates: '2017–2019',
            achievements,
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
