import type { Skill } from './types';

export const skills: Skill[] = [
  // --- Languages ---
  {
    name: 'Python',
    tier: 'S',
    category: 'Languages',
    kanjiName: '蛇語',
    description: 'Primary language across all roles and research',
  },
  {
    name: 'SQL',
    tier: 'A',
    category: 'Languages',
    description: 'Used extensively for data pipelines and ETL',
  },
  {
    name: 'TypeScript',
    tier: 'B',
    category: 'Languages',
    kanjiName: '型文字',
  },
  {
    name: 'JavaScript',
    tier: 'B',
    category: 'Languages',
  },
  {
    name: 'C/C++',
    tier: 'C',
    category: 'Languages',
  },

  // --- Data Science/ML ---
  {
    name: 'Machine Learning',
    tier: 'S',
    category: 'Data Science/ML',
    kanjiName: '機械学習',
    description: 'Core competency across multiple roles — model training, evaluation, deployment',
  },
  {
    name: 'scikit-learn',
    tier: 'S',
    category: 'Data Science/ML',
    description: 'Random Forest, XGBoost tuning, regression, ensemble methods',
  },
  {
    name: 'PyTorch',
    tier: 'A',
    category: 'Data Science/ML',
    kanjiName: '松明',
  },
  {
    name: 'TensorFlow',
    tier: 'A',
    category: 'Data Science/ML',
  },
  {
    name: 'Pandas',
    tier: 'A',
    category: 'Data Science/ML',
    description: 'Data cleaning, blending, feature engineering',
  },
  {
    name: 'NumPy',
    tier: 'A',
    category: 'Data Science/ML',
  },
  {
    name: 'PySpark',
    tier: 'B',
    category: 'Data Science/ML',
    description: 'Large-scale data processing in NER Radar pipeline',
  },
  {
    name: 'NLP',
    tier: 'A',
    category: 'Data Science/ML',
    kanjiName: '自然言語',
    description: 'LLMs, transformers, BERT, GPT, NER extraction',
  },
  {
    name: 'Time-Series Forecasting',
    tier: 'A',
    category: 'Data Science/ML',
    description: 'SINDy with MPC for water treatment optimization',
  },
  {
    name: 'Statistical Modeling',
    tier: 'A',
    category: 'Data Science/ML',
  },
  {
    name: 'EDA',
    tier: 'A',
    category: 'Data Science/ML',
  },
  {
    name: 'Hadoop',
    tier: 'B',
    category: 'Data Science/ML',
  },
  {
    name: 'Anomaly Detection',
    tier: 'B',
    category: 'Data Science/ML',
    description: 'Multivariate anomaly detection reducing operational risks by 40%',
  },
  {
    name: 'LDA',
    tier: 'B',
    category: 'Data Science/ML',
  },
  {
    name: 'PCA',
    tier: 'B',
    category: 'Data Science/ML',
  },
  {
    name: 'Clustering & Segmentation',
    tier: 'B',
    category: 'Data Science/ML',
  },

  // --- Tools & Frameworks ---
  {
    name: 'Git',
    tier: 'A',
    category: 'Tools & Frameworks',
  },
  {
    name: 'Jupyter',
    tier: 'A',
    category: 'Tools & Frameworks',
  },
  {
    name: 'Databricks',
    tier: 'B',
    category: 'Tools & Frameworks',
  },
  {
    name: 'Node.js',
    tier: 'B',
    category: 'Tools & Frameworks',
  },
  {
    name: 'GraphQL',
    tier: 'B',
    category: 'Tools & Frameworks',
  },
  {
    name: 'MongoDB',
    tier: 'B',
    category: 'Tools & Frameworks',
    description: 'Data transformation and migration at American Airlines',
  },
  {
    name: 'Apache Kafka',
    tier: 'B',
    category: 'Tools & Frameworks',
    description: 'Real-time streaming in NER Radar pipeline',
  },
  {
    name: 'Elasticsearch',
    tier: 'B',
    category: 'Tools & Frameworks',
    description: 'Storage and search in NER Radar pipeline',
  },
  {
    name: 'Kubernetes',
    tier: 'B',
    category: 'Tools & Frameworks',
    description: 'AKS deployments at American Airlines',
  },
  {
    name: 'Datadog',
    tier: 'C',
    category: 'Tools & Frameworks',
  },
  {
    name: 'Postman',
    tier: 'C',
    category: 'Tools & Frameworks',
  },
  {
    name: 'Excel',
    tier: 'C',
    category: 'Tools & Frameworks',
  },

  // --- Cloud ---
  {
    name: 'AWS',
    tier: 'A',
    category: 'Cloud',
    kanjiName: '雲',
    description: 'SageMaker, S3, CloudWatch, Lambda',
  },
  {
    name: 'Azure DevOps',
    tier: 'B',
    category: 'Cloud',
  },
];
