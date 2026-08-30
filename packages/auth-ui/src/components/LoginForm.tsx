import * as React from "react";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Button, Input, Alert } from "@my-org/components-ui";
import { PasswordInput } from "./PasswordInput";
import { SocialLoginButtons, type SocialProvider, type SocialLoginOption } from "./SocialLoginButtons";
import { validateEmail, validatePassword } from "../utils/validation";

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void | Promise<void>;
  onForgotPassword?: () => void;
  onSocialLogin?: (provider: SocialProvider) => void;
  socialProviders?: SocialLoginOption[];
  /** External loading flag, e.g. while a submit request is in flight. */
  loading?: boolean;
  /** Error message from a failed submit attempt, rendered above the form fields. */
  errorMessage?: string;
  /** Message shown after a successful submit, e.g. before redirecting. */
  successMessage?: string;
}

export function LoginForm({
  onSubmit,
  onForgotPassword,
  onSocialLogin,
  socialProviders,
  loading = false,
  errorMessage,
  successMessage,
}: LoginFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fieldErrors, setFieldErrors] = React.useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const busy = loading || isSubmitting;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setFieldErrors(errors);
    if (errors.email || errors.password) return;

    try {
      setIsSubmitting(true);
      await onSubmit({ email, password, rememberMe: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={2.5} noValidate aria-busy={busy}>
      <Typography variant="h5" component="h1" fontWeight={600}>
        Log in
      </Typography>

      {errorMessage ? <Alert variant="error">{errorMessage}</Alert> : null}
      {successMessage ? <Alert variant="success">{successMessage}</Alert> : null}

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
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        errorMessage={fieldErrors.password}
        disabled={busy}
        required
      />

      {onForgotPassword ? (
        <Link component="button" type="button" onClick={onForgotPassword} underline="hover" alignSelf="flex-end">
          Forgot password?
        </Link>
      ) : null}

      <Button type="submit" variant="primary" size="lg" fullWidth loading={busy}>
        Log in
      </Button>

      {onSocialLogin ? (
        <>
          <Divider>or</Divider>
          <SocialLoginButtons onSocialLogin={onSocialLogin} providers={socialProviders} disabled={busy} />
        </>
      ) : null}
    </Stack>
  );
}
