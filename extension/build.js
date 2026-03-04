import esbuild from "esbuild";
import fs from "fs";
import path from "path";

const watch = process.argv.includes("--watch");

const shared = {
  bundle: true,
  platform: "browser",
  target: "chrome120",
  minify: !watch,
  sourcemap: watch ? "inline" : false,
};

// Ensure dist dir exists
fs.mkdirSync("dist", { recursive: true });

// Copy static files
fs.copyFileSync("popup/popup.html", "dist/popup.html");
fs.copyFileSync("manifest.json", "dist/manifest.json");

// Copy icon if it exists
if (fs.existsSync("icons")) {
  fs.cpSync("icons", "dist/icons", { recursive: true });
}

const entryPoints = [
  { in: "src/popup.ts", out: "dist/popup" },
  { in: "src/content.ts", out: "dist/content" },
  { in: "src/background.ts", out: "dist/background" },
];

if (watch) {
  const ctx = await esbuild.context({
    ...shared,
    entryPoints: entryPoints.map(e => ({ in: e.in, out: e.out })),
    outdir: ".",
    outExtension: { ".js": ".js" },
  });
  await ctx.watch();
  console.log("Watching for changes...");
} else {
  await esbuild.build({
    ...shared,
    entryPoints: entryPoints.map(e => ({ in: e.in, out: e.out.replace("dist/", "") })),
    outdir: "dist",
  });
  console.log("Build complete → dist/");
}
