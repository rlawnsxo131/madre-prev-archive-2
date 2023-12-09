// import fs from "node:fs";
import path from "node:path";
import url from "node:url";

import middie from "@fastify/middie";
import { fastifyStatic } from "@fastify/static";
import { createRequestHandler } from "@mcansh/remix-fastify";
import {
  unstable_createViteServer,
  unstable_loadViteServerBuild,
} from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import fastify from "fastify";

installGlobals();

const vite =
  process.env.NODE_ENV === "production"
    ? undefined
    : await unstable_createViteServer();

const app = fastify();

await app.register(middie);

const noopContentParser = (_request, payload, done) => {
  done(null, payload);
};

app.addContentTypeParser("application/json", noopContentParser);
app.addContentTypeParser("*", noopContentParser);

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// handle asset requests
if (vite) {
  await app.use(vite.middlewares);
} else {
  await app.register(fastifyStatic, {
    root: path.join(__dirname, "public", "build"),
    prefix: "/build",
    wildcard: true,
    decorateReply: false,
    cacheControl: true,
    dotfiles: "allow",
    etag: true,
    maxAge: "1y",
    immutable: true,
    serveDotFiles: true,
    lastModified: true,
  });
}

await app.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/",
  wildcard: false,
  cacheControl: true,
  dotfiles: "allow",
  etag: true,
  maxAge: "1h",
  serveDotFiles: true,
  lastModified: true,
});

// handle SSR requests
app.all("*", async (request, reply) => {
  try {
    const build = vite
      ? () => unstable_loadViteServerBuild(vite)
      : await import("./build/index.js");
    let criticalCss;

    if (vite) {
      const [{ getStylesForUrl }, { readConfig }] = await Promise.all([
        import("@remix-run/dev/dist/vite/styles.js"),
        import("@remix-run/dev/dist/config.js"),
      ]);

      const remixConfig = await readConfig();
      const resolvedBuild = vite ? await build() : build;
      criticalCss = await getStylesForUrl(
        vite,
        remixConfig,
        {},
        resolvedBuild,
        request.url,
      );
    }

    const handler = createRequestHandler({ build, criticalCss });
    return handler(request, reply);
  } catch (error) {
    console.error(error);
    return reply.status(500).send(error.message);
  }
});

const port = process.env.PORT ? Number(process.env.PORT) || 3000 : 3000;

const address = await app.listen({ port, host: "0.0.0.0" });
console.log(`✅ app ready: ${address}`);
