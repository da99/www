
Bun.serve({
  port: 4568, // defaults to $BUN_PORT, $PORT, $NODE_PORT otherwise 3000
  fetch(req: Request) {
    const u = new URL(req.url);
    console.log(u.pathname);
    return new Response(Bun.file(`build/public/${u.pathname}`));
  },
});
