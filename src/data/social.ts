import type { SocialLink } from './types';

export const LINKEDIN_URL = 'https://www.linkedin.com/in/akhila-susarla-1803b41b6/';
export const GITHUB_URL = 'https://github.com/Akhila-Susarla';
export const INSTAGRAM_URL = 'https://www.instagram.com/_the_weird_alien__/';
export const EMAIL_URL = 'mailto:akhilasusarla@gmail.com';

export const socialLinks: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: LINKEDIN_URL,
    label: 'Akhila Susarla',
  },
  {
    platform: 'GitHub',
    url: GITHUB_URL,
    label: 'akhilasusarla',
  },
  {
    platform: 'Instagram',
    url: INSTAGRAM_URL,
    label: '_the_weird_alien__',
  },
  {
    platform: 'Email',
    url: EMAIL_URL,
    label: 'akhilasusarla@gmail.com',
  },
];
