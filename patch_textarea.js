import fs from 'fs';
let content = fs.readFileSync('src/components/ui/textarea.tsx', 'utf8');

content = content.replace(
  /export interface TextareaProps\n  extends React\.TextareaHTMLAttributes<HTMLTextAreaElement> \{\}/g,
  'export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;'
);
content = content.replace(
  /export interface TextareaProps extends React\.TextareaHTMLAttributes<HTMLTextAreaElement> \{\}/g,
  'export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;'
);

fs.writeFileSync('src/components/ui/textarea.tsx', content);
