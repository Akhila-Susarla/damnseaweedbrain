import type { Experience } from './types';

export const experiences: Experience[] = [
  {
    id: 'exp-001',
    organization: 'Copart Inc.',
    location: 'Dallas, TX',
    role: 'Software Engineering Intern - AI/ML',
    period: 'February 2026 - Present',
    status: 'Current',
    highlights: [
      'Architected and deployed a production-grade conversational voice bot handling 10,000+ daily interactions, integrating LiveKit, Deepgram STT, Gemini 2.5 LLMs, & ElevenLabs TTS, achieving 95% voice recognition accuracy and sub-2-second response latency',
      'Engineered a modular, multi-tool AI architecture for IVR navigation and executed advanced prompt optimization across 50+ conversation scenarios, reducing system latency by 35% and improving navigation accuracy from 78% to 94%',
      'Developed a robust audio differentiation algorithm to distinguish between live user voice, automated hold messages, and ambient noise with 92% accuracy',
      'Orchestrated an end-to-end MLOps pipeline and semantic release framework using Kubernetes and Spinnaker, reducing deployment time by 93% (45 to 3 minutes) with 99.5% uptime',
      'Engineered an LLM fine-tuning pipeline using LoRA/QLoRA on historical callbot and CSR transcripts for ultra-low latency conversation simulation',
      'Architected event-driven automation pipelines using n8n workflows, reducing data preparation time for LLM fine-tuning by 40%',
      'Redesigned callbot conversation flows reducing user disconnect rates by 28% across 10,000+ daily calls, validated through A/B testing',
    ],
    technologies: [
      'LiveKit', 'Deepgram', 'Gemini 2.5', 'ElevenLabs', 'Kubernetes',
      'Spinnaker', 'LoRA/QLoRA', 'MariaDB', 'n8n', 'Python',
    ],
  },
  {
    id: 'exp-002',
    organization: 'American Airlines',
    location: 'Fort Worth, TX',
    role: 'Software Developer Intern',
    period: 'June 2025 - August 2025',
    status: 'Completed',
    highlights: [
      'Automated ETL pipelines to reconcile inventory records between Korber WMS and AA\'s SCEPTRE mainframe, reducing manual reconciliation effort by 35% and surfacing discrepancies impacting $2M+ worth of airplane parts',
      'Engineered data transformation strategies with MongoDB and MS SQL Server, streamlining migration across systems',
      'Built dataflow and system diagrams for 20+ APIs and GT services, cutting onboarding time for new engineers by 40%',
      'Analyzed large-scale operational datasets from the CFC warehouse to generate actionable insights into supply chain workflows',
      'Deployed data-centric services in Kubernetes (AKS), ensuring high availability for APIs supporting warehouse automation and AOG cases',
    ],
    technologies: [
      'MongoDB', 'MS SQL Server', 'Kubernetes', 'AKS', 'ETL', 'Python',
    ],
  },
  {
    id: 'exp-003',
    organization: 'Autodesk (via Infocusp Innovations)',
    location: 'Pune, India',
    role: 'Consultant - Data Scientist',
    period: 'July 2023 - July 2024',
    status: 'Completed',
    highlights: [
      'Implemented SINDy with Model Predictive Control for water treatment optimization, reducing operating costs by 20% and improving accuracy by 23%',
      'Developed LLMs to build an interactive chatbot simulating movie character conversations, gaining deep understanding of transformers and attention mechanisms',
      'Led a cross-functional ML project in an Agile environment, reducing deployment time from 4 weeks to 2 weeks',
      'Automated savings calculations by simulating the prod environment locally, reducing troubleshooting time by 70%',
    ],
    technologies: [
      'Python', 'scikit-learn', 'SINDy', 'MPC', 'LLMs', 'Transformers', 'GPT', 'BERT',
    ],
  },
  {
    id: 'exp-004',
    organization: 'Autodesk (via Infocusp Innovations)',
    location: 'Pune, India',
    role: 'Consultant - Associate ML Engineer (Intern)',
    period: 'July 2022 - June 2023',
    status: 'Completed',
    highlights: [
      'Optimized Random Forest and XGBoost models through hyperparameter tuning, increasing accuracy by 12%',
      'Engineered robust CI/CD pipelines using unit test scripts and YAML configurations for stable model deployment',
      'Performed extensive data cleaning, EDA, feature engineering, and time-series analysis impacting 1M+ data points daily',
      'Utilized multivariate anomaly detection to decrease operational risks by 40%',
    ],
    technologies: [
      'Python', 'scikit-learn', 'XGBoost', 'Random Forest', 'CI/CD',
    ],
  },
  {
    id: 'exp-005',
    organization: 'SRM University',
    location: 'Amaravati, India',
    role: 'Research Intern',
    period: 'June 2021 - August 2021',
    status: 'Completed',
    highlights: [
      'Devised a mathematical approach with regression algorithms to predict the Rise and Fall of COVID-19 cases',
      'Model predicted cases and deaths with 95.2% and 93.9% accuracy respectively',
    ],
    technologies: [
      'Python', 'scikit-learn', 'matplotlib', 'Regression',
    ],
  },
];
