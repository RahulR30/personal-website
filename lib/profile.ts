// Single source of truth for the natural-language recruiter search.
//
// The model is only ever allowed to *select* from these items and write a short
// summary grounded in them — it never invents experience. The UI renders the
// matched items from this file directly, so every bullet a recruiter reads is
// text written here rather than model output.

export type ProfileItem = {
  id: string;
  kind: "experience" | "project" | "activity" | "education";
  title: string;
  org: string;
  period: string;
  summary: string;
  tags: string[];
};

export const profile: ProfileItem[] = [
  {
    id: "wayfair",
    kind: "experience",
    title: "Software Engineer Co-op — Order Experience Financials & Integration",
    org: "Wayfair",
    period: "Jul 2026 – Dec 2026",
    summary:
      "Replaced legacy Kafka pipelines with direct BigQuery writes in C#, reducing ingestion-to-query latency across 5M+ daily order events. Built OX UI features letting 10+ teams self-serve outstanding balance data. Built reusable tax-calculation infrastructure supporting multi-entity fee logic across backend services, launched with North Carolina's White Goods Disposal Fee and designed to onboard future state fees without added backend work.",
    tags: ["C#", "BigQuery", "Apache Kafka", "data pipelines", "distributed systems", "backend", "production", "e-commerce", "latency optimization", "streaming"],
  },
  {
    id: "market-data-research",
    kind: "experience",
    title: "ML Research Assistant — Market Data Modeling",
    org: "Northeastern University, Algorithms & Theory Research Group",
    period: "Jan 2026 – Present",
    summary:
      "Engineered a PyTorch temporal nowcasting model (shared GRU + cross-sectional attention) on 3 months of 1-second bar NIFTY data. Used spot-futures lead-lag structure to correct for stale prices, reaching a walk-forward R² of 0.28 vs 0.21 for a Ridge baseline. Constructed a cross-validation training framework to verify model scalability across noisy high-frequency environments.",
    tags: ["quantitative research", "quant", "trading", "time series", "high-frequency", "market microstructure", "PyTorch", "GRU", "attention", "statistics", "signal research", "alpha", "walk-forward validation", "Python", "forecasting"],
  },
  {
    id: "ta-discrete",
    kind: "experience",
    title: "Teaching Assistant — Discrete Structures",
    org: "Northeastern University, Khoury College",
    period: "May 2026 – Jul 2026",
    summary:
      "Held office hours covering logic, proof techniques, combinatorics, graph theory, and asymptotic analysis. Graded assignments and exams with individualized support on foundational discrete mathematics.",
    tags: ["mathematics", "proofs", "combinatorics", "graph theory", "teaching", "communication", "discrete math", "algorithms"],
  },
  {
    id: "ta-datascience",
    kind: "experience",
    title: "Teaching Assistant — Data Science Foundations",
    org: "Northeastern University, Khoury College",
    period: "Jan 2026 – May 2026",
    summary:
      "Ran weekly office hours covering core ML concepts (kNN, linear regression) for 200+ sophomores and juniors. Graded weekly assignments and exams for 200+ students with detailed Python-focused feedback.",
    tags: ["machine learning", "statistics", "regression", "teaching", "Python", "mentoring", "communication"],
  },
  {
    id: "hypatia",
    kind: "experience",
    title: "Software Engineering Intern",
    org: "Hypatia AI",
    period: "May 2024 – Aug 2024",
    summary:
      "Built differential-equation simulations in Python (SciPy/NumPy) to model insulin dynamics from glucose data. Integrated Python backend functions into iOS/Android apps to process CGM data in real time.",
    tags: ["Python", "SciPy", "NumPy", "numerical methods", "differential equations", "simulation", "mobile", "healthcare", "real-time"],
  },
  {
    id: "allayee",
    kind: "experience",
    title: "Research Assistant — Allayee Lab",
    org: "USC Keck School of Medicine",
    period: "Apr 2023 – May 2024",
    summary:
      "Built a pipeline to parse and normalize 30M+ rows of high-dimensional Genome-Wide Association Studies data for statistical analysis. Refactored Pheweb modules into an interactive visualization tool for researchers exploring large-scale genetic associations.",
    tags: ["data engineering", "large datasets", "statistics", "Python", "data visualization", "research", "bioinformatics", "ETL"],
  },
  {
    id: "legal-rag",
    kind: "project",
    title: "Legal Document Intelligence Pipeline",
    org: "Independent",
    period: "Sep 2025 – Present",
    summary:
      "Retrieval-Augmented Generation system over complex legal datasets, combining semantic vector search with chunking strategies to extract structured domain insights. Tuned embedding and retrieval indexing to improve answer relevance and cut query latency by 85% on large document sets.",
    tags: ["RAG", "LLM", "NLP", "vector databases", "embeddings", "LangChain", "Transformers", "PyTorch", "Python", "search", "AI"],
  },
  {
    id: "optimum-hacknet",
    kind: "project",
    title: "Optimum Hacknet — 1st Place",
    org: "Hackathon",
    period: "Sep 2025",
    summary:
      "Built a decentralized file-transfer system on Optimum's mump2p infrastructure using random linear network coding. Integrated Go components behind a service proxy and helped resolve network-latency issues with Optimum's engineering team.",
    tags: ["Go", "networking", "distributed systems", "P2P", "gRPC", "RLNC", "systems programming", "low latency", "award"],
  },
  {
    id: "network-flow",
    kind: "project",
    title: "Evolutionary Aviation Network Flow Optimization — Published",
    org: "Curieux Academic Journal",
    period: "Nov 2022 – Mar 2023",
    summary:
      "Novel graph-theoretic algorithm to maximize airline network flow under topological constraints, quantifying the impact of adding or removing airports. Published in the Curieux Academic Journal and awarded 1st place at the Greater San Diego Science and Engineering Fair.",
    tags: ["graph theory", "optimization", "algorithms", "research", "publication", "Python", "Java", "mathematics", "combinatorial optimization"],
  },
  {
    id: "semantic-contract-diff",
    kind: "project",
    title: "Semantic Contract Diff",
    org: "Northeastern AI",
    period: "Mar 2026 – Apr 2026",
    summary:
      "NLP tool using semantic analysis to distinguish substantive legal changes from superficial text edits in contract documents, surfacing what actually changed in meaning rather than wording. Led development as Tech Lead.",
    tags: ["NLP", "semantic analysis", "Python", "Streamlit", "LLM", "technical leadership", "AI"],
  },
  {
    id: "facial-expression",
    kind: "project",
    title: "Adaptive Facial Expression Recognition",
    org: "CS4100 — Foundations of AI",
    period: "2026",
    summary:
      "Game-based learning tool helping neurodivergent children recognize facial expressions. Trained a CNN in PyTorch on FER2013Plus reaching 73.67% test accuracy, benchmarked against Vision Transformers, and optimized the input pipeline to remove dead time between epochs.",
    tags: ["computer vision", "CNN", "Vision Transformers", "PyTorch", "deep learning", "model training", "accessibility"],
  },
  {
    id: "algotutorai",
    kind: "project",
    title: "AlgoTutorAI",
    org: "Independent",
    period: "Jun 2025",
    summary:
      "Context-aware tutoring engine built on the Ollama API that gives logic-based critiques of student algorithm solutions. Wrote a REST backend with automated data seeding, containerized with Docker.",
    tags: ["Docker", "REST API", "LLM", "Ollama", "backend", "Python", "containerization", "DevOps"],
  },
  {
    id: "ainu",
    kind: "activity",
    title: "Director of Technology",
    org: "Northeastern AI (AINU)",
    period: "Sep 2025 – Present",
    summary:
      "Created a technical ML track connecting students with professors for hands-on academic research. Leads all technical teams across the organization, overseeing project direction and delivery, and hosts hands-on mathematics and ML workshops. Previously Tech Lead and Machine Learning Engineer, building end-to-end ML pipelines for industry partners covering training, hyperparameter optimization, and performance evaluation.",
    tags: ["leadership", "ML pipelines", "PyTorch", "mentoring", "team management", "promotion", "curriculum", "machine learning"],
  },
  {
    id: "blockchain",
    kind: "activity",
    title: "Director of Technology",
    org: "Northeastern Blockchain",
    period: "Jan 2026 – Present",
    summary:
      "Leads a React frontend rebuild and architecture update of the club's web platform with a team of 5 engineers. Designed curriculum and leads workshops for 40+ underclassmen on smart-contract development and blockchain fundamentals.",
    tags: ["leadership", "React", "TypeScript", "frontend", "web development", "blockchain", "smart contracts", "teaching", "team management"],
  },
  {
    id: "education",
    kind: "education",
    title: "B.S. Computer Science — 3.9/4.0, Dean's List (All Semesters)",
    org: "Northeastern University",
    period: "Expected Dec 2027",
    summary:
      "Coursework: Artificial Intelligence, Algorithms & Data Structures, Programming in C++, Discrete Structures, Matrix Methods for Machine Learning, Object-Oriented Design, Computer Systems, Multivariable Calculus, Linear Algebra, Principles of Mathematics, Theory of Computation. Languages: C++, Python, C, C#, Java, JavaScript/TypeScript. Frameworks and tools: React, Node/Express, PyTorch, TensorFlow, Docker, Apache Kafka, BigQuery, pandas, Matplotlib, SciPy, Git.",
    tags: ["linear algebra", "calculus", "probability", "statistics", "mathematics", "C++", "Python", "Java", "C", "C#", "algorithms", "theory of computation", "GPA", "coursework", "TensorFlow", "React"],
  },
];

export const profileById = new Map(profile.map((p) => [p.id, p]));

/** Compact corpus handed to the model — ids must match `profile` exactly. */
export const profileCorpus = profile
  .map(
    (p) =>
      `<item id="${p.id}" kind="${p.kind}">\n${p.title} — ${p.org} (${p.period})\n${p.summary}\nKeywords: ${p.tags.join(", ")}\n</item>`,
  )
  .join("\n\n");
