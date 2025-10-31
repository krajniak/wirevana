import React, { ReactNode } from "react";
import { getButtonStyle, getSurfaceStyle } from "../styles/MobileStyleSystem";
import { InlineIcon } from "./Icons";
import type { SemanticIcon, SurfaceLevel } from "../types";

export interface FabButtonProps {
  readonly icon?: ReactNode | SemanticIcon;
  readonly label?: string;
  readonly onClick?: () => void;
  readonly style?: React.CSSProperties;
  readonly position?: "bottom-right" | "bottom-left" | "top-right" | "top-left" | "center";
  readonly variant?: 'primary' | 'secondary' | 'elevated';
  readonly size?: 'small' | 'medium' | 'large';
  readonly disabled?: boolean;
  readonly accessibilityLabel?: string;
}

const positionStyles: Record<
  NonNullable<FabButtonProps["position"]>,
  React.CSSProperties
> = {
  "bottom-right": { bottom: 24, right: 24 },
  "bottom-left": { bottom: 24, left: 24 },
  "top-right": { top: 24, right: 24 },
  "top-left": { top: 24, left: 24 },
  "center": { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
};

const sizeStyles = {
  small: { padding: "12px", minWidth: 48, minHeight: 48 },
  medium: { padding: "16px", minWidth: 56, minHeight: 56 },
  large: { padding: "20px", minWidth: 64, minHeight: 64 },
};

export function FabButton({
  icon,
  label,
  onClick,
  style,
  position = "bottom-right",
  variant = 'primary',
  size = 'medium',
  disabled = false,
  accessibilityLabel,
}: FabButtonProps) {
  const baseStyle = getButtonStyle(variant);
  const sizeStyle = sizeStyles[size];
  const positionStyle = position !== 'center' ? positionStyles[position] : {};

  const fabStyle: React.CSSProperties = {
    ...baseStyle,
    position: position === 'center' ? 'relative' : 'fixed',
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0, // Remove gap since FAB should be icon-only
    borderRadius: 9999,
    border: "none",
    fontWeight: 600,
    letterSpacing: 0.2,
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: "all 0.2s ease",
    // Enhanced elevation for FAB
    boxShadow: variant === 'elevated' 
      ? "0 6px 16px rgba(0, 0, 0, 0.12), 0 3px 6px rgba(0, 0, 0, 0.08)"
      : "0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12)",
    zIndex: 1000,
    ...sizeStyle,
    ...positionStyle,
    ...style,
  };

  const iconSize = size === 'small' ? 20 : size === 'large' ? 28 : 24;

  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <InlineIcon name={icon as SemanticIcon} size={iconSize} />;
    }
    return icon;
  };

  return (
    <button
      type="button"
      style={fabStyle}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={accessibilityLabel || label || 'Floating action button'}
      onMouseDown={(event) => {
        if (!disabled) {
          event.currentTarget.style.transform = `${positionStyle.transform || ''} scale(0.96)`;
        }
      }}
      onMouseUp={(event) => {
        if (!disabled) {
          event.currentTarget.style.transform = positionStyle.transform || 'scale(1)';
        }
      }}
      onMouseLeave={(event) => {
        if (!disabled) {
          event.currentTarget.style.transform = positionStyle.transform || 'scale(1)';
        }
      }}
    >
      {renderIcon()}
      {/* Label removed for icon-only FAB */}
    </button>
  );
}

// Extended FAB for complex actions
export interface ExtendedFabProps extends Omit<FabButtonProps, 'icon'> {
  readonly icon: SemanticIcon;
  readonly actions?: Array<{
    icon: SemanticIcon;
    label: string;
    onClick: () => void;
  }>;
  readonly expanded?: boolean;
}

export function ExtendedFab({
  actions = [],
  expanded = false,
  ...props
}: ExtendedFabProps) {
  if (!expanded || actions.length === 0) {
    return <FabButton {...props} />;
  }

  return (
    <div style={{ position: 'fixed', ...positionStyles[props.position || 'bottom-right'] }}>
      {/* Action buttons */}
      {actions.map((action, index) => (
        <FabButton
          key={index}
          icon={action.icon}
          label={action.label}
          onClick={action.onClick}
          size="small"
          variant="secondary"
          position="center"
          style={{
            position: 'absolute',
            bottom: (index + 1) * 64 + 8,
            right: 0,
            transform: `translateY(${expanded ? 0 : 20}px)`,
            opacity: expanded ? 1 : 0,
            transition: `all 0.2s ease ${index * 0.05}s`,
          }}
        />
      ))}
      
      {/* Main FAB */}
      <FabButton {...props} position="center" />
    </div>
  );
}
