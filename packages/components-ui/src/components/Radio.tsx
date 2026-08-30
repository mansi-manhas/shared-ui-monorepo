import * as React from "react";
import MuiRadio from "@mui/material/Radio";
import RadioGroup, { type RadioGroupProps } from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioProps extends Omit<RadioGroupProps, "children"> {
  /** Group legend describing the choice being made. */
  label?: React.ReactNode;
  options: RadioOption[];
  errorMessage?: string;
  helperText?: React.ReactNode;
  /** Lay options out horizontally instead of stacked. */
  row?: boolean;
}

export function Radio({ label, options, errorMessage, helperText, row = false, name, ...rest }: RadioProps) {
  const generatedName = React.useId();
  const groupName = name ?? generatedName;

  return (
    <FormControl error={Boolean(errorMessage)} component="fieldset">
      {label ? <FormLabel component="legend">{label}</FormLabel> : null}
      <RadioGroup name={groupName} row={row} {...rest}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            control={<MuiRadio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {errorMessage || helperText ? <FormHelperText>{errorMessage ?? helperText}</FormHelperText> : null}
    </FormControl>
  );
}
