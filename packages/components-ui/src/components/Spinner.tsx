import CircularProgress, { type CircularProgressProps } from "@mui/material/CircularProgress";

export type SpinnerSize = "sm" | "md" | "lg";

const SIZE_MAP: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
};

export interface SpinnerProps extends Omit<CircularProgressProps, "size"> {
  /** Visual size of the spinner. Defaults to "md". */
  size?: SpinnerSize | number;
  /** Accessible label announced to screen readers while the spinner is visible. */
  label?: string;
}

export function Spinner({ size = "md", label = "Loading", ...rest }: SpinnerProps) {
  const pixelSize = typeof size === "number" ? size : SIZE_MAP[size];

  return <CircularProgress size={pixelSize} role="status" aria-label={label} {...rest} />;
}
