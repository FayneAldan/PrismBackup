//import $ from "https://deno.land/x/dax@0.35.0/mod.ts";
import * as dotenv from "https://deno.land/std@0.203.0/dotenv/mod.ts";
import { $ } from "./utils.ts";

import { findUpMultiple } from "npm:find-up@6.3.0";

const envPaths = await findUpMultiple(".env");
if (envPaths.length == 0) $.logWarn("WARN Could not find .env");
for (const envPath of envPaths)
  await dotenv.load({
    envPath,
    export: true,
  });

export function getEnv(key: string): string | undefined {
  return Deno.env.get(key);
}

export function needEnv(key: string): string {
  const ret = getEnv(key);
  if (!ret) throw new Error(`Env: ${key} not found`);
  return ret;
}

//console.log("CWD", Deno.cwd());
//needEnv("RESTIC_REPOSITORY");

if (import.meta.main) {
  console.log(Deno.env.toObject());
  console.log(envPaths);
  alert();
}
