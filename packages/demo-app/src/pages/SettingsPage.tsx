import * as React from "react";
import Stack from "@mui/material/Stack";
import { AccountSettings, type NotificationPreferences } from "@my-org/user-profile-ui";
import { Breadcrumbs } from "@my-org/navigation-ui";
import { Alert } from "@my-org/components-ui";

export function SettingsPage() {
  const [notifications, setNotifications] = React.useState<NotificationPreferences>({
    productUpdates: true,
    securityAlerts: true,
    marketingEmails: false,
  });
  const [deleteRequested, setDeleteRequested] = React.useState(false);

  return (
    <Stack spacing={3}>
      <Breadcrumbs items={[{ label: "Home", href: "/dashboard" }, { label: "Settings" }]} />

      {deleteRequested ? (
        <Alert variant="warning" title="Account deletion requested" onDismiss={() => setDeleteRequested(false)}>
          This is a demo — no account was actually deleted.
        </Alert>
      ) : null}

      <AccountSettings
        notifications={notifications}
        onNotificationsChange={setNotifications}
        onChangePassword={() => alert("Would navigate to a change-password flow in a real app.")}
        onDeleteAccount={() => setDeleteRequested(true)}
      />
    </Stack>
  );
}
