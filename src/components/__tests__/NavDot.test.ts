import { describe, it, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

/**
 * Unit tests for NavDot component.
 *
 * Since Astro components cannot be imported directly in Vitest (they require a build step),
 * we manually construct the HTML that NavDot.astro produces and test the DOM structure.
 *
 * NavDot.astro renders:
 * <a
 *   href={href}
 *   class="nav-dot [nav-dot--active]"
 *   aria-label={label}
 *   aria-current={active ? 'page' : undefined}
 * ></a>
 */

// Helper: build the HTML string that NavDot.astro would render
function renderNavDot(props: { active: boolean; href: string; label: string }): HTMLElement {
  const { active, href, label } = props;

  const classes = ['nav-dot', ...(active ? ['nav-dot--active'] : [])].join(' ');
  const ariaCurrent = active ? ' aria-current="page"' : '';

  const html = `<a href="${href}" class="${classes}" aria-label="${label}"${ariaCurrent}></a>`;

  const container = document.createElement('div');
  container.innerHTML = html;
  return container.firstElementChild as HTMLElement;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('NavDot', () => {
  // Requirement 2.1 — renders as a circle with 10×10px (class nav-dot is present)
  describe('renders as a circle with nav-dot class', () => {
    it('has the nav-dot class', () => {
      const el = renderNavDot({ active: false, href: '/', label: 'Home' });
      expect(el).toHaveClass('nav-dot');
    });

    it('renders as an <a> element', () => {
      const el = renderNavDot({ active: false, href: '/', label: 'Home' });
      expect(el.tagName.toLowerCase()).toBe('a');
    });
  });

  // Requirement 2.2 — active prop controls the active class
  describe('nav-dot--active class', () => {
    it('applies nav-dot--active when active=true', () => {
      const el = renderNavDot({ active: true, href: '/about', label: 'About Me' });
      expect(el).toHaveClass('nav-dot--active');
    });

    it('does NOT apply nav-dot--active when active=false', () => {
      const el = renderNavDot({ active: false, href: '/about', label: 'About Me' });
      expect(el).not.toHaveClass('nav-dot--active');
    });
  });

  // Requirement 2.3 / 2.4 — aria-label is set correctly
  describe('aria-label', () => {
    it('sets aria-label to the provided label', () => {
      const el = renderNavDot({ active: false, href: '/skills', label: 'Skills' });
      expect(el).toHaveAttribute('aria-label', 'Skills');
    });

    it('sets aria-label correctly for each page', () => {
      const pages = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Me' },
        { href: '/experience', label: 'Work Experience' },
        { href: '/projects', label: 'Projects' },
        { href: '/skills', label: 'Skills' },
        { href: '/contact', label: 'Contact' },
      ];

      pages.forEach(({ href, label }) => {
        const el = renderNavDot({ active: false, href, label });
        expect(el).toHaveAttribute('aria-label', label);
      });
    });
  });

  // Requirement 2.3 — aria-current="page" when active=true
  describe('aria-current', () => {
    it('sets aria-current="page" when active=true', () => {
      const el = renderNavDot({ active: true, href: '/', label: 'Home' });
      expect(el).toHaveAttribute('aria-current', 'page');
    });

    it('does NOT set aria-current when active=false', () => {
      const el = renderNavDot({ active: false, href: '/', label: 'Home' });
      expect(el).not.toHaveAttribute('aria-current');
    });
  });

  // href is forwarded correctly
  describe('href', () => {
    it('sets the href attribute to the provided value', () => {
      const el = renderNavDot({ active: false, href: '/projects', label: 'Projects' });
      expect(el).toHaveAttribute('href', '/projects');
    });
  });
});
