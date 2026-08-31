# Important Commands

Reference for the commands you'll use regularly in this monorepo, grouped by task.

## Setup

### `pnpm install`
Installs dependencies for every package in the workspace (root + all `packages/*`) and links workspace packages (e.g. `@mansi-manhas/components-ui`) to each other via symlinks.
**When to use:** After cloning the repo, after pulling changes that touch `package.json`/`pnpm-lock.yaml`, or after adding/removing a dependency.

---

## Development

### `pnpm dev:demo`
Runs `vite` inside `packages/demo-app`, starting a local dev server (default `http://localhost:5173`) with hot reload.
**When to use:** When you want to see the shared UI packages rendered in a real app while you work on them.

### `pnpm --filter <package-name> dev`
Runs a single package's `dev` script (e.g. `pnpm --filter @mansi-manhas/auth-ui dev` runs `tsup --watch`), rebuilding its `dist/` on every change.
**When to use:** When editing a library package and you want `demo-app` (or another consumer) to pick up changes live. Typically run this alongside `pnpm dev:demo` in a separate terminal.

---

## Building & Type Checking

### `pnpm build`
Runs the `build` script in every workspace package (`pnpm -r run build`). For the 4 library packages this runs `tsup`, producing `dist/`.
**When to use:** Before publishing (packages ship the `dist/` folder, not source), or to confirm everything compiles before a PR.

### `pnpm typecheck`
Builds all packages, then runs `tsc --noEmit` across the workspace to catch type errors without emitting files.
**When to use:** Before committing/pushing, or in CI, to catch type errors that `build` alone might not surface.

### `pnpm --filter <package-name> build`
Builds just one package (e.g. `pnpm --filter @mansi-manhas/demo-app build`, which runs `tsc --noEmit && vite build`).
**When to use:** Faster iteration when you only care about one package's output.

---

## Dependency Hygiene

### `pnpm lint:versions`
Runs `syncpack lint` to check that dependency versions are consistent across all `package.json` files in the workspace (e.g. all packages pinning the same React version).
**When to use:** Before publishing a batch of packages, or periodically to catch version drift.

### `pnpm add -Dw <package>`
Adds a dev dependency to the **root** `package.json` (`-w` = workspace root), rather than a specific package.
**When to use:** For tooling that applies to the whole repo (e.g. `@changesets/cli`, `syncpack`), not to an individual library.

### `pnpm run publish:verify`
Packs every publishable package the same way pnpm would for a real publish, then inspects each resulting tarball's `package.json` for any dependency still on the `workspace:` protocol (e.g. `"@mansi-manhas/components-ui": "workspace:*"`). Fails loudly, naming the exact package and dependency, instead of letting it slip through — a package published with a raw `workspace:*` dependency installs fine locally but fails silently (`exit code 1`, no useful message) for every consumer outside this workspace.
**When to use:** Before every publish, and always before a manual `cd packages/<name> && pnpm publish` for a package's first release.

---

## Versioning (Changesets)

### `pnpm changeset`
Interactive prompt: pick which packages changed, whether it's a `patch`/`minor`/`major` bump, and write a short summary. Creates a markdown file in `.changeset/`.
**When to use:** Every time you make a change to a library package that should ship as a new version — ideally as part of the same PR as the code change.

### `pnpm changeset version`
Consumes all pending `.changeset/*.md` files, bumps the affected packages' versions in their `package.json`, updates their `CHANGELOG.md`, and deletes the consumed changeset files.
**When to use:** When you're ready to cut a release — typically right before publishing, on `main`.

### `pnpm changeset publish`
Publishes any package whose current version isn't yet on the registry (per `publishConfig` in each `package.json`), and tags the commit.
**When to use:** After `pnpm changeset version` has bumped versions and you've built the packages. This is the normal path for all publishes **after** a package's first-ever release.

> **First publish only:** GitHub Packages returns a 404 for a package that's never been published, which `pnpm changeset publish` treats as fatal. For a package's very first version, publish it manually instead:
> ```bash
> cd packages/<name> && pnpm publish --no-git-checks && cd ../..
> ```
> Use `pnpm publish`, **not** bare `npm publish` — a package here can depend on another workspace package via `workspace:*`, and only `pnpm publish`/`pnpm pack` rewrite that to the dependency's real version before publishing. Plain `npm publish` doesn't understand the `workspace:` protocol at all: it writes `"workspace:*"` into the published `package.json` verbatim, with no warning, and installs of that package then fail for every consumer outside this workspace (npm can't resolve `workspace:*`, and the failure is a bare `exit code 1` with no useful message). Run `pnpm run publish:verify` first if you want to confirm a package packs clean before publishing it this way.
>
> After that, `pnpm changeset publish` works normally for all future versions of that package.

### `pnpm -r publish --access restricted`
Publishes every publishable package in the workspace directly (bypassing changesets' version-bump step). Skips already-published versions.
**When to use:** Rarely — only if you're not using changesets for a particular release, or scripting a custom release flow.

---

## Publishing Setup (one-time, per machine)

### `~/.npmrc` with `//npm.pkg.github.com/:_authToken=<PAT>`
Authenticates your local `npm`/`pnpm` with GitHub Packages using a Personal Access Token (scopes: `write:packages`, `read:packages`, `repo` if the repo is private).
**When to use:** Set up once per machine before you can publish. Never commit this file — it lives in your home directory, not the repo.

---

## Quick Reference: Typical Release Flow

```bash
# 1. Make your code change in a package
# 2. Record the change and intended bump
pnpm changeset

# 3. Commit the changeset file alongside your code change, open a PR, merge to main

# 4. On main, bump versions from pending changesets
pnpm changeset version

# 5. Build the packages (dist/ isn't committed)
pnpm build

# 6. Verify no package would publish with an unresolved workspace: dependency
pnpm run publish:verify

# 7. Publish
pnpm changeset publish
```


---

Here's the rest of the flow:

# 1. Bump versions from the changeset (local, reversible — just edits package.json/CHANGELOG.md)
pnpm changeset version

# 2. Build (dist/ isn't committed)
pnpm build

# 3. Verify the fix actually worked before publishing
pnpm run publish:verify

# 4. Commit the version bump
git add .changeset packages/auth-ui packages/navigation-ui packages/user-profile-ui
git commit -m "fix: republish auth-ui, navigation-uiolved workspace dependency"

# 5. Publish (needs your GitHub Packages token in ~/
pnpm changeset publish

# 6. Push
git push
          
---

Since changeset version already ran and consumed the changeset (confirmed: .changeset/ is back to just README.md/config.json, versions are 3.0.2), what's left is:

# 1. Build (dist/ isn't committed)
pnpm build

# 2. Verify the fix actually resolves before publishing
pnpm run publish:verify

# 3. Publish — needs your GitHub Packages token in ~/.npmrc
pnpm changeset publish

No new changeset or commit needed — just build, verify, publish. Want me to run steps 1–2 now so you can confirm they're clean before you run the actual publish?