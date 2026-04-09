import fs from 'fs';
let content = fs.readFileSync('src/context/LearningContext.tsx', 'utf8');

content = content.replace(
  /const lastActive = profile\?\.joinedDate \? undefined : undefined; \/\/ we need to query/,
  '// unused variable removed'
);

fs.writeFileSync('src/context/LearningContext.tsx', content);
