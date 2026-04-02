import type { Education } from './types';

export const education: Education[] = [
  {
    institution: 'The University of Texas at Dallas',
    location: 'Dallas, TX, USA',
    degree: "Master's in Computer Science",
    gpa: '3.78/4.0',
    period: 'August 2024 - May 2026',
    status: 'In Progress',
    highlights: [
      'Recipient of Operations Attendant of the Year Award, Student Union (2025)',
    ],
  },
  {
    institution: 'SRM University, Amaravati',
    location: 'Amaravati, India',
    degree: "Bachelor's in Computer Science AI/ML",
    gpa: '3.64/4.0',
    period: 'August 2019 - May 2023',
    status: 'Completed',
    highlights: [
      'Board Member of ACM Women\'s Chapter (2019-2022)',
      'Organizer of HackSRM 2.0 national-level hackathon',
    ],
  },
];
