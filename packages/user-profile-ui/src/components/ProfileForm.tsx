import * as React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Button, Input } from "@my-org/components-ui";
import { UserAvatar } from "./UserAvatar";
import type { UserProfile } from "../types";

export interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  /** New avatar file selected by the user, if any. */
  avatarFile: File | null;
}

export interface ProfileFormProps {
  user: Pick<UserProfile, "name" | "email" | "phone" | "avatarUrl">;
  onSave: (data: ProfileFormData) => void | Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  name?: string;
  email?: string;
}

export function ProfileForm({ user, onSave, onCancel, loading = false }: ProfileFormProps) {
  const [name, setName] = React.useState(user.name);
  const [email, setEmail] = React.useState(user.email);
  const [phone, setPhone] = React.useState(user.phone ?? "");
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = React.useState<string | undefined>(user.avatarUrl);
  const [fieldErrors, setFieldErrors] = React.useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const busy = loading || isSubmitting;

  React.useEffect(() => {
    return () => {
      if (avatarPreview && avatarPreview.startsWith("blob:")) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: FieldErrors = {
      name: name.trim() ? undefined : "Name is required",
      email: EMAIL_PATTERN.test(email) ? undefined : "Enter a valid email address",
    };
    setFieldErrors(errors);
    if (errors.name || errors.email) return;

    try {
      setIsSubmitting(true);
      await onSave({ name, email, phone, avatarFile });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2.5} noValidate aria-busy={busy}>
      <Stack direction="row" spacing={2} alignItems="center">
        <UserAvatar name={name || user.name} src={avatarPreview} size="lg" />
        <Button variant="secondary" size="sm" component="label" disabled={busy}>
          Change photo
          <Box
            component="input"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            sx={{ display: "none" }}
          />
        </Button>
      </Stack>

      <Input
        label="Full name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        errorMessage={fieldErrors.name}
        disabled={busy}
        required
      />

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        errorMessage={fieldErrors.email}
        disabled={busy}
        required
      />

      <Input
        label="Phone"
        type="tel"
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        disabled={busy}
      />

      <Stack direction="row" spacing={1.5} justifyContent="flex-end">
        {onCancel ? (
          <Button type="button" variant="ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
        ) : null}
        <Button type="submit" variant="primary" loading={busy}>
          Save changes
        </Button>
      </Stack>
    </Stack>
  );
}
