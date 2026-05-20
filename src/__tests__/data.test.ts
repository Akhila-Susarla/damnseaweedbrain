import { describe, it, expect } from 'vitest';
import { skills } from '@/data/skills';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experience';
import { education } from '@/data/education';
import { socialLinks } from '@/data/social';
import { specialties } from '@/data/whatido';

const validCategories = [
  'Languages',
  'AI & GenAI',
  'Data Science / ML',
  'Tools & Frameworks',
  'Cloud & DevOps',
] as const;

const validProjectStatuses = ['Published', 'Deployed', 'Prototype', 'Completed'] as const;
const validExperienceStatuses = ['Current', 'Completed'] as const;

describe('Skills data', () => {
  it('has at least 10 skills', () => {
    expect(skills.length).toBeGreaterThanOrEqual(10);
  });

  it('every skill has name and category', () => {
    for (const skill of skills) {
      expect(skill.name).toBeTruthy();
      expect(validCategories).toContain(skill.category);
    }
  });

  it('has skills in all 5 categories', () => {
    const categories = new Set(skills.map((s) => s.category));
    for (const cat of validCategories) {
      expect(categories.has(cat)).toBe(true);
    }
  });
});

describe('Projects data', () => {
  it('has at least 3 projects', () => {
    expect(projects.length).toBeGreaterThanOrEqual(3);
  });

  it('every project has required fields', () => {
    for (const p of projects) {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(validProjectStatuses).toContain(p.status);
      expect(p.description).toBeTruthy();
      expect(p.technologies.length).toBeGreaterThan(0);
    }
  });
});

describe('Experience data', () => {
  it('has at least 4 experiences', () => {
    expect(experiences.length).toBeGreaterThanOrEqual(4);
  });

  it('every experience has required fields', () => {
    for (const e of experiences) {
      expect(e.organization).toBeTruthy();
      expect(e.role).toBeTruthy();
      expect(e.period).toBeTruthy();
      expect(validExperienceStatuses).toContain(e.status);
      expect(e.highlights.length).toBeGreaterThan(0);
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
      expect(e.location).toBeTruthy();
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

  it('uses the canonical LinkedIn and GitHub URLs', () => {
    const linkedIn = socialLinks.find((l) => l.platform === 'LinkedIn');
    const gitHub = socialLinks.find((l) => l.platform === 'GitHub');

    expect(linkedIn?.url).toBe('https://www.linkedin.com/in/akhila-susarla-1803b41b6/');
    expect(gitHub?.url).toBe('https://github.com/Akhila-Susarla');
  });
});

describe('Specialties data', () => {
  it('has exactly 4 specialties', () => {
    expect(specialties).toHaveLength(4);
  });

  it('every specialty has required fields', () => {
    for (const s of specialties) {
      expect(s.title).toBeTruthy();
      expect(s.description).toBeTruthy();
      expect(s.technologies.length).toBeGreaterThan(0);
    }
  });
});
