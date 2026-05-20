import type { Education } from './types';

export const education: Education[] = [
  {
    institution: 'The University of Texas at Dallas',
    location: 'Dallas, TX, USA',
    degree: "Master's in Computer Science — Specialization in Data Science",
    gpa: '3.78/4.0',
    period: 'August 2024 - May 2026',
    status: 'Completed',
    highlights: [
      'Recipient of Operations Attendant of the Year Award, Student Union (2025)',
      'Runner-up for the CBRE prompt at UXperience 2024 with UniWay',
      'Top 5 project at the UTD JSOM x Goldman Sachs Hackathon (May 2026) with InvestIQ',
      'Teaching Assistant to Prof. Jaffal Wafa for Computer Architecture for one semester, mentoring and supporting students',
    ],
  },
  {
    institution: 'SRM University - AP, Amaravati',
    location: 'Amaravati, AP, India',
    degree: "Bachelor's in Computer Science — Specialization in AI/ML",
    gpa: '3.64/4.0',
    period: 'August 2019 - May 2023',
    status: 'Completed',
    highlights: [
      'Board Member of ACM Women\'s Chapter (2019-2022)',
      'Organizer of HackSRM 2.0 national-level hackathon',
      'Published a paper on influence maximization under the guidance of Prof. Jayalakshmi Tangirala',
    ],
  },
];
