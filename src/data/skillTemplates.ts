import type { SkillLevel } from "@/types/learning";

interface TopicTemplate {
  title: string;
  description: string;
  level: SkillLevel;
  subtopics: string[];
}

interface SkillTemplate {
  topics: TopicTemplate[];
}

const KNOWN_SKILLS: Record<string, SkillTemplate> = {
  python: {
    topics: [
      { title: "Python Basics & Setup", description: "Install Python, use the REPL, write your first script", level: "beginner", subtopics: ["Installing Python", "Using the REPL", "Variables & print()", "Running .py files"] },
      { title: "Data Types & Operators", description: "Strings, numbers, booleans, and arithmetic", level: "beginner", subtopics: ["Integers & floats", "String operations", "Type casting", "Comparison operators"] },
      { title: "Control Flow", description: "if/elif/else, for loops, while loops", level: "beginner", subtopics: ["Conditional statements", "For loops & range()", "While loops", "Break & continue"] },
      { title: "Functions", description: "Defining, calling, and organizing reusable code", level: "beginner", subtopics: ["def & return", "Parameters & arguments", "Default values", "Scope & globals"] },
      { title: "Data Structures", description: "Lists, tuples, dictionaries, and sets", level: "beginner", subtopics: ["List operations", "Dictionary methods", "Tuples & immutability", "Set operations"] },
      { title: "File I/O & Modules", description: "Reading/writing files, importing libraries", level: "intermediate", subtopics: ["open() & with", "Reading CSV files", "import & from", "Creating modules"] },
      { title: "Error Handling", description: "try/except, raising exceptions, debugging", level: "intermediate", subtopics: ["try/except blocks", "Custom exceptions", "finally clause", "Debugging with pdb"] },
      { title: "Object-Oriented Programming", description: "Classes, objects, inheritance, polymorphism", level: "intermediate", subtopics: ["Classes & __init__", "Methods & self", "Inheritance", "Magic methods"] },
      { title: "List Comprehensions & Generators", description: "Pythonic patterns for efficient code", level: "intermediate", subtopics: ["List comprehensions", "Dict comprehensions", "Generator functions", "yield keyword"] },
      { title: "Working with APIs", description: "HTTP requests, JSON parsing, REST APIs", level: "intermediate", subtopics: ["requests library", "JSON handling", "API authentication", "Error handling"] },
      { title: "Decorators & Context Managers", description: "Advanced function patterns", level: "advanced", subtopics: ["Function decorators", "@property", "Context managers", "with statement internals"] },
      { title: "Concurrency", description: "Threading, multiprocessing, async/await", level: "advanced", subtopics: ["Threading basics", "multiprocessing", "asyncio", "Event loops"] },
      { title: "Testing", description: "Unit tests, pytest, test-driven development", level: "advanced", subtopics: ["unittest module", "pytest basics", "Mocking", "Test coverage"] },
      { title: "Package Management & Deployment", description: "pip, virtualenv, packaging your code", level: "advanced", subtopics: ["Virtual environments", "requirements.txt", "setuptools", "Publishing to PyPI"] },
      { title: "Python Project: Build a CLI Tool", description: "Capstone project combining all concepts", level: "advanced", subtopics: ["Project planning", "argparse", "Packaging", "Documentation"] },
    ],
  },
  javascript: {
    topics: [
      { title: "JavaScript Fundamentals", description: "Variables, data types, operators", level: "beginner", subtopics: ["let/const/var", "Primitive types", "Operators", "Type coercion"] },
      { title: "Control Flow & Loops", description: "Conditionals, for/while, switch statements", level: "beginner", subtopics: ["if/else", "for & while", "switch", "Ternary operator"] },
      { title: "Functions & Scope", description: "Function declarations, arrow functions, closures", level: "beginner", subtopics: ["Function declarations", "Arrow functions", "Scope chain", "Closures basics"] },
      { title: "Arrays & Objects", description: "Core data structures in JavaScript", level: "beginner", subtopics: ["Array methods", "Object literals", "Destructuring", "Spread operator"] },
      { title: "DOM Manipulation", description: "Selecting, creating, and modifying HTML elements", level: "beginner", subtopics: ["querySelector", "Event listeners", "Creating elements", "Modifying styles"] },
      { title: "Asynchronous JavaScript", description: "Callbacks, promises, async/await", level: "intermediate", subtopics: ["Callback pattern", "Promise basics", "async/await", "Error handling"] },
      { title: "ES6+ Features", description: "Modern JavaScript syntax and patterns", level: "intermediate", subtopics: ["Template literals", "Modules (import/export)", "Classes", "Symbols & iterators"] },
      { title: "Working with APIs", description: "fetch, REST APIs, handling JSON", level: "intermediate", subtopics: ["fetch API", "Headers & methods", "JSON parsing", "CORS"] },
      { title: "Error Handling & Debugging", description: "try/catch, debugging tools, error types", level: "intermediate", subtopics: ["try/catch/finally", "Custom errors", "DevTools debugger", "Console methods"] },
      { title: "Functional Programming", description: "map, filter, reduce, immutability", level: "intermediate", subtopics: ["Pure functions", "map & filter", "reduce", "Immutable patterns"] },
      { title: "Advanced Closures & Patterns", description: "Module pattern, IIFE, currying", level: "advanced", subtopics: ["Module pattern", "Currying", "Memoization", "Proxy & Reflect"] },
      { title: "TypeScript Basics", description: "Adding types to JavaScript", level: "advanced", subtopics: ["Type annotations", "Interfaces", "Generics", "Type guards"] },
      { title: "Testing JavaScript", description: "Unit testing with Jest, TDD approach", level: "advanced", subtopics: ["Jest setup", "Writing tests", "Mocking", "TDD workflow"] },
      { title: "Build Tools & Bundlers", description: "npm, Vite, webpack basics", level: "advanced", subtopics: ["npm scripts", "Vite setup", "Bundling", "Environment variables"] },
      { title: "JS Project: Interactive Web App", description: "Build a complete interactive application", level: "advanced", subtopics: ["Planning", "API integration", "State management", "Deployment"] },
    ],
  },
  react: {
    topics: [
      { title: "React Fundamentals", description: "JSX, components, and rendering", level: "beginner", subtopics: ["What is React", "JSX syntax", "Components", "Rendering"] },
      { title: "Props & State", description: "Passing data and managing component state", level: "beginner", subtopics: ["Props basics", "useState hook", "State updates", "Lifting state"] },
      { title: "Event Handling", description: "Handling user interactions in React", level: "beginner", subtopics: ["onClick/onChange", "Form handling", "Synthetic events", "Event delegation"] },
      { title: "Conditional Rendering & Lists", description: "Dynamic UI based on data", level: "beginner", subtopics: ["Ternary in JSX", "&& operator", "map() for lists", "Keys"] },
      { title: "useEffect & Side Effects", description: "Data fetching, subscriptions, cleanup", level: "beginner", subtopics: ["useEffect basics", "Dependency array", "Cleanup functions", "Fetching data"] },
      { title: "React Router", description: "Client-side routing and navigation", level: "intermediate", subtopics: ["Route setup", "Link & NavLink", "URL parameters", "Nested routes"] },
      { title: "Forms & Validation", description: "Controlled components, form libraries", level: "intermediate", subtopics: ["Controlled inputs", "Form submission", "Validation", "React Hook Form"] },
      { title: "Context API", description: "Global state without prop drilling", level: "intermediate", subtopics: ["createContext", "useContext", "Provider pattern", "When to use"] },
      { title: "Custom Hooks", description: "Extracting and reusing logic", level: "intermediate", subtopics: ["Creating hooks", "Rules of hooks", "Composing hooks", "Common patterns"] },
      { title: "Performance Optimization", description: "memo, useMemo, useCallback", level: "intermediate", subtopics: ["React.memo", "useMemo", "useCallback", "Profiler"] },
      { title: "Advanced State Management", description: "useReducer, Zustand, or Redux patterns", level: "advanced", subtopics: ["useReducer", "Redux concepts", "Zustand", "State machines"] },
      { title: "Server State with React Query", description: "Caching, mutations, optimistic updates", level: "advanced", subtopics: ["useQuery", "useMutation", "Cache invalidation", "Optimistic updates"] },
      { title: "Testing React Apps", description: "React Testing Library, integration tests", level: "advanced", subtopics: ["RTL basics", "User events", "Async testing", "Mocking APIs"] },
      { title: "Accessibility & Best Practices", description: "ARIA, semantic HTML, a11y testing", level: "advanced", subtopics: ["Semantic HTML", "ARIA attributes", "Keyboard navigation", "a11y testing"] },
      { title: "React Project: Full App", description: "Build a complete React application", level: "advanced", subtopics: ["Architecture", "API integration", "Auth flow", "Deployment"] },
    ],
  },
  cooking: {
    topics: [
      { title: "Kitchen Basics & Safety", description: "Essential equipment, food safety, and kitchen setup", level: "beginner", subtopics: ["Must-have tools", "Food safety & hygiene", "Knife handling basics", "Organizing your kitchen"] },
      { title: "Knife Skills", description: "Cutting techniques every cook needs to know", level: "beginner", subtopics: ["Holding a knife", "Dicing & mincing", "Julienne & chiffonade", "Sharpening basics"] },
      { title: "Cooking Methods", description: "Boiling, sautéing, roasting, and more", level: "beginner", subtopics: ["Boiling & simmering", "Sautéing & pan-frying", "Roasting & baking", "Grilling basics"] },
      { title: "Flavor Foundations", description: "Seasoning, herbs, spices, and balancing taste", level: "beginner", subtopics: ["Salt & acid", "Common herbs & spices", "Building flavor layers", "Tasting as you cook"] },
      { title: "Simple Meals", description: "Cook complete, nutritious meals from scratch", level: "beginner", subtopics: ["Pasta dishes", "Stir-fries", "Soups & stews", "Salads & dressings"] },
      { title: "Sauces & Stocks", description: "Mother sauces, pan sauces, and homemade stocks", level: "intermediate", subtopics: ["Chicken & vegetable stock", "Béchamel & tomato sauce", "Pan sauce technique", "Emulsions & vinaigrettes"] },
      { title: "Baking Fundamentals", description: "Understanding dough, pastry, and leavening", level: "intermediate", subtopics: ["Flour types & gluten", "Yeast vs baking powder", "Basic bread recipe", "Cookie & cake basics"] },
      { title: "Protein Mastery", description: "Cooking meat, fish, and plant-based proteins", level: "intermediate", subtopics: ["Internal temperatures", "Searing technique", "Fish & seafood", "Tofu & legumes"] },
      { title: "World Cuisines", description: "Explore Italian, Asian, Mexican, and more", level: "intermediate", subtopics: ["Italian fundamentals", "Asian stir-fry & curry", "Mexican flavors", "Mediterranean cooking"] },
      { title: "Meal Planning & Prep", description: "Efficient cooking, batch prep, and budgeting", level: "intermediate", subtopics: ["Weekly planning", "Batch cooking", "Grocery budgeting", "Storage & reheating"] },
      { title: "Advanced Techniques", description: "Sous vide, fermentation, smoking", level: "advanced", subtopics: ["Sous vide basics", "Fermentation at home", "Smoking & curing", "Dehydration"] },
      { title: "Pastry & Desserts", description: "Pies, tarts, custards, and chocolate work", level: "advanced", subtopics: ["Pie & tart dough", "Custards & creams", "Chocolate tempering", "Plated desserts"] },
      { title: "Food Presentation", description: "Plating, garnishing, and food photography", level: "advanced", subtopics: ["Plating principles", "Color & texture", "Garnishing techniques", "Food photography tips"] },
      { title: "Hosting & Menu Design", description: "Plan menus, host dinner parties, pair wines", level: "advanced", subtopics: ["Menu composition", "Wine & beverage pairing", "Timing multiple dishes", "Hosting tips"] },
      { title: "Capstone: Host a Dinner Party", description: "Plan, cook, and serve a multi-course meal", level: "advanced", subtopics: ["Menu planning", "Prep timeline", "Cooking execution", "Presentation & service"] },
    ],
  },
  llm: {
    topics: [
      { title: "What Are LLMs?", description: "Understanding large language models and their capabilities", level: "beginner", subtopics: ["History of NLP to LLMs", "How LLMs work (high-level)", "Key models (GPT, Claude, Gemini, LLaMA)", "Use cases & limitations"] },
      { title: "Prompt Engineering Basics", description: "Writing effective prompts to get great outputs", level: "beginner", subtopics: ["Zero-shot vs few-shot", "Instruction clarity", "System prompts", "Temperature & top-p"] },
      { title: "Working with LLM APIs", description: "Calling OpenAI, Anthropic, and other APIs", level: "beginner", subtopics: ["API keys & authentication", "Chat completions endpoint", "Streaming responses", "Error handling & rate limits"] },
      { title: "Tokens & Context Windows", description: "Understanding tokenization, costs, and context limits", level: "beginner", subtopics: ["What are tokens", "Counting tokens", "Context window sizes", "Cost optimization"] },
      { title: "Advanced Prompt Techniques", description: "Chain-of-thought, structured output, and more", level: "beginner", subtopics: ["Chain-of-thought reasoning", "JSON/structured output", "Role-playing prompts", "Prompt chaining"] },
      { title: "Retrieval-Augmented Generation (RAG)", description: "Combining LLMs with external knowledge", level: "intermediate", subtopics: ["Vector embeddings", "Vector databases (Pinecone, Chroma)", "Chunking strategies", "RAG pipeline architecture"] },
      { title: "LangChain & Frameworks", description: "Building LLM applications with frameworks", level: "intermediate", subtopics: ["LangChain basics", "Chains & agents", "Memory management", "Tool use & function calling"] },
      { title: "Fine-Tuning LLMs", description: "Customizing models for specific tasks", level: "intermediate", subtopics: ["When to fine-tune", "Training data preparation", "LoRA & QLoRA", "Evaluation metrics"] },
      { title: "Building AI Agents", description: "Autonomous agents that plan, reason, and act", level: "intermediate", subtopics: ["Agent architecture", "Tool use & function calling", "Planning & reasoning", "Memory & state management"] },
      { title: "Evaluation & Testing", description: "Measuring LLM quality and reliability", level: "intermediate", subtopics: ["Evaluation frameworks", "Human evaluation", "Automated benchmarks", "Prompt regression testing"] },
      { title: "Production Deployment", description: "Deploying LLM apps at scale", level: "advanced", subtopics: ["API gateway design", "Caching strategies", "Cost management", "Latency optimization"] },
      { title: "Safety & Alignment", description: "Responsible AI, guardrails, and content filtering", level: "advanced", subtopics: ["RLHF concepts", "Content moderation", "Prompt injection defense", "Bias detection"] },
      { title: "Multi-Modal Models", description: "Working with vision, audio, and text together", level: "advanced", subtopics: ["Vision-language models", "Audio transcription", "Image generation", "Multi-modal pipelines"] },
      { title: "Open Source LLMs", description: "Running and deploying open models locally", level: "advanced", subtopics: ["Ollama & vLLM", "Model quantization", "GPU requirements", "Local deployment"] },
      { title: "LLM Project: Build an AI Assistant", description: "End-to-end AI application with RAG and agents", level: "advanced", subtopics: ["Architecture design", "RAG implementation", "Agent orchestration", "User interface & deployment"] },
    ],
  },
  "data analysis": {
    topics: [
      { title: "Introduction to Data Analysis", description: "What data analysts do and why it matters", level: "beginner", subtopics: ["Role of a data analyst", "Types of data", "Analytical thinking", "Data-driven decisions"] },
      { title: "Spreadsheet Mastery", description: "Excel and Google Sheets for data work", level: "beginner", subtopics: ["Formulas & functions", "Pivot tables", "Charts & visualization", "Data cleaning in sheets"] },
      { title: "SQL Fundamentals", description: "Querying databases to extract insights", level: "beginner", subtopics: ["SELECT & WHERE", "JOIN operations", "GROUP BY & aggregation", "Subqueries"] },
      { title: "Statistics Essentials", description: "Core statistics every analyst needs", level: "beginner", subtopics: ["Mean, median, mode", "Standard deviation", "Distributions", "Correlation vs causation"] },
      { title: "Data Cleaning", description: "Handling messy, incomplete, and inconsistent data", level: "beginner", subtopics: ["Missing values", "Outlier detection", "Data type issues", "Deduplication"] },
      { title: "Python for Analysis", description: "Using pandas, NumPy for data manipulation", level: "intermediate", subtopics: ["pandas DataFrames", "Data filtering & grouping", "NumPy operations", "Merging datasets"] },
      { title: "Data Visualization", description: "Creating compelling charts and dashboards", level: "intermediate", subtopics: ["Matplotlib & Seaborn", "Chart types & when to use", "Dashboard design", "Storytelling with data"] },
      { title: "Advanced SQL", description: "Window functions, CTEs, and optimization", level: "intermediate", subtopics: ["Window functions", "Common Table Expressions", "Query optimization", "Database indexing"] },
      { title: "Business Intelligence Tools", description: "Tableau, Power BI, and Looker", level: "intermediate", subtopics: ["Tool comparison", "Building dashboards", "Calculated fields", "Publishing & sharing"] },
      { title: "A/B Testing & Experimentation", description: "Designing and analyzing experiments", level: "intermediate", subtopics: ["Hypothesis testing", "Sample size calculation", "Statistical significance", "Interpreting results"] },
      { title: "Machine Learning for Analysts", description: "Predictive models without deep ML knowledge", level: "advanced", subtopics: ["Regression basics", "Classification intro", "Scikit-learn", "Model evaluation"] },
      { title: "Time Series Analysis", description: "Analyzing trends, seasonality, and forecasting", level: "advanced", subtopics: ["Trend decomposition", "Moving averages", "ARIMA basics", "Forecasting"] },
      { title: "Data Pipeline & Automation", description: "Automating reports and data workflows", level: "advanced", subtopics: ["ETL concepts", "Scheduling jobs", "Python automation", "API data ingestion"] },
      { title: "Communication & Storytelling", description: "Presenting findings to stakeholders", level: "advanced", subtopics: ["Executive summaries", "Slide design", "Handling questions", "Actionable recommendations"] },
      { title: "Capstone: End-to-End Analysis", description: "Complete a real analysis project from question to presentation", level: "advanced", subtopics: ["Define the question", "Gather & clean data", "Analyze & visualize", "Present findings"] },
    ],
  },
};

