import * as React from "react";
import { Input, type InputProps } from "@my-org/components-ui";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

export interface PasswordInputProps extends Omit<InputProps, "type"> {}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label = "Password", ...rest }, ref) => {
    const [visible, setVisible] = React.useState(false);

    return (
      <Input
        ref={ref}
        label={label}
        type={visible ? "text" : "password"}
        autoComplete="current-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                size="small"
                onClick={() => setVisible((prev) => !prev)}
                aria-label={visible ? "Hide password" : "Show password"}
                aria-pressed={visible}
              >
                {visible ? "Hide" : "Show"}
              </Button>
            </InputAdornment>
          ),
        }}
        {...rest}
      />
    );
  },
);

PasswordInput.displayName = "PasswordInput";
