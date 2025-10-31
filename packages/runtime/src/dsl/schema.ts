/**
 * Enhanced DSL schema with mobile-native styling support.
 * Replaces hard-coded theme properties with semantic design tokens.
 */

import type { SemanticIcon, Platform, SurfaceLevel, ColorRole, TextStyle, ComponentVariant } from '../types';

/**
 * Semantic style definitions that map to platform-specific design tokens
 */
export interface StyleDefinition {
  /** Semantic surface level for elevation/depth */
  surface?: SurfaceLevel;
  /** Color role within the design system */
  colorRole?: ColorRole;
  /** Component variant for styling */
  variant?: ComponentVariant;
  /** Typography style */
  textStyle?: TextStyle;
  /** Platform preference for styling */
  platform?: Platform;
}

/**
 * Icon definition with semantic naming
 */
export interface IconDefinition {
  /** Semantic icon name */
  name: SemanticIcon;
  /** Icon size (defaults to design token) */
  size?: number | 'small' | 'medium' | 'large';
  /** Color override (uses colorRole if not specified) */
  color?: string;
}

/**
 * Enhanced component properties with semantic styling
 */
export interface ComponentProps {
  /** Semantic style reference */
  style?: string | StyleDefinition;
  /** Icon definition */
  icon?: IconDefinition | SemanticIcon;
  /** Text content */
  text?: string;
  /** Binding expression for dynamic content */
  binding?: string;
  /** Accessibility label */
  accessibilityLabel?: string;
  /** Visual appearance variant */
  appearance?: 'primary' | 'secondary' | 'outlined' | 'text' | 'destructive';
  /** Layout-specific properties */
  layout?: LayoutProps;
  [key: string]: any;
}

/**
 * Layout properties for responsive design
 */
export interface LayoutProps {
  /** Flex properties */
  flex?: number;
  /** Alignment */
  alignment?: 'start' | 'center' | 'end' | 'stretch';
  /** Spacing */
  spacing?: number | 'tight' | 'standard' | 'loose';
  /** Direction for stack layouts */
  direction?: 'horizontal' | 'vertical';
  /** Wrap behavior for flex layouts */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
}

/**
 * Enhanced component definition with semantic styling
 */
export interface ComponentDefinition {
  type: string;
  props?: ComponentProps;
  style?: string | StyleDefinition;
  layout?: RootLayoutPrimitive;
  children?: LayoutChildReference[];
  interactions?: Record<string, string>;
}

/**
 * Style library definition for reusable styles
 */
export interface StyleLibrary {
  /** Named style definitions */
  styles: Record<string, StyleDefinition>;
  /** Design system preferences */
  platform?: 'ios' | 'android' | 'auto';
  /** Theme variant */
  theme?: 'light' | 'dark' | 'auto';
  /** Brand color overrides */
  brandColors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
}

/**
 * Shell is the root navigation container in the MAUI world. In the Wirevana DSL it
 * wires together the tab bar and controls default presentation for top-level pages.
 */
export interface ShellDefinition {
  type: "Shell";
  /** Optional title shown in navigation chrome. */
  title?: string;
  /** Identifier of the TabBar instance that should be rendered within the shell. */
  tabBar: string;
  /** Shell styling */
  style?: string | StyleDefinition;
}

/**
 * A TabBar groups navigation tabs. Each tab references a page defined in the DSL `pages` dictionary.
 */
export interface TabBarDefinition {
  type: "TabBar";
  /**
   * Ordered list of tab identifiers. Tabs are declared separately under `DSL_SPEC.tabs`
   * so they can be reused across layouts if needed.
   */
  tabs: string[];
  /** Tab bar styling */
  style?: string | StyleDefinition;
}

/**
 * Tabs wrap a single ContentPage inside the shell navigation hierarchy.
 */
export interface TabDefinition {
  type: "Tab";
  /**
   * Key of the ContentPage defined under `DSL_SPEC.pages` that should render when this tab is active.
   */
  page: string;
  /** Title shown in the MAUI TabBar. */
  title: string;
  /** Icon for the tab */
  icon?: IconDefinition | SemanticIcon;
  /** Tab styling */
  style?: string | StyleDefinition;
}

