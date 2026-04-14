import { describe, it, expect } from "vitest";
import { findMatchingSkills } from "../data/skillTemplates";

describe("findMatchingSkills", () => {
  it("returns empty array for short input", () => {
    expect(findMatchingSkills("a")).toEqual([]);
    expect(findMatchingSkills(" ")).toEqual([]);
    expect(findMatchingSkills("")).toEqual([]);
  });

  it("handles exact matches case-insensitively", () => {
    const results = findMatchingSkills("python");
    expect(results).toContain("Python");

    const results2 = findMatchingSkills("JAVASCRIPT");
    expect(results2).toContain("JavaScript");
  });

  it("handles substring matches where skill is in input", () => {
    const results = findMatchingSkills("Script");
    expect(results).toContain("JavaScript");
    expect(results).toContain("TypeScript");
  });

  it("handles input containing the skill name", () => {
    const results = findMatchingSkills("I am learning React today");
    expect(results).toContain("React");
  });

  it("handles fuzzy matches within distance 3", () => {
    const results = findMatchingSkills("Pythn"); // dist 1
    expect(results).toContain("Python");

    // "Typsclipt" has dist 2 from TypeScript, but "Java" or "R" might match via substring if they are in the string.
    // "typsclipt" doesn't have "java" or "r".
    // Wait, "typsclipt" has 'r'? no. t-y-p-s-c-l-i-p-t.
    const results2 = findMatchingSkills("Typsclipt");
    expect(results2).toContain("TypeScript");

    // "Javasclp" has "java" in it, so it matches "Java" via substring!
    // Let's use something that doesn't have "java"
    // "Jvscript" dist 2 from "JavaScript".
    // "jvscript" contains "r" (from JavaScript's 'r'?) No. j-v-s-c-r-i-p-t. contains 'r'.
    // "Jvscipt" dist 2 from "Javascript" (missing a, r).
    // "jvscipt" contains 'i', 'p', 't'.
    const results3 = findMatchingSkills("Jvscipt");
    expect(results3).toContain("JavaScript");
  });

  it("handles fuzzy matches ignoring special characters", () => {
    // Node.js -> nodejs
    const results = findMatchingSkills("Nodejs");
    expect(results).toContain("Node.js");

    // Tailwind CSS -> tailwindcss
    const results2 = findMatchingSkills("tailwind css");
    expect(results2).toContain("Tailwind CSS");
  });

  it("limits results to 5", () => {
    const results = findMatchingSkills("st");
    expect(results.length).toBe(5);
  });

  it("returns empty array when no match is found", () => {
    expect(findMatchingSkills("zzzzzzzzzz")).toEqual([]);
  });
});
