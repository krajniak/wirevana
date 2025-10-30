import { CSSProperties, ReactNode } from "react";

export interface CollectionViewProps<T> {
  readonly items: readonly T[];
  readonly renderItem: (item: T, index: number) => ReactNode;
  readonly orientation?: "vertical" | "horizontal";
  readonly spacing?: number;
  readonly header?: ReactNode;
  readonly footer?: ReactNode;
  readonly emptyPlaceholder?: ReactNode;
  readonly style?: CSSProperties;
}

export function CollectionView<T>({
  items,
  renderItem,
  orientation = "vertical",
  spacing = 8,
  header,
  footer,
  emptyPlaceholder,
  style,
}: CollectionViewProps<T>) {
  const isHorizontal = orientation === "horizontal";
  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: isHorizontal ? "row" : "column",
    gap: spacing,
    width: "100%",
    overflowX: isHorizontal ? "auto" : undefined,
    overflowY: !isHorizontal ? "auto" : undefined,
    boxSizing: "border-box",
    padding: spacing,
    ...style,
  };

  const content = items.length === 0 && emptyPlaceholder ? (
    <div style={{ opacity: 0.6, fontStyle: "italic" }}>{emptyPlaceholder}</div>
  ) : (
    items.map((item, index) => (
      <div key={index} style={{ flex: "0 0 auto" }}>
        {renderItem(item, index)}
      </div>
    ))
  );

  return (
    <div style={containerStyle}>
      {header && <div style={{ flex: "0 0 auto" }}>{header}</div>}
      {content}
      {footer && <div style={{ flex: "0 0 auto" }}>{footer}</div>}
    </div>
  );
}

export interface SwipeItem {
  readonly content: ReactNode;
  readonly background?: string;
}

export interface SwipeViewProps {
  readonly leftItems?: readonly SwipeItem[];
  readonly rightItems?: readonly SwipeItem[];
  readonly children: ReactNode;
  readonly maxReveal?: number;
}

export function SwipeView({
  leftItems = [],
  rightItems = [],
  children,
  maxReveal = 72,
}: SwipeViewProps) {
  const renderSide = (
    items: readonly SwipeItem[],
    align: "flex-start" | "flex-end"
  ) => {
    if (items.length === 0) {
      return null;
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: align,
          gap: 6,
          padding: 8,
          minWidth: maxReveal,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              background: item.background ?? "#ef4444",
              color: "white",
              borderRadius: 8,
              padding: "8px 12px",
              minWidth: maxReveal - 16,
              textAlign: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            {item.content}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        width: "100%",
        overflow: "hidden",
        borderRadius: 12,
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        background: "white",
      }}
    >
      {renderSide(leftItems, "flex-start")}
      <div style={{ flex: 1 }}>{children}</div>
      {renderSide(rightItems, "flex-end")}
    </div>
  );
}
