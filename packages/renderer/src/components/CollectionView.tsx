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
  maxReveal = 120, // Reduced width for better proportions
}: SwipeViewProps) {
  const renderSide = (
    items: readonly SwipeItem[],
    side: "left" | "right"
  ) => {
    if (items.length === 0) {
      return null;
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: side === 'left' ? "flex-start" : "flex-end",
          alignItems: "stretch",
          width: maxReveal,
          opacity: 0.8, // More transparent for wireframe look
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              background: item.background ?? "#ef4444",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
            onClick={() => console.log(`Action: ${item.content}`)}
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
        background: "white",
        border: "1px solid #e2e8f0", // Add border instead of shadow
        borderRadius: 8,
      }}
    >
      <div style={{ flex: 1 }}>{children}</div>
      {renderSide(rightItems, "right")}
    </div>
  );
}
