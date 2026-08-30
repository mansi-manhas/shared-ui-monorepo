import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Button, Input, Alert, Checkbox } from "@my-org/components-ui";
import { PasswordInput } from "./PasswordInput";
import { validateEmail, validatePassword, validatePasswordsMatch, validateRequired } from "../utils/validation";

export interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
}

export interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void | Promise<void>;
  loading?: boolean;
  errorMessage?: string;
  successMessage?: string;
  /** Whether to require agreement to terms before submitting. Defaults to true. */
  requireTermsAgreement?: boolean;
}

interface FieldErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

export function SignupForm({
  onSubmit,
  loading = false,
  errorMessage,
  successMessage,
  requireTermsAgreement = true,
}: SignupFormProps) {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const busy = loading || isSubmitting;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors: FieldErrors = {
      fullName: validateRequired(fullName, "Full name"),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validatePasswordsMatch(password, confirmPassword),
      terms: requireTermsAgreement && !agreedToTerms ? "You must agree to the terms to continue" : undefined,
    };
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) return;

    try {
      setIsSubmitting(true);
      await onSubmit({ fullName, email, password });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2.5} noValidate aria-busy={busy}>
      <Typography variant="h5" component="h1" fontWeight={600}>
        Create an account
      </Typography>

      {errorMessage ? <Alert variant="error">{errorMessage}</Alert> : null}
      {successMessage ? <Alert variant="success">{successMessage}</Alert> : null}

      <Input
        label="Full name"
        autoComplete="name"
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
        errorMessage={fieldErrors.fullName}
        disabled={busy}
        required
      />

      <Input
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        errorMessage={fieldErrors.email}
        disabled={busy}
        required
      />

      <PasswordInput
        autoComplete="new-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        errorMessage={fieldErrors.password}
        disabled={busy}
        required
      />

      <PasswordInput
        label="Confirm password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        errorMessage={fieldErrors.confirmPassword}
        disabled={busy}
        required
      />

      {requireTermsAgreement ? (
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          checked={agreedToTerms}
          onChange={(event) => setAgreedToTerms(event.target.checked)}
          errorMessage={fieldErrors.terms}
          disabled={busy}
        />
      ) : null}

      <Button type="submit" variant="primary" size="lg" fullWidth loading={busy}>
        Create account
      </Button>
    </Stack>
  );
}
