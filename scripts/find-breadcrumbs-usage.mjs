#!/usr/bin/env node
// Usage audit for the Breadcrumbs `items` -> `trail` prop migration (navigation-ui).
//
// Consuming packages here type-check against each library's *built*
// dist/index.d.ts, not its source (see each package.json's "types" field).
// That means a breaking source change is invisible to consumers until the
// library is rebuilt and republished — the compiler will not warn anyone
// this exists. This script is the piece that replaces "the compiler will
// catch it" with "here is every call site, by hand" — the same audit you'd
// run before deprecating a shared DatePicker prop across 8 applications.
//
// It's a plain regex over each <Breadcrumbs ...> JSX tag, not an AST codemod
// — good enough to find every call site here, but a real migration at scale
// would use a proper codemod (jscodeshift / ts-morph) instead of this.

import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const packagesDir = path.join(rootDir, "packages");

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === "dist") continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (/\.tsx?$/.test(entry)) files.push(full);
  }
  return files;
}

const importFromNavUi = /from\s*["']@mansi-manhas\/navigation-ui["']/;
const tagPattern = /<Breadcrumbs\b[\s\S]*?\/?>/g;

const migrated = [];
const legacy = [];

for (const pkg of readdirSync(packagesDir)) {
  const srcDir = path.join(packagesDir, pkg, "src");
  try {
    statSync(srcDir);
  } catch {
    continue;
  }

  for (const file of walk(srcDir)) {
    if (file.endsWith(path.join("components", "Breadcrumbs.tsx"))) continue;

    const contents = readFileSync(file, "utf8");
    if (!importFromNavUi.test(contents)) continue;

    const rel = path.relative(rootDir, file);
    const tags = contents.match(tagPattern) ?? [];
    for (const tag of tags) {
      if (/\btrail\s*=/.test(tag)) migrated.push(rel);
      else if (/\bitems\s*=/.test(tag)) legacy.push(rel);
    }
  }
}

console.log("Breadcrumbs migration audit (`items` prop -> `trail` prop)\n");

console.log(`Migrated (${migrated.length}):`);
for (const f of migrated) console.log(`  [x] ${f}`);

console.log(`\nStill on deprecated \`items\` prop (${legacy.length}):`);
for (const f of legacy) console.log(`  [ ] ${f}`);

const owningPackages = new Set(legacy.map((f) => f.split(path.sep)[1]));
console.log(
  `\n${legacy.length} call site(s) across ${owningPackages.size} package(s) still need a coordinated PR ` +
    "before the `items` prop can be deleted.",
);
