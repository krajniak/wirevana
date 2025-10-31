/**
 * Mobile-Native Style System for Wirevana
 * 
 * Implements Material Design 3 and iOS design patterns for mobile wireframes.
 * Replaces hard-coded theme colors with semantic design tokens.
 */

import React from 'react';
import type { Platform, SurfaceLevel, ColorRole, TextStyle, ComponentVariant } from '../types';

// Material Design 3 Design Tokens
export const MaterialDesign3Tokens = {
  // Reference Colors (Light Theme)
  ref: {
    palette: {
      primary: {
        primary0: '#000000',
        primary10: '#21005d',
        primary20: '#381e72',
        primary30: '#4f378b',
        primary40: '#6750a4',
        primary50: '#7f67be',
        primary60: '#9a82db',
        primary70: '#b69df8',
        primary80: '#d0bcff',
        primary90: '#eaddff',
        primary95: '#f6edff',
        primary99: '#fffbfe',
        primary100: '#ffffff',
      },
      neutral: {
        neutral0: '#000000',
        neutral4: '#0f0d13',
        neutral6: '#141218',
        neutral10: '#1d1b20',
        neutral12: '#211f26',
        neutral17: '#2b2930',
        neutral20: '#313033',
        neutral22: '#343438',
        neutral24: '#37363a',
        neutral30: '#484649',
        neutral40: '#605d62',
        neutral50: '#787579',
        neutral60: '#939094',
        neutral70: '#aeaaae',
        neutral80: '#c9c5ca',
        neutral87: '#ddd8dd',
        neutral90: '#e6e0e9',
        neutral92: '#ede6ea',
        neutral94: '#f3edf7',
        neutral95: '#f5eff7',
        neutral96: '#f7f2fa',
        neutral98: '#fdf8fd',
        neutral99: '#fffbfe',
        neutral100: '#ffffff',
      },
      error: {
        error0: '#000000',
        error10: '#410e0b',
        error20: '#601410',
        error30: '#8c1d18',
        error40: '#b3261e',
        error50: '#dc362e',
        error60: '#e46962',
        error70: '#ec928e',
        error80: '#f2b8b5',
        error90: '#f9dedc',
        error95: '#fceeee',
        error99: '#fffbf9',
        error100: '#ffffff',
      }
    }
  },
  // System Tokens (Semantic Layer)
  sys: {
    color: {
      // Light Theme
      primary: '#6750a4',
      onPrimary: '#ffffff',
      primaryContainer: '#eaddff',
      onPrimaryContainer: '#21005d',
      
      secondary: '#625b71',
      onSecondary: '#ffffff',
      secondaryContainer: '#e8def8',
      onSecondaryContainer: '#1d192b',
      
      tertiary: '#7d5260',
      onTertiary: '#ffffff',
      tertiaryContainer: '#ffd8e4',
      onTertiaryContainer: '#31111d',
      
      error: '#b3261e',
      onError: '#ffffff',
      errorContainer: '#f9dedc',
      onErrorContainer: '#410e0b',
      
      background: '#fffbfe',
      onBackground: '#1d1b20',
      
      surface: '#fffbfe',
      onSurface: '#1d1b20',
      surfaceVariant: '#e7e0ec',
      onSurfaceVariant: '#49454f',
      
      surfaceDim: '#ded8e1',
      surfaceBright: '#fffbfe',
      surfaceContainerLowest: '#ffffff',
      surfaceContainerLow: '#f7f2fa',
      surfaceContainer: '#f3edf7',
      surfaceContainerHigh: '#ede6f0',
      surfaceContainerHighest: '#e6e0e9',
      
      outline: '#79747e',
      outlineVariant: '#cab6e3',
      
      inverseSurface: '#322f35',
      inverseOnSurface: '#f5eff7',
      inversePrimary: '#d0bcff',
      
      scrim: '#000000',
      shadow: '#000000',
    },
    elevation: {
      level0: '0px 0px 0px 0px rgba(0, 0, 0, 0)',
      level1: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
      level2: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
      level3: '0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
      level4: '0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
      level5: '0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)',
    },
    shape: {
      corner: {
        none: '0px',
        extraSmall: '4px',
        small: '8px',
        medium: '12px',
        large: '16px',
        extraLarge: '28px',
        full: '9999px',
      }
    },
    typography: {
      displayLarge: {
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: '57px',
        lineHeight: '64px',
        letterSpacing: '-0.25px',
      },
      displayMedium: {
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: '45px',
        lineHeight: '52px',
        letterSpacing: '0px',
      },
      displaySmall: {
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: '36px',
        lineHeight: '44px',
        letterSpacing: '0px',
      },
      headlineLarge: {
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: '32px',
        lineHeight: '40px',
        letterSpacing: '0px',
      },
      headlineMedium: {
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: '28px',
        lineHeight: '36px',
        letterSpacing: '0px',
      },
      headlineSmall: {
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: '24px',
        lineHeight: '32px',
        letterSpacing: '0px',
      },
      titleLarge: {
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: '22px',
        lineHeight: '28px',
        letterSpacing: '0px',
      },
      titleMedium: {
        fontFamily: 'Roboto',
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '0.15px',
      },
      titleSmall: {
        fontFamily: 'Roboto',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.1px',
      },
      bodyLarge: {
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: '16px',
        lineHeight: '24px',
        letterSpacing: '0.5px',
      },
      bodyMedium: {
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.25px',
      },
      bodySmall: {
        fontFamily: 'Roboto',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '16px',
        letterSpacing: '0.4px',
      },
      labelLarge: {
        fontFamily: 'Roboto',
        fontWeight: '500',
        fontSize: '14px',
        lineHeight: '20px',
        letterSpacing: '0.1px',
      },
      labelMedium: {
        fontFamily: 'Roboto',
        fontWeight: '500',
        fontSize: '12px',
        lineHeight: '16px',
        letterSpacing: '0.5px',
      },
      labelSmall: {
        fontFamily: 'Roboto',
        fontWeight: '500',
        fontSize: '11px',
        lineHeight: '16px',
        letterSpacing: '0.5px',
      },
    }
  }
};

