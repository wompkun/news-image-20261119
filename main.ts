// main.ts — news-image-20261119
//
// One image summing up the world's news of Thursday 19 November 2026.
// The image is entry.png, held in this repository. This program copies it
// to the output directory, unchanged, as entry.png. It uses only the Node
// standard library, makes no network requests, and is deterministic: every
// run writes the same bytes.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SOURCE = resolve(__dirname, "entry.png");
const OUTPUT_DIR = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
const TARGET = join(OUTPUT_DIR, "entry.png");

// Validate the image before copying it: it must be a PNG, under 1 MiB,
// and at most 1024 by 1024 pixels. Dimensions are read from the IHDR
// chunk (width at bytes 16-19, height at bytes 20-23, big-endian).
function validatePng(path: string): { width: number; height: number; bytes: number } {
  const bytes = statSync(path).size;
  if (bytes > 1024 * 1024) {
    throw new Error(`news-image: entry.png is ${bytes} bytes, over the 1 MiB limit`);
  }
  const buf = readFileSync(path);
  const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buf.length < 33 || !buf.subarray(0, 8).equals(pngSignature)) {
    throw new Error("news-image: entry.png is not a PNG file");
  }
  if (buf.toString("ascii", 12, 16) !== "IHDR") {
    throw new Error("news-image: entry.png has no IHDR chunk");
  }
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  if (width > 1024 || height > 1024) {
    throw new Error(`news-image: entry.png is ${width}x${height}, over the 1024x1024 limit`);
  }
  return { width, height, bytes };
}

if (!existsSync(SOURCE)) {
  console.error(`news-image: source image not found: ${SOURCE}`);
  process.exit(1);
}

let dims: { width: number; height: number; bytes: number };
try {
  dims = validatePng(SOURCE);
} catch (err) {
  console.error((err as Error).message);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(SOURCE, TARGET);
console.log(`news-image: wrote ${TARGET} (${dims.width}x${dims.height}, ${dims.bytes} bytes)`);
