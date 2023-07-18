import { dotenv, log } from "./deps.ts";
import { findUpMultiple } from "npm:find-up@6.3.0";

const envPaths = await findUpMultiple([".env", "backup/.env"]);
if (envPaths.length > 0)
  for (const envPath of envPaths)
    await dotenv.load({
      envPath,
      export: true,
    });
else log.warning("Could not find .env");

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
