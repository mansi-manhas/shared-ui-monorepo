# @my-org/user-profile-ui

Reusable user profile UI: profile cards, headers, forms, and account settings. Built on [`@my-org/components-ui`](../components-ui).

## Installation

```sh
pnpm add @my-org/user-profile-ui
```

Peer dependencies match `components-ui`.

## Usage

```tsx
import { ProfileHeader, ProfileForm, type ProfileFormData } from "@my-org/user-profile-ui";

const user = { id: "1", name: "Jordan Avery", email: "jordan@example.com" };

<ProfileHeader user={user} status="online" onEdit={() => setEditing(true)} />

<ProfileForm
  user={user}
  onSave={async (data: ProfileFormData) => api.updateProfile(data)}
  onCancel={() => setEditing(false)}
/>;
```

## Available components

| Component | Notes |
| --- | --- |
| `UserProfileCard` | Compact avatar + name/email/phone card, optional `footer`. |
| `UserAvatar` | `Avatar` from `components-ui` plus an optional presence dot (`online` \| `away` \| `offline`). |
| `UserDetails` | Read-only name/title/email/phone list. |
| `ProfileHeader` | Banner-style header with avatar, name, title, bio, and an "Edit profile" action. |
| `ProfileForm` | Name, email, phone, avatar upload (with local preview), save/cancel, client-side validation, `loading`. |
| `AccountSettings` | Notification toggles, "change password" and "delete account" sections — each section only renders if you pass its callback. |

`ProfileForm`'s `onSave` receives `{ name, email, phone, avatarFile }` — `avatarFile` is the raw `File` the user selected, so the host app decides how to upload it.

## Scripts

```sh
pnpm --filter @my-org/user-profile-ui build
pnpm --filter @my-org/user-profile-ui dev
pnpm --filter @my-org/user-profile-ui typecheck
```
