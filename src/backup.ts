import { join } from "https://deno.land/std@0.170.0/path/mod.ts";
import { backupPaths } from "./dirs.ts";
import doRestic from "./doRestic.ts";
import { getEnv } from "./env.ts";
import { exists } from "./exists.ts";
import { getExcludeFile } from "./excludes.ts";

const INST_NAME = getEnv("INST_NAME");
const INST_DIR = getEnv("INST_DIR");
const args = ["backup"];

const excludeFile = await getExcludeFile();
args.push("--exclude-file", excludeFile);

function addTag(tag: string) {
  args.push("--tag", tag);
}

async function findFile(file: string) {
  for (let path of backupPaths) {
    path = join(path, file);
    if (await exists(path)) args.push(path);
  }
}

if (INST_NAME) addTag(INST_NAME);
if (INST_NAME == "SkyClient") await findFile("skyclient");

if (INST_DIR) args.push(INST_DIR);
else if (backupPaths.length == 0)
  throw new Error("Failed to find any folders to backup");
else {
  addTag("manual");
  args.push(...backupPaths);
}

args.push(...Deno.args);

console.log("> restic", ...args);
await doRestic(args);
await Deno.remove(excludeFile);
