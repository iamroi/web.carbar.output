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
  "/_nuxt/2eb0b1c.js": {
    "type": "application/javascript",
    "etag": "\"576d1-VfWudmDUe/9UC5G8G3qNuFR9bCc\"",
    "mtime": "2022-02-22T23:52:28.799Z",
    "path": "../public/_nuxt/2eb0b1c.js"
  },
  "/_nuxt/46c4e7a.js": {
    "type": "application/javascript",
    "etag": "\"ce-LoWc6wO/u5nylaXQ9Qwg93ldVM4\"",
    "mtime": "2022-02-22T23:52:28.794Z",
    "path": "../public/_nuxt/46c4e7a.js"
  },
  "/_nuxt/64b8860.js": {
    "type": "application/javascript",
    "etag": "\"a88-zS0LsiyTH8kc7Zg5gAnRLqKYx2o\"",
    "mtime": "2022-02-22T23:52:28.794Z",
    "path": "../public/_nuxt/64b8860.js"
  },
  "/_nuxt/7307d1d.js": {
    "type": "application/javascript",
    "etag": "\"f70-mk1nV7S0EAQvibevtYytlW3ZLME\"",
    "mtime": "2022-02-22T23:52:28.799Z",
    "path": "../public/_nuxt/7307d1d.js"
  },
  "/_nuxt/d7f90bc.js": {
    "type": "application/javascript",
    "etag": "\"24b94-/qdj8evpxhrqbFZm0gFB8SG3nxU\"",
    "mtime": "2022-02-22T23:52:28.794Z",
    "path": "../public/_nuxt/d7f90bc.js"
  },
  "/_nuxt/de593d6.js": {
    "type": "application/javascript",
    "etag": "\"38a9-F0N1y6Km9C4b+08uRXWBxW4DFuo\"",
    "mtime": "2022-02-22T23:52:28.794Z",
    "path": "../public/_nuxt/de593d6.js"
  },
  "/_nuxt/f4a20cd.js": {
    "type": "application/javascript",
    "etag": "\"d5-yChJWxdsRWzub7zkzIIWR9hp81E\"",
    "mtime": "2022-02-22T23:52:28.794Z",
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
const STATIC_ASSETS_BASE = "/_nuxt/C:/Workspace/web.carbar/dist" + "/" + "1645573933";
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
