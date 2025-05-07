import {
  compileScript,
  compileStyle,
  compileTemplate,
  parse,
} from "@vue/compiler-sfc";
import type {
  SFCParseResult,
  SFCTemplateBlock,
  SFCScriptBlock,
  SFCStyleBlock,
  SFCDescriptor,
  SFCTemplateCompileResults,
  SFCStyleCompileResults,
} from "@vue/compiler-sfc";
import { sfcString } from "./sfcString";
import { createCommonParams, resolveFeatures } from "./params";
import type { Params } from "./params";
import fs from "fs";
const commonParams: Params = createCommonParams(sfcString, {
  filename: "sssss.vue",
});
const parseValue: SFCParseResult = parse(sfcString);
const descriptor: SFCDescriptor = parseValue.descriptor;
resolveFeatures(descriptor, commonParams);
const template: SFCTemplateBlock = descriptor.template;
const script: SFCDescriptor = descriptor;
const style: SFCStyleBlock = descriptor.styles[0];
const compilerScript: SFCScriptBlock = compileScript(script, {
  ...commonParams,
});
const compilerTemplate: SFCTemplateCompileResults = compileTemplate({
  ...commonParams,
  source: template.content,
  scoped: commonParams.features.hasScoped,
  id: `data-v-${commonParams.id}`,
  compilerOptions: {
    bindingMetadata: compilerScript.bindings,
  },
});
const compilerStyle: SFCStyleCompileResults = compileStyle({
  ...commonParams,
  source: style?.content ?? "",
  preprocessLang: "less",
  scoped: commonParams.features.hasScoped,
});
console.log(commonParams);

fs.writeFileSync(
  "./dist/output.js",
  generateExecutableCode(
    compilerScript.content,
    compilerTemplate.code,
    compilerStyle.code
  ),
  "utf-8"
);
function generateExecutableCode(
  scriptContent: string,
  templateCode: string,
  styleCode: string
) {
  return `
    ${scriptContent}
    ${templateCode}
    export const __scopeId = 'data-v-${commonParams.id}'
    const style = document.createElement('style');
    style.textContent = \`${styleCode}\`;
    document.head.appendChild(style);
  `;
}
