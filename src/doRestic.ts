#!/usr/bin/env -S deno run -A

import "./env.ts";
import { $ } from "./utils.ts";

export default async function doRestic(args: string[], printCommand = false) {
  const res = await $`restic ${args}`.noThrow().printCommand(printCommand);
  return res.code;
}

if (import.meta.main) Deno.exit(await doRestic(Deno.args));
