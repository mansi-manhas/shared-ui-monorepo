# @my-org/auth-ui

Reusable authentication UI: login, signup, and password recovery forms. Built on [`@my-org/components-ui`](../components-ui). Ships **no backend logic** — every form calls a callback you provide and manages its own field state, validation, loading/error/success display.

## Installation

```sh
pnpm add @my-org/auth-ui
```

Peer dependencies: `react`, `react-dom`, `@mui/material`, `@emotion/react`, `@emotion/styled`, `react-router-dom` (same as `components-ui`).

## Usage

```tsx
import { LoginForm, type LoginFormData } from "@my-org/auth-ui";

function LoginPage() {
  const [error, setError] = useState<string>();

  const handleSubmit = async (data: LoginFormData) => {
    try {
      await api.login(data.email, data.password);
    } catch {
      setError("Invalid email or password.");
    }
  };

  return (
    <LoginForm
      onSubmit={handleSubmit}
      onForgotPassword={() => navigate("/forgot-password")}
      onSocialLogin={(provider) => startOAuthFlow(provider)}
      errorMessage={error}
    />
  );
}
```

## Available components

| Component | Callbacks | Notes |
| --- | --- | --- |
| `LoginForm` | `onSubmit`, `onForgotPassword?`, `onSocialLogin?` | Email + password, "remember me" implicit, client-side validation. |
| `SignupForm` | `onSubmit` | Name, email, password + confirm, optional terms-of-service checkbox. |
| `ForgotPasswordForm` | `onSubmit` | Email only. |
| `ResetPasswordForm` | `onSubmit` | New password + confirm. |
| `PasswordInput` | — | `Input` with a show/hide toggle. Used internally by the forms above. |
| `SocialLoginButtons` | `onSocialLogin` | Renders one button per provider (`google`, `github`, `microsoft`, `apple`). |

All forms accept `loading`, `errorMessage`, and `successMessage` props so the host app can drive them from real request state.

## Scripts

```sh
pnpm --filter @my-org/auth-ui build
pnpm --filter @my-org/auth-ui dev
pnpm --filter @my-org/auth-ui typecheck
```
