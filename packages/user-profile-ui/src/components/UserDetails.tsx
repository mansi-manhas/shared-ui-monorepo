import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { UserProfile } from "../types";

export interface UserDetailsProps {
  user: Pick<UserProfile, "name" | "email" | "phone" | "title">;
}

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <Stack direction="row" spacing={1} alignItems="baseline">
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 72 }}>
        {label}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Stack>
  );
}

export function UserDetails({ user }: UserDetailsProps) {
  return (
    <Stack spacing={0.5}>
      <Typography variant="subtitle1" fontWeight={600}>
        {user.name}
      </Typography>
      {user.title ? (
        <Typography variant="body2" color="text.secondary">
          {user.title}
        </Typography>
      ) : null}
      <Row label="Email" value={user.email} />
      <Row label="Phone" value={user.phone} />
    </Stack>
  );
}