/**
 * Children declared within a layout primitive. For now we only capture component references and optional slots.
 */
export interface LayoutChildReference {
  /** Name of the component defined in the same DSL module (under `components`). */
  component: string;
  /** Optional named slot within the layout primitive. */
  slot?: string;
  /** Component-specific properties */
  props?: ComponentProps;
  /** Component-specific styling */
  style?: string | StyleDefinition;
}

/** Simple vertical or horizontal stack layout primitive. */
export interface StackLayoutPrimitive {
  type: "VerticalStack" | "HorizontalStack";
  spacing?: number | 'tight' | 'standard' | 'loose';
  children: LayoutChildReference[];
  style?: string | StyleDefinition;
}

/** Basic grid layout primitive with simplified row/column definitions. */
export interface GridLayoutPrimitive {
  type: "Grid";
  rows: (number | "auto" | "*")[];
  columns: (number | "auto" | "*")[];
  children: Array<LayoutChildReference & { row?: number; column?: number }>;
  style?: string | StyleDefinition;
}

/** Flexible layout primitive for responsive designs */
export interface FlexLayoutPrimitive {
  type: "FlexLayout";
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  gap?: number | 'tight' | 'standard' | 'loose';
  children: LayoutChildReference[];
  style?: string | StyleDefinition;
}

/** Root layout primitives supported on ContentPage definitions. */
export type RootLayoutPrimitive = StackLayoutPrimitive | GridLayoutPrimitive | FlexLayoutPrimitive;

/**
 * Content pages host the actual UI layout rendered inside navigation surfaces.
 */
export interface ContentPageDefinition {
  type: "ContentPage";
  title?: string;
  /**
   * Root-level layout primitive for the page. Additional layout constructs will be layered on later iterations.
   */
  layout: RootLayoutPrimitive;
  /** Page-level styling */
  style?: string | StyleDefinition;
}

/**
 * Enhanced Wirevana DSL contract with semantic styling support.
 */
export interface WirevanaDSLSpec {
  /** Style library for reusable styles */
  styleLibrary?: StyleLibrary;
  
  shell: ShellDefinition;
  /**
   * Dictionary of Tab definitions keyed by identifier. Tabs reference pages through the `page` property.
   */
  tabs: Record<string, TabDefinition>;
  /**
   * Dictionary of ContentPage definitions keyed by identifier.
   */
  pages: Record<string, ContentPageDefinition>;
  
  /**
   * Dictionary of reusable component definitions
   */
  components?: Record<string, ComponentDefinition>;
  
  /**
   * Sample data for wireframe previews
   */
  sampleData?: Record<string, any>;
  
  /**
   * Action definitions for interactions
   */
  actions?: Record<string, any>;
  
  /**
   * Application state
   */
  state?: Record<string, any>;
}

/**
 * Convenience helper for DSL authors so they can declare objects with strong typing
 * without importing builder utilities yet to be implemented.
 */
export const DSL_SPEC: WirevanaDSLSpec = {
  styleLibrary: {
    styles: {
      // Default semantic styles
      'primary-button': {
        surface: 'level1',
        colorRole: 'primary',
        variant: 'filled',
        textStyle: 'label-large'
      },
      'secondary-button': {
        surface: 'level0',
        colorRole: 'primary',
        variant: 'outlined',
        textStyle: 'label-large'
      },
      'card-default': {
        surface: 'level1',
        colorRole: 'surface'
      },
      'card-elevated': {
        surface: 'level3',
        colorRole: 'surface'
      },
      'text-headline': {
        textStyle: 'headline-medium',
        colorRole: 'surface'
      },
      'text-body': {
        textStyle: 'body-medium',
        colorRole: 'surface'
      },
      'text-caption': {
        textStyle: 'label-small',
        colorRole: 'surface'
      }
    },
    platform: 'auto',
    theme: 'light'
  },
  shell: { type: "Shell", tabBar: "main" },
  tabs: {},
  pages: {},
};
