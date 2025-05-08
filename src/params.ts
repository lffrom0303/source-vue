import type { CompilerOptions } from "@vue/compiler-core";
// @ts-ignore
import hashId from "hash-sum";
import { SFCDescriptor } from "@vue/compiler-sfc";
export type SFCFeatures = {
  hasStyle?: boolean;
  hasScoped?: boolean;
  hasCSSModules?: boolean;
  hasScriptSetup?: boolean;
  hasTemplate?: boolean;
  hasTS?: boolean;
};
export type Params = {
  filename: string;
  id: string;
  isProd: boolean;
  features: SFCFeatures;
  addedProps: Array<[key: string, value: string]>;
  addedCodeList: string[];
  options: CompilerOptions;
};

export const createCommonParams = (
  source: string,
  options?: CompilerOptions
): Params => {
  const filename = options?.filename;
  const id = hashId(options?.filename + source);
  return {
    addedCodeList: [],
    addedProps: [],
    features: {},
    isProd: false,
    filename: filename ?? "",
    id,
    options: options ?? {},
  };
};

export const resolveFeatures = (descriptor: SFCDescriptor, params: Params) => {
  const { filename, features, addedProps, addedCodeList, id, isProd } = params;
  const scriptLang =
    (descriptor.script && descriptor.script.lang) ||
    (descriptor.scriptSetup && descriptor.scriptSetup.lang) ||
    "js";
  features.hasTS = scriptLang === "ts";
  descriptor.styles.some((style) => {
    if (style.scoped) {
      features.hasScoped = true;
    }
    if (style.module) {
      features.hasCSSModules = true;
    }
    features.hasStyle = true;
    return features.hasScoped && features.hasCSSModules && features.hasStyle;
  });
  if (features.hasScoped) {
    addedProps.push(["__scopeId", JSON.stringify(`data-v-${id}`)]);
  }
  if (features.hasCSSModules) {
    addedProps.push(["__cssModules", `cssModules`]);
    addedCodeList.push("const cssModules= {}");
  }
  if (!isProd) {
    addedProps.push(["__file", JSON.stringify(filename.replace(/\\/g, "/"))]);
  }
};
