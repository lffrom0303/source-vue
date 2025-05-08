export interface ExecutableCodeParams {
  scriptContent: string;
  templateCode: string;
  styleCode: string;
  id: string;
}
export function generateExecutableCode({
  scriptContent,
  templateCode,
  styleCode,
  id,
}: ExecutableCodeParams): string {
  return `
    ${scriptContent}
    ${templateCode}
    export const __scopeId = 'data-v-${id}'
    const style = document.createElement('style');
    style.textContent = \`${styleCode}\`;
    document.head.appendChild(style);
  `;
}
