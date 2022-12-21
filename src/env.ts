import { load } from "https://deno.land/std@0.170.0/dotenv/mod.ts";
import { findUp } from "https://deno.land/x/find_up_deno@0.1.2/mod.ts";
import { join, basename } from "https://deno.land/std@0.170.0/path/mod.ts";

let envPath = (await findUp(".env")) || (await findUp("backup"));
if (!envPath) throw new Error("Could not find .env");
if (basename(envPath) != ".env") envPath = join(envPath, ".env");

await load({
  envPath,
  export: true,
  examplePath: "",
});

export function getEnv(key: string): string | undefined {
  return Deno.env.get(key);
}

export function needEnv(key: string): string {
  const ret = getEnv(key);
  if (!ret) throw new Error(`.env: ${key} not found`);
  return ret;
}

//console.log("CWD", Deno.cwd());
//needEnv("RESTIC_REPOSITORY");
