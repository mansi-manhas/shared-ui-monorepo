# @mansi-manhas/navigation-ui

Reusable navigation UI: navbar, sidebar, breadcrumbs, tabs, and menus. Built on [`@mansi-manhas/components-ui`](../components-ui) and `react-router-dom` — items with an `href` render as router `Link`s so navigation stays client-side (no full page reload).

## Installation

```sh
pnpm add @mansi-manhas/navigation-ui
```

Must be rendered inside a `react-router-dom` `<BrowserRouter>` (or another router). Peer dependencies otherwise match `components-ui`.

## Usage

```tsx
import { Navbar, Sidebar, UserMenu } from "@mansi-manhas/navigation-ui";

<Navbar
  logo={<Logo />}
  items={[
    { id: "dashboard", label: "Dashboard", href: "/dashboard", active: true },
    { id: "reports", label: "Reports", href: "/reports" },
  ]}
  userActions={
    <UserMenu
      name="Jordan Avery"
      email="jordan@example.com"
      items={[
        { id: "profile", label: "View profile", onClick: () => navigate("/profile") },
        { id: "logout", label: "Log out", destructive: true, divider: true, onClick: logout },
      ]}
    />
  }
/>;
```

## Available components

| Component | Notes |
| --- | --- |
| `Navbar` | `logo`, `items: NavItem[]`, `userActions`. Collapses to a slide-out drawer with a hamburger toggle below the `md` breakpoint. |
| `Sidebar` | `items: SidebarItem[]` (supports nested `children`), `collapsed`, `onToggleCollapsed`. |
| `Breadcrumbs` | `items: { label, href?, onClick? }[]`. Last item renders as the current page. |
| `Tabs` | `items: TabItem[]`, controlled `value`/`onChange`. |
| `DropdownMenu` | `trigger` (any element that forwards a ref/onClick), `items`. |
| `UserMenu` | Avatar + name/email trigger wired to a `DropdownMenu`. |

`NavItem` / `SidebarItem` shape:

```ts
interface NavItem {
  id: string;
  label: string;
  href?: string;   // rendered as a router Link when present
  onClick?: () => void;
  active?: boolean;
  icon?: React.ReactNode;
}
```

## Scripts

```sh
pnpm --filter @mansi-manhas/navigation-ui build
pnpm --filter @mansi-manhas/navigation-ui dev
pnpm --filter @mansi-manhas/navigation-ui typecheck
```
