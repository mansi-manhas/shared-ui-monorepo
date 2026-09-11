---
"@mansi-manhas/navigation-ui": minor
"@mansi-manhas/demo-app": minor
---

Add `NavigationPanel`, a grouped-sections replacement for `Sidebar`'s flat/nested item list. This is the component's permanent name, not a placeholder — there is no future rename planned, so adopting it now is not throwaway work.

`Sidebar` is unchanged and remains the default; `demo-app`'s `AppLayout` gates `NavigationPanel` behind a "New grouped navigation (beta)" toggle so it can be canaried and rolled back instantly without touching any other file. `Sidebar` will only be deprecated once the new component's rollout is validated.
