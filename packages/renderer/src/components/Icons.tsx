/**
 * Icon System for Wirevana
 * 
 * Integrates Tabler Icons for consistent iconography across wireframes.
 * Provides semantic icon names and platform-specific rendering.
 */

import React from 'react';
import type { SemanticIcon } from '../types';

// Tabler icon name mappings
const TablerIconMap: Record<SemanticIcon, string> = {
  // Navigation
  home: 'home',
  back: 'arrow-left',
  forward: 'arrow-right',
  close: 'x',
  menu: 'menu-2',
  search: 'search',
  filter: 'filter',
  sort: 'arrows-sort',
  
  // Actions
  add: 'plus',
  remove: 'minus',
  edit: 'edit',
  delete: 'trash',
  save: 'device-floppy',
  cancel: 'x',
  check: 'check',
  
  // Status
  error: 'alert-circle',
  warning: 'alert-triangle',
  info: 'info-circle',
  success: 'check-circle',
  
  // Interactions
  star: 'star',
  heart: 'heart',
  bookmark: 'bookmark',
  share: 'share',
  
  // User & System
  settings: 'settings',
  profile: 'user-circle',
  notification: 'bell',
  message: 'message',
  phone: 'phone',
  email: 'mail',
  
  // Time & Location
  calendar: 'calendar',
  clock: 'clock',
  location: 'map-pin',
  
  // Media
  camera: 'camera',
  image: 'photo',
  file: 'file',
  folder: 'folder',
  
  // Transfer
  download: 'download',
  upload: 'upload',
  refresh: 'refresh',
  sync: 'sync',
  
  // Connectivity
  wifi: 'wifi',
  bluetooth: 'bluetooth',
  
  // Organization
  archive: 'archive',
  users: 'users',
  clipboard: 'clipboard',
  chart: 'chart-bar',
  dashboard: 'dashboard',
  
  // Additional arrows
  'arrow-down': 'arrow-down',
  // Media control
  play: 'player-play',
  pause: 'player-pause',
};

