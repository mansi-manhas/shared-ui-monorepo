import * as React from "react";
import MuiTooltip, { type TooltipProps as MuiTooltipProps } from "@mui/material/Tooltip";

export interface TooltipProps extends Omit<MuiTooltipProps, "title" | "content"> {
  /** Tooltip content. Renaming MUI's `title` avoids confusion with the native HTML `title` attribute. */
  content: React.ReactNode;
  children: React.ReactElement;
}

export function Tooltip({ content, children, ...rest }: TooltipProps) {
  return (
    <MuiTooltip title={content} arrow {...rest}>
      {children}
    </MuiTooltip>
  );
}
