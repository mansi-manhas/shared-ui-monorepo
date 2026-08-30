import * as React from "react";
import MuiTextField, { type TextFieldProps } from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps extends Omit<TextFieldProps, "error" | "variant" | "select"> {
  options: SelectOption[];
  errorMessage?: string;
  helperText?: React.ReactNode;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLInputElement, SelectProps>(
  ({ options, errorMessage, helperText, placeholder, id, label, ...rest }, ref) => {
    const generatedId = React.useId();
    const selectId = id ?? generatedId;

    return (
      <MuiTextField
        {...rest}
        select
        inputRef={ref}
        id={selectId}
        label={label}
        variant="outlined"
        fullWidth
        error={Boolean(errorMessage)}
        helperText={errorMessage ?? helperText}
        SelectProps={{ displayEmpty: Boolean(placeholder) }}
      >
        {placeholder ? (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        ) : null}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </MenuItem>
        ))}
      </MuiTextField>
    );
  },
);

Select.displayName = "Select";
