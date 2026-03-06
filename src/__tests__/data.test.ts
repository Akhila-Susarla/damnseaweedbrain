import { describe, it, expect } from 'vitest';
import { skills } from '@/data/skills';
import { caseFiles } from '@/data/projects';
import { intelDossiers } from '@/data/experience';
import { education } from '@/data/education';
import { socialLinks } from '@/data/social';

const validTiers = ['S', 'A', 'B', 'C'] as const;
const validCategories = [
  'Languages',
  'Data Science/ML',
  'Tools & Frameworks',
  'Cloud',
] as const;
const validStatuses = ['Solved', 'Active', 'Classified'] as const;

describe('Skills data', () => {
  it('has at least 10 skills', () => {
    expect(skills.length).toBeGreaterThanOrEqual(10);
  });

  it('every skill has name, tier, and category', () => {
    for (const skill of skills) {
      expect(skill.name).toBeTruthy();
      expect(validTiers).toContain(skill.tier);
      expect(validCategories).toContain(skill.category);
    }
  });

  it('has skills in all 4 categories', () => {
    const categories = new Set(skills.map((s) => s.category));
    for (const cat of validCategories) {
      expect(categories.has(cat)).toBe(true);
    }
  });

  it('has at least one S-tier skill', () => {
    expect(skills.some((s) => s.tier === 'S')).toBe(true);
  });
});

describe('Case files data', () => {
  it('has exactly 3 case files', () => {
    expect(caseFiles).toHaveLength(3);
  });

  it('every case file has required fields', () => {
    for (const cf of caseFiles) {
      expect(cf.id).toBeTruthy();
      expect(cf.title).toBeTruthy();
      expect(validStatuses).toContain(cf.status);
      expect(cf.description).toBeTruthy();
      expect(cf.technologies.length).toBeGreaterThan(0);
    }
  });
});

describe('Intel dossiers data', () => {
  it('has exactly 4 dossiers', () => {
    expect(intelDossiers).toHaveLength(4);
  });

  it('every dossier has required fields', () => {
    for (const d of intelDossiers) {
      expect(d.organization).toBeTruthy();
      expect(d.role).toBeTruthy();
      expect(d.period).toBeTruthy();
      expect(d.highlights.length).toBeGreaterThan(0);
    }
  });
});

describe('Education data', () => {
  it('has exactly 2 entries', () => {
    expect(education).toHaveLength(2);
  });

  it('every entry has required fields', () => {
    for (const e of education) {
      expect(e.institution).toBeTruthy();
      expect(e.degree).toBeTruthy();
      expect(e.period).toBeTruthy();
    }
  });

  it('both entries have GPAs', () => {
    for (const e of education) {
      expect(e.gpa).toBeTruthy();
    }
  });
});

describe('Social links data', () => {
  it('has at least 3 links', () => {
    expect(socialLinks.length).toBeGreaterThanOrEqual(3);
  });

  it('every link has required fields', () => {
    for (const link of socialLinks) {
      expect(link.platform).toBeTruthy();
      expect(link.url).toBeTruthy();
      expect(link.label).toBeTruthy();
    }
  });

  it('includes LinkedIn, GitHub, and Email', () => {
    const platforms = socialLinks.map((l) => l.platform);
    expect(platforms).toContain('LinkedIn');
    expect(platforms).toContain('GitHub');
    expect(platforms).toContain('Email');
  });
});
