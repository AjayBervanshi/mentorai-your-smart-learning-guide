import { describe, it, expect } from "vitest";
import {
  findMatchingSkills,
  normalizeSkillName,
  isValidSkill,
  getSkillCategory,
} from "../data/skillTemplates";

describe("findMatchingSkills", () => {
  it("should return empty array for input shorter than 2 characters", () => {
    expect(findMatchingSkills("")).toEqual([]);
    expect(findMatchingSkills("a")).toEqual([]);
  });

  it("should find exact substring matches", () => {
    const results = findMatchingSkills("script");
    expect(results).toContain("JavaScript");
    expect(results).toContain("TypeScript");
  });

  it("should find matches when input contains the skill name", () => {
    const results = findMatchingSkills("learning python");
    expect(results).toContain("Python");
  });

  it("should find fuzzy matches when no substring match is found", () => {
    const results = findMatchingSkills("pyhon");
    expect(results).toContain("Python");
  });

  it("should limit results to 5", () => {
    // Many skills might match 'a' if it was allowed, but 'data' should match several
    const results = findMatchingSkills("data");
    expect(results.length).toBeLessThanOrEqual(5);
  });

  it("should return empty array when no matches are found", () => {
    expect(findMatchingSkills("xyzzy123")).toEqual([]);
  });
});

describe("normalizeSkillName", () => {
  it("should return exact match for correct skill names", () => {
    expect(normalizeSkillName("Python")).toBe("Python");
    expect(normalizeSkillName("JavaScript")).toBe("JavaScript");
  });

  it("should handle case-insensitive exact matches", () => {
    expect(normalizeSkillName("python")).toBe("Python");
    expect(normalizeSkillName("JAVASCRIPT")).toBe("JavaScript");
  });

  it("should handle aliases", () => {
    expect(normalizeSkillName("js")).toBe("JavaScript");
    expect(normalizeSkillName("py")).toBe("Python");
    expect(normalizeSkillName("ts")).toBe("TypeScript");
  });

  it("should handle fuzzy matches with small typos", () => {
    expect(normalizeSkillName("pyhon")).toBe("Python");
    expect(normalizeSkillName("javascritp")).toBe("JavaScript");
  });

  it("should return null for unknown skills", () => {
    expect(normalizeSkillName("unknown_skill_xyz")).toBeNull();
    expect(normalizeSkillName("")).toBeNull();
    expect(normalizeSkillName("   ")).toBeNull();
  });
});

describe("isValidSkill", () => {
  it("should return true for valid skill names", () => {
    expect(isValidSkill("Python")).toBe(true);
    expect(isValidSkill("js")).toBe(true);
    expect(isValidSkill("pyhon")).toBe(true);
  });

  it("should return false for invalid skill names", () => {
    expect(isValidSkill("unknown_skill_xyz")).toBe(false);
    expect(isValidSkill("")).toBe(false);
  });
});

describe("getSkillCategory", () => {
  it("should return correct category for known skills", () => {
    expect(getSkillCategory("Python")).toBe("coding");
    expect(getSkillCategory("sql")).toBe("data");
    expect(getSkillCategory("UI Design")).toBe("design");
    expect(getSkillCategory("Docker")).toBe("devops");
  });

  it("should return 'general' for unknown skills", () => {
    expect(getSkillCategory("unknown_skill_xyz")).toBe("general");
  });
});
