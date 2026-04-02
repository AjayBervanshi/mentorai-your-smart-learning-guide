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
      { title: "Conditional Rendering & Lists", description: "Dynamic UI based on data", level: "beginner", subtopics: ["Ternary in JSX", "&&  operator", "map() for lists", "Keys"] },
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

export function getTopicsForSkill(
  skillName: string,
  level: SkillLevel
): TopicTemplate[] {
  const template = getSkillTemplate(skillName);
  const startIndex = level === "beginner" ? 0 : level === "intermediate" ? 5 : 10;
  return template.topics.slice(startIndex);
}

// Known skill categories for validation
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
];

export function findMatchingSkills(input: string): string[] {
  const normalized = input.toLowerCase().trim();
  if (normalized.length < 2) return [];

  return KNOWN_SKILL_CATEGORIES.filter(
    (skill) =>
      skill.toLowerCase().includes(normalized) ||
      normalized.includes(skill.toLowerCase())
  ).slice(0, 5);
}

export function isValidSkill(input: string): boolean {
  const normalized = input.toLowerCase().trim();
  if (normalized.length < 2) return false;
  // Allow anything 2+ chars that's not pure gibberish (has vowels or is a known abbreviation)
  const hasVowel = /[aeiou]/i.test(normalized);
  const isKnownAlias = normalized in SKILL_ALIASES;
  const isKnownSkill = KNOWN_SKILL_CATEGORIES.some(
    (s) => s.toLowerCase() === normalized
  );
  return hasVowel || isKnownAlias || isKnownSkill;
}
