import { CSSProperties, ReactNode } from "react";

export interface FabButtonProps {
  readonly icon?: ReactNode;
  readonly label?: string;
  readonly onClick?: () => void;
  readonly style?: CSSProperties;
  readonly position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  readonly color?: string;
}

const positionStyles: Record<
  NonNullable<FabButtonProps["position"]>,
  CSSProperties
> = {
  "bottom-right": { bottom: 24, right: 24 },
  "bottom-left": { bottom: 24, left: 24 },
  "top-right": { top: 24, right: 24 },
  "top-left": { top: 24, left: 24 },
};

export function FabButton({
  icon,
  label,
  onClick,
  style,
  position = "bottom-right",
  color = "#2563eb",
}: FabButtonProps) {
  const fabStyle: CSSProperties = {
    position: "absolute",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: label ? 8 : 0,
    borderRadius: 9999,
    padding: label ? "12px 20px" : 16,
    background: color,
    color: "#ffffff",
    boxShadow: "0 10px 25px rgba(37, 99, 235, 0.35)",
    cursor: "pointer",
    border: "none",
    fontWeight: 600,
    letterSpacing: 0.2,
    transition: "transform 120ms ease, box-shadow 120ms ease",
    ...positionStyles[position],
    ...style,
  };

  return (
    <button
      type="button"
      style={fabStyle}
      onClick={() => {
        onClick?.();
      }}
      onMouseDown={(event) => {
        event.currentTarget.style.transform = "scale(0.97)";
        event.currentTarget.style.boxShadow = "0 5px 12px rgba(37, 99, 235, 0.25)";
      }}
      onMouseUp={(event) => {
        event.currentTarget.style.transform = "scale(1)";
        event.currentTarget.style.boxShadow = "0 10px 25px rgba(37, 99, 235, 0.35)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = "scale(1)";
        event.currentTarget.style.boxShadow = "0 10px 25px rgba(37, 99, 235, 0.35)";
      }}
    >
      {icon}
      {label && <span>{label}</span>}
    </button>
  );
}
