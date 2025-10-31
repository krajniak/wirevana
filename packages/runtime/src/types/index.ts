/**
 * Shared types for Wirevana components and styling
 */

// Icon types
export type SemanticIcon = 
  | 'home' | 'back' | 'forward' | 'close' | 'menu' | 'search' | 'filter' | 'sort'
  | 'add' | 'remove' | 'edit' | 'delete' | 'save' | 'cancel' | 'check' | 'error'
  | 'warning' | 'info' | 'success' | 'star' | 'heart' | 'bookmark' | 'share'
  | 'settings' | 'profile' | 'notification' | 'message' | 'phone' | 'email'
  | 'calendar' | 'clock' | 'location' | 'camera' | 'image' | 'file' | 'folder'
  | 'download' | 'upload' | 'refresh' | 'sync' | 'wifi' | 'bluetooth'
  | 'archive' | 'users' | 'clipboard' | 'chart' | 'dashboard';

// Style types
export type Platform = 'ios' | 'android' | 'auto';
export type SurfaceLevel = 'level0' | 'level1' | 'level2' | 'level3' | 'level4' | 'level5';
export type ColorRole = 'primary' | 'secondary' | 'tertiary' | 'error' | 'warning' | 'success' | 'surface' | 'background';
export type TextStyle = 'display-large' | 'display-medium' | 'display-small' | 'headline-large' | 'headline-medium' | 'headline-small' | 'title-large' | 'title-medium' | 'title-small' | 'body-large' | 'body-medium' | 'body-small' | 'label-large' | 'label-medium' | 'label-small';
export type ComponentVariant = 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';