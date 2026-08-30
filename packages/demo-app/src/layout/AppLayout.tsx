import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Navbar, Sidebar, UserMenu, type SidebarItem, type NavItem } from "@mansi-manhas/navigation-ui";
import { useSession } from "../state/SessionContext";

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard" },
  { id: "profile", label: "Profile", href: "/profile" },
  { id: "showcase", label: "Components", href: "/showcase" },
];

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

export function AppLayout() {
  const { user, logout } = useSession();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);

  const withActiveNav = (items: NavItem[]): NavItem[] =>
    items.map((item) => ({ ...item, active: item.href ? location.pathname.startsWith(item.href) : false }));

  const withActiveSidebar = (items: SidebarItem[]): SidebarItem[] =>
    items.map((item) => ({
      ...item,
      active: item.href ? location.pathname.startsWith(item.href) : false,
      children: item.children ? withActiveSidebar(item.children) : undefined,
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

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar items={withActiveSidebar(SIDEBAR_ITEMS)} collapsed={collapsed} onToggleCollapsed={() => setCollapsed((c) => !c)} />
        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 4 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
