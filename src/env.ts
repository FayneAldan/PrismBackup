import { dotenv, log } from "./deps.ts";
import { findUp } from "npm:find-up@6.3.0";

const envPath = await findUp([".env", "backup/.env"]);
if (envPath)
  await dotenv.load({
    envPath,
    export: true,
    examplePath: null,
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
