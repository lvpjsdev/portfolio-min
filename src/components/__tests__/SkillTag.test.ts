import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

/**
 * Unit tests for SkillTag component.
 *
 * Since Astro components cannot be imported directly in Vitest (they require a build step),
 * we manually construct the HTML that SkillTag.astro produces and test the DOM structure.
 *
 * SkillTag.astro renders:
 * - <a> when href is provided (clickable tag with external link)
 * - <span> when no href (static tag)
 */

// Helper: build the HTML string that SkillTag.astro would render
function renderSkillTag(props: { label: string; accent?: boolean; href?: string }): HTMLElement {
  const { label, accent = false, href } = props;

  const classes = ['skill-tag', ...(href ? ['skill-tag--link'] : []), ...(accent ? ['skill-tag--accent'] : [])].join(' ');

  let html: string;
  if (href) {
    html = `<a href="${href}" class="${classes}" target="_blank" rel="noopener noreferrer" aria-label="${label} documentation (external link)"><span class="skill-tag__text">${label}</span></a>`;
  } else {
    html = `<span class="${classes}"><span class="skill-tag__text">${label}</span></span>`;
  }

  const container = document.createElement('div');
  container.innerHTML = html;
  return container.firstElementChild as HTMLElement;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('SkillTag', () => {
  describe('label rendering', () => {
    it('renders the provided label as text content', () => {
      const el = renderSkillTag({ label: 'TypeScript' });
      expect(el.textContent).toBe('TypeScript');
    });

    it('renders different labels correctly', () => {
      const labels = ['React', 'Node.js', 'CSS', 'GraphQL'];
      labels.forEach((label) => {
        const el = renderSkillTag({ label });
        expect(el.textContent).toBe(label);
      });
    });

    it('renders as a span element when no href', () => {
      const el = renderSkillTag({ label: 'Vue' });
      expect(el.tagName.toLowerCase()).toBe('span');
    });

    it('renders as an anchor element when href is provided', () => {
      const el = renderSkillTag({ label: 'TypeScript', href: 'https://typescript.org' });
      expect(el.tagName.toLowerCase()).toBe('a');
    });
  });

  describe('skill-tag class', () => {
    it('always has the base skill-tag class', () => {
      const el = renderSkillTag({ label: 'Python' });
      expect(el).toHaveClass('skill-tag');
    });

    it('has skill-tag--link class when href is provided', () => {
      const el = renderSkillTag({ label: 'TypeScript', href: 'https://typescript.org' });
      expect(el).toHaveClass('skill-tag--link');
    });

    it('does NOT have skill-tag--link class when href is absent', () => {
      const el = renderSkillTag({ label: 'Python' });
      expect(el).not.toHaveClass('skill-tag--link');
    });
  });

  describe('skill-tag--accent class', () => {
    it('applies skill-tag--accent when accent=true', () => {
      const el = renderSkillTag({ label: 'TypeScript', accent: true });
      expect(el).toHaveClass('skill-tag--accent');
    });

    it('does NOT apply skill-tag--accent when accent=false', () => {
      const el = renderSkillTag({ label: 'TypeScript', accent: false });
      expect(el).not.toHaveClass('skill-tag--accent');
    });

    it('does NOT apply skill-tag--accent when accent prop is absent', () => {
      const el = renderSkillTag({ label: 'TypeScript' });
      expect(el).not.toHaveClass('skill-tag--accent');
    });

    it('still has the base skill-tag class when accent=true', () => {
      const el = renderSkillTag({ label: 'TypeScript', accent: true });
      expect(el).toHaveClass('skill-tag');
      expect(el).toHaveClass('skill-tag--accent');
    });
  });
});
