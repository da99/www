
import { normalize, join } from "node:path";

const THE_PORT = parseInt(Bun.argv[3] || '4568');
const STATIC_DIR = normalize(`./${Bun.argv[4] || 'build'}`);
const CMD_ARR = Bun.argv.slice(5);

console.log(`Starting server at: ${THE_PORT}, DIR: ${STATIC_DIR}, CMD: ${CMD_ARR}`)

Bun.serve({
  port: THE_PORT, // defaults to $BUN_PORT, $PORT, $NODE_PORT otherwise 3000
  async fetch(req: Request) {
    const u = new URL(req.url);
    const f = Bun.file(join(STATIC_DIR, u.pathname));
    const exists = await f.exists();
    if (!exists)
      return new Response(`Not found: ${u.pathname}`, { status: 404 });

    const r = new Response(await f.arrayBuffer(), {
      headers: {
        "Content-Type": f.type,
      },
    });

    console.log(`${u.pathname} -> ${r.headers.get('Content-type')}`);
    return r;
  },
});