// iOS Design System Tokens
export const iOSDesignTokens = {
  colors: {
    // System Colors
    systemBlue: '#007AFF',
    systemGreen: '#34C759',
    systemIndigo: '#5856D6',
    systemOrange: '#FF9500',
    systemPink: '#FF2D92',
    systemPurple: '#AF52DE',
    systemRed: '#FF3B30',
    systemTeal: '#30B0C7',
    systemYellow: '#FFCC00',
    
    // Semantic Colors
    label: '#000000',
    secondaryLabel: '#3C3C43',
    tertiaryLabel: '#3C3C43',
    quaternaryLabel: '#3C3C43',
    
    systemFill: '#78788033',
    secondarySystemFill: '#78788028',
    tertiarySystemFill: '#76768019',
    quaternarySystemFill: '#74748012',
    
    placeholderText: '#3C3C434D',
    
    systemBackground: '#FFFFFF',
    secondarySystemBackground: '#F2F2F7',
    tertiarySystemBackground: '#FFFFFF',
    
    systemGroupedBackground: '#F2F2F7',
    secondarySystemGroupedBackground: '#FFFFFF',
    tertiarySystemGroupedBackground: '#F2F2F7',
    
    separator: '#3C3C434A',
    opaqueSeparator: '#C6C6C8',
    
    link: '#007AFF',
    
    // Dark Mode variants would be defined here
  },
  materials: {
    // iOS Materials for glass morphism
    ultraThinMaterial: 'rgba(120, 120, 128, 0.16)',
    thinMaterial: 'rgba(120, 120, 128, 0.24)',
    regularMaterial: 'rgba(120, 120, 128, 0.32)',
    thickMaterial: 'rgba(120, 120, 128, 0.48)',
    ultraThickMaterial: 'rgba(120, 120, 128, 0.64)',
  },
  typography: {
    largeTitle: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display"',
      fontSize: '34px',
      fontWeight: '400',
      lineHeight: '41px',
    },
    title1: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display"',
      fontSize: '28px',
      fontWeight: '400',
      lineHeight: '34px',
    },
    title2: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display"',
      fontSize: '22px',
      fontWeight: '400',
      lineHeight: '28px',
    },
    title3: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display"',
      fontSize: '20px',
      fontWeight: '400',
      lineHeight: '25px',
    },
    headline: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text"',
      fontSize: '17px',
      fontWeight: '600',
      lineHeight: '22px',
    },
    body: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text"',
      fontSize: '17px',
      fontWeight: '400',
      lineHeight: '22px',
    },
    callout: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text"',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '21px',
    },
    subhead: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text"',
      fontSize: '15px',
      fontWeight: '400',
      lineHeight: '20px',
    },
    footnote: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text"',
      fontSize: '13px',
      fontWeight: '400',
      lineHeight: '18px',
    },
    caption1: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text"',
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: '16px',
    },
    caption2: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text"',
      fontSize: '11px',
      fontWeight: '400',
      lineHeight: '13px',
    },
  },
  spacing: {
    tight: '4px',
    standard: '8px',
    standardExpanded: '16px',
    loose: '20px',
  },
  cornerRadius: {
    small: '8px',
    medium: '12px',
    large: '16px',
    extraLarge: '20px',
  }
};

