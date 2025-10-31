import React, { ReactNode } from "react";
import { getCardStyle, getSurfaceStyle, getTextStyle } from "../styles/MobileStyleSystem";
import type { SurfaceLevel, ComponentVariant } from "../types";

export interface BorderCardProps {
  readonly header?: ReactNode;
  readonly footer?: ReactNode;
  readonly children: ReactNode;
  readonly variant?: 'default' | 'elevated' | 'outlined';
  readonly surface?: SurfaceLevel;
  readonly padding?: number | 'tight' | 'standard' | 'loose';
  readonly style?: React.CSSProperties;
  readonly className?: string;
}

export function BorderCard({
  header,
  footer,
  children,
  variant = 'default',
  surface,
  padding = 'standard',
  style,
  className,
}: BorderCardProps) {
  // Resolve padding from semantic values
  const paddingValue = typeof padding === 'number' ? padding : {
    tight: 8,
    standard: 16,
    loose: 24,
  }[padding];

  // Get base card styles
  const baseCardStyle = surface ? getSurfaceStyle(surface) : getCardStyle(variant);
  
  const cardStyle: React.CSSProperties = {
    ...baseCardStyle,
    padding: paddingValue,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    transition: 'all 0.2s ease',
    ...style,
  };

  const headerStyle: React.CSSProperties = {
    ...getTextStyle('title'),
    margin: 0,
  };

  const footerStyle: React.CSSProperties = {
    ...getTextStyle('caption'),
    margin: 0,
    opacity: 0.7,
  };

  return (
    <div style={cardStyle} className={className}>
      {header && <div style={headerStyle}>{header}</div>}
      <div>{children}</div>
      {footer && <div style={footerStyle}>{footer}</div>}
    </div>
  );
}

// Glass Card for iOS-style blurred backgrounds
export interface GlassCardProps extends Omit<BorderCardProps, 'variant'> {
  readonly blur?: 'light' | 'medium' | 'heavy';
}

export function GlassCard({
  blur = 'medium',
  style,
  ...props
}: GlassCardProps) {
  const blurValues = {
    light: 'blur(10px)',
    medium: 'blur(20px)',
    heavy: 'blur(40px)',
  };

  const glassStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: blurValues[blur],
    WebkitBackdropFilter: blurValues[blur],
    border: '0.5px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    ...style,
  };

  return <BorderCard {...props} style={glassStyle} />;
}