const SKILL_ALIASES: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  typescript: "javascript",
  "node.js": "javascript",
  nodejs: "javascript",
  node: "javascript",
  py: "python",
  "react.js": "react",
  reactjs: "react",
  "ui design": "ui-design",
  "ux design": "ui-design",
  "ui/ux": "ui-design",
  html: "web-fundamentals",
  css: "web-fundamentals",
  "html/css": "web-fundamentals",
  "large language models": "llm",
  "large language model": "llm",
  llms: "llm",
  chatgpt: "llm",
  gpt: "llm",
  "prompt engineering": "llm",
  "ai engineering": "llm",
  "data analyst": "data analysis",
  "data analytics": "data analysis",
  "business analysis": "data analysis",
  "business analytics": "data analysis",
};

const DEFAULT_TEMPLATE: SkillTemplate = {
  topics: [
    { title: "Introduction & Setup", description: "Overview, tools, and environment setup", level: "beginner", subtopics: ["What it is", "Why learn it", "Setting up tools", "Your first exercise"] },
    { title: "Core Fundamentals", description: "Essential building blocks and concepts", level: "beginner", subtopics: ["Key terminology", "Basic operations", "Common patterns", "Hands-on practice"] },
    { title: "Basic Techniques", description: "Foundational skills and methods", level: "beginner", subtopics: ["Technique 1", "Technique 2", "When to apply", "Practice exercises"] },
    { title: "Working with Data", description: "Managing and manipulating information", level: "beginner", subtopics: ["Data formats", "Input/output", "Transformation", "Validation"] },
    { title: "Problem Solving", description: "Applying knowledge to solve real problems", level: "beginner", subtopics: ["Breaking down problems", "Solution strategies", "Common pitfalls", "Practice problems"] },
    { title: "Intermediate Concepts", description: "Building on fundamentals with deeper knowledge", level: "intermediate", subtopics: ["Advanced patterns", "Efficiency", "Integration", "Real examples"] },
    { title: "Tools & Workflow", description: "Professional tools and efficient workflows", level: "intermediate", subtopics: ["Essential tools", "Automation", "Version control", "Collaboration"] },
    { title: "Best Practices", description: "Industry standards and quality guidelines", level: "intermediate", subtopics: ["Standards", "Documentation", "Review process", "Maintenance"] },
    { title: "Real-world Applications", description: "Applying skills in practical scenarios", level: "intermediate", subtopics: ["Case study 1", "Case study 2", "Portfolio building", "Client work"] },
    { title: "Testing & Quality", description: "Ensuring reliability and correctness", level: "intermediate", subtopics: ["Testing methods", "Quality metrics", "Debugging", "Continuous improvement"] },
    { title: "Advanced Techniques", description: "Expert-level methods and patterns", level: "advanced", subtopics: ["Advanced pattern 1", "Advanced pattern 2", "Optimization", "Edge cases"] },
    { title: "Performance & Optimization", description: "Making things efficient and scalable", level: "advanced", subtopics: ["Profiling", "Bottlenecks", "Optimization strategies", "Benchmarking"] },
    { title: "Architecture & Design", description: "System-level thinking and planning", level: "advanced", subtopics: ["Design principles", "Architecture patterns", "Scalability", "Trade-offs"] },
    { title: "Professional Development", description: "Career skills and industry knowledge", level: "advanced", subtopics: ["Portfolio", "Networking", "Interviews", "Continuous learning"] },
    { title: "Capstone Project", description: "Comprehensive project combining all skills", level: "advanced", subtopics: ["Planning", "Implementation", "Testing", "Presentation"] },
  ],
};

