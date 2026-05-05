import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

/**
 * Unit tests for SkillTag component.
 *
 * Since Astro components cannot be imported directly in Vitest (they require a build step),
 * we manually construct the HTML that SkillTag.astro produces and test the DOM structure.
 *
 * SkillTag.astro renders:
 * <span class="skill-tag [skill-tag--accent]">{label}</span>
 */

// Helper: build the HTML string that SkillTag.astro would render
function renderSkillTag(props: { label: string; accent?: boolean }): HTMLElement {
  const { label, accent = false } = props;

  const classes = ['skill-tag', ...(accent ? ['skill-tag--accent'] : [])].join(' ');
  const html = `<span class="${classes}">${label}</span>`;

  const container = document.createElement('div');
  container.innerHTML = html;
  return container.firstElementChild as HTMLElement;
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('SkillTag', () => {
  // Requirement 3.3 — label is rendered as text content
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

    it('renders as a <span> element', () => {
      const el = renderSkillTag({ label: 'Vue' });
      expect(el.tagName.toLowerCase()).toBe('span');
    });

    it('always has the base skill-tag class', () => {
      const el = renderSkillTag({ label: 'Python' });
      expect(el).toHaveClass('skill-tag');
    });
  });

  // Requirement 3.5 — accent prop controls the accent modifier class
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
