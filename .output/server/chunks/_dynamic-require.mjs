const dynamicChunks = {
  "13.mjs": () => import('./13.mjs'),
  "155.mjs": () => import('./155.mjs'),
  "543.mjs": () => import('./543.mjs'),
  "562.mjs": () => import('./562.mjs')
};

function dynamicRequire(id) {
  return dynamicChunks[id]();
}

export { dynamicRequire as default };
