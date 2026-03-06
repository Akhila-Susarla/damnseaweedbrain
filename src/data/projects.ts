import type { CaseFile } from './types';

export const caseFiles: CaseFile[] = [
  {
    id: 'case-001',
    title: 'Influence Maximization in Complex Networks',
    status: 'Solved',
    description:
      'Co-authored and presented a research paper on influence maximization in complex networks at FICTA 2023, published by Springer. Focused on identifying the most influential subsets across various markets.',
    technologies: ['Python', 'Graph Theory', 'Network Analysis'],
    links: [
      {
        label: 'Research Paper',
        url: '', // Link referenced in resume but URL not provided in extracted text
      },
    ],
    highlights: [
      'Published at FICTA 2023 by Springer',
      'Identified most influential subsets across various markets',
      'Co-authored research on complex network analysis',
    ],
  },
  {
    id: 'case-002',
    title: 'Real-time NER Radar',
    status: 'Solved',
    description:
      'Designed and implemented a real-time pipeline streaming Reddit r/news comments, performing NLTK NER extraction, aggregating entity counts, and visualizing trends in Kibana.',
    technologies: [
      'Apache Kafka',
      'PySpark',
      'NLTK',
      'Elasticsearch',
      'Kibana',
      'Logstash',
      'Reddit API',
    ],
    highlights: [
      'Real-time streaming pipeline from Reddit r/news',
      'NER extraction with entity count aggregation',
      'Visualized trends via Kibana dashboards',
      'Captured data at 15/30/45/60-minute intervals over 1.5 hours',
      'Revealed US politics focus in news commentary',
    ],
  },
  {
    id: 'case-003',
    title: 'UniWay — Campus Navigation & Analytics',
    status: 'Solved',
    description:
      'Delivered an analytics-driven campus navigation and facility management product prototype for CBRE, integrating analytics for clients and a reward mechanism emphasizing user engagement and intuitive UI/UX.',
    technologies: ['Figma', 'Analytics', 'UI/UX Design'],
    links: [
      {
        label: 'Figma Prototype',
        url: '', // Referenced in resume but URL not in extracted text
      },
      {
        label: 'Devpost',
        url: '', // Referenced in resume but URL not in extracted text
      },
    ],
    highlights: [
      'Secured 2nd Runner-Up at UXperience The First Draft',
      'Analytics-driven campus navigation for CBRE',
      'Integrated reward mechanism for user engagement',
    ],
  },
];
