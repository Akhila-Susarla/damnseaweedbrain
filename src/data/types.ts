/** Skill tier rating system (anime RPG-style) */
export type SkillTier = 'S' | 'A' | 'B' | 'C';

/** Skill category groupings */
export type SkillCategory =
  | 'Languages'
  | 'Data Science/ML'
  | 'Tools & Frameworks'
  | 'Cloud';

/** Case file status indicators */
export type CaseStatus = 'Solved' | 'Active' | 'Classified';

/** Individual skill with tier rating and optional BSD flavor */
export interface Skill {
  name: string;
  tier: SkillTier;
  category: SkillCategory;
  kanjiName?: string;
  description?: string;
}

/** Project case file */
export interface CaseFile {
  id: string;
  title: string;
  status: CaseStatus;
  description: string;
  technologies: string[];
  links?: { label: string; url: string }[];
  highlights: string[];
}

/** Work experience as an intel dossier */
export interface IntelDossier {
  id: string;
  organization: string;
  role: string;
  period: string;
  status: CaseStatus;
  highlights: string[];
  technologies: string[];
}

/** Education entry */
export interface Education {
  institution: string;
  degree: string;
  gpa?: string;
  period: string;
  highlights: string[];
}

/** Social/contact link */
export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

/** Dazai expression variants for character portrait */
export type DazaiExpression =
  | 'neutral'
  | 'smirk'
  | 'laugh'
  | 'serious'
  | 'annoyed'
  | 'mysterious';

/** Single line of VN dialogue */
export interface DialogueLine {
  id: string;
  character: 'dazai';
  expression: DazaiExpression;
  text: string;
}

/** A complete dialogue sequence (intro or transition) */
export interface DialogueSequence {
  id: string;
  section: string;
  type: 'intro' | 'transition';
  lines: DialogueLine[];
}
