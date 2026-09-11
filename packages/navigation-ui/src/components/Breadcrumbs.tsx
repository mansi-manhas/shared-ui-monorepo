import * as React from "react";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

/** @deprecated Use `BreadcrumbTrailItem` with the `trail` prop instead. */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbTrailItem {
  title: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps {
  /**
   * @deprecated Pass `trail` instead. `items` requires you to repeat a "Home" entry on every call
   * site and will be removed in the next major version.
   */
  items?: BreadcrumbItem[];
  /** Everything after Home. Home is injected automatically — do not include it. */
  trail?: BreadcrumbTrailItem[];
  separator?: React.ReactNode;
  homeLabel?: string;
  homeHref?: string;
}

interface ResolvedCrumb {
  key: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

let hasWarnedDeprecated = false;
const isProduction =
  (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV === "production";

export function Breadcrumbs({ items, trail, separator = "/", homeLabel = "Home", homeHref = "/dashboard" }: BreadcrumbsProps) {
  if (items && !isProduction && !hasWarnedDeprecated) {
    hasWarnedDeprecated = true;
    // eslint-disable-next-line no-console
    console.warn(
      "[@mansi-manhas/navigation-ui] `Breadcrumbs`'s `items` prop is deprecated and will be removed in the " +
        "next major version. Pass `trail` instead (items after Home, using `title` instead of `label`) — " +
        "\"Home\" is now injected automatically. Both props are supported today, so this can be migrated one " +
        "call site at a time. Run `node scripts/find-breadcrumbs-usage.mjs` to see what's left.",
    );
  }

  const crumbs: ResolvedCrumb[] = items
    ? items.map((item) => ({ key: item.label, label: item.label, href: item.href, onClick: item.onClick }))
    : [
        { key: "__home", label: homeLabel, href: homeHref },
        ...(trail ?? []).map((item) => ({ key: item.title, label: item.title, href: item.href, onClick: item.onClick })),
      ];

  return (
    <MuiBreadcrumbs aria-label="Breadcrumb" separator={separator}>
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        if (isLast) {
          return (
            <Typography key={crumb.key} color="text.primary" aria-current="page">
              {crumb.label}
            </Typography>
          );
        }
        return (
          <Link
            key={crumb.key}
            component={crumb.href ? RouterLink : "button"}
            to={crumb.href}
            onClick={crumb.onClick}
            underline="hover"
            color="inherit"
          >
            {crumb.label}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
}
