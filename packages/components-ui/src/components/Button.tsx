import * as React from "react";
import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";
import { Spinner } from "./Spinner";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<MuiButtonProps, "variant" | "size" | "color"> {
  /** Visual style of the button. Defaults to "primary". */
  variant?: ButtonVariant;
  /** Button size. Defaults to "md". */
  size?: ButtonSize;
  /** Shows a spinner and disables interaction while true. */
  loading?: boolean;
}

const SIZE_MAP: Record<ButtonSize, MuiButtonProps["size"]> = {
  sm: "small",
  md: "medium",
  lg: "large",
};

const VARIANT_MAP: Record<ButtonVariant, { variant: MuiButtonProps["variant"]; color: MuiButtonProps["color"] }> = {
  primary: { variant: "contained", color: "primary" },
  secondary: { variant: "outlined", color: "primary" },
  danger: { variant: "contained", color: "error" },
  ghost: { variant: "text", color: "primary" },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, disabled, startIcon, children, ...rest }, ref) => {
    const { variant: muiVariant, color } = VARIANT_MAP[variant];

    return (
      <MuiButton
        ref={ref}
        variant={muiVariant}
        color={color}
        size={SIZE_MAP[size]}
        disabled={disabled || loading}
        startIcon={loading ? <Spinner size="sm" color="inherit" label="" /> : startIcon}
        aria-busy={loading || undefined}
        {...rest}
      >
        {children}
      </MuiButton>
    );
  },
);

Button.displayName = "Button";
