import type * as React from "react";

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  icon?: React.ReactNode;
}

export interface SidebarItem extends NavItem {
  children?: SidebarItem[];
}
