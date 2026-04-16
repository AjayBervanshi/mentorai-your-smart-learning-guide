import { describe, it, expect } from "vitest";
import {
  findMatchingSkills,
  normalizeSkillName,
  isValidSkill,
  getSkillCategory,
  getProjectsForSkill,
} from "../data/skillTemplates";

describe("findMatchingSkills", () => {
  it("returns empty array for input shorter than 2 characters", () => {
    expect(findMatchingSkills("")).toEqual([]);
    expect(findMatchingSkills("a")).toEqual([]);
    expect(findMatchingSkills(" ")).toEqual([]);
  });

  it("finds exact substring matches", () => {
    const results = findMatchingSkills("script");
    expect(results).toContain("JavaScript");
    expect(results).toContain("TypeScript");
  });

  it("finds matches when input contains the skill name", () => {
    const results = findMatchingSkills("learning python");
    expect(results).toContain("Python");
  });

  it("finds fuzzy matches for typos", () => {
    const results = findMatchingSkills("pyhon");
    expect(results).toContain("Python");
  });

  it("limits results to 8", () => {
    const results = findMatchingSkills("data");
    expect(results.length).toBeLessThanOrEqual(8);
  });

  it("returns empty array when no matches are found", () => {
    expect(findMatchingSkills("xyzzy123")).toEqual([]);
  });

  it("handles special characters in skill names", () => {
    const results = findMatchingSkills("Nodejs");
    expect(results).toContain("Node.js");
  });
});

describe("normalizeSkillName", () => {
  it("returns exact match for correct skill names", () => {
    expect(normalizeSkillName("Python")).toBe("Python");
    expect(normalizeSkillName("JavaScript")).toBe("JavaScript");
  });

  it("handles case-insensitive exact matches", () => {
    expect(normalizeSkillName("python")).toBe("Python");
    expect(normalizeSkillName("JAVASCRIPT")).toBe("JavaScript");
  });

  it("handles aliases", () => {
    expect(normalizeSkillName("js")).toBe("JavaScript");
    expect(normalizeSkillName("py")).toBe("Python");
    expect(normalizeSkillName("ts")).toBe("TypeScript");
  });

  it("handles fuzzy matches with small typos", () => {
    expect(normalizeSkillName("pyhon")).toBe("Python");
    expect(normalizeSkillName("javascritp")).toBe("JavaScript");
  });

  it("returns null for empty/single-char input", () => {
    expect(normalizeSkillName("")).toBeNull();
    expect(normalizeSkillName("   ")).toBeNull();
    expect(normalizeSkillName("x")).toBeNull();
  });

  it("accepts unknown skills with title-casing", () => {
    expect(normalizeSkillName("underwater basket weaving")).toBe("Underwater Basket Weaving");
    expect(normalizeSkillName("quantum computing")).toBe("Quantum Computing");
  });
});

describe("isValidSkill", () => {
  it("returns true for valid skill names", () => {
    expect(isValidSkill("Python")).toBe(true);
    expect(isValidSkill("js")).toBe(true);
    expect(isValidSkill("pyhon")).toBe(true);
  });

  it("returns true for any non-trivial input (accepts all skills)", () => {
    expect(isValidSkill("cooking")).toBe(true);
    expect(isValidSkill("quantum physics")).toBe(true);
  });

  it("returns false for empty or single-char input", () => {
    expect(isValidSkill("")).toBe(false);
    expect(isValidSkill("x")).toBe(false);
  });
});

describe("getSkillCategory", () => {
  it("returns correct category for known skills", () => {
    expect(getSkillCategory("Python")).toBe("coding");
    expect(getSkillCategory("sql")).toBe("data");
    expect(getSkillCategory("UI Design")).toBe("design");
    expect(getSkillCategory("Docker")).toBe("devops");
    expect(getSkillCategory("Cooking")).toBe("lifestyle");
    expect(getSkillCategory("Photography")).toBe("creative");
    expect(getSkillCategory("Spanish")).toBe("language");
    expect(getSkillCategory("Physics")).toBe("science");
    expect(getSkillCategory("LLM")).toBe("data");
    expect(getSkillCategory("Public Speaking")).toBe("business");
  });

  it("returns 'general' for unknown skills", () => {
    expect(getSkillCategory("unknown_skill_xyz")).toBe("general");
  });
});

describe("getProjectsForSkill", () => {
  it("returns coding projects for 'Python'", () => {
    const projects = getProjectsForSkill("Python");
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0].title).toBe("Build a Personal Portfolio");
  });

  it("returns design projects for 'UI Design'", () => {
    const projects = getProjectsForSkill("UI Design");
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0].title).toBe("Redesign a Landing Page");
  });

  it("returns general projects for an unknown skill", () => {
    const projects = getProjectsForSkill("Unknown Skill XYZ");
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0].title).toBe("Learning Journal");
  });

  it("returns project objects with expected properties", () => {
    const projects = getProjectsForSkill("Python");
    const project = projects[0];
    expect(project).toHaveProperty("title");
    expect(project).toHaveProperty("desc");
    expect(project).toHaveProperty("difficulty");
    expect(project).toHaveProperty("minProgress");
  });
});
