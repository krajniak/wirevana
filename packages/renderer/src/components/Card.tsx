import { CSSProperties, ReactNode } from "react";

export interface BorderCardProps {
  readonly header?: ReactNode;
  readonly footer?: ReactNode;
  readonly children: ReactNode;
  readonly background?: string;
  readonly borderColor?: string;
  readonly padding?: number;
  readonly style?: CSSProperties;
}

export function BorderCard({
  header,
  footer,
  children,
  background = "#ffffff",
  borderColor = "#e5e7eb",
  padding = 16,
  style,
}: BorderCardProps) {
  const cardStyle: CSSProperties = {
    border: `1px solid ${borderColor}`,
    borderRadius: 16,
    background,
    padding,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.08)",
    ...style,
  };

  const headerStyle: CSSProperties = {
    fontWeight: 600,
    color: "#1f2937",
  };

  const footerStyle: CSSProperties = {
    fontSize: 12,
    color: "#6b7280",
  };

  return (
    <div style={cardStyle}>
      {header && <div style={headerStyle}>{header}</div>}
      <div>{children}</div>
      {footer && <div style={footerStyle}>{footer}</div>}
    </div>
  );
}
