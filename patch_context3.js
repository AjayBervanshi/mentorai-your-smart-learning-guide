import fs from 'fs';
let content = fs.readFileSync('src/context/LearningContext.tsx', 'utf8');

content = content.replace(
  /\[profile, activeSkillId\]\);/g,
  '[profile, activeSkillId]);'
);

// We need to just fix the fast refresh issues. They are all components that are exported alongside other things.
// For example, in components/ui/badge.tsx, there's likely export const badgeVariants...
// Actually, react-refresh/only-export-components is just a warning, and it's a known issue with Shadcn UI.
// We can just ignore the warnings, or disable the rule for those files.
