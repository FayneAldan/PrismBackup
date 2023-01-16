import { backupPaths } from "./dirs.ts";
import { exists } from "./exists.ts";
import { join } from "https://deno.land/std@0.170.0/path/mod.ts";

const excludes: string[] = [];

function add(...paths: string[]) {
  excludes.push(...paths);
}

async function ifContainsExclude(contains: string, excludes: string[]) {
  for (const backupPath of backupPaths)
    if (await exists(join(backupPath, contains)))
      for (const exclude of excludes) add(join(backupPath, exclude));
}

// Launcher directories
await ifContainsExclude("libraries", [
  "assets",
  "backup", // In case the repo is cloned to the launcher folder
  "cache",
  "libraries",
  "logos",
  "meta",
  "translations",
  "versions",
  "webcache2",
  "metacache",
  "*.log",
  "*_log.txt",
  "backup.exe",
  "doRestic.exe",
]);

// Minecraft intances
add(
  "backups",
  "crash-reports",
  "logs",
  "screenshots",
  "server-resource-packs",
  "replay_videos" // ReplayMod
);

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