export function getSkillTemplate(skillName: string): SkillTemplate {
  const normalized = skillName.toLowerCase().trim();
  const aliased = SKILL_ALIASES[normalized] || normalized;
  return KNOWN_SKILLS[aliased] || DEFAULT_TEMPLATE;
}

export function getTopicsForSkill(skillName: string, level: SkillLevel): TopicTemplate[] {
  const template = getSkillTemplate(skillName);
  const startIndex = level === "beginner" ? 0 : level === "intermediate" ? 5 : 10;
  return template.topics.slice(startIndex);
}

export const KNOWN_SKILL_CATEGORIES = [
  // Programming & Tech
  "Python", "JavaScript", "TypeScript", "React", "Vue", "Angular", "Node.js",
  "Java", "C++", "C#", "Go", "Rust", "Swift", "Kotlin", "Ruby", "PHP",
  "SQL", "MongoDB", "PostgreSQL", "Redis",
  "HTML", "CSS", "Tailwind CSS", "Sass",
  "Docker", "Kubernetes", "AWS", "Azure", "GCP",
  "Git", "Linux", "DevOps", "CI/CD",
  "Django", "Flask", "Express.js", "Next.js", "Svelte",
  "GraphQL", "REST API", "Microservices",
  "Mobile Development", "Flutter", "React Native",
  "Game Development", "Unity", "Unreal Engine",
  "Blockchain", "Web3", "Solidity",
  "Cloud DevOps", "Terraform", "Ansible",
  // AI & Data
  "LLM", "Data Science", "Machine Learning", "AI", "Deep Learning",
  "Data Analysis", "Statistics", "R", "Pandas",
  "Power BI", "Tableau", "Excel",
  "Prompt Engineering", "Computer Vision", "NLP",
  // Design
  "UI Design", "UX Design", "Figma", "Adobe XD",
  "Photoshop", "Illustrator", "Canva",
  "Graphic Design", "3D Modeling", "Motion Graphics",
  // Business & Marketing
  "Marketing", "SEO", "Content Writing", "Copywriting",
  "Project Management", "Agile", "Scrum",
  "Cybersecurity", "Networking", "System Administration",
  "Product Management", "Business Strategy", "Entrepreneurship",
  "Sales", "Negotiation", "Public Speaking",
  // Creative
  "Photography", "Video Editing", "Music Production",
  "Drawing", "Painting", "Digital Art",
  "Creative Writing", "Screenwriting", "Podcasting",
  "Animation", "Film Making",
  // Lifestyle & Practical
  "Cooking", "Baking", "Nutrition",
  "Fitness", "Yoga", "Meditation",
  "Personal Finance", "Investing", "Cryptocurrency",
  "Gardening", "Interior Design", "Fashion Design",
  // Languages
  "English", "Spanish", "French", "German", "Japanese",
  "Chinese", "Korean", "Arabic", "Hindi", "Portuguese",
  "Italian", "Russian", "Sign Language",
  // Science & Academic
  "Mathematics", "Physics", "Chemistry", "Biology",
  "Psychology", "Philosophy", "Economics",
  "History", "Geography", "Political Science",
];

