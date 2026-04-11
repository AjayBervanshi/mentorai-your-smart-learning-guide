import { describe, it, expect } from "vitest";
import {
  findMatchingSkills,
  normalizeSkillName,
  isValidSkill,
  getSkillCategory,
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

  it("limits results to 5", () => {
    const results = findMatchingSkills("data");
    expect(results.length).toBeLessThanOrEqual(5);
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

  it("returns null for unknown skills", () => {
    expect(normalizeSkillName("unknown_skill_xyz")).toBeNull();
    expect(normalizeSkillName("")).toBeNull();
    expect(normalizeSkillName("   ")).toBeNull();
  });
});

describe("isValidSkill", () => {
  it("returns true for valid skill names", () => {
    expect(isValidSkill("Python")).toBe(true);
    expect(isValidSkill("js")).toBe(true);
    expect(isValidSkill("pyhon")).toBe(true);
  });

  it("returns false for invalid skill names", () => {
    expect(isValidSkill("unknown_skill_xyz")).toBe(false);
    expect(isValidSkill("")).toBe(false);
  });
});

describe("getSkillCategory", () => {
  it("returns correct category for known skills", () => {
    expect(getSkillCategory("Python")).toBe("coding");
    expect(getSkillCategory("sql")).toBe("data");
    expect(getSkillCategory("UI Design")).toBe("design");
    expect(getSkillCategory("Docker")).toBe("devops");
  });

  it("returns 'general' for unknown skills", () => {
    expect(getSkillCategory("unknown_skill_xyz")).toBe("general");
  });
});
