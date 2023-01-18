const { build } = require("esbuild");
const { dependencies } = require("./package.json");

const entryFile = "src/SSRApp.js";
const shared = {
  bundle: true,
  loader: { '.js': 'jsx' },
  entryPoints: [entryFile],
  // Treat all dependencies in package.json as externals to keep bundle size to a minimum
  external: Object.keys(dependencies),
  logLevel: "info",
  minify: true,
  sourcemap: true,
  // 	https://github.com/evanw/esbuild/issues/29
  platform: "node",
  // https://github.com/evanw/esbuild/issues/44
  // https://github.com/evanw/esbuild/issues/704
  define: {
    'process.env.NODE_ENV': '\"production\"'
  },
};

build({
  ...shared,
  outfile: "./dist/template.js"
})
