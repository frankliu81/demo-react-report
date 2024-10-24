const { build } = require("esbuild");
const { dependencies } = require("./package.json");

const entryFile = "src/index.tsx";
const shared = {
  bundle: true,
  loader: { '.js': 'jsx' },
  entryPoints: [entryFile],
  // Treat all dependencies in package.json as externals to keep bundle size to a minimum
  external: Object.keys(dependencies),
  logLevel: "info",
  minify: true,
  sourcemap: true,
  platform: "node"
};

build({
  ...shared,
  outfile: "./dist/index.js"
})

// build({
//   ...shared,
//   format: "esm",
//   outfile: "./dist/index.esm.js",
//   target: ["esnext", "node12.22.0"],
// });

// build({
//   ...shared,
//   format: "cjs",
//   outfile: "./dist/index.cjs.js",
//   target: ["esnext", "node12.22.0"],
// });