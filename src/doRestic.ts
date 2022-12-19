import "./env.ts";

export default async function doRestic(args: string[]) {
  const p = Deno.run({
    cmd: ["restic"].concat(args),
  });
  const status = await p.status();
  return status.code;
}

if (import.meta.main) Deno.exit(await doRestic(Deno.args));
