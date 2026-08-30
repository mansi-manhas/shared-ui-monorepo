# @mansi-manhas/demo-app

A small application that consumes all four shared UI packages, showing how a real app is meant to wire them together: authentication, layout, profile management, and a live component gallery. **Not published** (`private: true`) — it exists only to demonstrate and manually test the packages in this monorepo.

## Pages

| Route | Package(s) used |
| --- | --- |
| `/login`, `/forgot-password` | `auth-ui` |
| `/dashboard` | `navigation-ui`, `components-ui` |
| `/profile` | `user-profile-ui`, `navigation-ui` |
| `/settings` | `user-profile-ui`, `navigation-ui` |
| `/showcase` | `components-ui`, `navigation-ui` |

Auth is mocked in `src/state/SessionContext.tsx` — any email/password combination that passes basic validation logs you in (there is no real backend). The session lives only in memory, so a full page reload returns you to `/login`.

## Run it

```sh
pnpm install
pnpm --filter @mansi-manhas/demo-app dev
# or from the repo root:
pnpm dev:demo
```

Then open http://localhost:5173.

## Build

```sh
pnpm --filter @mansi-manhas/demo-app build
```
