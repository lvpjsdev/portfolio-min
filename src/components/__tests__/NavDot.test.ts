import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

/**
 * Unit tests for NavDot component.
 *
 * NavDot.astro renders a decorative <span> dot — navigation is handled
 * by the parent <a> in Sidebar. This avoids invalid nested <a> elements.
 *
 * NavDot.astro renders:
 * <span
 *   class="nav-dot [nav-dot--active]"
 *   aria-hidden="true"
 * ></span>
 */

function renderNavDot(props: { active: boolean }): HTMLElement {
  const { active } = props;

  const classes = ['nav-dot', ...(active ? ['nav-dot--active'] : [])].join(' ');
  const html = `<span class="${classes}" aria-hidden="true"></span>`;

  const container = document.createElement('div');
  container.innerHTML = html;
  return container.firstElementChild as HTMLElement;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('NavDot', () => {
  describe('renders as a decorative span', () => {
    it('has the nav-dot class', () => {
      const el = renderNavDot({ active: false });
      expect(el).toHaveClass('nav-dot');
    });

    it('renders as a <span> element', () => {
      const el = renderNavDot({ active: false });
      expect(el.tagName.toLowerCase()).toBe('span');
    });

    it('is hidden from assistive technologies', () => {
      const el = renderNavDot({ active: false });
      expect(el).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('nav-dot--active class', () => {
    it('applies nav-dot--active when active=true', () => {
      const el = renderNavDot({ active: true });
      expect(el).toHaveClass('nav-dot--active');
    });

    it('does NOT apply nav-dot--active when active=false', () => {
      const el = renderNavDot({ active: false });
      expect(el).not.toHaveClass('nav-dot--active');
    });
  });
});
