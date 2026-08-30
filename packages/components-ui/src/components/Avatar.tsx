import MuiAvatar, { type AvatarProps as MuiAvatarProps } from "@mui/material/Avatar";

export type AvatarSize = "sm" | "md" | "lg";

const SIZE_MAP: Record<AvatarSize, number> = {
  sm: 24,
  md: 40,
  lg: 56,
};

export interface AvatarProps extends MuiAvatarProps {
  size?: AvatarSize | number;
  /** Full name used to derive initials when no image is available. */
  name?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0]!.charAt(0).toUpperCase();
  return (parts[0]!.charAt(0) + parts[parts.length - 1]!.charAt(0)).toUpperCase();
}

export function Avatar({ size = "md", name, src, alt, sx, children, ...rest }: AvatarProps) {
  const pixelSize = typeof size === "number" ? size : SIZE_MAP[size];

  return (
    <MuiAvatar
      src={src}
      alt={alt ?? name}
      sx={{ width: pixelSize, height: pixelSize, fontSize: pixelSize * 0.4, ...sx }}
      {...rest}
    >
      {children ?? (name ? getInitials(name) : undefined)}
    </MuiAvatar>
  );
}
