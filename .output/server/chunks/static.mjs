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
  "/_nuxt/2cdd07a.js": {
    "type": "application/javascript",
    "etag": "\"d4-LE5Ei/oOd25I37m+s5Slp3Kf19k\"",
    "mtime": "2022-02-23T06:01:13.538Z",
    "path": "../public/_nuxt/2cdd07a.js"
  },
  "/_nuxt/46c4e7a.js": {
    "type": "application/javascript",
    "etag": "\"ce-LoWc6wO/u5nylaXQ9Qwg93ldVM4\"",
    "mtime": "2022-02-23T06:01:13.538Z",
    "path": "../public/_nuxt/46c4e7a.js"
  },
  "/_nuxt/7307d1d.js": {
    "type": "application/javascript",
    "etag": "\"f70-mk1nV7S0EAQvibevtYytlW3ZLME\"",
    "mtime": "2022-02-23T06:01:13.541Z",
    "path": "../public/_nuxt/7307d1d.js"
  },
  "/_nuxt/94117bd.js": {
    "type": "application/javascript",
    "etag": "\"18522-QjVkUxnGjpRSstjzgZoVvd13E+k\"",
    "mtime": "2022-02-23T06:01:13.538Z",
    "path": "../public/_nuxt/94117bd.js"
  },
  "/_nuxt/de593d6.js": {
    "type": "application/javascript",
    "etag": "\"38a9-F0N1y6Km9C4b+08uRXWBxW4DFuo\"",
    "mtime": "2022-02-23T06:01:13.538Z",
    "path": "../public/_nuxt/de593d6.js"
  },
  "/_nuxt/fa91da6.js": {
    "type": "application/javascript",
    "etag": "\"56922-cm2PlNnPutOcU36xDxUt7/FMY7c\"",
    "mtime": "2022-02-23T06:01:13.541Z",
    "path": "../public/_nuxt/fa91da6.js"
  },
  "/_nuxt/ffd355d.js": {
    "type": "application/javascript",
    "etag": "\"e95-PHRa15nxGmNVZfYHEcS++PVYae4\"",
    "mtime": "2022-02-23T06:01:13.538Z",
    "path": "../public/_nuxt/ffd355d.js"
  },
  "/_nuxt/css/2c65101.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c521-KQJEBEWgHIrkQI8up/PGlkLfCP4\"",
    "mtime": "2022-02-23T06:01:13.541Z",
    "path": "../public/_nuxt/css/2c65101.css"
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
const STATIC_ASSETS_BASE = "/_nuxt/C:/Workspace/web.carbar/dist" + "/" + "1645596057";
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
