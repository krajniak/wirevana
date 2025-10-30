export interface WireframeDefinition {
  readonly $schema?: string;
  readonly name: string;
  readonly description?: string;
  readonly imports?: readonly string[];
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
