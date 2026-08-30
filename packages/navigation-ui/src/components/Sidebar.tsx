import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Link as RouterLink } from "react-router-dom";
import type { SidebarItem } from "../types";

export interface SidebarProps {
  items: SidebarItem[];
  /** Whether the sidebar is rendered in its narrow, icon-only state. */
  collapsed?: boolean;
  /** Called when the user toggles the collapse control. Omit to hide the toggle. */
  onToggleCollapsed?: () => void;
  width?: number;
  collapsedWidth?: number;
}

function SidebarNode({ item, depth, collapsed }: { item: SidebarItem; depth: number; collapsed: boolean }) {
  const hasChildren = Boolean(item.children?.length);
  const [open, setOpen] = React.useState(item.active ?? false);

  const button = (
    <ListItemButton
      component={item.href && !hasChildren ? RouterLink : "button"}
      to={item.href && !hasChildren ? item.href : undefined}
      selected={item.active}
      onClick={() => {
        if (hasChildren) setOpen((prev) => !prev);
        item.onClick?.();
      }}
      sx={{ pl: 2 + depth * 2, justifyContent: collapsed ? "center" : "flex-start" }}
    >
      {item.icon ? <ListItemIcon sx={{ minWidth: collapsed ? 0 : 36 }}>{item.icon}</ListItemIcon> : null}
      {!collapsed ? <ListItemText primary={item.label} /> : null}
      {!collapsed && hasChildren ? <Box aria-hidden>{open ? "▾" : "▸"}</Box> : null}
    </ListItemButton>
  );

  return (
    <React.Fragment key={item.id}>
      {collapsed ? (
        <Tooltip title={item.label} placement="right">
          {button}
        </Tooltip>
      ) : (
        button
      )}
      {hasChildren ? (
        <Collapse in={open && !collapsed} unmountOnExit>
          <List component="div" disablePadding>
            {item.children!.map((child) => (
              <SidebarNode key={child.id} item={child} depth={depth + 1} collapsed={collapsed} />
            ))}
          </List>
        </Collapse>
      ) : null}
    </React.Fragment>
  );
}

export function Sidebar({
  items,
  collapsed = false,
  onToggleCollapsed,
  width = 240,
  collapsedWidth = 72,
}: SidebarProps) {
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
      <List component="div">
        {items.map((item) => (
          <SidebarNode key={item.id} item={item} depth={0} collapsed={collapsed} />
        ))}
      </List>

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