// Semantic Styles - Platform Agnostic
export interface SemanticStyle {
  surface: SurfaceLevel;
  colorRole: ColorRole;
  variant?: ComponentVariant;
  textStyle?: TextStyle;
}

export const SemanticStyles = {
  // Surface Styles
  surface: {
    primary: { surface: 'level1' as SurfaceLevel, colorRole: 'surface' as ColorRole },
    secondary: { surface: 'level2' as SurfaceLevel, colorRole: 'surface' as ColorRole },
    elevated: { surface: 'level3' as SurfaceLevel, colorRole: 'surface' as ColorRole },
    modal: { surface: 'level4' as SurfaceLevel, colorRole: 'surface' as ColorRole },
    overlay: { surface: 'level5' as SurfaceLevel, colorRole: 'surface' as ColorRole },
  },
  
  // Component Styles
  button: {
    primary: { surface: 'level1' as SurfaceLevel, colorRole: 'primary' as ColorRole, variant: 'tonal' as ComponentVariant }, // Changed to tonal for more subtle
    secondary: { surface: 'level1' as SurfaceLevel, colorRole: 'secondary' as ColorRole, variant: 'tonal' as ComponentVariant },
    outlined: { surface: 'level0' as SurfaceLevel, colorRole: 'primary' as ColorRole, variant: 'outlined' as ComponentVariant },
    text: { surface: 'level0' as SurfaceLevel, colorRole: 'primary' as ColorRole, variant: 'text' as ComponentVariant },
    elevated: { surface: 'level2' as SurfaceLevel, colorRole: 'primary' as ColorRole, variant: 'elevated' as ComponentVariant },
    tonal: { surface: 'level1' as SurfaceLevel, colorRole: 'secondary' as ColorRole, variant: 'tonal' as ComponentVariant },
    filled: { surface: 'level1' as SurfaceLevel, colorRole: 'primary' as ColorRole, variant: 'filled' as ComponentVariant }, // New filled variant for strong actions
    destructive: { surface: 'level1' as SurfaceLevel, colorRole: 'error' as ColorRole, variant: 'tonal' as ComponentVariant }, // Changed to tonal for less aggressive
  },
  
  // Text Styles
  text: {
    display: { surface: 'level0' as SurfaceLevel, textStyle: 'display-medium' as TextStyle, colorRole: 'surface' as ColorRole },
    headline: { surface: 'level0' as SurfaceLevel, textStyle: 'headline-medium' as TextStyle, colorRole: 'surface' as ColorRole },
    title: { surface: 'level0' as SurfaceLevel, textStyle: 'title-medium' as TextStyle, colorRole: 'surface' as ColorRole },
    body: { surface: 'level0' as SurfaceLevel, textStyle: 'body-medium' as TextStyle, colorRole: 'surface' as ColorRole },
    caption: { surface: 'level0' as SurfaceLevel, textStyle: 'label-small' as TextStyle, colorRole: 'surface' as ColorRole },
    label: { surface: 'level0' as SurfaceLevel, textStyle: 'label-medium' as TextStyle, colorRole: 'surface' as ColorRole },
  },
  
  // Card Styles
  card: {
    default: { surface: 'level1' as SurfaceLevel, colorRole: 'surface' as ColorRole },
    elevated: { surface: 'level3' as SurfaceLevel, colorRole: 'surface' as ColorRole },
    outlined: { surface: 'level0' as SurfaceLevel, colorRole: 'surface' as ColorRole, variant: 'outlined' as ComponentVariant },
  },
  
  // Status Styles
  status: {
    success: { surface: 'level1' as SurfaceLevel, colorRole: 'success' as ColorRole },
    warning: { surface: 'level1' as SurfaceLevel, colorRole: 'warning' as ColorRole },
    error: { surface: 'level1' as SurfaceLevel, colorRole: 'error' as ColorRole },
    info: { surface: 'level1' as SurfaceLevel, colorRole: 'primary' as ColorRole },
  }
};

