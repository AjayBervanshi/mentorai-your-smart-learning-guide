import fs from 'fs';

const files = [
  'src/pages/Auth.tsx',
  'src/pages/ResetPassword.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/catch \(error: any\)/g, 'catch (error: unknown)');
  content = content.replace(/catch \(err: any\)/g, 'catch (err: unknown)');
  fs.writeFileSync(file, content);
}
