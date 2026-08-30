import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button } from "@my-org/components-ui";
import { UserAvatar, type UserPresenceStatus } from "./UserAvatar";
import type { UserProfile } from "../types";

export interface ProfileHeaderProps {
  user: Pick<UserProfile, "name" | "title" | "bio" | "avatarUrl">;
  status?: UserPresenceStatus;
  onEdit?: () => void;
}

export function ProfileHeader({ user, status, onEdit }: ProfileHeaderProps) {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        background: "linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)",
      }}
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} alignItems={{ xs: "flex-start", sm: "center" }}>
        <UserAvatar name={user.name} src={user.avatarUrl} status={status} size={80} />

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" fontWeight={700}>
            {user.name}
          </Typography>
          {user.title ? (
            <Typography variant="body1" color="text.secondary">
              {user.title}
            </Typography>
          ) : null}
          {user.bio ? (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 480 }}>
              {user.bio}
            </Typography>
          ) : null}
        </Box>

        {onEdit ? (
          <Button variant="secondary" onClick={onEdit}>
            Edit profile
          </Button>
        ) : null}
      </Stack>
    </Box>
  );
}
