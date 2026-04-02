import type { Project } from './types';

export const projects: Project[] = [
  {
    id: 'proj-001',
    title: 'Real-time NER Radar',
    status: 'Deployed',
    description:
      'Designed and implemented a real-time pipeline streaming Reddit r/news comments, performing NLTK NER extraction, aggregating entity counts, and visualizing trends in Kibana.',
    technologies: [
      'Apache Kafka', 'PySpark', 'NLTK', 'Elasticsearch', 'Kibana', 'Logstash', 'Reddit API',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/Akhila-Susarla' },
    ],
    highlights: [
      'Real-time streaming pipeline from Reddit r/news',
      'NER extraction with entity count aggregation',
      'Visualized trends via Kibana dashboards at 15/30/45/60-minute intervals',
    ],
    metrics: ['1.5hr Pipeline Run', 'Real-time NER', 'US Politics Focus Revealed'],
  },
  {
    id: 'proj-002',
    title: 'Influence Maximization in Complex Networks',
    status: 'Published',
    description:
      'Co-authored and presented a research paper on influence maximization in complex networks at FICTA 2023, published by Springer. Focused on identifying the most influential subsets across various markets.',
    technologies: ['Python', 'Graph Theory', 'Network Analysis'],
    links: [
      { label: 'Research Paper', url: '' },
    ],
    highlights: [
      'Published at FICTA 2023 by Springer',
      'Identified most influential subsets across various markets',
      'Co-authored research on complex network analysis',
    ],
    metrics: ['Springer Published', 'FICTA 2023'],
  },
  {
    id: 'proj-003',
    title: 'CorroSight',
    status: 'Deployed',
    description:
      'Developed an analytics-driven chatbot interface integrating conversational AI with robust backend data processing, enabling users to query complex datasets using natural language and receive actionable insights.',
    technologies: ['Python', 'Conversational AI', 'NLP', 'Analytics', 'Data Processing'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Akhila-Susarla' },
    ],
    highlights: [
      'Natural language querying of complex datasets',
      'Scalable analytics dashboard with interactive bot',
      'Streamlined data accessibility and user engagement',
    ],
    metrics: ['Conversational AI', 'Real-time Insights'],
  },
  {
    id: 'proj-004',
    title: 'UniWay — Campus Navigation & Analytics',
    status: 'Prototype',
    description:
      'Delivered an analytics-driven campus navigation and facility management product prototype for CBRE, integrating analytics for clients and a reward mechanism emphasizing user engagement and intuitive UI/UX.',
    technologies: ['Figma', 'Analytics', 'UI/UX Design'],
    links: [
      { label: 'Figma Prototype', url: '' },
      { label: 'Devpost', url: '' },
    ],
    highlights: [
      'Secured 2nd Runner-Up at UXperience The First Draft',
      'Analytics-driven campus navigation for CBRE',
      'Integrated reward mechanism for user engagement',
    ],
    metrics: ['2nd Runner-Up', 'CBRE Partnership'],
  },
];
