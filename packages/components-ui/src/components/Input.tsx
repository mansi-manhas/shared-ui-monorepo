import * as React from "react";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

export interface InputProps extends Omit<TextFieldProps, "error" | "variant"> {
  /** Validation error message. When present the field is styled as invalid and the message is announced. */
  errorMessage?: string;
  /** Helper text shown when there is no error. */
  helperText?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ errorMessage, helperText, disabled, id, label, inputProps, ...rest }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;

    return (
      <TextField
        {...rest}
        inputRef={ref}
        id={inputId}
        label={label}
        variant="outlined"
        fullWidth
        disabled={disabled}
        error={Boolean(errorMessage)}
        helperText={errorMessage ?? helperText}
        FormHelperTextProps={{ id: helperId }}
        inputProps={{
          "aria-describedby": errorMessage || helperText ? helperId : undefined,
          ...inputProps,
        }}
      />
    );
  },
);

Input.displayName = "Input";
