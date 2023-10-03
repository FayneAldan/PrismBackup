import * as fs from "https://deno.land/std@0.203.0/fs/mod.ts";
import * as path from "https://deno.land/std@0.203.0/path/mod.ts";

import { backupDirs } from "./dirs.ts";

const excludes: string[] = [];

function add(...paths: string[]) {
  excludes.push(...paths);
}

async function ifContainsExclude(contains: string, excludes: string[]) {
  for (const backupPath of backupDirs)
    if (await fs.exists(path.join(backupPath, contains)))
      add(...excludes.map((v) => path.join(backupPath, v)));
}

// Launcher directories
await ifContainsExclude("libraries", [
  "assets",
  "cache",
  "libraries",
  "logos",
  "meta",
  "translations",
  "versions",
  "webcache2",
  "metacache",
  "*_log.txt",
  ".env",
  "backup.ps1",
  "doRestic.ps1",
]);

// Prism Launcher stuff
add(".LAUNCHER_TEMP", "_LAUNCHER_TEMP", "_MMC_TEMP");

export async function getExcludeFile(): Promise<string> {
  const path = await Deno.makeTempFile({
    prefix: "exclude",
  });
  await Deno.writeTextFile(path, excludes.join("\n"));
  return path;
}

if (import.meta.main) {
  console.log(excludes);
  alert();
}
