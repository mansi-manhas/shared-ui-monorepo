# @mansi-manhas/navigation-ui

## 3.0.2

### Patch Changes

- Republish with the `@mansi-manhas/components-ui` dependency resolved to a real version. 3.0.1 was published via a manual `npm publish` step that doesn't understand the `workspace:` protocol, so it shipped with `"@mansi-manhas/components-ui": "workspace:*"` literally in `package.json`, which fails to resolve for any consumer outside this workspace. No code changes — this is a republish to fix the dependency metadata.

## 3.0.1

### Patch Changes

- minor config changes
- Updated dependencies [`61caea3`]:
  - @mansi-manhas/components-ui@3.0.1

## 3.0.0

### Major Changes

- changeset config update

- initial commit with all the basic components

### Patch Changes

- Updated dependencies [`01d2bd8`, `01d2bd8`]:
  - @mansi-manhas/components-ui@3.0.0
