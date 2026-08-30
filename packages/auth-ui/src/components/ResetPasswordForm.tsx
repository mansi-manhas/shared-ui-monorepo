import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button, Alert } from "@mansi-manhas/components-ui";
import { PasswordInput } from "./PasswordInput";
import { validatePassword, validatePasswordsMatch } from "../utils/validation";

export interface ResetPasswordFormData {
  password: string;
}

export interface ResetPasswordFormProps {
  onSubmit: (data: ResetPasswordFormData) => void | Promise<void>;
  loading?: boolean;
  errorMessage?: string;
  successMessage?: string;
}

export function ResetPasswordForm({ onSubmit, loading = false, errorMessage, successMessage }: ResetPasswordFormProps) {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [fieldErrors, setFieldErrors] = React.useState<{ password?: string; confirmPassword?: string }>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const busy = loading || isSubmitting;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = {
      password: validatePassword(password),
      confirmPassword: validatePasswordsMatch(password, confirmPassword),
    };
    setFieldErrors(errors);
    if (errors.password || errors.confirmPassword) return;

    try {
      setIsSubmitting(true);
      await onSubmit({ password });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2.5} noValidate aria-busy={busy}>
      <Typography variant="h5" component="h1" fontWeight={600}>
        Set a new password
      </Typography>

      {errorMessage ? <Alert variant="error">{errorMessage}</Alert> : null}
      {successMessage ? <Alert variant="success">{successMessage}</Alert> : null}

      <PasswordInput
        label="New password"
        autoComplete="new-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        errorMessage={fieldErrors.password}
        disabled={busy}
        required
      />

      <PasswordInput
        label="Confirm new password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        errorMessage={fieldErrors.confirmPassword}
        disabled={busy}
        required
      />

      <Button type="submit" variant="primary" size="lg" fullWidth loading={busy}>
        Reset password
      </Button>
    </Stack>
  );
}
