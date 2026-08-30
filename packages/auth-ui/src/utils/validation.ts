const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return "Email is required";
  if (!EMAIL_PATTERN.test(value)) return "Enter a valid email address";
  return undefined;
}

export function validateRequired(value: string, fieldLabel: string): string | undefined {
  if (!value.trim()) return `${fieldLabel} is required`;
  return undefined;
}

export function validatePassword(value: string): string | undefined {
  if (!value) return "Password is required";
  if (value.length < 8) return "Password must be at least 8 characters";
  return undefined;
}

export function validatePasswordsMatch(password: string, confirmPassword: string): string | undefined {
  if (confirmPassword !== password) return "Passwords do not match";
  return undefined;
}
