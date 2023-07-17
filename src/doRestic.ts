#!/usr/bin/env -S deno run -A

import "./env.ts";

export default async function doRestic(args: string[]) {
  const p = new Deno.Command("restic", {
    args,
    stdin: "piped",
    stdout: "piped",
  });
  const child = p.spawn();
  child.stdout.pipeTo(Deno.stdout.writable);
  child.stdin.close();
  const status = await child.status;
  return status.code;
}

if (import.meta.main) Deno.exit(await doRestic(Deno.args));
