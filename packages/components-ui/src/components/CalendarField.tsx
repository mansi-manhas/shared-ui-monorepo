import * as React from "react";
import TextField, { type TextFieldProps } from "@mui/material/TextField";

export interface CalendarFieldProps extends Omit<TextFieldProps, "error" | "variant" | "type"> {
  /** Validation error message. When present the field is styled as invalid and the message is announced. */
  errorMessage?: string;
  /** Helper text shown when there is no error. */
  helperText?: React.ReactNode;
  /** Earliest selectable date, ISO string (yyyy-mm-dd). */
  min?: string;
  /** Latest selectable date, ISO string (yyyy-mm-dd). */
  max?: string;
}

export const CalendarField = React.forwardRef<HTMLInputElement, CalendarFieldProps>(
  ({ errorMessage, helperText, disabled, id, label, inputProps, min, max, ...rest }, ref) => {
    const generatedId = React.useId();
    const fieldId = id ?? generatedId;
    const helperId = `${fieldId}-helper`;

    return (
      <TextField
        {...rest}
        inputRef={ref}
        id={fieldId}
        type="date"
        label={label}
        variant="outlined"
        fullWidth
        disabled={disabled}
        error={Boolean(errorMessage)}
        helperText={errorMessage ?? helperText}
        FormHelperTextProps={{ id: helperId }}
        InputLabelProps={{ shrink: true }}
        inputProps={{
          min,
          max,
          "aria-describedby": errorMessage || helperText ? helperId : undefined,
          ...inputProps,
        }}
      />
    );
  },
);

CalendarField.displayName = "CalendarField";
