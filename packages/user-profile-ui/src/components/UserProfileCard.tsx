import * as React from "react";
import Stack from "@mui/material/Stack";
import { Card, type CardProps } from "@my-org/components-ui";
import { UserAvatar, type UserPresenceStatus } from "./UserAvatar";
import { UserDetails } from "./UserDetails";
import type { UserProfile } from "../types";

export interface UserProfileCardProps extends Omit<CardProps, "title" | "children"> {
  user: Pick<UserProfile, "name" | "email" | "phone" | "title" | "avatarUrl">;
  status?: UserPresenceStatus;
  /** Rendered below the user details, e.g. action buttons. */
  footer?: React.ReactNode;
}

export function UserProfileCard({ user, status, footer, ...rest }: UserProfileCardProps) {
  return (
    <Card {...rest}>
      <Stack direction="row" spacing={2} alignItems="center">
        <UserAvatar name={user.name} src={user.avatarUrl} status={status} size="lg" />
        <UserDetails user={user} />
      </Stack>
      {footer ? (
        <Stack sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}>{footer}</Stack>
      ) : null}
    </Card>
  );
}
