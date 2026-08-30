import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button, Input, Alert } from "@my-org/components-ui";
import { validateEmail } from "../utils/validation";

export interface ForgotPasswordFormData {
  email: string;
}

export interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordFormData) => void | Promise<void>;
  loading?: boolean;
  errorMessage?: string;
  successMessage?: string;
}

export function ForgotPasswordForm({ onSubmit, loading = false, errorMessage, successMessage }: ForgotPasswordFormProps) {
  const [email, setEmail] = React.useState("");
  const [fieldError, setFieldError] = React.useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const busy = loading || isSubmitting;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const error = validateEmail(email);
    setFieldError(error);
    if (error) return;

    try {
      setIsSubmitting(true);
      await onSubmit({ email });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2.5} noValidate aria-busy={busy}>
      <Typography variant="h5" component="h1" fontWeight={600}>
        Reset your password
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Enter the email address associated with your account and we'll send a link to reset your password.
      </Typography>

      {errorMessage ? <Alert variant="error">{errorMessage}</Alert> : null}
      {successMessage ? <Alert variant="success">{successMessage}</Alert> : null}

      <Input
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        errorMessage={fieldError}
        disabled={busy}
        required
      />

      <Button type="submit" variant="primary" size="lg" fullWidth loading={busy}>
        Send reset link
      </Button>
    </Stack>
  );
}
