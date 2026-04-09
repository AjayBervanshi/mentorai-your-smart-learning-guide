import fs from 'fs';
let content = fs.readFileSync('tailwind.config.ts', 'utf8');

content = content.replace(
  /require\("tailwindcss-animate"\)/g,
  'import tailwindcssAnimate from "tailwindcss-animate"'
);

content = content.replace(
  /import type \{ Config \} from "tailwindcss";/,
  'import type { Config } from "tailwindcss";\nimport tailwindcssAnimate from "tailwindcss-animate";'
);

content = content.replace(
  /plugins: \[import tailwindcssAnimate from "tailwindcss-animate"\]/,
  'plugins: [tailwindcssAnimate]'
);

fs.writeFileSync('tailwind.config.ts', content);
