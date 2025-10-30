import { CSSProperties, ReactNode, useEffect } from "react";

export interface PopupProps {
  readonly isOpen: boolean;
  readonly onClose?: () => void;
  readonly title?: string;
  readonly content: ReactNode;
  readonly footer?: ReactNode;
  readonly style?: CSSProperties;
}

export function Popup({
  isOpen,
  onClose,
  title,
  content,
  footer,
  style,
}: PopupProps) {
  if (!isOpen) {
    return null;
  }

  const overlayStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 30,
  };

  const cardStyle: CSSProperties = {
    background: "#ffffff",
    borderRadius: 16,
    width: "min(420px, 90vw)",
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 16,
    boxShadow: "0 15px 45px rgba(15, 23, 42, 0.2)",
    ...style,
  };

  return (
    <div style={overlayStyle} onClick={() => onClose?.()}>
      <div
        style={cardStyle}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        {title && <h2 style={{ margin: 0, fontSize: 20 }}>{title}</h2>}
        <div>{content}</div>
        {footer && <div>{footer}</div>}
        {onClose && (
          <button
            type="button"
            style={{ alignSelf: "flex-end", border: "none", background: "transparent", color: "#2563eb" }}
            onClick={() => onClose?.()}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}

export interface SnackbarProps {
  readonly message: string;
  readonly actionLabel?: string;
  readonly onAction?: () => void;
  readonly isVisible?: boolean;
  readonly durationMs?: number;
  readonly style?: CSSProperties;
}

export function Snackbar({
  message,
  actionLabel,
  onAction,
  isVisible = true,
  durationMs,
  style,
}: SnackbarProps) {
  useEffect(() => {
    if (!durationMs || !onAction) {
      return;
    }

    const timer = setTimeout(() => onAction(), durationMs);
    return () => clearTimeout(timer);
  }, [durationMs, onAction]);

  if (!isVisible) {
    return null;
  }

  const snackbarStyle: CSSProperties = {
    position: "fixed",
    left: "50%",
    bottom: 24,
    transform: "translateX(-50%)",
    background: "#111827",
    color: "#f9fafb",
    borderRadius: 9999,
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.3)",
    zIndex: 40,
    ...style,
  };

  const actionStyle: CSSProperties = {
    border: "none",
    background: "transparent",
    color: "#38bdf8",
    fontWeight: 600,
    cursor: "pointer",
  };

  return (
    <div style={snackbarStyle}>
      <span>{message}</span>
      {actionLabel && (
        <button type="button" style={actionStyle} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
