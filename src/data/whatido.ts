import type { Specialty } from './types';

export const specialties: Specialty[] = [
  {
    title: 'Conversational AI & Voice Bots',
    description:
      'Building production-grade voice AI systems with real-time speech processing, IVR navigation, and natural conversation flow optimization.',
    technologies: ['LiveKit', 'Deepgram', 'ElevenLabs', 'Gemini', 'GPT'],
  },
  {
    title: 'ML Pipeline Development',
    description:
      'End-to-end machine learning pipelines from data preprocessing to model deployment, with MLOps automation and continuous monitoring.',
    technologies: ['scikit-learn', 'PyTorch', 'TensorFlow', 'Kubernetes', 'Spinnaker'],
  },
  {
    title: 'Data Science & Analytics',
    description:
      'Extracting actionable insights from large-scale datasets through statistical modeling, EDA, time-series forecasting, and anomaly detection.',
    technologies: ['Pandas', 'PySpark', 'Hadoop', 'Databricks', 'BigQuery'],
  },
  {
    title: 'NLP & LLM Engineering',
    description:
      'Fine-tuning and deploying large language models with prompt engineering, RAG pipelines, and conversational AI applications.',
    technologies: ['LangChain', 'LoRA/QLoRA', 'Transformers', 'BERT', 'NER'],
  },
];
