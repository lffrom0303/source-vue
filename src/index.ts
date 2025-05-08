import {
  compileScript,
  compileStyle,
  compileTemplate,
  parse,
} from "@vue/compiler-sfc";
import { compile } from "@vue/compiler-dom";
import type {
  SFCParseResult,
  SFCTemplateBlock,
  SFCScriptBlock,
  SFCStyleBlock,
  SFCDescriptor,
  SFCTemplateCompileResults,
  SFCStyleCompileResults,
} from "@vue/compiler-sfc";
import fs from "fs";
import { generateExecutableCode } from "./utils";
import { resolve } from "path";
import { createCommonParams, resolveFeatures } from "./params";
import type { Params } from "./params";
// 使用绝对路径
const vuePath = resolve(process.cwd(), "src/App.vue");
const sfcString = fs.readFileSync(vuePath, "utf-8");
const commonParams: Params = createCommonParams(sfcString, {
  filename: "sssss.vue",
});
const parseValue: SFCParseResult = parse(sfcString);
const descriptor: SFCDescriptor = parseValue.descriptor;
const template: SFCTemplateBlock | null = descriptor.template;
const script: SFCDescriptor = descriptor;
const style: SFCStyleBlock = descriptor.styles[0];
resolveFeatures(descriptor, commonParams);
const compilerScript: SFCScriptBlock = compileScript(script, {
  ...commonParams,
});
const compilerTemplate: SFCTemplateCompileResults = compileTemplate({
  ...commonParams,
  source: template?.content ?? "",
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
fs.writeFileSync(
  "dist/output.js",
  generateExecutableCode({
    scriptContent: compilerScript.content,
    templateCode: compilerTemplate.code,
    styleCode: compilerStyle.code,
    id: commonParams.id,
  }),
  "utf-8"
);
