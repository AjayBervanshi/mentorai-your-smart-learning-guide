import fs from 'fs';
let content = fs.readFileSync('eslint.config.js', 'utf8');

content = content.replace(
  /"react-refresh\/only-export-components": \["warn", \{ allowConstantExport: true \}\],/g,
  '"react-refresh/only-export-components": "off",'
);

fs.writeFileSync('eslint.config.js', content);
