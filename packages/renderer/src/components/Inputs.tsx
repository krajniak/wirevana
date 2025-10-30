import { CSSProperties, ReactNode, useMemo } from "react";

export interface EntryProps {
  readonly value: string;
  readonly onChange?: (value: string) => void;
  readonly placeholder?: string;
  readonly label?: string;
  readonly secure?: boolean;
  readonly helperText?: string;
  readonly error?: string;
  readonly leading?: ReactNode;
  readonly trailing?: ReactNode;
  readonly style?: CSSProperties;
}

export function Entry({
  value,
  onChange,
  placeholder,
  label,
  secure = false,
  helperText,
  error,
  leading,
  trailing,
  style,
}: EntryProps) {
  const wrapperStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    width: "100%",
    ...style,
  };

  const fieldStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 8,
    border: `1px solid ${error ? "#ef4444" : "#d1d5db"}`,
    borderRadius: 12,
    padding: "8px 12px",
    background: "#ffffff",
    boxShadow: error ? "0 0 0 3px rgba(239,68,68,0.15)" : "0 1px 2px rgba(15, 23, 42, 0.08)",
  };

  const inputStyle: CSSProperties = {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: 14,
    background: "transparent",
  };

  const helperStyle: CSSProperties = {
    fontSize: 12,
    color: error ? "#b91c1c" : "#6b7280",
  };

  return (
    <label style={wrapperStyle}>
      {label && <span style={{ fontWeight: 600, color: "#111827" }}>{label}</span>}
      <div style={fieldStyle}>
        {leading && <span>{leading}</span>}
        <input
          style={inputStyle}
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          placeholder={placeholder}
          type={secure ? "password" : "text"}
        />
        {trailing && <span>{trailing}</span>}
      </div>
      {(helperText || error) && <span style={helperStyle}>{error ?? helperText}</span>}
    </label>
  );
}

export interface PickerOption<T = string> {
  readonly value: T;
  readonly label: string;
}

export interface PickerProps<T = string> {
  readonly options: readonly PickerOption<T>[];
  readonly value: T | null;
  readonly onChange?: (value: T | null) => void;
  readonly label?: string;
  readonly placeholder?: string;
  readonly style?: CSSProperties;
}

export function Picker<T>({
  options,
  value,
  onChange,
  label,
  placeholder = "Select...",
  style,
}: PickerProps<T>) {
  const optionMap = useMemo(
    () =>
      new Map<PickerOption<T>["value"], PickerOption<T>>(
        options.map((option) => [option.value, option])
      ),
    [options]
  );

  const currentLabel = value !== null ? optionMap.get(value)?.label : undefined;
  const isDisabled = options.length === 0;

  const wrapperStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    width: "100%",
    ...style,
  };

  const triggerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #d1d5db",
    borderRadius: 12,
    padding: "10px 14px",
    background: "#ffffff",
    fontSize: 14,
    color: currentLabel ? "#111827" : "#9ca3af",
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 0.6 : 1,
  };

  return (
    <div style={wrapperStyle}>
      {label && <span style={{ fontWeight: 600, color: "#111827" }}>{label}</span>}
      <button
        type="button"
        style={triggerStyle}
        disabled={isDisabled}
        onClick={() => {
          if (isDisabled) {
            return;
          }

          const nextIndex = options.findIndex((option) => option.value === value);
          const next = options[(nextIndex + 1) % options.length];
          onChange?.(next?.value ?? null);
        }}
      >
        <span>{currentLabel ?? placeholder}</span>
        <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>Cycle</span>
      </button>
    </div>
  );
}
