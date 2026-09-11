---
"@mansi-manhas/navigation-ui": minor
---

`Breadcrumbs` gains a `trail` prop alongside the now-deprecated `items` prop — same component, same import, no new name to migrate to. `trail` uses `title` instead of `label` and injects the "Home" crumb automatically instead of requiring every call site to repeat it. `items` keeps working exactly as before (dev-mode console warning only).

No consumer is forced to migrate by this release. `items` will be removed in a future major version once `node scripts/find-breadcrumbs-usage.mjs` reports zero remaining call sites.
