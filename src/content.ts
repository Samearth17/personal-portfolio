export type SystemId = 'mind' | 'core' | 'build' | 'experience' | 'source' | 'foundation';
export const email = 'mukhijasamarth3017@gmail.com';
export const github = 'https://github.com/Samearth17';
export const linkedin = 'https://www.linkedin.com/in/samarth-mukhija-817418247/';
export type ProjectProof = {
  problem: string;
  contribution: string;
  outcome: string;
};
export const systems: {
  id: SystemId;
  number: string;
  name: string;
  label: string;
  title: string;
  description: string;
  image: string;
  x: number;
  y: number;
  items: {
    title: string;
    text: string;
    meta?: string;
    href?: string;
    hrefLabel?: string;
    sourceHref?: string;
    proof?: ProjectProof;
    featured?: boolean;
  }[];
}[] = [
  {
    id: 'mind',
    number: '01',
    name: 'Cognition',
    label: 'The person',
    title: 'Curiosity is the operating system.',
    description:
      'I’m Samarth, a Computer Science undergraduate in Pune. I build backend, data, and AI systems - and care about how all the pieces work together.',
    image: 'robot-optics-open.png',
    x: 53,
    y: 13,
    items: [
      {
        title: 'An engineer with range',
        text: 'Three software engineering internships spanning AI initiatives, fintech data pipelines, and product interfaces. I like moving between the logic underneath an experience and the experience itself.',
      },
      {
        title: 'A quantitative streak',
        text: 'Selected among 500 participants worldwide for the Akuna Capital Virtual Quant Trading Challenge 2026, and approximately 70 participants for the GoDark Testnet Trading Bootcamp by GoQuant.',
      },
      {
        title: 'Outside the terminal',
        text: 'An AR/VR hackathon winner and Rajasthan State Football Championship runner-up. Building, competing, and learning tend to show up everywhere.',
      },
    ],
  },
  {
    id: 'core',
    number: '02',
    name: 'Core',
    label: 'Technical toolkit',
    title: 'Built from the inside out.',
    description:
      'A practical toolkit for turning messy inputs into dependable systems. Python at the center, with data, APIs, and intelligent workflows around it.',
    image: 'robot-core-open.png',
    x: 57,
    y: 34,
    items: [
      {
        title: 'Backend & APIs',
        meta: 'PYTHON / DJANGO / FASTAPI',
        text: 'Python, Java, SQL, Django, Django REST Framework, FastAPI, REST APIs, data structures, object-oriented programming, and database systems.',
      },
      {
        title: 'Data infrastructure',
        meta: 'POSTGRESQL / SNOWFLAKE / AWS S3',
        text: 'PostgreSQL, MySQL, Snowflake, AWS S3, ETL pipelines, Pandas, NumPy, Matplotlib, and FuzzyWuzzy for analysis and reconciliation.',
      },
      {
        title: 'Intelligent workflows',
        meta: 'LANGGRAPH / LANGCHAIN / NLP',
        text: 'Multi-agent orchestration, natural-language processing, file classification, and document extraction with PdfPlumber and Camelot.',
      },
      {
        title: 'Product engineering',
        meta: 'REACT / HTML / CSS / GIT',
        text: 'Responsive React interfaces, reusable components, asynchronous API integration, and performance-focused implementation.',
      },
    ],
  },
  {
    id: 'build',
    number: '03',
    name: 'Build arm',
    label: 'Selected projects',
    title: 'Built to answer real questions.',
    description:
      'Three projects across research, financial analysis, and document intelligence, each with a clear problem, contribution, and outcome.',
    image: 'robot-overview.png',
    x: 26,
    y: 48,
    items: [
      {
        title: 'Hidden Economic Connections',
        meta: 'FINAL-YEAR RESEARCH / PYTHON / STREAMLIT',
        text: 'A collaborative university research project testing whether delayed responses to company-specific financial shocks can reveal a hidden company network.',
        featured: true,
        sourceHref: 'https://github.com/ayushmath07/final-year-project/tree/feat/complete-track-a',
        proof: {
          problem:
            'Share-price co-movement alone cannot establish an economic connection. We needed a controlled way to test whether responses after specific shocks carried useful network evidence.',
          contribution:
            'I built the Track A shock-response scoring and inference pipeline, four comparison baselines, robustness experiments, a real-price analysis workflow, and an offline-capable dashboard.',
          outcome:
            'SRCS reached 0.951 mean F1 across ten held-out synthetic seeds. Real-price results are ranked candidates for investigation, not proof of causality or business relationships.',
        },
      },
      {
        title: 'IPO Intelligence',
        meta: 'DJANGO / PANDAS / POSTGRESQL',
        text: 'A risk-aware research platform for comparing more than 99 IPOs rather than treating every listing as the same bet.',
        href: 'https://ipo-platform-amber.vercel.app/',
        hrefLabel: 'View live project',
        sourceHref: 'https://github.com/Samearth17/ipo-platform',
        proof: {
          problem: 'IPO data is fragmented, and a headline score says little about downside risk.',
          contribution:
            'I built weighted financial scoring, four investor risk profiles, mean-variance allocation, value-at-risk, volatility analysis, and stress testing with Django, Pandas, and PostgreSQL.',
          outcome:
            'The application turns more than 99 listings into comparable, risk-aware recommendations that visitors can inspect in the live demo.',
        },
      },
      {
        title: 'Multi-Agent Data Extraction',
        meta: 'FASTAPI / LANGGRAPH / SQLITE',
        text: 'A document-intelligence system that makes mixed files queryable through natural language.',
        href: 'https://multi-agent-data-extractor.onrender.com',
        hrefLabel: 'View live project',
        sourceHref: 'https://github.com/Samearth17/Multi-agent-Data-extractor',
        proof: {
          problem:
            'CSV, Excel, PDF, and text each need different extraction paths before users can ask useful questions across them.',
          contribution:
            'I built a six-agent workflow with file classification and specialist routing using FastAPI, LangGraph, and SQLite.',
          outcome:
            'The routing sends each file to the relevant processing path and avoids unnecessary LLM calls. The live demo and source are available to inspect.',
        },
      },
    ],
  },
  {
    id: 'experience',
    number: '04',
    name: 'Delivery arm',
    label: 'Experience',
    title: 'Tested beyond the sandbox.',
    description:
      'From AI initiatives to large data pipelines and responsive products - experience with real constraints, real teams, and real outcomes.',
    image: 'robot-overview.png',
    x: 76,
    y: 50,
    items: [
      {
        title: 'Southern Command · Indian Army',
        meta: 'TECHNOLOGY & AI INTERN / AUG - OCT 2026',
        text: 'Contributed to technology and AI initiatives under Track B of the Digital Media & Strategic Communication Internship Programme. Applied AI/ML, data analytics, web scraping, and automation to technical and analytical workflows.',
      },
      {
        title: 'Clarista',
        meta: 'SDE INTERN / MAR - MAY 2026',
        text: 'Architected fintech ETL pipelines processing 100 GB+ daily. Engineered Snowflake reconciliation that reduced file recovery latency by 60%, and designed multi-agent document workflows with LangGraph and LangChain.',
      },
      {
        title: 'MyTegami · Japan',
        meta: 'SDE INTERN / JUN - SEP 2025',
        text: 'Built a responsive React frontend for an AI-powered cover-letter platform. Component refactoring and asynchronous API optimization achieved 40% faster page loads and 32% higher responsiveness.',
      },
    ],
  },
  {
    id: 'source',
    number: '05',
    name: 'Backbone',
    label: 'Open source',
    title: 'Built in the open.',
    description:
      'Selected merged pull requests across infrastructure, data systems, document processing, and machine learning. Each entry links to the work on GitHub.',
    image: 'robot-core-open.png',
    x: 48,
    y: 57,
    items: [
      {
        title: 'Microsoft · NVX',
        meta: 'CI / VIRTUALIZATION',
        text: 'Added a restore-only CI guard for guest artifact steps, keeping the build path reliable when no restore is required.',
        href: 'https://github.com/microsoft/nvx/pull/352',
      },
      {
        title: 'Apache · DataFusion Comet',
        meta: 'SPARK / DATA SYSTEMS',
        text: 'Fixed a duplicate-field edge case in from_json by preserving the Spark fallback instead of failing the query.',
        href: 'https://github.com/apache/datafusion-comet/pull/6651',
      },
      {
        title: 'Docling · Pipelines',
        meta: 'DOCUMENT PROCESSING',
        text: 'Corrected the filename sent with extracted Markdown so downstream chunking receives a matching file identity.',
        href: 'https://github.com/docling-project/docling-pipelines/pull/148',
      },
      {
        title: 'Soup · Inference',
        meta: 'BATCHED CAUSAL INFERENCE',
        text: 'Added batched causal inference to improve the model execution path while retaining the existing output contract.',
        href: 'https://github.com/MakazhanAlpamys/Soup/pull/1083',
      },
    ],
  },
  {
    id: 'foundation',
    number: '06',
    name: 'Foundation',
    label: 'Education & achievements',
    title: 'Always under development.',
    description:
      'A foundation in computer science, a habit of competing, and a long-term commitment to learning.',
    image: 'robot-overview.png',
    x: 60,
    y: 79,
    items: [
      {
        title: 'B.Tech · Computer Science',
        meta: 'BHARATI VIDYAPEETH / 2023 - 2027',
        text: 'Bharati Vidyapeeth College of Engineering, Pune. CGPA: 8.8 / 10.',
      },
      {
        title: 'Beyond the curriculum',
        meta: 'BUILD / COMPETE / LEARN',
        text: 'Winner, Realms AR/VR Hackathon 2025. Winner, Epic IQ Challenge India 2020. Runner-up, Rajasthan State Football Championship and Canara Bank Zonal Quiz 2020.',
      },
      {
        title: 'Continuing education',
        meta: 'NPTEL / ORACLE / MCKINSEY',
        text: 'NPTEL Internet of Things (Silver), Oracle Cloud Infrastructure AI Foundations, and McKinsey Forward Program. CBSE: Class XII 85%, Class X 93% at Cambridge Court High School, Jaipur.',
      },
    ],
  },
];
