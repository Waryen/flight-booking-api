import esbuild from "esbuild";

await esbuild
  .build({
    entryPoints: ['./src/main.ts'],
    outfile: './dist/index.js',
    minify: true,
    bundle: true,
    platform: 'node',
    target: 'node16.20',
    external: ['mock-aws-s3', 'aws-sdk', 'nock'],
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
