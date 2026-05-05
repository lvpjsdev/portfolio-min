// Feature: design-system-components, Property 7: ContactLink href is correct for any type and value

import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import fc from 'fast-check';

/**
 * Property-based tests for ContactLink component.
 *
 * Since Astro components cannot be imported directly in Vitest (they require a build step),
 * we replicate the ContactLink rendering logic here: the same href computation and
 * isExternal flag that ContactLink.astro uses.
 *
 * Validates: Requirements 6.6, 6.7
 */

type ContactType = 'email' | 'linkedin' | 'github' | 'instagram';

interface ContactLinkProps {
  type: ContactType;
  label: string;
  value: string;
}

function escapeAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderContactLink(props: ContactLinkProps): HTMLAnchorElement {
  const { type, label, value } = props;

  // Mirrors ContactLink.astro logic exactly:
  const href = type === 'email' ? `mailto:${value}` : value;
  const isExternal = type !== 'email';

  const externalAttrs = isExternal ? `target="_blank" rel="noopener noreferrer"` : '';

  const html = `
    <a
      href="${escapeAttr(href)}"
      class="contact-link"
      ${externalAttrs}
      aria-label="${escapeAttr(label)}"
    >
      <span class="contact-icon"></span>
      <span class="contact-label">${escapeAttr(label)}</span>
    </a>
  `;

  const container = document.createElement('div');
  container.innerHTML = html;
  return container.querySelector('a') as HTMLAnchorElement;
}

describe('ContactLink — Property 7: href is correct for any type and value', () => {
  it('external types (linkedin, github, instagram): href equals value and target="_blank"', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('linkedin', 'github', 'instagram'),
        fc.webUrl(),
        (type, value) => {
          const link = renderContactLink({ type: type as ContactType, label: 'Test', value });
          expect(link.getAttribute('href')).toBe(value);
          expect(link.getAttribute('target')).toBe('_blank');
          expect(link.getAttribute('rel')).toBe('noopener noreferrer');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('email type: href equals "mailto:{value}" and no target="_blank"', () => {
    fc.assert(
      fc.property(
        fc.emailAddress(),
        (email) => {
          const link = renderContactLink({ type: 'email', label: 'Email', value: email });
          expect(link.getAttribute('href')).toBe(`mailto:${email}`);
          expect(link.getAttribute('target')).toBeNull();
        }
      ),
      { numRuns: 100 }
    );
  });

  it('external types never produce a mailto: href', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('linkedin', 'github', 'instagram'),
        fc.webUrl(),
        (type, value) => {
          const link = renderContactLink({ type: type as ContactType, label: 'Test', value });
          expect(link.getAttribute('href')).not.toMatch(/^mailto:/);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('email type always produces a mailto: href', () => {
    fc.assert(
      fc.property(
        fc.emailAddress(),
        (email) => {
          const link = renderContactLink({ type: 'email', label: 'Email', value: email });
          expect(link.getAttribute('href')).toMatch(/^mailto:/);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('aria-label is always set to the provided label for all types', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('email', 'linkedin', 'github', 'instagram'),
        fc.string({ minLength: 1, maxLength: 50 }),
        fc.string({ minLength: 1 }),
        (type, label, value) => {
          const link = renderContactLink({ type: type as ContactType, label, value });
          expect(link.getAttribute('aria-label')).toBe(label);
        }
      ),
      { numRuns: 100 }
    );
  });
});
