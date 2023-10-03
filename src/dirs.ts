import * as fs from "https://deno.land/std@0.203.0/fs/mod.ts";
import * as path from "https://deno.land/std@0.203.0/path/mod.ts";

import { getEnv, needEnv } from "./env.ts";

const { os } = Deno.build;

export let backupDirs: string[] = [];

function tryEnv(key: string) {
  const value = getEnv(key);
  if (value) add(value);
}

function add(dir: string) {
  backupDirs.push(dir);
}

async function tryDir(dir: string, file?: string) {
  const tryPath = file ? path.join(dir, file) : dir;
  if (await fs.exists(tryPath)) add(dir);
}

tryEnv("MINECRAFT_DIR");
tryEnv("MULTIMC_DIR");
tryEnv("PRISM_DIR");

for (const parent of [".", ".."]) {
  const dir = path.resolve(parent);
  await tryDir(dir, "instances");
  await tryDir(dir, "libraries");
  await tryDir(dir, "saves");
}

if (os == "windows") {
  const appData = needEnv("APPDATA");

  await tryDir(path.join(appData, ".minecraft"));
  await tryDir(path.join(appData, "PrismLauncher"));
}

// TODO: Mac and Linux support

backupDirs = backupDirs.map((v) => path.resolve(v));
backupDirs = [...new Set(backupDirs)];

if (import.meta.main) {
  console.log(backupDirs);
  alert();
}
