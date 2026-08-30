import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Button, Checkbox, Card } from "@mansi-manhas/components-ui";

export interface NotificationPreferences {
  productUpdates: boolean;
  securityAlerts: boolean;
  marketingEmails: boolean;
}

export interface AccountSettingsProps {
  notifications: NotificationPreferences;
  onNotificationsChange: (preferences: NotificationPreferences) => void;
  onChangePassword?: () => void;
  onDeleteAccount?: () => void;
  savingNotifications?: boolean;
}

export function AccountSettings({
  notifications,
  onNotificationsChange,
  onChangePassword,
  onDeleteAccount,
  savingNotifications = false,
}: AccountSettingsProps) {
  const toggle = (key: keyof NotificationPreferences) => {
    onNotificationsChange({ ...notifications, [key]: !notifications[key] });
  };

  return (
    <Stack spacing={3}>
      <Card title="Notifications" subtitle="Choose what you want to be notified about">
        <Stack spacing={1.5}>
          <Checkbox
            label="Product updates"
            checked={notifications.productUpdates}
            onChange={() => toggle("productUpdates")}
            disabled={savingNotifications}
          />
          <Checkbox
            label="Security alerts"
            checked={notifications.securityAlerts}
            onChange={() => toggle("securityAlerts")}
            disabled={savingNotifications}
          />
          <Checkbox
            label="Marketing emails"
            checked={notifications.marketingEmails}
            onChange={() => toggle("marketingEmails")}
            disabled={savingNotifications}
          />
        </Stack>
      </Card>

      {onChangePassword ? (
        <Card title="Security">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              Update your password to keep your account secure.
            </Typography>
            <Button variant="secondary" onClick={onChangePassword}>
              Change password
            </Button>
          </Stack>
        </Card>
      ) : null}

      {onDeleteAccount ? (
        <Card title="Danger zone">
          <Stack spacing={1.5}>
            <Typography variant="body2" color="text.secondary">
              Deleting your account is permanent and cannot be undone.
            </Typography>
            <Divider />
            <Stack direction="row" justifyContent="flex-end">
              <Button variant="danger" onClick={onDeleteAccount}>
                Delete account
              </Button>
            </Stack>
          </Stack>
        </Card>
      ) : null}
    </Stack>
  );
}
