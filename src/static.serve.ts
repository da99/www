
    // return new Response(`Not found: ${req.url}`, { status: 404, statusText: "Not Found"});

import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import { normalize } from "node:path";
// function safe_path(x: string) {
//   return normalize(x);
// }

console.warn(Bun.argv);

const THE_PORT = parseInt(Bun.argv[3] || '4569');
const STATIC_DIR = normalize(`./${Bun.argv[4] || 'build'}`);
const CMD_ARR = Bun.argv.slice(5);

console.log(`Starting server at: ${THE_PORT}, DIR: ${STATIC_DIR}, CMD: ${CMD_ARR}`)
const app = new Hono()

app.use(logger());

app.use(async (c, next) => {
  if (CMD_ARR.length > 0 && c.req.url.indexOf('.html') > 0) {
    console.log(`--- Running command: ${CMD_ARR.join(' ')}`)
    await Bun.spawn(CMD_ARR).exited;
  }
  await next()
});

app.get('/*', serveStatic({ root: `./${STATIC_DIR}`}));

export default {
  port: THE_PORT,
  fetch: app.fetch,
};



