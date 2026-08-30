import Stack from "@mui/material/Stack";
import { Button } from "@mansi-manhas/components-ui";

export type SocialProvider = "google" | "github" | "microsoft" | "apple";

export interface SocialLoginOption {
  provider: SocialProvider;
  label?: string;
}

export interface SocialLoginButtonsProps {
  providers?: SocialLoginOption[];
  onSocialLogin: (provider: SocialProvider) => void;
  disabled?: boolean;
}

const DEFAULT_LABELS: Record<SocialProvider, string> = {
  google: "Continue with Google",
  github: "Continue with GitHub",
  microsoft: "Continue with Microsoft",
  apple: "Continue with Apple",
};

const DEFAULT_PROVIDERS: SocialLoginOption[] = [{ provider: "google" }, { provider: "github" }];

export function SocialLoginButtons({
  providers = DEFAULT_PROVIDERS,
  onSocialLogin,
  disabled = false,
}: SocialLoginButtonsProps) {
  return (
    <Stack spacing={1.5} width="100%">
      {providers.map(({ provider, label }) => (
        <Button
          key={provider}
          type="button"
          variant="secondary"
          fullWidth
          disabled={disabled}
          onClick={() => onSocialLogin(provider)}
        >
          {label ?? DEFAULT_LABELS[provider]}
        </Button>
      ))}
    </Stack>
  );
}
