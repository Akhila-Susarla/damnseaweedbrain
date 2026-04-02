/** Skill category groupings */
export type SkillCategory =
  | 'Languages'
  | 'AI & GenAI'
  | 'Data Science / ML'
  | 'Tools & Frameworks'
  | 'Cloud & DevOps';

/** Project status indicators */
export type ProjectStatus = 'Published' | 'Deployed' | 'Prototype' | 'Completed';

/** Experience status */
export type ExperienceStatus = 'Current' | 'Completed';

/** Individual skill */
export interface Skill {
  name: string;
  category: SkillCategory;
}

/** Project entry */
export interface Project {
  id: string;
  title: string;
  status: ProjectStatus;
  description: string;
  technologies: string[];
  links?: { label: string; url: string }[];
  highlights: string[];
  metrics?: string[];
}

/** Work experience entry */
export interface Experience {
  id: string;
  organization: string;
  location: string;
  role: string;
  period: string;
  status: ExperienceStatus;
  highlights: string[];
  technologies: string[];
}

/** Education entry */
export interface Education {
  institution: string;
  location: string;
  degree: string;
  gpa?: string;
  period: string;
  status: 'In Progress' | 'Completed';
  highlights: string[];
}

/** Social/contact link */
export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

/** What I Do specialty card */
export interface Specialty {
  title: string;
  description: string;
  technologies: string[];
}
