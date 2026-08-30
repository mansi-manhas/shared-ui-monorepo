import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export interface DropdownMenuItem {
  id: string;
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  /** Renders a divider above this item. */
  divider?: boolean;
  /** Styles the item to indicate a destructive action. */
  destructive?: boolean;
}

export interface DropdownMenuProps {
  /** Trigger element. Receives click/keyboard handlers and must forward its ref. */
  trigger: React.ReactElement;
  items: DropdownMenuItem[];
}

export function DropdownMenu({ trigger, items }: DropdownMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const clonedTrigger = React.cloneElement(trigger, {
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      trigger.props.onClick?.(event);
      setAnchorEl(event.currentTarget);
    },
    "aria-haspopup": "menu",
    "aria-expanded": open,
  });

  return (
    <>
      {clonedTrigger}
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {items.map((item) => (
          <React.Fragment key={item.id}>
            {item.divider ? <Divider /> : null}
            <MenuItem
              disabled={item.disabled}
              onClick={() => {
                setAnchorEl(null);
                item.onClick?.();
              }}
              sx={item.destructive ? { color: "error.main" } : undefined}
            >
              {item.icon ? <ListItemIcon sx={item.destructive ? { color: "error.main" } : undefined}>{item.icon}</ListItemIcon> : null}
              <ListItemText>{item.label}</ListItemText>
            </MenuItem>
          </React.Fragment>
        ))}
      </Menu>
    </>
  );
}
