import { fs, path } from "./deps.ts";
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
  "backup.exe",
  "doRestic.exe",
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
