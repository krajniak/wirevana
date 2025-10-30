/**
 * Registry describing how Wirevana DSL navigation collections map to MAUI concepts.
 * This gives the renderer enough hints to translate `DSL_SPEC.tabs` and `DSL_SPEC.pages`
 * into shell sections and content pages.
 */
export interface NavigationRegistryEntry {
  /** Name of the DSL collection (`tabs`, `pages`, etc.). */
  collection: "tabs" | "pages";
  /** Fully qualified MAUI control type backing the collection entries. */
  mauiType: string;
  /**
   * The parent MAUI concept where the control lives. Helpful for renderers that build
   * virtual trees representing Shell hierarchies.
   */
  parent: string;
  /** Human-friendly explanation for agent authors. */
  description: string;
}

export const NAVIGATION_REGISTRY: NavigationRegistryEntry[] = [
  {
    collection: "tabs",
    mauiType: "Microsoft.Maui.Controls.ShellSection",
    parent: "Microsoft.Maui.Controls.Shell",
    description:
      "Tabs map to ShellSection entries. Each tab wraps a single ContentPage via ShellContent.",
  },
  {
    collection: "pages",
    mauiType: "Microsoft.Maui.Controls.ContentPage",
    parent: "Microsoft.Maui.Controls.ShellContent",
    description:
      "Pages provide the visual content that ShellContent displays inside each tab.",
  },
];
