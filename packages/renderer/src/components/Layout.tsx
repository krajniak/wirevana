import { CSSProperties, ReactNode } from "react";

interface BaseLayoutProps {
  readonly children: ReactNode;
  readonly gap?: number;
  readonly padding?: number;
  readonly style?: CSSProperties;
}

export interface GridLayoutProps extends BaseLayoutProps {
  readonly columns?: number;
  readonly rowHeight?: number | "auto";
  readonly columnWidth?: string;
  readonly alignItems?: CSSProperties["alignItems"];
}

export function GridLayout({
  children,
  columns = 2,
  gap = 12,
  padding = 12,
  rowHeight = "auto",
  columnWidth,
  alignItems = "stretch",
  style,
}: GridLayoutProps) {
  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: columnWidth
      ? `repeat(${columns}, ${columnWidth})`
      : `repeat(${columns}, minmax(0, 1fr))`,
    gap,
    padding,
    alignItems,
    gridAutoRows: rowHeight === "auto" ? undefined : rowHeight,
    boxSizing: "border-box",
    ...style,
  };

  return <div style={gridStyle}>{children}</div>;
}

export interface StackLayoutProps extends BaseLayoutProps {
  readonly orientation?: "vertical" | "horizontal";
  readonly alignment?: CSSProperties["alignItems"];
  readonly justify?: CSSProperties["justifyContent"];
}

export function StackLayout({
  children,
  orientation = "vertical",
  gap = 12,
  padding = 0,
  alignment = "stretch",
  justify = "flex-start",
  style,
}: StackLayoutProps) {
  const stackStyle: CSSProperties = {
    display: "flex",
    flexDirection: orientation === "vertical" ? "column" : "row",
    gap,
    padding,
    alignItems: alignment,
    justifyContent: justify,
    boxSizing: "border-box",
    width: "100%",
    ...style,
  };

  return <div style={stackStyle}>{children}</div>;
}

export interface FlexLayoutProps extends BaseLayoutProps {
  readonly direction?: CSSProperties["flexDirection"];
  readonly wrap?: CSSProperties["flexWrap"];
  readonly align?: CSSProperties["alignItems"];
  readonly justify?: CSSProperties["justifyContent"];
}

export function FlexLayout({
  children,
  direction = "row",
  gap = 10,
  padding = 0,
  wrap = "wrap",
  align = "stretch",
  justify = "flex-start",
  style,
}: FlexLayoutProps) {
  const flexStyle: CSSProperties = {
    display: "flex",
    flexDirection: direction,
    flexWrap: wrap,
    gap,
    padding,
    alignItems: align,
    justifyContent: justify,
    width: "100%",
    boxSizing: "border-box",
    ...style,
  };

  return <div style={flexStyle}>{children}</div>;
}
