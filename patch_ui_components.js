import fs from 'fs';

const emptyInterfaceFiles = [
  'src/components/ui/command.tsx',
  'src/components/ui/textarea.tsx'
];

for (const file of emptyInterfaceFiles) {
  let content = fs.readFileSync(file, 'utf8');
  if (file.includes('command.tsx')) {
    content = content.replace(/interface CommandDialogProps extends DialogProps \{\}/g, 'type CommandDialogProps = DialogProps;');
  } else if (file.includes('textarea.tsx')) {
    content = content.replace(/export interface TextareaProps\n\s*extends React\.TextareaHTMLAttributes<HTMLTextAreaElement> \{\}/g, 'export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;');
  }
  fs.writeFileSync(file, content);
}
