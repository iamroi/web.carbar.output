import { createError } from 'h3';
import { withLeadingSlash, withoutTrailingSlash, parseURL } from 'ufo';
import { promises } from 'fs';
import { resolve, dirname } from 'pathe';
import { fileURLToPath } from 'url';
import { c as buildAssetsDir } from './server.mjs';
import 'unenv/runtime/polyfill/fetch.node';
import 'http';
import 'https';
import 'destr';
import 'ohmyfetch';
import 'unenv/runtime/fetch/index';
import 'defu';

const assets = {
  "/_nuxt/0a146b0.js": {
    "type": "application/javascript",
    "etag": "\"f66-h4Nf0aTnER2e4J3i3v3xszMOHfU\"",
    "mtime": "2022-02-22T23:32:39.444Z",
    "path": "../public/_nuxt/0a146b0.js"
  },
  "/_nuxt/1580162.js": {
    "type": "application/javascript",
    "etag": "\"a8a-6WhiJxMRohWV4h0hLek1C7cHzlc\"",
    "mtime": "2022-02-22T23:32:39.443Z",
    "path": "../public/_nuxt/1580162.js"
  },
  "/_nuxt/2eb0b1c.js": {
    "type": "application/javascript",
    "etag": "\"576d1-VfWudmDUe/9UC5G8G3qNuFR9bCc\"",
    "mtime": "2022-02-22T23:32:39.445Z",
    "path": "../public/_nuxt/2eb0b1c.js"
  },
  "/_nuxt/b4c7b7e.js": {
    "type": "application/javascript",
    "etag": "\"c1-SOeeI2C/RkcIVGtKninCVWivq14\"",
    "mtime": "2022-02-22T23:32:39.443Z",
    "path": "../public/_nuxt/b4c7b7e.js"
  },
  "/_nuxt/d7f90bc.js": {
    "type": "application/javascript",
    "etag": "\"24b94-/qdj8evpxhrqbFZm0gFB8SG3nxU\"",
    "mtime": "2022-02-22T23:32:39.443Z",
    "path": "../public/_nuxt/d7f90bc.js"
  },
  "/_nuxt/de593d6.js": {
    "type": "application/javascript",
    "etag": "\"38a9-F0N1y6Km9C4b+08uRXWBxW4DFuo\"",
    "mtime": "2022-02-22T23:32:39.443Z",
    "path": "../public/_nuxt/de593d6.js"
  },
  "/_nuxt/f4a20cd.js": {
    "type": "application/javascript",
    "etag": "\"d5-yChJWxdsRWzub7zkzIIWR9hp81E\"",
    "mtime": "2022-02-22T23:32:39.442Z",
    "path": "../public/_nuxt/f4a20cd.js"
  }
};

const mainDir = dirname(fileURLToPath(globalThis.entryURL));

function readAsset (id) {
  return promises.readFile(resolve(mainDir, getAsset(id).path))
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const TWO_DAYS = 2 * 60 * 60 * 24;
const STATIC_ASSETS_BASE = "/_nuxt/C:/Workspace/web.carbar/dist" + "/" + "1645572741";
async function serveStatic(req, res) {
  if (!METHODS.includes(req.method)) {
    return;
  }
  let id = withLeadingSlash(withoutTrailingSlash(parseURL(req.url).pathname));
  let asset = getAsset(id);
  if (!asset) {
    const _id = id + "/index.html";
    const _asset = getAsset(_id);
    if (_asset) {
      asset = _asset;
      id = _id;
    }
  }
  const isBuildAsset = id.startsWith(buildAssetsDir());
  if (!asset) {
    if (isBuildAsset && !id.startsWith(STATIC_ASSETS_BASE)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    res.statusCode = 304;
    return res.end("Not Modified (etag)");
  }
  const ifModifiedSinceH = req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      res.statusCode = 304;
      return res.end("Not Modified (mtime)");
    }
  }
  if (asset.type) {
    res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    res.setHeader("Last-Modified", asset.mtime);
  }
  if (isBuildAsset) {
    res.setHeader("Cache-Control", `max-age=${TWO_DAYS}, immutable`);
  }
  const contents = await readAsset(id);
  return res.end(contents);
}

export { serveStatic as default };
