const { build } = require("esbuild");
const { dependencies } = require("./package.json");

const entryFile = "src2/index.js";
const shared = {
  bundle: true,
  loader: { '.js': 'jsx' },
  outdir: './build/static/js',
  entryPoints: [entryFile],
  // Treat all dependencies in package.json as externals to keep bundle size to a minimum
  external: Object.keys(dependencies),
  logLevel: "info",
  minify: true,
  sourcemap: true,
};

build({
  ...shared,
})