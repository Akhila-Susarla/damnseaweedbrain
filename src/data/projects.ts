import type { Project } from './types';

export const projects: Project[] = [
  {
    id: 'proj-007',
    title: 'InvestIQ',
    status: 'Deployed',
    description:
      'Built a beginner-friendly portfolio management platform for a Goldman Sachs / UTD JSOM hackathon, pairing seeded Supabase data, scenario-based rebalancing, and Kuber AI guidance across a web app, floating widget, and Chrome extension. Placed in the top 5 at the May 2026 competition.',
    technologies: [
      'Next.js 16', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Recharts', 'Plasmo', 'Groq', 'ElevenLabs',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/prasannawarad/InvestIQ' },
    ],
    highlights: [
      'Placed in the top 5 at the UTD JSOM x Goldman Sachs Hackathon (May 2026)',
      'Shipped Kuber across three surfaces: the web app, floating chat widget, and Chrome extension overlay',
      'Engine-backed /rebalance flow computes before/after allocations, trade rationale, tax cost, fees, and goal impact',
      'Combined Supabase Auth, seeded portfolio data, and deterministic discovery ranking into one demo-ready monorepo',
    ],
    metrics: ['Top 5 Finalist', 'Hackathon Project', 'AI Agent Kuber', 'Web + Extension'],
  },
  {
    id: 'proj-001',
    title: 'Real-time NER Radar',
    status: 'Deployed',
    description:
      'Built a large-scale real-time data pipeline processing Reddit comments through Apache Kafka and PySpark to extract named entities and visualize trending topics in Kibana, demonstrating expertise in distributed stream processing and NLP at scale.',
    technologies: [
      'Apache Kafka', 'PySpark', 'NLTK', 'Elasticsearch', 'Kibana', 'Logstash', 'Reddit API',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/Akhila-Susarla/Real-time-NER-Insights' },
    ],
    highlights: [
      'End-to-end streaming pipeline: Reddit API → Kafka → PySpark → Elasticsearch → Kibana',
      'NLTK-based NER extraction surfacing entity frequency trends in real-time dashboards',
      'Captured and analyzed data at 15/30/45/60-minute intervals over a 1.5-hour run',
    ],
    metrics: ['Real-time Streaming', 'NER at Scale', 'Kibana Dashboards'],
  },
  {
    id: 'proj-002',
    title: 'Influence Maximization in Complex Networks',
    status: 'Published',
    description:
      'Co-authored a Springer-published research paper presenting algorithmic solutions for identifying the most influential nodes in complex networks — a core challenge in viral marketing, epidemic control, and social network analysis.',
    technologies: ['Python', 'Graph Theory', 'Network Analysis', 'Greedy Algorithms'],
    links: [
      { label: 'Research Paper', url: 'https://link.springer.com/chapter/10.1007/978-981-99-6706-3_10' },
    ],
    highlights: [
      'Solved the NP-hard seed selection problem for maximizing information spread across heterogeneous networks',
      'Benchmarked greedy and heuristic approaches against centrality-based methods on real-world social graph datasets',
      'Demonstrated scalable influence prediction applicable to viral marketing, public health campaigns, and recommendation systems',
    ],
    metrics: ['Springer Published', 'FICTA 2023', 'NP-Hard Optimization'],
  },
  {
    id: 'proj-003',
    title: 'CorroSight',
    status: 'Deployed',
    description:
      'Built an AI-powered pipeline integrity platform that automates alignment of In-Line Inspection data across 15+ years and multiple vendors, predicting corrosion degradation and generating prioritized repair schedules from fragmented datasets.',
    technologies: ['Python', 'FastAPI', 'Angular', 'xAI Grok', 'Hungarian Algorithm', 'NLP'],
    links: [
      { label: 'Devpost', url: 'https://devpost.com/software/corrosight' },
    ],
    highlights: [
      'Processes raw inspection data into functional digital twins in under 10 seconds',
      'Hungarian Algorithm-based optimal defect matching with 1,603 ground-truth anchors',
      'Integrated xAI Grok for AI-driven risk simulation and natural language querying',
    ],
    metrics: ['Digital Twin in <10s', '59+ Event Types', 'AI Risk Simulation'],
  },
  {
    id: 'proj-004',
    title: 'UniWay — Campus Navigation & Analytics',
    status: 'Prototype',
    description:
      'Designed and prototyped an intelligent campus navigation and space-booking platform solving real scheduling conflicts through real-time room availability tracking and interactive campus mapping, built in a 24-hour hackathon.',
    technologies: ['Figma', 'Analytics', 'UI/UX Design', 'Product Strategy'],
    links: [
      { label: 'Figma', url: 'https://www.figma.com/design/BtAH4NvZiUAqZQM4O8W7cJ/Uni-Way?node-id=0-1&p=f' },
      { label: 'Devpost', url: 'https://devpost.com/software/uniway-pd8vun' },
    ],
    highlights: [
      'Secured 2nd Runner-Up at UXperience The First Draft hackathon for CBRE',
      'Real-time room availability tracking and interactive campus mapping for hundreds of daily users',
      'Combined engineering rigor with intuitive UX — learned Figma from scratch in the hackathon',
    ],
    metrics: ['2nd Runner-Up', 'CBRE Partnership', '24hr Hackathon'],
  },
  {
    id: 'proj-005',
    title: 'Sentiment Analysis on Social Media Data',
    status: 'Completed',
    description:
      'Developed a multi-model sentiment analysis framework comparing TF-IDF, Word2Vec, GloVe, and LSTM approaches against fine-tuned BERT, achieving 81.56% accuracy on US airline tweet sentiment classification.',
    technologies: ['Python', 'BERT', 'LSTM', 'TF-IDF', 'Word2Vec', 'GloVe', 'scikit-learn'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Akhila-Susarla/Sentiment-Analysis-on-Social-Media-Data' },
    ],
    highlights: [
      'Rigorous comparison across 5 embedding/model architectures for production-grade sentiment systems',
      'Fine-tuned BERT achieving 81.56% accuracy on multi-class airline sentiment classification',
      'End-to-end NLP pipeline: data preprocessing, tokenization, feature extraction, and model evaluation',
    ],
    metrics: ['81.56% Accuracy', 'BERT Fine-tuned', '5 Model Comparison'],
  },
  {
    id: 'proj-006',
    title: 'Mushroom Species Classifier',
    status: 'Completed',
    description:
      'Built a deep learning image classifier using transfer learning with EfficientNetB0 to identify 9 mushroom genera from ~6,700 web-scraped images, tackling real-world class imbalance and noisy data through a two-phase training strategy.',
    technologies: ['Python', 'TensorFlow', 'Keras', 'EfficientNetB0', 'Transfer Learning'],
    links: [
      { label: 'GitHub', url: 'https://github.com/Akhila-Susarla/mushroom-species-classifier' },
    ],
    highlights: [
      'Two-phase training: frozen feature extraction then fine-tuning with partially unfrozen layers',
      'Advanced augmentation pipeline (rotation, shifts, zoom, brightness) to handle class imbalance (311–1,563 samples/class)',
      'Custom classification head with dropout, batch normalization, and learning rate scheduling',
    ],
    metrics: ['9 Genera', '6,700 Images', 'EfficientNetB0'],
  },
];