interface IconProps {
  name: SemanticIcon;
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

// SVG icon component that loads from Tabler Icons CDN
export function Icon({ name, size = 24, color = 'currentColor', className, style }: IconProps) {
  const tablerName = TablerIconMap[name];
  const iconUrl = `https://cdn.jsdelivr.net/npm/@tabler/icons@3.0.0/icons/${tablerName}.svg`;
  
  return (
    <img
      src={iconUrl}
      alt={name}
      width={size}
      height={size}
      style={{
        filter: color !== 'currentColor' ? `invert(1)` : undefined,
        ...style,
      }}
      className={className}
    />
  );
}

// Alternative inline SVG implementation for better performance
export function InlineIcon({ name, size = 24, color = 'currentColor', className, style }: IconProps) {
  const tablerName = TablerIconMap[name];
  
  // This would ideally be replaced with an actual icon library or bundled SVGs
  // For now, we'll use a simple geometric representation
  const iconElements: Record<string, React.ReactElement> = {
    'home': (
      <path d="M3 12L5 10L12 3L19 10L21 12M5 12V20C5 20.5523 5.44772 21 6 21H9M19 12V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    ),
    'plus': (
      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    ),
    'search': (
      <path d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    ),
    'x': (
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    ),
    'check': (
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    ),
    'arrow-left': (
      <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    ),
    'arrow-right': (
      <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    ),
    'arrow-down': (
      <path d="M19 12L12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    ),
    'player-play': (
      <path d="M7 4V20L20 12L7 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
    'player-pause': (
      <path d="M7 4H11V20H7V4ZM13 4H17V20H13V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
    'menu-2': (
      <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    ),
    'settings': (
      <path d="M12.22 2H11.78C11.2496 2 10.7409 2.21071 10.3674 2.58579C9.99379 2.96086 9.78308 3.46957 9.78308 4V4.18C9.78308 4.47328 9.66194 4.75419 9.44441 4.96162C9.22688 5.16905 8.92598 5.28571 8.61538 5.28571C8.30478 5.28571 8.00388 5.16905 7.78635 4.96162C7.56882 4.75419 7.44768 4.47328 7.44768 4.18V4C7.44768 3.46957 7.23697 2.96086 6.86332 2.58579C6.48967 2.21071 5.98096 2 5.45053 2H5.00947C4.47904 2 3.97033 2.21071 3.59668 2.58579C3.22303 2.96086 3.01232 3.46957 3.01232 4V4.18C3.01232 4.47328 2.89118 4.75419 2.67365 4.96162C2.45612 5.16905 2.15522 5.28571 1.84462 5.28571H1.6C1.06957 5.28571 0.56086 5.49643 0.187209 5.87007C-0.186442 6.24372 -0.397152 6.75243 -0.397152 7.28286V7.71714C-0.397152 8.24757 -0.186442 8.75628 0.187209 9.12993C0.56086 9.50357 1.06957 9.71429 1.6 9.71429H1.84462C2.15522 9.71429 2.45612 9.83095 2.67365 10.0384C2.89118 10.2458 3.01232 10.5267 3.01232 10.82V11C3.01232 11.5304 3.22303 12.0391 3.59668 12.4128C3.97033 12.7864 4.47904 12.9971 5.00947 12.9971H5.45053C5.98096 12.9971 6.48967 12.7864 6.86332 12.4128C7.23697 12.0391 7.44768 11.5304 7.44768 11V10.82C7.44768 10.5267 7.56882 10.2458 7.78635 10.0384C8.00388 9.83095 8.30478 9.71429 8.61538 9.71429C8.92598 9.71429 9.22688 9.83095 9.44441 10.0384C9.66194 10.2458 9.78308 10.5267 9.78308 10.82V11C9.78308 11.5304 9.99379 12.0391 10.3674 12.4128C10.7409 12.7864 11.2496 12.9971 11.78 12.9971H12.22C12.7504 12.9971 13.2591 12.7864 13.6326 12.4128C14.0062 12.0391 14.2169 11.5304 14.2169 11V10.82C14.2169 10.5267 14.3381 10.2458 14.5556 10.0384C14.7731 9.83095 15.074 9.71429 15.3846 9.71429C15.6952 9.71429 15.9961 9.83095 16.2136 10.0384C16.4312 10.2458 16.5523 10.5267 16.5523 10.82V11C16.5523 11.5304 16.763 12.0391 17.1367 12.4128C17.5103 12.7864 18.019 12.9971 18.5495 12.9971H18.9905C19.5209 12.9971 20.0296 12.7864 20.4033 12.4128C20.7769 12.0391 20.9877 11.5304 20.9877 11V10.82C20.9877 10.5267 21.1088 10.2458 21.3264 10.0384C21.5439 9.83095 21.8448 9.71429 22.1554 9.71429H22.4C22.9304 9.71429 23.4391 9.50357 23.8128 9.12993C24.1864 8.75628 24.3972 8.24757 24.3972 7.71714V7.28286C24.3972 6.75243 24.1864 6.24372 23.8128 5.87007C23.4391 5.49643 22.9304 5.28571 22.4 5.28571H22.1554C21.8448 5.28571 21.5439 5.16905 21.3264 4.96162C21.1088 4.75419 20.9877 4.47328 20.9877 4.18V4C20.9877 3.46957 20.7769 2.96086 20.4033 2.58579C20.0296 2.21071 19.5209 2 18.9905 2H18.5495C18.019 2 17.5103 2.21071 17.1367 2.58579C16.763 2.96086 16.5523 3.46957 16.5523 4V4.18C16.5523 4.47328 16.4312 4.75419 16.2136 4.96162C15.9961 5.16905 15.6952 5.28571 15.3846 5.28571C15.074 5.28571 14.7731 5.16905 14.5556 4.96162C14.3381 4.75419 14.2169 4.47328 14.2169 4.18V4C14.2169 3.46957 14.0062 2.96086 13.6326 2.58579C13.2591 2.21071 12.7504 2 12.22 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    ),
    'archive': (
      <path d="M21 8V21H3V8M1 3H23L21 8H3L1 3ZM10 12L14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    ),
    'users': (
      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    ),
    'clipboard': (
      <path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5M9 5C9 5.53043 9.21071 6.03914 9.58579 6.41421C9.96086 6.78929 10.4696 7 11 7H13C13.5304 7 14.0391 6.78929 14.4142 6.41421C14.7893 6.03914 15 5.53043 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    ),
  };

  const iconElement = iconElements[tablerName] || iconElements['x']; // fallback to 'x' icon

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ color, ...style }}
      className={className}
    >
      {iconElement}
    </svg>
  );
}

// Platform-specific icon rendering
interface PlatformIconProps extends IconProps {
  platform?: 'ios' | 'android' | 'auto';
}

export function PlatformIcon({ platform = 'auto', ...props }: PlatformIconProps) {
  // For now, we'll use the same icon system for both platforms
  // In the future, this could switch between different icon sets
  return <InlineIcon {...props} />;
}

// Icon button component
interface IconButtonProps {
  icon: SemanticIcon;
  onPress?: () => void;
  size?: number;
  variant?: 'filled' | 'outlined' | 'text';
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: React.CSSProperties;
}

export function IconButton({ 
  icon, 
  onPress, 
  size = 24, 
  variant = 'text', 
  disabled = false, 
  accessibilityLabel,
  style 
}: IconButtonProps) {
  const buttonStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    borderRadius: '50%',
    border: variant === 'outlined' ? '1px solid currentColor' : 'none',
    background: variant === 'filled' ? 'currentColor' : 'transparent',
    color: variant === 'filled' ? 'white' : 'currentColor',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.2s ease',
    minWidth: size + 16,
    minHeight: size + 16,
    ...style,
  };

  return (
    <button
      type="button"
      onClick={onPress}
      disabled={disabled}
      style={buttonStyles}
      aria-label={accessibilityLabel || icon}
    >
      <InlineIcon name={icon} size={size} />
    </button>
  );
}

// Icon with text label
interface IconWithLabelProps {
  icon: SemanticIcon;
  label: string;
  direction?: 'horizontal' | 'vertical';
  size?: number;
  style?: React.CSSProperties;
}

export function IconWithLabel({ 
  icon, 
  label, 
  direction = 'horizontal', 
  size = 16,
  style 
}: IconWithLabelProps) {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    ...style,
  };

  return (
    <div style={containerStyles}>
      <InlineIcon name={icon} size={size} />
      <span>{label}</span>
    </div>
  );
}

export default Icon;