const SKILL_NAME_CLEAN_REGEX = /[.\s/-]/g;

const PREPARED_SKILL_CATEGORIES = KNOWN_SKILL_CATEGORIES.map(skill => {
  const lower = skill.toLowerCase();
  return {
    original: skill,
    lower,
    clean: lower.replace(SKILL_NAME_CLEAN_REGEX, "")
  };
});

// ⚡ Bolt: Global buffer to avoid array allocations inside the Levenshtein function.
// Since JS is single-threaded, this is safe and prevents GC pauses during hot search loops.
const levBuffer = new Uint16Array(100);

function levenshtein(a: string, b: string): number {
  if (a.length < b.length) [a, b] = [b, a];
  const m = a.length, n = b.length;
  if (n === 0) return m;

  // ⚡ Bolt: Prevent silent array-out-of-bounds corruption if string exceeds buffer size.
  // We use max string length 99 (length=100 array). Fallback for larger strings.
  if (n >= 100) return Math.max(m, n);

  for (let i = 0; i <= n; i++) {
    levBuffer[i] = i;
  }

  for (let i = 1; i <= m; i++) {
    let prevDiag = levBuffer[0];
    levBuffer[0] = i;
    for (let j = 1; j <= n; j++) {
      const prevDiagTemp = levBuffer[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const min = levBuffer[j] + 1 < levBuffer[j - 1] + 1 ? levBuffer[j] + 1 : levBuffer[j - 1] + 1;
      levBuffer[j] = min < prevDiag + cost ? min : prevDiag + cost;
      prevDiag = prevDiagTemp;
    }
  }
  return levBuffer[n];
}

/**
 * Normalize a skill name to its proper display form.
 * Accepts ANY skill — returns the proper-cased version if known,
 * or title-cased input if unknown (never rejects).
 */
export function normalizeSkillName(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (trimmed.length < 2) return null;
  const lower = trimmed.toLowerCase();
  const clean = lower.replace(SKILL_NAME_CLEAN_REGEX, "");

  if (lower in SKILL_ALIASES) {
    const aliasKey = SKILL_ALIASES[lower];
    const aliasKeyClean = aliasKey.replace(SKILL_NAME_CLEAN_REGEX, "");
    const match = PREPARED_SKILL_CATEGORIES.find(
      (s) => s.lower === aliasKey || s.clean === aliasKeyClean
    );
    return match ? match.original : aliasKey.charAt(0).toUpperCase() + aliasKey.slice(1);
  }

  const exact = PREPARED_SKILL_CATEGORIES.find((s) => s.lower === lower);
  if (exact) return exact.original;

  let bestMatch: string | null = null;
  let bestDist = Infinity;

  for (const skillObj of PREPARED_SKILL_CATEGORIES) {
    const dist = levenshtein(lower, skillObj.lower);
    const distClean = levenshtein(clean, skillObj.clean);
    const minDist = Math.min(dist, distClean);
    if (minDist < bestDist) {
      bestDist = minDist;
      bestMatch = skillObj.original;
    }
  }

  const threshold = lower.length > 6 ? 3 : 2;
  if (bestMatch && bestDist <= threshold) {
    return bestMatch;
  }

  // Accept ANY skill — title-case what the user typed
  return trimmed
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function findMatchingSkills(input: string): string[] {
  const normalized = input.toLowerCase().trim();
  if (normalized.length < 2) return [];
  const clean = normalized.replace(SKILL_NAME_CLEAN_REGEX, "");

  // ⚡ Bolt: Single-pass loops to replace chained `.filter().map()` operations, avoiding
  // intermediate array allocations.
  const substringMatches: string[] = [];
  for (let i = 0; i < PREPARED_SKILL_CATEGORIES.length; i++) {
    const skillObj = PREPARED_SKILL_CATEGORIES[i];
    if (skillObj.lower.includes(normalized) || normalized.includes(skillObj.lower)) {
      substringMatches.push(skillObj.original);
      // ⚡ Bolt: Early exit when max result limit is hit to avoid unnecessary checking.
      if (substringMatches.length >= 8) return substringMatches;
    }
  }

  // ⚡ Bolt: If substring matches are found, we return immediately to skip expensive fuzzy matching.
  if (substringMatches.length > 0) return substringMatches;

  const fuzzy: { skill: string; dist: number }[] = [];
  for (let i = 0; i < PREPARED_SKILL_CATEGORIES.length; i++) {
    const skillObj = PREPARED_SKILL_CATEGORIES[i];
    const dist1 = levenshtein(normalized, skillObj.lower);
    const dist2 = levenshtein(clean, skillObj.clean);
    const dist = dist1 < dist2 ? dist1 : dist2;
    if (dist <= 3) {
      fuzzy.push({ skill: skillObj.original, dist });
    }
  }

  fuzzy.sort((a, b) => a.dist - b.dist);
  const result: string[] = [];
  const limit = fuzzy.length < 8 ? fuzzy.length : 8;
  for (let i = 0; i < limit; i++) {
    result.push(fuzzy[i].skill);
  }
  return result;
}

export function isValidSkill(input: string): boolean {
  return normalizeSkillName(input) !== null;
}

export type SkillCategory = "coding" | "design" | "data" | "marketing" | "devops" | "creative" | "lifestyle" | "language" | "science" | "business" | "general";

const SKILL_CATEGORY_MAP: Record<string, SkillCategory> = {
  python: "coding", javascript: "coding", typescript: "coding", react: "coding",
  vue: "coding", angular: "coding", "node.js": "coding", java: "coding",
  "c++": "coding", "c#": "coding", go: "coding", rust: "coding", swift: "coding",
  kotlin: "coding", ruby: "coding", php: "coding", django: "coding", flask: "coding",
  "express.js": "coding", "next.js": "coding", svelte: "coding", flutter: "coding",
  "react native": "coding", "mobile development": "coding", "game development": "coding",
  unity: "coding", "unreal engine": "coding", solidity: "coding",
  html: "coding", css: "coding", "tailwind css": "coding", sass: "coding",
  blockchain: "coding", web3: "coding", "rest api": "coding",
  sql: "data", mongodb: "data", postgresql: "data", redis: "data",
  "data science": "data", "machine learning": "data", ai: "data", "deep learning": "data",
  "data analysis": "data", statistics: "data", r: "data", pandas: "data",
  "power bi": "data", tableau: "data", excel: "data", graphql: "data",
  llm: "data", "prompt engineering": "data", "computer vision": "data", nlp: "data",
  "ui design": "design", "ux design": "design", figma: "design", "adobe xd": "design",
  photoshop: "design", illustrator: "design", canva: "design",
  "graphic design": "design", "3d modeling": "design", "motion graphics": "design",
  marketing: "marketing", seo: "marketing", "content writing": "marketing", copywriting: "marketing",
  docker: "devops", kubernetes: "devops", aws: "devops", azure: "devops", gcp: "devops",
  git: "devops", linux: "devops", devops: "devops", "ci/cd": "devops",
  "cloud devops": "devops", terraform: "devops", ansible: "devops",
  cybersecurity: "devops", networking: "devops", "system administration": "devops", microservices: "devops",
  photography: "creative", "video editing": "creative", "music production": "creative",
  drawing: "creative", painting: "creative", "digital art": "creative",
  "creative writing": "creative", screenwriting: "creative", podcasting: "creative",
  animation: "creative", "film making": "creative",
  cooking: "lifestyle", baking: "lifestyle", nutrition: "lifestyle",
  fitness: "lifestyle", yoga: "lifestyle", meditation: "lifestyle",
  "personal finance": "lifestyle", investing: "lifestyle", cryptocurrency: "lifestyle",
  gardening: "lifestyle", "interior design": "lifestyle", "fashion design": "lifestyle",
  english: "language", spanish: "language", french: "language", german: "language",
  japanese: "language", chinese: "language", korean: "language", arabic: "language",
  hindi: "language", portuguese: "language", italian: "language", russian: "language",
  "sign language": "language",
  mathematics: "science", physics: "science", chemistry: "science", biology: "science",
  psychology: "science", philosophy: "science", economics: "science",
  history: "science", geography: "science", "political science": "science",
  "product management": "business", "business strategy": "business", entrepreneurship: "business",
  sales: "business", negotiation: "business", "public speaking": "business",
  "project management": "business", agile: "business", scrum: "business",
};

export function getSkillCategory(skillName: string): SkillCategory {
  return SKILL_CATEGORY_MAP[skillName.toLowerCase()] || "general";
}

export interface ProjectTemplate {
  title: string;
  desc: string;
  difficulty: SkillLevel;
  minProgress: number;
}

const PROJECT_TEMPLATES: Record<SkillCategory, ProjectTemplate[]> = {
  coding: [
    { title: "Build a Personal Portfolio", desc: "Create a responsive portfolio showcasing your work", difficulty: "beginner", minProgress: 0 },
    { title: "Calculator App", desc: "Build a functional calculator with proper logic", difficulty: "beginner", minProgress: 10 },
    { title: "Todo App with Persistence", desc: "Create a task manager with data storage", difficulty: "intermediate", minProgress: 30 },
    { title: "API-Powered Dashboard", desc: "Connect to a real API and display live data", difficulty: "intermediate", minProgress: 50 },
    { title: "Full-Stack App", desc: "Build a complete app with frontend and backend", difficulty: "advanced", minProgress: 70 },
    { title: "Open Source Contribution", desc: "Contribute to a real open source project", difficulty: "advanced", minProgress: 85 },
  ],
  design: [
    { title: "Redesign a Landing Page", desc: "Redesign an existing website landing page", difficulty: "beginner", minProgress: 0 },
    { title: "Mobile App Mockup", desc: "Design a complete mobile app UI in Figma", difficulty: "beginner", minProgress: 10 },
    { title: "Design System", desc: "Create a reusable component library", difficulty: "intermediate", minProgress: 30 },
    { title: "E-Commerce UI Kit", desc: "Design a full e-commerce shopping experience", difficulty: "intermediate", minProgress: 50 },
    { title: "Brand Identity Project", desc: "Create a complete brand identity package", difficulty: "advanced", minProgress: 70 },
    { title: "Design Case Study", desc: "Document a full UX research and design process", difficulty: "advanced", minProgress: 85 },
  ],
  data: [
    { title: "Data Cleaning Exercise", desc: "Clean and prepare a messy dataset for analysis", difficulty: "beginner", minProgress: 0 },
    { title: "Exploratory Data Analysis", desc: "Analyze a dataset and find key insights", difficulty: "beginner", minProgress: 10 },
    { title: "Interactive Dashboard", desc: "Build an interactive data visualization dashboard", difficulty: "intermediate", minProgress: 30 },
    { title: "Predictive Model", desc: "Build a machine learning model to make predictions", difficulty: "intermediate", minProgress: 50 },
    { title: "End-to-End Pipeline", desc: "Build a complete data pipeline from ingestion to visualization", difficulty: "advanced", minProgress: 70 },
    { title: "Kaggle Competition", desc: "Compete in a real data science competition", difficulty: "advanced", minProgress: 85 },
  ],
  marketing: [
    { title: "Competitor Analysis", desc: "Analyze 3 competitors and identify opportunities", difficulty: "beginner", minProgress: 0 },
    { title: "Content Calendar", desc: "Create a 30-day content strategy and calendar", difficulty: "beginner", minProgress: 10 },
    { title: "SEO Audit", desc: "Perform a complete SEO audit of a website", difficulty: "intermediate", minProgress: 30 },
    { title: "Campaign Strategy", desc: "Plan and document a multi-channel marketing campaign", difficulty: "intermediate", minProgress: 50 },
    { title: "Analytics Dashboard", desc: "Set up tracking and create a marketing analytics report", difficulty: "advanced", minProgress: 70 },
    { title: "Growth Case Study", desc: "Document a complete growth strategy with metrics", difficulty: "advanced", minProgress: 85 },
  ],
  devops: [
    { title: "Local Dev Environment", desc: "Set up a containerized development environment", difficulty: "beginner", minProgress: 0 },
    { title: "CI/CD Pipeline", desc: "Create an automated build and deploy pipeline", difficulty: "beginner", minProgress: 10 },
    { title: "Infrastructure as Code", desc: "Define and deploy infrastructure using code", difficulty: "intermediate", minProgress: 30 },
    { title: "Monitoring & Alerting", desc: "Set up monitoring, logging, and alerting", difficulty: "intermediate", minProgress: 50 },
    { title: "Multi-Environment Setup", desc: "Create dev/staging/production environments", difficulty: "advanced", minProgress: 70 },
    { title: "Disaster Recovery Plan", desc: "Design and test a disaster recovery strategy", difficulty: "advanced", minProgress: 85 },
  ],
  creative: [
    { title: "Daily Practice Challenge", desc: "Complete a 7-day creative challenge", difficulty: "beginner", minProgress: 0 },
    { title: "Study the Masters", desc: "Analyze and recreate work from experts in your field", difficulty: "beginner", minProgress: 10 },
    { title: "Create a Series", desc: "Produce a cohesive collection of 5+ related works", difficulty: "intermediate", minProgress: 30 },
    { title: "Collaborate with Others", desc: "Partner with another creative on a joint project", difficulty: "intermediate", minProgress: 50 },
    { title: "Publish Your Work", desc: "Share your work on a public platform or exhibition", difficulty: "advanced", minProgress: 70 },
    { title: "Teach a Workshop", desc: "Design and deliver a workshop in your craft", difficulty: "advanced", minProgress: 85 },
  ],
  lifestyle: [
    { title: "Starter Challenge", desc: "Complete a structured 7-day beginner challenge", difficulty: "beginner", minProgress: 0 },
    { title: "Build a Routine", desc: "Establish a consistent daily practice", difficulty: "beginner", minProgress: 10 },
    { title: "Track Your Progress", desc: "Document improvements with photos, notes, or data", difficulty: "intermediate", minProgress: 30 },
    { title: "Intermediate Challenge", desc: "Take on a more ambitious 30-day goal", difficulty: "intermediate", minProgress: 50 },
    { title: "Share Your Knowledge", desc: "Create content teaching what you've learned", difficulty: "advanced", minProgress: 70 },
    { title: "Master Project", desc: "Complete an ambitious project showcasing expertise", difficulty: "advanced", minProgress: 85 },
  ],
  language: [
    { title: "Learn 50 Common Words", desc: "Build your first vocabulary foundation", difficulty: "beginner", minProgress: 0 },
    { title: "Basic Conversations", desc: "Practice greetings and simple exchanges", difficulty: "beginner", minProgress: 10 },
    { title: "Write a Short Story", desc: "Compose a simple story using what you've learned", difficulty: "intermediate", minProgress: 30 },
    { title: "Have a Real Conversation", desc: "Speak with a native speaker for 10+ minutes", difficulty: "intermediate", minProgress: 50 },
    { title: "Watch Media Without Subtitles", desc: "Understand a movie or show in the target language", difficulty: "advanced", minProgress: 70 },
    { title: "Write an Essay", desc: "Compose a structured essay on a complex topic", difficulty: "advanced", minProgress: 85 },
  ],
  science: [
    { title: "Concept Map", desc: "Create a visual map connecting key concepts", difficulty: "beginner", minProgress: 0 },
    { title: "Research Summary", desc: "Summarize a key paper or textbook chapter", difficulty: "beginner", minProgress: 10 },
    { title: "Solve Problem Sets", desc: "Work through intermediate-level exercises", difficulty: "intermediate", minProgress: 30 },
    { title: "Design an Experiment", desc: "Propose a hypothesis and experimental design", difficulty: "intermediate", minProgress: 50 },
    { title: "Literature Review", desc: "Write a review of current research in a sub-topic", difficulty: "advanced", minProgress: 70 },
    { title: "Research Presentation", desc: "Present a complex topic to a general audience", difficulty: "advanced", minProgress: 85 },
  ],
  business: [
    { title: "Industry Analysis", desc: "Research and analyze a market or industry", difficulty: "beginner", minProgress: 0 },
    { title: "SWOT Analysis", desc: "Perform a structured analysis of a real company", difficulty: "beginner", minProgress: 10 },
    { title: "Business Plan Draft", desc: "Write a lean business plan for a concept", difficulty: "intermediate", minProgress: 30 },
    { title: "Stakeholder Presentation", desc: "Create and deliver a professional presentation", difficulty: "intermediate", minProgress: 50 },
    { title: "Strategy Proposal", desc: "Develop a comprehensive strategic recommendation", difficulty: "advanced", minProgress: 70 },
    { title: "Mentor Someone", desc: "Guide a beginner through the fundamentals", difficulty: "advanced", minProgress: 85 },
  ],
  general: [
    { title: "Learning Journal", desc: "Document your learning progress and key takeaways", difficulty: "beginner", minProgress: 0 },
    { title: "Skill Assessment", desc: "Create a self-assessment and identify gaps", difficulty: "beginner", minProgress: 10 },
    { title: "Mini Project", desc: "Apply your knowledge in a focused mini project", difficulty: "intermediate", minProgress: 30 },
    { title: "Case Study Analysis", desc: "Analyze a real-world case study in your field", difficulty: "intermediate", minProgress: 50 },
    { title: "Teach Someone", desc: "Create a tutorial or workshop for others", difficulty: "advanced", minProgress: 70 },
    { title: "Portfolio Project", desc: "Build a comprehensive portfolio piece", difficulty: "advanced", minProgress: 85 },
  ],
};

export function getProjectsForSkill(skillName: string): ProjectTemplate[] {
  const category = getSkillCategory(skillName);
  return PROJECT_TEMPLATES[category];
}
