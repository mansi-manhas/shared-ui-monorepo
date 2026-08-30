import * as React from "react";
import MuiCard, { type CardProps as MuiCardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";

export interface CardProps extends Omit<MuiCardProps, "title"> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Content rendered on the right side of the header, e.g. a menu button. */
  headerAction?: React.ReactNode;
  /** Footer content, typically action buttons. */
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export function Card({ title, subtitle, headerAction, actions, children, ...rest }: CardProps) {
  return (
    <MuiCard variant="outlined" {...rest}>
      {title || subtitle ? (
        <CardHeader title={title} subheader={subtitle} action={headerAction} />
      ) : null}
      <CardContent>{children}</CardContent>
      {actions ? <CardActions>{actions}</CardActions> : null}
    </MuiCard>
  );
}
