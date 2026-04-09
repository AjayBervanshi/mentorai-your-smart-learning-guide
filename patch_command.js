import fs from 'fs';
let content = fs.readFileSync('src/components/ui/command.tsx', 'utf8');

content = content.replace(
  /interface CommandDialogProps extends DialogProps \{\}/,
  'type CommandDialogProps = DialogProps;'
);

fs.writeFileSync('src/components/ui/command.tsx', content);

let content2 = fs.readFileSync('src/components/ui/textarea.tsx', 'utf8');
content2 = content2.replace(
  /export interface TextareaProps\n  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> \{\}/,
  'export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;'
);
fs.writeFileSync('src/components/ui/textarea.tsx', content2);
