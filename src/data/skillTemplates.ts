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
};

// Additional common skill aliases
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
    { title: "Best Practices", description: "Industry standards and quality guidelines", level: "intermediate", subtopics: ["Code standards", "Documentation", "Review process", "Maintenance"] },
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

// Known skill categories for validation and normalization
export const KNOWN_SKILL_CATEGORIES = [
  "Python", "JavaScript", "TypeScript", "React", "Vue", "Angular", "Node.js",
  "Java", "C++", "C#", "Go", "Rust", "Swift", "Kotlin", "Ruby", "PHP",
  "SQL", "MongoDB", "PostgreSQL", "Redis",
  "HTML", "CSS", "Tailwind CSS", "Sass",
  "Docker", "Kubernetes", "AWS", "Azure", "GCP",
  "Git", "Linux", "DevOps", "CI/CD",
  "UI Design", "UX Design", "Figma", "Adobe XD",
  "Data Science", "Machine Learning", "AI", "Deep Learning",
  "Data Analysis", "Statistics", "R", "Pandas",
  "Marketing", "SEO", "Content Writing", "Copywriting",
  "Project Management", "Agile", "Scrum",
  "Cybersecurity", "Networking", "System Administration",
  "Mobile Development", "Flutter", "React Native",
  "Game Development", "Unity", "Unreal Engine",
  "Blockchain", "Web3", "Solidity",
  "Django", "Flask", "Express.js", "Next.js", "Svelte",
  "GraphQL", "REST API", "Microservices",
  "Power BI", "Tableau", "Excel",
  "Photoshop", "Illustrator", "Canva",
  "Cloud DevOps", "Terraform", "Ansible",
];

// Levenshtein distance for fuzzy matching
function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

/**
 * Normalize a skill name to its proper display form.
 * e.g. "pyhon" → "Python", "devops" → "DevOps", "reactjs" → "React"
 */
export function normalizeSkillName(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const lower = trimmed.toLowerCase();

  // Check aliases first (exact match)
  if (lower in SKILL_ALIASES) {
    const aliasKey = SKILL_ALIASES[lower];
    // Find the proper display name from KNOWN_SKILL_CATEGORIES
    const match = KNOWN_SKILL_CATEGORIES.find(
      (s) => s.toLowerCase() === aliasKey || s.toLowerCase().replace(/[.\s/-]/g, "") === aliasKey.replace(/[.\s/-]/g, "")
    );
    return match || aliasKey.charAt(0).toUpperCase() + aliasKey.slice(1);
  }

  // Exact match in known skills
  const exact = KNOWN_SKILL_CATEGORIES.find((s) => s.toLowerCase() === lower);
  if (exact) return exact;

  // Fuzzy match: try Levenshtein distance ≤ 2 against known skills
  let bestMatch: string | null = null;
  let bestDist = Infinity;

  for (const skill of KNOWN_SKILL_CATEGORIES) {
    const skillLower = skill.toLowerCase();
    const dist = levenshtein(lower, skillLower);
    // Also try without special chars
    const distClean = levenshtein(
      lower.replace(/[.\s/-]/g, ""),
      skillLower.replace(/[.\s/-]/g, "")
    );
    const minDist = Math.min(dist, distClean);
    if (minDist < bestDist) {
      bestDist = minDist;
      bestMatch = skill;
    }
  }

  // Accept fuzzy match if distance ≤ 2 (or ≤ 3 for longer names)
  const threshold = lower.length > 6 ? 3 : 2;
  if (bestMatch && bestDist <= threshold) {
    return bestMatch;
  }

  // No match found
  return null;
}

export function findMatchingSkills(input: string): string[] {
  const normalized = input.toLowerCase().trim();
  if (normalized.length < 2) return [];

  // Exact substring matches first
  const substringMatches = KNOWN_SKILL_CATEGORIES.filter(
    (skill) =>
      skill.toLowerCase().includes(normalized) ||
      normalized.includes(skill.toLowerCase())
  );

  if (substringMatches.length > 0) return substringMatches.slice(0, 5);

  // Fuzzy matches
  const fuzzy = KNOWN_SKILL_CATEGORIES
    .map((skill) => ({
      skill,
      dist: Math.min(
        levenshtein(normalized, skill.toLowerCase()),
        levenshtein(normalized.replace(/[.\s/-]/g, ""), skill.toLowerCase().replace(/[.\s/-]/g, ""))
      ),
    }))
    .filter((x) => x.dist <= 3)
    .sort((a, b) => a.dist - b.dist)
    .map((x) => x.skill);

  return fuzzy.slice(0, 5);
}

export function isValidSkill(input: string): boolean {
  return normalizeSkillName(input) !== null;
}

// Skill-category-aware project mappings
export type SkillCategory = "coding" | "design" | "data" | "marketing" | "devops" | "general";

const SKILL_CATEGORY_MAP: Record<string, SkillCategory> = {
  python: "coding", javascript: "coding", typescript: "coding", react: "coding",
  vue: "coding", angular: "coding", "node.js": "coding", java: "coding",
  "c++": "coding", "c#": "coding", go: "coding", rust: "coding", swift: "coding",
  kotlin: "coding", ruby: "coding", php: "coding", django: "coding", flask: "coding",
  "express.js": "coding", "next.js": "coding", svelte: "coding", flutter: "coding",
  "react native": "coding", "mobile development": "coding", "game development": "coding",
  unity: "coding", "unreal engine": "coding", solidity: "coding",
  sql: "data", mongodb: "data", postgresql: "data", redis: "data",
  "data science": "data", "machine learning": "data", ai: "data", "deep learning": "data",
  "data analysis": "data", statistics: "data", r: "data", pandas: "data",
  "power bi": "data", tableau: "data", excel: "data", graphql: "data",
  "ui design": "design", "ux design": "design", figma: "design", "adobe xd": "design",
  photoshop: "design", illustrator: "design", canva: "design",
  html: "coding", css: "coding", "tailwind css": "coding", sass: "coding",
  marketing: "marketing", seo: "marketing", "content writing": "marketing", copywriting: "marketing",
  docker: "devops", kubernetes: "devops", aws: "devops", azure: "devops", gcp: "devops",
  git: "devops", linux: "devops", devops: "devops", "ci/cd": "devops",
  "cloud devops": "devops", terraform: "devops", ansible: "devops",
  cybersecurity: "devops", networking: "devops", "system administration": "devops",
  blockchain: "coding", web3: "coding",
  "project management": "general", agile: "general", scrum: "general",
  "rest api": "coding", microservices: "devops",
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
