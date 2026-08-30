import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link as RouterLink } from "react-router-dom";
import type { NavItem } from "../types";

export interface NavbarProps {
  logo: React.ReactNode;
  items?: NavItem[];
  /** Rendered on the right side of the bar, e.g. a UserMenu. */
  userActions?: React.ReactNode;
}

export function Navbar({ logo, items = [], userActions }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const renderItem = (item: NavItem) => (
    <Box
      key={item.id}
      component={item.href ? RouterLink : "button"}
      to={item.href}
      onClick={item.onClick}
      aria-current={item.active ? "page" : undefined}
      sx={{
        appearance: "none",
        border: "none",
        background: "none",
        font: "inherit",
        cursor: "pointer",
        textDecoration: "none",
        color: item.active ? "primary.main" : "text.primary",
        fontWeight: item.active ? 600 : 500,
        px: 1.5,
        py: 1,
      }}
    >
      {item.label}
    </Box>
  );

  return (
    <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Toolbar sx={{ gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>{logo}</Box>

        <Stack direction="row" spacing={1} sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
          {items.map(renderItem)}
        </Stack>

        <Box sx={{ flexGrow: { xs: 1, md: 0 } }} />

        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>{userActions}</Box>

        <IconButton
          sx={{ display: { xs: "inline-flex", md: "none" } }}
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          ☰
        </IconButton>
      </Toolbar>

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 260, py: 2 }} role="presentation">
          <List>
            {items.map((item) => (
              <ListItemButton
                key={item.id}
                component={item.href ? RouterLink : "button"}
                to={item.href}
                selected={item.active}
                onClick={() => {
                  item.onClick?.();
                  setMobileOpen(false);
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
          {userActions ? (
            <Box sx={{ px: 2, pt: 1, borderTop: 1, borderColor: "divider" }}>{userActions}</Box>
          ) : null}
        </Box>
      </Drawer>
    </AppBar>
  );
}
