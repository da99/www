
Bun.serve({
  port: 4568, // defaults to $BUN_PORT, $PORT, $NODE_PORT otherwise 3000
  async fetch(req: Request) {
    const u = new URL(req.url);
    const f = Bun.file(`build/public/${u.pathname}`);
    const r =  new Response(await f.arrayBuffer(), {
      headers: {
        "Content-Type": f.type,
      },
    });
    console.log(`${u.pathname} -> ${r.headers.get('Content-type')}`);
    return r;
  },
});