// Style Resolver - Converts semantic styles to CSS
export class MobileStyleResolver {
  constructor(private platform: Platform = 'auto') {}

  resolveSurfaceStyle(level: SurfaceLevel, colorRole: ColorRole = 'surface'): React.CSSProperties {
    if (this.platform === 'ios') {
      return this.resolveIOSSurface(level, colorRole);
    } else {
      return this.resolveMaterialSurface(level, colorRole);
    }
  }

  private resolveMaterialSurface(level: SurfaceLevel, colorRole: ColorRole): React.CSSProperties {
    const tokens = MaterialDesign3Tokens.sys;
    
    const surfaceColors = {
      level0: tokens.color.surface,
      level1: tokens.color.surfaceContainerLowest,
      level2: tokens.color.surfaceContainerLow,
      level3: tokens.color.surfaceContainer,
      level4: tokens.color.surfaceContainerHigh,
      level5: tokens.color.surfaceContainerHighest,
    };

    const elevations = {
      level0: tokens.elevation.level0,
      level1: tokens.elevation.level1,
      level2: tokens.elevation.level2,
      level3: tokens.elevation.level3,
      level4: tokens.elevation.level4,
      level5: tokens.elevation.level5,
    };

    return {
      backgroundColor: surfaceColors[level],
      boxShadow: elevations[level],
      borderRadius: tokens.shape.corner.medium,
      color: tokens.color.onSurface,
    };
  }

  private resolveIOSSurface(level: SurfaceLevel, colorRole: ColorRole): React.CSSProperties {
    const materials = {
      level0: 'transparent',
      level1: iOSDesignTokens.materials.ultraThinMaterial,
      level2: iOSDesignTokens.materials.thinMaterial,
      level3: iOSDesignTokens.materials.regularMaterial,
      level4: iOSDesignTokens.materials.thickMaterial,
      level5: iOSDesignTokens.materials.ultraThickMaterial,
    };

    return {
      backgroundColor: materials[level],
      backdropFilter: level !== 'level0' ? 'blur(10px) saturate(1.8)' : 'none',
      WebkitBackdropFilter: level !== 'level0' ? 'blur(10px) saturate(1.8)' : 'none',
      border: level !== 'level0' ? '0.5px solid rgba(255, 255, 255, 0.2)' : 'none',
      borderRadius: iOSDesignTokens.cornerRadius.medium,
      color: iOSDesignTokens.colors.label,
    };
  }

