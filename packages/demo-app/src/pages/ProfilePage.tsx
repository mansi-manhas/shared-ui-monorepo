import * as React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { ProfileHeader, ProfileForm, UserProfileCard, type ProfileFormData } from "@my-org/user-profile-ui";
import { Alert } from "@my-org/components-ui";
import { Breadcrumbs } from "@my-org/navigation-ui";
import { useSession } from "../state/SessionContext";

export function ProfilePage() {
  const { user } = useSession();
  const [saving, setSaving] = React.useState(false);
  const [savedMessage, setSavedMessage] = React.useState<string | undefined>();

  if (!user) return null;

  const handleSave = async (data: ProfileFormData) => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSaving(false);
    setSavedMessage(`Saved changes for ${data.name}.`);
  };

  return (
    <Stack spacing={3}>
      <Breadcrumbs items={[{ label: "Home", href: "/dashboard" }, { label: "Profile" }]} />

      <ProfileHeader user={user} status="online" />

      {savedMessage ? (
        <Alert variant="success" onDismiss={() => setSavedMessage(undefined)}>
          {savedMessage}
        </Alert>
      ) : null}

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <ProfileForm user={user} onSave={handleSave} loading={saving} />
        </Grid>
        <Grid item xs={12} md={5}>
          <UserProfileCard user={user} status="online" />
        </Grid>
      </Grid>
    </Stack>
  );
}
