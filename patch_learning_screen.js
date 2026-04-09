import fs from 'fs';
let content = fs.readFileSync('src/components/LearningScreen.tsx', 'utf8');

content = content.replace(
  /} catch \(err: any\) {/g,
  '} catch (err: unknown) {'
);

fs.writeFileSync('src/components/LearningScreen.tsx', content);