  resolveTextStyle(textStyle: TextStyle): React.CSSProperties {
    if (this.platform === 'ios') {
      return this.resolveIOSTextStyle(textStyle);
    } else {
      return this.resolveMaterialTextStyle(textStyle);
    }
  }

  private resolveMaterialTextStyle(textStyle: TextStyle): React.CSSProperties {
    const typography = MaterialDesign3Tokens.sys.typography;
    const styles = {
      'display-large': typography.displayLarge,
      'display-medium': typography.displayMedium,
      'display-small': typography.displaySmall,
      'headline-large': typography.headlineLarge,
      'headline-medium': typography.headlineMedium,
      'headline-small': typography.headlineSmall,
      'title-large': typography.titleLarge,
      'title-medium': typography.titleMedium,
      'title-small': typography.titleSmall,
      'body-large': typography.bodyLarge,
      'body-medium': typography.bodyMedium,
      'body-small': typography.bodySmall,
      'label-large': typography.labelLarge,
      'label-medium': typography.labelMedium,
      'label-small': typography.labelSmall,
    };

    return styles[textStyle] || styles['body-medium'];
  }

  private resolveIOSTextStyle(textStyle: TextStyle): React.CSSProperties {
    const typography = iOSDesignTokens.typography;
    const styleMap = {
      'display-large': typography.largeTitle,
      'display-medium': typography.title1,
      'display-small': typography.title2,
      'headline-large': typography.title1,
      'headline-medium': typography.title2,
      'headline-small': typography.title3,
      'title-large': typography.title2,
      'title-medium': typography.title3,
      'title-small': typography.headline,
      'body-large': typography.body,
      'body-medium': typography.body,
      'body-small': typography.callout,
      'label-large': typography.callout,
      'label-medium': typography.subhead,
      'label-small': typography.caption1,
    };

    return styleMap[textStyle] || typography.body;
  }

  resolveSemanticStyle(semanticStyle: SemanticStyle): React.CSSProperties {
    const surface = this.resolveSurfaceStyle(semanticStyle.surface, semanticStyle.colorRole);
    const text = semanticStyle.textStyle ? this.resolveTextStyle(semanticStyle.textStyle) : {};
    const resolved: React.CSSProperties = {
      ...surface,
      ...text,
    };
  if ((globalThis as any).__WIREVANA_DEBUG_STYLES__) {
      // eslint-disable-next-line no-console
      console.log('[wirevana:style] resolved', { semanticStyle, surface, text, resolved });
    }
    return resolved;
  }
}

// Default style resolver instance
export const styleResolver = new MobileStyleResolver();

// Convenience functions for common style patterns
export const getButtonStyle = (variant: keyof typeof SemanticStyles.button = 'primary', colorRole: ColorRole = 'primary'): React.CSSProperties => {
  const semanticStyle = SemanticStyles.button[variant];
  return styleResolver.resolveSemanticStyle({ ...semanticStyle, colorRole });
};

export const getCardStyle = (variant: 'default' | 'elevated' | 'outlined' = 'default'): React.CSSProperties => {
  const semanticStyle = SemanticStyles.card[variant];
  return styleResolver.resolveSemanticStyle(semanticStyle);
};

export const getTextStyle = (variant: 'display' | 'headline' | 'title' | 'body' | 'caption' | 'label' = 'body'): React.CSSProperties => {
  const semanticStyle = SemanticStyles.text[variant];
  return styleResolver.resolveSemanticStyle(semanticStyle);
};

export const getSurfaceStyle = (level: SurfaceLevel = 'level1'): React.CSSProperties => {
  return styleResolver.resolveSurfaceStyle(level);
};