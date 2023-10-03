#!/usr/bin/env -S deno run -A

import * as fs from "https://deno.land/std@0.203.0/fs/mod.ts";
import * as path from "https://deno.land/std@0.203.0/path/mod.ts";

import { backupDirs } from "./dirs.ts";
import doRestic from "./doRestic.ts";
import { getEnv } from "./env.ts";
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
  for (let dir of backupDirs) {
    dir = path.join(dir, file);
    if (await fs.exists(dir)) args.push(dir);
  }
}

if (INST_NAME) addTag(INST_NAME);
if (INST_NAME == "SkyClient") await findFile("skyclient");

if (INST_DIR) args.push(INST_DIR);
else if (backupDirs.length == 0)
  throw new Error("Failed to find any folders to backup!");
else {
  addTag("manual");
  args.push(...backupDirs);
}

args.push(...Deno.args);

Deno.exit(await doRestic(args, true));
