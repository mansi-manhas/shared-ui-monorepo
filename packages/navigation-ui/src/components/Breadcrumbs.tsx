import * as React from "react";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

export function Breadcrumbs({ items, separator = "/" }: BreadcrumbsProps) {
  return (
    <MuiBreadcrumbs aria-label="Breadcrumb" separator={separator}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        if (isLast) {
          return (
            <Typography key={item.label} color="text.primary" aria-current="page">
              {item.label}
            </Typography>
          );
        }
        return (
          <Link
            key={item.label}
            component={item.href ? RouterLink : "button"}
            to={item.href}
            onClick={item.onClick}
            underline="hover"
            color="inherit"
          >
            {item.label}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
}
