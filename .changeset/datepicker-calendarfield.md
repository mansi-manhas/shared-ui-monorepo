---
"@mansi-manhas/components-ui": minor
"@mansi-manhas/demo-app": minor
---

Add `CalendarField`, the permanent replacement for `DatePicker` — same job, built on the same
`TextField` foundation as `Input` and `Select`, so it gets error state, helper text, and disabled
styling for free. This is the component's real name from day one; there is no planned rename.

`DatePicker` is now deprecated in its entirety rather than a single prop: it predates this
package's shared field styling (bare native input, no error/helper text, no `TextField`), so there
is no backward-compatible prop to add to it the way `Breadcrumbs` gained `trail`. It keeps working
exactly as before — a dev-mode console warning points at `CalendarField` — and will be removed in a
future major version.
