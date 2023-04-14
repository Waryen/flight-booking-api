import esbuild from "esbuild";

await esbuild
  .build({
    entryPoints: ['./src/server.ts'],
    outfile: './dist/index.js',
    minify: true,
    bundle: true,
    platform: 'node',
    target: 'node16.20',
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
