#!/usr/bin/env node

import { constants } from "fs";
import { access, mkdir, mkdtemp, writeFile } from "fs/promises";
import os from "os";
import path from "path";
import { build } from "tsup";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function printUsage() {
  console.error("Usage: wirevana build-canvas <entry>");
}

async function ensureEntryExists(entryPath: string) {
  try {
    await access(entryPath, constants.F_OK);
  } catch (error) {
    throw new Error(`Entry module not found at ${entryPath}`);
  }
}

async function createVirtualEntry(entryModule: string) {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "wirevana-build-"));
  const virtualEntryPath = path.join(tempDir, "bundle-entry.ts");

  const runtimeEntry = path.resolve(__dirname, "../../runtime/src/index.ts");
  const rendererEntry = path.resolve(__dirname, "../../renderer/src/index.ts");

  const virtualSource = `import * as runtime from ${JSON.stringify(
    pathToFileURL(runtimeEntry).href
  )};
import * as renderer from ${JSON.stringify(pathToFileURL(rendererEntry).href)};
import * as userModule from ${JSON.stringify(pathToFileURL(entryModule).href)};

const runtimeContext = { runtime, renderer, module: userModule };

function isPromise(value: unknown): value is Promise<unknown> {
  return !!value && typeof (value as Promise<unknown>).then === "function";
}

export async function renderToCanvas(canvasEl: HTMLElement) {
  if (!canvasEl) {
    throw new Error("renderToCanvas(canvasEl) requires a valid canvas element.");
  }

  const candidate =
    (userModule as Record<string, unknown>).renderToCanvas ??
    (userModule as Record<string, unknown>).render;

  if (typeof candidate === "function") {
    const result = candidate(canvasEl, runtimeContext);
    if (isPromise(result)) {
      await result;
    }
    return runtimeContext;
  }

  const fallback = (renderer as Record<string, unknown>).renderToCanvas;
  if (typeof fallback === "function") {
    const result = fallback(canvasEl, runtimeContext);
    if (isPromise(result)) {
      await result;
    }
    return runtimeContext;
  }

  throw new Error(
    "Wirevana Canvas bundle requires the entry module to export a renderToCanvas(canvasEl) or render() function."
  );
}

export const wirevanaRuntime = runtime;
export const wirevanaRenderer = renderer;
export const wirevanaModule = userModule;
`;

  await writeFile(virtualEntryPath, virtualSource, "utf8");
  return virtualEntryPath;
}

async function runBuild(entryPath: string) {
  const outDir = path.resolve(process.cwd(), "dist", "canvas");
  await mkdir(outDir, { recursive: true });

  const virtualEntry = await createVirtualEntry(entryPath);

  await build({
    entry: {
      "wirevana-canvas": virtualEntry,
    },
    format: ["esm"],
    sourcemap: true,
    splitting: false,
    treeshake: true,
    minify: false,
    bundle: true,
    dts: false,
    clean: false,
    outDir,
    target: "es2020",
    platform: "browser",
    outExtension({ format }) {
      return {
        js: format === "esm" ? ".mjs" : ".js",
      };
    },
    esbuildOptions(options) {
      const runtimeEntry = path.resolve(__dirname, "../../runtime/src/index.ts");
      const rendererEntry = path.resolve(__dirname, "../../renderer/src/index.ts");
      options.alias = {
        ...(options.alias ?? {}),
        "@wirevana/runtime": runtimeEntry,
        "@wirevana/renderer": rendererEntry,
      };
    },
  });

  return path.join(outDir, "wirevana-canvas.mjs");
}

async function main() {
  const [, , command, maybeEntry] = process.argv;

  if (command !== "build-canvas") {
    printUsage();
    process.exitCode = 1;
    return;
  }

  if (!maybeEntry) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const entryPath = path.resolve(process.cwd(), maybeEntry);

  try {
    await ensureEntryExists(entryPath);
    const bundlePath = await runBuild(entryPath);
    console.log(bundlePath);
  } catch (error) {
    console.error((error as Error).message);
    process.exitCode = 1;
  }
}

void main();
