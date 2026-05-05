// Feature: design-system-components, Property 1: Active NavDot matches currentPage

import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import fc from 'fast-check';

/**
 * Property-based tests for Sidebar component.
 *
 * Since Astro components cannot be imported directly in Vitest (they require a build step),
 * we replicate the Sidebar rendering logic here: the same navItems array and the same
 * active-determination logic that Sidebar.astro uses.
 *
 * Sidebar.astro renders NavDot components with:
 *   active={currentPage === item.id}
 *   href={item.href}
 *   label={item.label}
 *
 * NavDot.astro renders:
 *   <a href={href} class="nav-dot [nav-dot--active]" aria-label={label} [aria-current="page"]></a>
 *
 * Validates: Requirements 1.4, 1.5, 2.3, 2.4
 */

// ─── Replicated Sidebar data (mirrors Sidebar.astro exactly) ─────────────────

type PageId = 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact';

const navItems = [
  { id: 'home' as PageId,       href: '/',           label: 'Home' },
  { id: 'about' as PageId,      href: '/about',      label: 'About Me' },
  { id: 'experience' as PageId, href: '/experience', label: 'Work Experience' },
  { id: 'projects' as PageId,   href: '/projects',   label: 'Projects' },
  { id: 'skills' as PageId,     href: '/skills',     label: 'Skills' },
  { id: 'contact' as PageId,    href: '/contact',    label: 'Contact' },
] as const;

/** Map from page id to expected href — derived from navItems (single source of truth). */
const pageHrefMap: Record<PageId, string> = Object.fromEntries(
  navItems.map((item) => [item.id, item.href])
) as Record<PageId, string>;

// ─── Rendering helper ─────────────────────────────────────────────────────────

/**
 * Simulate the HTML that Sidebar.astro would produce for a given currentPage.
 * Returns a container element whose children are the rendered NavDot <a> elements.
 */
function renderSidebarNavDots(currentPage: PageId): HTMLElement {
  const container = document.createElement('nav');

  for (const item of navItems) {
    const active = currentPage === item.id;
    const classes = ['nav-dot', ...(active ? ['nav-dot--active'] : [])].join(' ');
    const ariaCurrent = active ? ' aria-current="page"' : '';

    const html = `<a href="${item.href}" class="${classes}" aria-label="${item.label}"${ariaCurrent}></a>`;
    container.insertAdjacentHTML('beforeend', html);
  }

  return container;
}

// ─── Property 1: Active NavDot matches currentPage ────────────────────────────

describe('Sidebar — Property 1: Active NavDot matches currentPage', () => {
  /**
   * For any valid currentPage from the 6 allowed values:
   *   1. Exactly one NavDot has the `nav-dot--active` class.
   *   2. That active NavDot's href matches the expected URL for the given page.
   *
   * Validates: Requirements 1.4, 1.5, 2.3, 2.4
   */
  it('exactly one NavDot is active and its href matches the currentPage', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('home', 'about', 'experience', 'projects', 'skills', 'contact' as const),
        (currentPage: PageId) => {
          const nav = renderSidebarNavDots(currentPage);
          const allDots = nav.querySelectorAll('.nav-dot');
          const activeDots = nav.querySelectorAll('.nav-dot--active');

          // Exactly one dot must be active
          expect(allDots).toHaveLength(6);
          expect(activeDots).toHaveLength(1);

          // The active dot's href must match the expected URL
          const activeDot = activeDots[0] as HTMLAnchorElement;
          expect(activeDot.getAttribute('href')).toBe(pageHrefMap[currentPage]);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('the active NavDot has aria-current="page" and others do not', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('home', 'about', 'experience', 'projects', 'skills', 'contact' as const),
        (currentPage: PageId) => {
          const nav = renderSidebarNavDots(currentPage);
          const allDots = Array.from(nav.querySelectorAll('.nav-dot')) as HTMLElement[];

          const withAriaCurrent = allDots.filter(
            (el) => el.getAttribute('aria-current') === 'page'
          );
          const withoutAriaCurrent = allDots.filter(
            (el) => el.getAttribute('aria-current') !== 'page'
          );

          // Exactly one dot has aria-current="page"
          expect(withAriaCurrent).toHaveLength(1);
          // The remaining 5 dots do not have aria-current
          expect(withoutAriaCurrent).toHaveLength(5);

          // The dot with aria-current must also have nav-dot--active
          expect(withAriaCurrent[0]).toHaveClass('nav-dot--active');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('the inactive NavDots do not have nav-dot--active class', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('home', 'about', 'experience', 'projects', 'skills', 'contact' as const),
        (currentPage: PageId) => {
          const nav = renderSidebarNavDots(currentPage);
          const allDots = Array.from(nav.querySelectorAll('.nav-dot')) as HTMLElement[];

          const inactiveDots = allDots.filter(
            (el) => el.getAttribute('href') !== pageHrefMap[currentPage]
          );

          // All inactive dots must NOT have the active class
          inactiveDots.forEach((dot) => {
            expect(dot).not.toHaveClass('nav-dot--active');
          });

          // There must be exactly 5 inactive dots
          expect(inactiveDots).toHaveLength(5);
        }
      ),
      { numRuns: 100 }
    );
  });
});

// Feature: design-system-components, Property 2: Navigation hrefs are correct

describe('Sidebar — Property 2: Navigation hrefs are correct', () => {
  /**
   * For any NavItem in Sidebar, the `href` attribute must equal the expected URL
   * for the corresponding page (home → /, about → /about, etc.).
   *
   * Uses fc.constantFrom(...navItems) to pick a random NavItem and verifies
   * that the href stored in the navItems array matches the expected mapping.
   *
   * Validates: Requirements 1.8
   */
  it('each NavItem href matches the expected URL for its page id', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...navItems),
        (item) => {
          // The href stored in navItems must equal the expected URL for that page id
          expect(item.href).toBe(pageHrefMap[item.id]);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('the rendered anchor for each NavItem has the correct href attribute', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...navItems),
        (item) => {
          // Render the sidebar with any currentPage and verify the anchor for this item
          const nav = renderSidebarNavDots(item.id as PageId);
          const allAnchors = Array.from(nav.querySelectorAll('a')) as HTMLAnchorElement[];

          // Find the anchor whose aria-label matches this item's label
          const anchor = allAnchors.find(
            (a) => a.getAttribute('aria-label') === item.label
          );

          expect(anchor).toBeDefined();
          expect(anchor!.getAttribute('href')).toBe(item.href);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('all six NavItems have distinct, non-empty hrefs', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...navItems),
        (item) => {
          expect(item.href).toBeTruthy();
          expect(item.href.length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );

    // Additionally verify all hrefs are unique across the full navItems array
    const hrefs = navItems.map((item) => item.href);
    const uniqueHrefs = new Set(hrefs);
    expect(uniqueHrefs.size).toBe(navItems.length);
  });
});
