#!/usr/bin/env node
// Guards against the workspace:* protocol leaking into a published package.
//
// `workspace:*` only means something to pnpm/yarn/npm workspaces locally.
// `pnpm publish` rewrites it to a real version when packing, but any publish
// path that skips pnpm (e.g. running `npm publish` directly inside a package
// dir) writes the literal string into the published package.json. npm
// doesn't validate that dependency ranges are resolvable, so this fails
// completely silently until a consumer tries to install the package.
//
// This re-packs each publishable package exactly as pnpm would for a real
// publish, then inspects the resulting tarball (not the source package.json,
// which still legitimately says "workspace:*") for any dependency range that
// wasn't resolved to a real version. Run before every publish.

import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const packagesDir = path.join(rootDir, "packages");

function listPublishablePackages() {
	return readdirSync(packagesDir, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.map((entry) => path.join(packagesDir, entry.name))
		.filter((dir) => {
			try {
				const pkg = JSON.parse(readFileSync(path.join(dir, "package.json"), "utf8"));
				return !pkg.private;
			} catch {
				return false;
			}
		});
}

function packAndReadPackageJson(pkgDir, tmpDir) {
	const tarballPath = execFileSync(
		"pnpm",
		["pack", "--pack-destination", tmpDir],
		{ cwd: pkgDir, encoding: "utf8" },
	)
		.trim()
		.split("\n")
		.pop();
	const packageJsonText = execFileSync("tar", [
		"-xOzf",
		tarballPath,
		"package/package.json",
	]).toString("utf8");

	return JSON.parse(packageJsonText);
}

function findUnresolvedWorkspaceDeps(pkg) {
	const problems = [];
	for (const depField of ["dependencies", "peerDependencies", "optionalDependencies"]) {
		const deps = pkg[depField];
		if (!deps) continue;
		for (const [depName, range] of Object.entries(deps)) {
			if (typeof range === "string" && range.startsWith("workspace:")) {
				problems.push({ depField, depName, range });
			}
		}
	}
	return problems;
}

function main() {
	const packageDirs = listPublishablePackages();
	const tmpDir = mkdtempSync(path.join(tmpdir(), "verify-tarball-deps-"));
	const failures = [];

	try {
		for (const pkgDir of packageDirs) {
			const packedPkg = packAndReadPackageJson(pkgDir, tmpDir);
			const problems = findUnresolvedWorkspaceDeps(packedPkg);
			if (problems.length > 0) {
				failures.push({ name: packedPkg.name, version: packedPkg.version, problems });
			}
		}
	} finally {
		rmSync(tmpDir, { recursive: true, force: true });
	}

	if (failures.length > 0) {
		console.error("\n✗ Found unresolved workspace: protocol dependencies in packed tarballs:\n");
		for (const failure of failures) {
			console.error(`  ${failure.name}@${failure.version}`);
			for (const problem of failure.problems) {
				console.error(`    ${problem.depField}.${problem.depName} = "${problem.range}"`);
			}
		}
		console.error(
			"\nThese packages would silently fail to install for anyone outside this pnpm workspace " +
				"(npm has no idea what \"workspace:\" means). Publish with `pnpm publish` / `pnpm changeset " +
				"publish`, not bare `npm publish`, so the workspace protocol gets rewritten to a real version.\n",
		);
		process.exit(1);
	}

	console.log(`✓ ${packageDirs.length} package(s) packed cleanly, no unresolved workspace: deps.`);
}

main();
