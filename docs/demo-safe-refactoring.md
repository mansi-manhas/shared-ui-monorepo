# Demo: Safe Refactoring — Two Kinds of Breaking Change

Backing demo for the talk "Safe Refactoring: The Cost of Change at Scale."
Stands in for the DatePicker story using components that actually live in
this repo. Two patterns, deliberately different in shape:

1. **A small breaking change (prop rename)** — handled *inside the same
   component*, no new export name ever introduced.
2. **A large breaking change (different functionality)** — genuinely needs a
   new component, so it gets a real, permanent name from day one and is
   rolled out behind a feature flag instead of a big-bang swap.

The naming rule behind both: never introduce a name you intend to delete
later (`XyzNew`, `XyzV2`). If the change is small enough to fit in the
existing component, keep the name. If it's big enough to need a new
component, give it the name it will have forever.

---

## Pattern 1 — deprecate a prop, not the component (`Breadcrumbs`)

`Breadcrumbs` (`packages/navigation-ui/src/components/Breadcrumbs.tsx`) is
rendered on every page of `demo-app` (Dashboard, Settings, Profile,
Showcase) — the same way a shared DatePicker would render on every page of 8
different applications.

Current state in the repo:

- `Breadcrumbs` — same component, same import, forever. It now accepts a
  deprecated `items` prop (`{ label, href?, onClick? }[]`, caller repeats
  "Home" every time) **and** a new `trail` prop (`{ title, href?, onClick? }[]`,
  "Home" injected automatically). Passing `items` logs a dev-only console
  warning, once.
- `packages/demo-app/src/pages/DashboardPage.tsx` — migrated to `trail`.
- `SettingsPage` / `ProfilePage` / `ShowcasePage` — still on `items`,
  untouched, still fully working.
- `scripts/find-breadcrumbs-usage.mjs` — audit script listing every call
  site and which prop it uses.
- `.changeset/breadcrumbs-trail-prop.md` — a **minor** bump, because nothing
  broke.

Verified: both props render byte-identical MUI/emotion markup for equivalent
data, and the deprecation warning fires exactly once with a clear migration
message (checked via `react-dom/server` against the real built `dist/`).

### Act 1 — what the naive version of this looks like (live-break, then revert)

The point: prove the compiler is not a safety net here. `demo-app`
type-checks against `navigation-ui`'s **built** `dist/index.d.ts`, not its
source — a source change is invisible to every consumer until the library is
rebuilt.

```bash
# Make the "obviously fine" breaking change directly in Breadcrumbs.tsx:
# rename `items` -> `trail` and `label` -> `title` in place, with no
# backward-compatible prop, and no BreadcrumbsProps dual shape.

pnpm --filter @mansi-manhas/navigation-ui build     # the change becomes real
pnpm --filter @mansi-manhas/demo-app typecheck      # now it breaks, everywhere, at once
```

Verified real output — four call sites fail simultaneously, all in files
owned by whoever owns `demo-app`, not by whoever made the change:

```
src/pages/DashboardPage.tsx(19,20): error TS2322: Type '{ items: (...)[]; }' is not assignable to type 'IntrinsicAttributes & BreadcrumbsProps'.
  Property 'items' does not exist on type 'IntrinsicAttributes & BreadcrumbsProps'.
src/pages/ProfilePage.tsx(25,20): error TS2322: ... Property 'items' does not exist ...
src/pages/SettingsPage.tsx(17,20): error TS2322: ... Property 'items' does not exist ...
src/pages/ShowcasePage.tsx(38,20): error TS2322: ... Property 'items' does not exist ...
```

Talking point: the code change took thirty seconds. Fixing four call sites
across pages you may not own, on someone else's release schedule, is the
actual cost — and it's a coordination cost, not a coding one.

```bash
git checkout -- packages/navigation-ui/src/components/Breadcrumbs.tsx
pnpm --filter @mansi-manhas/navigation-ui build     # restore dist/ to the real state
```

### Act 2 — the safe version, already in the repo

Run the app (`pnpm dev:demo`), open the dev console, navigate between pages:

- Dashboard renders via `trail` — pixel-identical to the rest.
- Settings / Profile / Showcase render via `items` — a console warning fires
  once, naming the replacement prop and the audit script.

Same component the whole time. Nobody changes an import statement.

### Act 3 — the coordination problem doesn't go away, it becomes visible

```bash
node scripts/find-breadcrumbs-usage.mjs
```

```
Breadcrumbs migration audit (`items` prop -> `trail` prop)

Migrated (1):
  [x] packages/demo-app/src/pages/DashboardPage.tsx

Still on deprecated `items` prop (3):
  [ ] packages/demo-app/src/pages/ProfilePage.tsx
  [ ] packages/demo-app/src/pages/SettingsPage.tsx
  [ ] packages/demo-app/src/pages/ShowcasePage.tsx

3 call site(s) across 1 package(s) still need a coordinated PR before the `items` prop can be deleted.
```

In this repo it's one package and three files. At the scale the talk
describes — 8 applications, several teams — this same script is the
difference between "we think most people have migrated" and an actual list
of names and PRs. The script finds the call sites; it does not make other
teams merge them. `items` only gets deleted, and the major version only
ships, once that list is empty.

---

## Pattern 2 — deprecate the functionality, replace the component (`Sidebar` → `NavigationPanel`)

`Sidebar` isn't a per-page component like `Breadcrumbs` — it's mounted once,
in `AppLayout`, and persists across every route in the app. If a shared
DatePicker's *behavior* needed to change (not just a prop name — e.g. adding
range selection, changing its whole interaction model), this is the closer
analogy: you can't express "grouped sections with headers" as a new prop on
a component built around a flat/nested item list. It needs a new component.

The naming decision this time: **don't call it `SidebarNew`.** A disposable
name means whoever adopts it early has to migrate *again* later when it gets
its real name. `NavigationPanel` is the permanent name — there is no planned
future rename.

Current state in the repo:

- `Sidebar` (`packages/navigation-ui/src/components/Sidebar.tsx`) — unchanged. Takes a flat/nested `items: SidebarItem[]` tree with per-node expand/collapse.
- `NavigationPanel` (`packages/navigation-ui/src/components/NavigationPanel.tsx`) — the replacement, for real, forever. Takes `sections: NavigationSection[]` — named groups with headers, no nested tree. This is a genuine information-architecture change: migrating means re-modeling your nav data, not find-and-replacing an import.
- `packages/demo-app/src/layout/AppLayout.tsx` — renders **both**, gated by a live "New grouped navigation (beta)" `Switch` in the header. Flip it and the sidebar visually changes shape immediately; flip it back and you're on the old one instantly — zero redeploy, zero import changes anywhere else.
- `.changeset/navigation-panel.md` — a **minor** bump. `Sidebar` isn't deprecated yet.

### Live demo

1. Run `pnpm dev:demo`, log in, land on the dashboard.
2. Point out the flat `Sidebar`: "Account" is a collapsible child node mixed into a single list.
3. Flip "New grouped navigation (beta)" in the top bar. Same routes, same links, now organized into "Workspace" and "Account" sections with headers, no nesting.
4. Flip it back. Nothing broke, nothing reloaded, no code changed.

Talking point: this is what a feature flag is *for* in this kind of
migration — not a permanent architecture, but a way to prove the new
component is safe with a subset of traffic before anyone commits to it. Only
once that's validated does `Sidebar` get its own deprecation warning (like
`Breadcrumbs`'s `items` prop did) and its own audit script — the same Act 3
pattern, run again, once there's real usage data to justify starting the
clock on removal.
