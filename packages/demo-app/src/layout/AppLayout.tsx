import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Navbar,
  Sidebar,
  NavigationPanel,
  UserMenu,
  type SidebarItem,
  type NavigationSection,
  type NavItem,
} from "@mansi-manhas/navigation-ui";
import { useSession } from "../state/SessionContext";

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard" },
  { id: "profile", label: "Profile", href: "/profile" },
  { id: "showcase", label: "Components", href: "/showcase" },
];

// Legacy flat/nested shape, consumed by the deprecated `Sidebar`.
const SIDEBAR_ITEMS: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard" },
  {
    id: "account",
    label: "Account",
    children: [
      { id: "profile", label: "Profile", href: "/profile" },
      { id: "settings", label: "Settings", href: "/settings" },
    ],
  },
  { id: "showcase", label: "Component showcase", href: "/showcase" },
];

// Grouped shape, consumed by the replacement `NavigationPanel`. This is a genuine information-
// architecture change (sections with headers, no nested tree), not a renamed prop — every consumer
// has to re-model their nav data, not just find-and-replace an import.
const NAVIGATION_SECTIONS: NavigationSection[] = [
  {
    id: "workspace",
    label: "Workspace",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/dashboard" },
      { id: "showcase", label: "Component showcase", href: "/showcase" },
    ],
  },
  {
    id: "account",
    label: "Account",
    items: [
      { id: "profile", label: "Profile", href: "/profile" },
      { id: "settings", label: "Settings", href: "/settings" },
    ],
  },
];

export function AppLayout() {
  const { user, logout } = useSession();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);

  // Feature flag for the Sidebar -> NavigationPanel migration. In a real rollout this would read
  // from a flag service (LaunchDarkly, GrowthBook, an internal config) keyed by user/cohort — a
  // plain toggle is enough to demonstrate that consumers can canary the new component and roll
  // back instantly, with zero import changes anywhere else, while both implementations still exist.
  const [groupedNavigationEnabled, setGroupedNavigationEnabled] = React.useState(false);

  const withActiveNav = (items: NavItem[]): NavItem[] =>
    items.map((item) => ({ ...item, active: item.href ? location.pathname.startsWith(item.href) : false }));

  const withActiveSidebar = (items: SidebarItem[]): SidebarItem[] =>
    items.map((item) => ({
      ...item,
      active: item.href ? location.pathname.startsWith(item.href) : false,
      children: item.children ? withActiveSidebar(item.children) : undefined,
    }));

  const withActiveSections = (sections: NavigationSection[]): NavigationSection[] =>
    sections.map((section) => ({
      ...section,
      items: section.items.map((item) => ({
        ...item,
        active: item.href ? location.pathname.startsWith(item.href) : false,
      })),
    }));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar
        logo={
          <Typography variant="h6" fontWeight={700} color="primary.main">
            Shared UI
          </Typography>
        }
        items={withActiveNav(NAV_ITEMS)}
        userActions={
          user ? (
            <UserMenu
              name={user.name}
              email={user.email}
              avatarUrl={user.avatarUrl}
              items={[
                { id: "profile", label: "View profile", onClick: () => navigate("/profile") },
                { id: "settings", label: "Account settings", onClick: () => navigate("/settings") },
                { id: "logout", label: "Log out", divider: true, destructive: true, onClick: () => {
                  logout();
                  navigate("/login");
                } },
              ]}
            />
          ) : null
        }
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, py: 0.5, borderBottom: 1, borderColor: "divider" }}>
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={groupedNavigationEnabled}
              onChange={(event) => setGroupedNavigationEnabled(event.target.checked)}
            />
          }
          label="New grouped navigation (beta)"
        />
      </Box>

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {groupedNavigationEnabled ? (
          <NavigationPanel
            sections={withActiveSections(NAVIGATION_SECTIONS)}
            collapsed={collapsed}
            onToggleCollapsed={() => setCollapsed((c) => !c)}
          />
        ) : (
          <Sidebar
            items={withActiveSidebar(SIDEBAR_ITEMS)}
            collapsed={collapsed}
            onToggleCollapsed={() => setCollapsed((c) => !c)}
          />
        )}
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 4 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
