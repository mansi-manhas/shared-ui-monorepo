import * as React from "react";
import MuiCheckbox, { type CheckboxProps as MuiCheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

export interface CheckboxProps extends MuiCheckboxProps {
  label: React.ReactNode;
  errorMessage?: string;
  helperText?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ label, errorMessage, helperText, id, ...rest }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id ?? generatedId;

    return (
      <div>
        <FormControlLabel
          control={<MuiCheckbox ref={ref} id={checkboxId} {...rest} />}
          label={label}
        />
        {errorMessage || helperText ? (
          <FormHelperText error={Boolean(errorMessage)} sx={{ ml: 4 }}>
            {errorMessage ?? helperText}
          </FormHelperText>
        ) : null}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
