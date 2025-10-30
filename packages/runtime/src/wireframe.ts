export interface WireframeImport {
  /**
   * Optional XML namespace prefix that should be declared when translating the
   * DSL definition into XAML. Mirrors the `xmlns:` alias syntax used by MAUI
   * and the CommunityToolkit.
   */
  readonly alias?: string;
  /**
   * Fully-qualified namespace URI or CLR namespace for the import. See
   * https://learn.microsoft.com/dotnet/maui/xaml/fundamentals/xaml-namespace
   * for details on namespace declarations.
   */
  readonly namespace: string;
  /**
   * Optional assembly hint for CLR namespace declarations.
   */
  readonly assembly?: string;
  /**
   * Link to the official control documentation that explains how the
   * namespace should be used. Including this makes it easier for downstream
   * agents to confirm the correct mapping when emitting XAML.
   */
  readonly docUrl?: string;
  /**
   * Free-form note describing which controls within the DSL rely on this
   * namespace. This helps LLM agents select the right namespace when
   * generating markup.
   */
  readonly description?: string;
}

export interface WireframeDefinition {
  readonly $schema?: string;
  readonly name: string;
  readonly description?: string;
  readonly imports?: readonly (string | WireframeImport)[];
  readonly metadata?: Record<string, unknown>;
  readonly sampleData?: Record<string, unknown>;
  readonly actions?: Record<string, unknown>;
  readonly components?: Record<string, unknown>;
  readonly pages?: Record<string, unknown>;
  readonly tabs?: Record<string, unknown>;
  readonly shell?: Record<string, unknown>;
  readonly state?: Record<string, unknown>;
  readonly render?: string;
  readonly rootComponents?: Record<string, unknown>;
}

/**
 * Helper used by DSL authors to declare strongly typed wireframe objects while
 * keeping the implementation intentionally lightweight for the MVP.
 */
export function defineWireframe<TDefinition extends WireframeDefinition>(
  definition: TDefinition
): TDefinition {
  return definition;
}

/**
 * Placeholder render hook used by the ChatGPT Canvas adapter. Until the
 * interactive renderer is wired up, the function simply returns the provided
 * definition so Canvas callers can import the module without side effects.
 */
export function render<TDefinition extends WireframeDefinition>(
  definition: TDefinition
): TDefinition {
  if (typeof globalThis !== "undefined" && "console" in globalThis) {
    console.info("[wirevana] render() stub invoked", definition.name);
  }

  return definition;
}
