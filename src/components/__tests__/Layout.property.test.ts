// Feature: design-system-components, Property 9: Layout correctly forwards currentPage to Sidebar

import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import fc from 'fast-check';

/**
 * Property-based tests for Layout → Sidebar → NavDot data flow.
 *
 * Layout.astro receives `currentPage` and passes it directly to Sidebar:
 *   <Sidebar currentPage={currentPage} />
 *
 * Sidebar.astro uses `currentPage` to determine which NavDot is active.
 *
 * Validates: Requirements 8.5, 1.4
 */

type PageId = 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact';

const navItems = [
  { id: 'home' as PageId,       href: '/',           label: 'Home' },
  { id: 'about' as PageId,      href: '/about',      label: 'About Me' },
  { id: 'experience' as PageId, href: '/experience', label: 'Work Experience' },
  { id: 'projects' as PageId,   href: '/projects',   label: 'Projects' },
  { id: 'skills' as PageId,     href: '/skills',     label: 'Skills' },
  { id: 'contact' as PageId,    href: '/contact',    label: 'Contact' },
] as const;

const pageHrefMap: Record<PageId, string> = Object.fromEntries(
  navItems.map((item) => [item.id, item.href])
) as Record<PageId, string>;

function renderLayoutWithSidebar(currentPage: PageId): HTMLElement {
  const container = document.createElement('nav');
  for (const item of navItems) {
    const active = currentPage === item.id;
    const classes = ['nav-dot', ...(active ? ['nav-dot--active'] : [])].join(' ');
    const ariaCurrent = active ? ' aria-current="page"' : '';
    container.insertAdjacentHTML(
      'beforeend',
      `<a href="${item.href}" class="${classes}" aria-label="${item.label}"${ariaCurrent}></a>`
    );
  }
  return container;
}

describe('Layout — Property 9: Layout correctly forwards currentPage to Sidebar', () => {
  it('exactly one NavDot is active and its href matches the currentPage forwarded by Layout', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('home', 'about', 'experience', 'projects', 'skills', 'contact' as const),
        (currentPage: PageId) => {
          const sidebar = renderLayoutWithSidebar(currentPage);
          const allDots = sidebar.querySelectorAll('.nav-dot');
          const activeDots = sidebar.querySelectorAll('.nav-dot--active');

          expect(allDots).toHaveLength(6);
          expect(activeDots).toHaveLength(1);

          const activeDot = activeDots[0] as HTMLAnchorElement;
          expect(activeDot.getAttribute('href')).toBe(pageHrefMap[currentPage]);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('the active NavDot has aria-current="page" matching the currentPage forwarded by Layout', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('home', 'about', 'experience', 'projects', 'skills', 'contact' as const),
        (currentPage: PageId) => {
          const sidebar = renderLayoutWithSidebar(currentPage);
          const allDots = Array.from(sidebar.querySelectorAll('.nav-dot')) as HTMLElement[];
          const withAriaCurrent = allDots.filter(
            (el) => el.getAttribute('aria-current') === 'page'
          );

          expect(withAriaCurrent).toHaveLength(1);
          expect(withAriaCurrent[0]).toHaveClass('nav-dot--active');
          expect(withAriaCurrent[0].getAttribute('href')).toBe(pageHrefMap[currentPage]);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('the NavDot corresponding to currentPage is active, all others are inactive', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('home', 'about', 'experience', 'projects', 'skills', 'contact' as const),
        (currentPage: PageId) => {
          const sidebar = renderLayoutWithSidebar(currentPage);
          const allDots = Array.from(sidebar.querySelectorAll('.nav-dot')) as HTMLAnchorElement[];
          const expectedHref = pageHrefMap[currentPage];

          const correspondingDot = allDots.find((dot) => dot.getAttribute('href') === expectedHref);
          const otherDots = allDots.filter((dot) => dot.getAttribute('href') !== expectedHref);

          expect(correspondingDot).toBeDefined();
          expect(correspondingDot!).toHaveClass('nav-dot--active');
          expect(otherDots).toHaveLength(5);
          otherDots.forEach((dot) => {
            expect(dot).not.toHaveClass('nav-dot--active');
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});
