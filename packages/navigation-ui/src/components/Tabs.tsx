import * as React from "react";
import MuiTabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export interface TabItem {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: React.ReactElement;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  "aria-label"?: string;
}

export function Tabs({ items, value, onChange, "aria-label": ariaLabel = "Tabs" }: TabsProps) {
  return (
    <MuiTabs
      value={value}
      onChange={(_event, newValue) => onChange(newValue)}
      aria-label={ariaLabel}
      variant="scrollable"
      scrollButtons="auto"
    >
      {items.map((item) => (
        <Tab
          key={item.value}
          label={item.label}
          value={item.value}
          disabled={item.disabled}
          icon={item.icon}
          iconPosition="start"
        />
      ))}
    </MuiTabs>
  );
}
