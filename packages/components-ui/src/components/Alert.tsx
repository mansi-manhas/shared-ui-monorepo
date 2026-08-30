import * as React from "react";
import MuiAlert, { type AlertProps as MuiAlertProps } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps extends Omit<MuiAlertProps, "severity" | "variant" | "title"> {
  variant?: AlertVariant;
  title?: React.ReactNode;
  /** Called when the dismiss button is pressed. Omit to render a non-dismissible alert. */
  onDismiss?: () => void;
  children?: React.ReactNode;
}

export function Alert({ variant = "info", title, onDismiss, children, ...rest }: AlertProps) {
  return (
    <MuiAlert
      severity={variant}
      variant="standard"
      role="alert"
      action={
        onDismiss ? (
          <IconButton aria-label="Dismiss alert" color="inherit" size="small" onClick={onDismiss}>
            ✕
          </IconButton>
        ) : undefined
      }
      {...rest}
    >
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      {children}
    </MuiAlert>
  );
}
