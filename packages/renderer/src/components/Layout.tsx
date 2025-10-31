import React, { ReactNode } from "react";
import { getSurfaceStyle } from "../styles/MobileStyleSystem";
import type { SurfaceLevel } from "../types";

interface BaseLayoutProps {
  readonly children: ReactNode;
  readonly gap?: number | 'tight' | 'standard' | 'loose';
  readonly padding?: number | 'tight' | 'standard' | 'loose';
  readonly surface?: SurfaceLevel;
  readonly style?: React.CSSProperties;
  readonly className?: string;
}

// Utility function to resolve semantic spacing
const resolveSpacing = (spacing: number | 'tight' | 'standard' | 'loose' | undefined, defaultValue: number = 12): number => {
  if (typeof spacing === 'number') return spacing;
  if (spacing === undefined) return defaultValue;
  
  const spacingMap = {
    tight: 4,
    standard: 12,
    loose: 20,
  };
  
  return spacingMap[spacing];
};

export interface GridLayoutProps extends BaseLayoutProps {
  readonly columns?: number;
  readonly rowHeight?: number | "auto";
  readonly columnWidth?: string;
  readonly alignItems?: React.CSSProperties["alignItems"];
}

export function GridLayout({
  children,
  columns = 2,
  gap = 'standard',
  padding = 'standard',
  surface,
  rowHeight = "auto",
  columnWidth,
  alignItems = "stretch",
  style,
  className,
}: GridLayoutProps) {
  const gapValue = resolveSpacing(gap);
  const paddingValue = resolveSpacing(padding);
  const surfaceStyle = surface ? getSurfaceStyle(surface) : {};

  const gridStyle: React.CSSProperties = {
    ...surfaceStyle,
    display: "grid",
    gridTemplateColumns: columnWidth
      ? `repeat(${columns}, ${columnWidth})`
      : `repeat(${columns}, minmax(0, 1fr))`,
    gap: gapValue,
    padding: paddingValue,
    alignItems,
    gridAutoRows: rowHeight === "auto" ? undefined : rowHeight,
    boxSizing: "border-box",
    ...style,
  };

  return <div style={gridStyle} className={className}>{children}</div>;
}

export interface StackLayoutProps extends BaseLayoutProps {
  readonly orientation?: "vertical" | "horizontal";
  readonly alignment?: React.CSSProperties["alignItems"];
  readonly justify?: React.CSSProperties["justifyContent"];
}

export function StackLayout({
  children,
  orientation = "vertical",
  gap = 'standard',
  padding = 0,
  surface,
  alignment = "stretch",
  justify = "flex-start",
  style,
  className,
}: StackLayoutProps) {
  const gapValue = resolveSpacing(gap);
  const paddingValue = resolveSpacing(padding);
  const surfaceStyle = surface ? getSurfaceStyle(surface) : {};

  const stackStyle: React.CSSProperties = {
    ...surfaceStyle,
    display: "flex",
    flexDirection: orientation === "vertical" ? "column" : "row",
    gap: gapValue,
    padding: paddingValue,
    alignItems: alignment,
    justifyContent: justify,
    boxSizing: "border-box",
    width: "100%",
    ...style,
  };

  return <div style={stackStyle} className={className}>{children}</div>;
}

export interface FlexLayoutProps extends BaseLayoutProps {
  readonly direction?: React.CSSProperties["flexDirection"];
  readonly wrap?: React.CSSProperties["flexWrap"];
  readonly align?: React.CSSProperties["alignItems"];
  readonly justify?: React.CSSProperties["justifyContent"];
}

export function FlexLayout({
  children,
  direction = "row",
  gap = 'standard',
  padding = 0,
  surface,
  wrap = "wrap",
  align = "stretch",
  justify = "flex-start",
  style,
  className,
}: FlexLayoutProps) {
  const gapValue = resolveSpacing(gap);
  const paddingValue = resolveSpacing(padding);
  const surfaceStyle = surface ? getSurfaceStyle(surface) : {};

  const flexStyle: React.CSSProperties = {
    ...surfaceStyle,
    display: "flex",
    flexDirection: direction,
    flexWrap: wrap,
    gap: gapValue,
    padding: paddingValue,
    alignItems: align,
    justifyContent: justify,
    width: "100%",
    boxSizing: "border-box",
    ...style,
  };

  return <div style={flexStyle} className={className}>{children}</div>;
}
