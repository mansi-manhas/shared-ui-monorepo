import * as React from "react";
import styled from "@emotion/styled";

export type BadgeVariant = "default" | "success" | "warning" | "error" | "info";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children?: React.ReactNode;
}

const COLORS: Record<BadgeVariant, { bg: string; fg: string }> = {
  default: { bg: "#e2e8f0", fg: "#334155" },
  success: { bg: "#dcfce7", fg: "#166534" },
  warning: { bg: "#fef3c7", fg: "#92400e" },
  error: { bg: "#fee2e2", fg: "#991b1b" },
  info: { bg: "#dbeafe", fg: "#1e40af" },
};

const StyledBadge = styled.span<{ $variant: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 9999px;
  padding: 0.125rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.5;
  white-space: nowrap;
  background-color: ${({ $variant }) => COLORS[$variant].bg};
  color: ${({ $variant }) => COLORS[$variant].fg};
`;

export function Badge({ variant = "default", children, ...rest }: BadgeProps) {
  return (
    <StyledBadge $variant={variant} {...rest}>
      {children}
    </StyledBadge>
  );
}
