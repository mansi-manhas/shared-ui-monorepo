import * as React from "react";

export interface DatePickerProps {
  /** Field label, rendered above the input. */
  label?: string;
  /** ISO date string (yyyy-mm-dd). */
  value?: string;
  onChange?: (value: string) => void;
  min?: string;
  max?: string;
  disabled?: boolean;
  id?: string;
}

let hasWarnedDeprecated = false;
const isProduction =
  (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV === "production";

/**
 * @deprecated `DatePicker` predates this package's shared field styling — no error state, no helper
 * text, no `Input`/`Select`-style props, just a bare native input. It will be removed in the next
 * major version. Use `CalendarField` instead: same "pick a date" job, built on the same `TextField`
 * foundation as `Input` and `Select`, so error/helper text/disabled states come for free.
 */
export function DatePicker({ label, value, onChange, min, max, disabled, id }: DatePickerProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  if (!isProduction && !hasWarnedDeprecated) {
    hasWarnedDeprecated = true;
    // eslint-disable-next-line no-console
    console.warn(
      "[@mansi-manhas/components-ui] `DatePicker` is deprecated and will be removed in the next major " +
        "version. It predates this package's shared field styling (no error state, no helper text, not " +
        "built on `TextField`). Switch to `CalendarField`, which does the same job with the same props " +
        "shape as `Input`/`Select`.",
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, fontFamily: "inherit" }}>
      {label ? (
        <label htmlFor={inputId} style={{ fontSize: 12, color: "#666" }}>
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        type="date"
        value={value}
        min={min}
        max={max}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.value)}
        style={{
          padding: "8px 10px",
          border: "1px solid #c4c4c4",
          borderRadius: 4,
          font: "inherit",
          colorScheme: "light dark",
        }}
      />
    </div>
  );
}

DatePicker.displayName = "DatePicker";
