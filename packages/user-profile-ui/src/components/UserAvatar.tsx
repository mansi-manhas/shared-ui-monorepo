import Box from "@mui/material/Box";
import { Avatar, type AvatarProps } from "@my-org/components-ui";

export type UserPresenceStatus = "online" | "away" | "offline";

export interface UserAvatarProps extends AvatarProps {
  status?: UserPresenceStatus;
}

const STATUS_COLORS: Record<UserPresenceStatus, string> = {
  online: "#22c55e",
  away: "#f59e0b",
  offline: "#94a3b8",
};

export function UserAvatar({ status, ...rest }: UserAvatarProps) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <Avatar {...rest} />
      {status ? (
        <Box
          role="img"
          aria-label={`Status: ${status}`}
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 10,
            height: 10,
            borderRadius: "50%",
            border: "2px solid",
            borderColor: "background.paper",
            backgroundColor: STATUS_COLORS[status],
          }}
        />
      ) : null}
    </Box>
  );
}
