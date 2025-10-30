/**
 * Minimal DSL schema draft focused on navigation primitives and root layouts.
 * The goal is to give agents a strongly typed surface while the broader schema is in flux.
 */

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
  /** Optional icon resource identifier. */
  icon?: string;
}

/**
 * Children declared within a layout primitive. For now we only capture component references and optional slots.
 */
export interface LayoutChildReference {
  /** Name of the component defined in the same DSL module (under `components`). */
  component: string;
  /** Optional named slot within the layout primitive. */
  slot?: string;
}

/** Simple vertical or horizontal stack layout primitive. */
export interface StackLayoutPrimitive {
  type: "VerticalStack" | "HorizontalStack";
  spacing?: number;
  children: LayoutChildReference[];
}

/** Basic grid layout primitive with simplified row/column definitions. */
export interface GridLayoutPrimitive {
  type: "Grid";
  rows: (number | "auto" | "*")[];
  columns: (number | "auto" | "*")[];
  children: Array<LayoutChildReference & { row?: number; column?: number }>;
}

/** Root layout primitives supported on ContentPage definitions. */
export type RootLayoutPrimitive = StackLayoutPrimitive | GridLayoutPrimitive;

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
}

/**
 * Main Wirevana DSL contract exposed to authors. Additional keys (metadata, components, etc.)
 * will be layered on top of this base in subsequent revisions.
 */
export interface WirevanaDSLSpec {
  shell: ShellDefinition;
  /**
   * Dictionary of Tab definitions keyed by identifier. Tabs reference pages through the `page` property.
   */
  tabs: Record<string, TabDefinition>;
  /**
   * Dictionary of ContentPage definitions keyed by identifier.
   */
  pages: Record<string, ContentPageDefinition>;
}

/**
 * Convenience helper for DSL authors so they can declare objects with strong typing
 * without importing builder utilities yet to be implemented.
 */
export const DSL_SPEC: WirevanaDSLSpec = {
  shell: { type: "Shell", tabBar: "main" },
  tabs: {},
  pages: {},
};
