import $ from "https://deno.land/x/dax@0.35.0/mod.ts";
import { getEnv } from "./env.ts";

export function isPrism() {
  const INST_NAME = getEnv("INST_NAME");
  return !!INST_NAME;
}

// https://github.com/PrismLauncher/PrismLauncher/issues/1677
if (isPrism()) {
  const logger = (...args: unknown[]) => {
    args = args.map((v: unknown) =>
      typeof v == "string" ? $.stripAnsi(v) : v
    );
    console.error(...args);
  };
  $.setInfoLogger(logger);
  $.setWarnLogger(logger);
  $.setErrorLogger(logger);
}

export { $ };
