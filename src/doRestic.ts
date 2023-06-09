import "./env.ts";

export default async function doRestic(args: string[]) {
  const p = new Deno.Command("restic", { args });
  const { code } = await p.output();
  return code;
}

if (import.meta.main) Deno.exit(await doRestic(Deno.args));
