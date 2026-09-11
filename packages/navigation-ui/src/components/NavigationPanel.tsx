import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Link as RouterLink } from "react-router-dom";
import type { SidebarItem } from "../types";

export interface NavigationSection {
  id: string;
  /** Section header. Omit for an unlabeled group. */
  label?: string;
  items: SidebarItem[];
}

export interface NavigationPanelProps {
  sections: NavigationSection[];
  /** Whether the panel is rendered in its narrow, icon-only state. */
  collapsed?: boolean;
  /** Called when the user toggles the collapse control. Omit to hide the toggle. */
  onToggleCollapsed?: () => void;
  width?: number;
  collapsedWidth?: number;
}

function NavigationPanelItem({ item, collapsed }: { item: SidebarItem; collapsed: boolean }) {
  const button = (
    <ListItemButton
      component={item.href ? RouterLink : "button"}
      to={item.href}
      selected={item.active}
      onClick={item.onClick}
      sx={{ justifyContent: collapsed ? "center" : "flex-start" }}
    >
      {item.icon ? <ListItemIcon sx={{ minWidth: collapsed ? 0 : 36 }}>{item.icon}</ListItemIcon> : null}
      {!collapsed ? <ListItemText primary={item.label} /> : null}
    </ListItemButton>
  );

  return collapsed ? (
    <Tooltip title={item.label} placement="right">
      {button}
    </Tooltip>
  ) : (
    button
  );
}

export function NavigationPanel({
  sections,
  collapsed = false,
  onToggleCollapsed,
  width = 240,
  collapsedWidth = 72,
}: NavigationPanelProps) {
  return (
    <Box
      component="nav"
      aria-label="Sidebar navigation"
      sx={{
        width: collapsed ? collapsedWidth : width,
        transition: "width 150ms ease",
        borderRight: 1,
        borderColor: "divider",
        height: "100%",
        overflowX: "hidden",
      }}
    >
      {sections.map((section) => (
        <List
          key={section.id}
          component="div"
          subheader={
            !collapsed && section.label ? (
              <ListSubheader component="div" disableSticky>
                {section.label}
              </ListSubheader>
            ) : undefined
          }
        >
          {section.items.map((item) => (
            <NavigationPanelItem key={item.id} item={item} collapsed={collapsed} />
          ))}
        </List>
      ))}

      {onToggleCollapsed ? (
        <Box sx={{ display: "flex", justifyContent: collapsed ? "center" : "flex-end", p: 1 }}>
          <IconButton
            size="small"
            onClick={onToggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? "»" : "«"}
          </IconButton>
        </Box>
      ) : null}
    </Box>
  );
}

NavigationPanel.displayName = "NavigationPanel";
