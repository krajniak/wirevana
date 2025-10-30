# Wirevana AI-First Product Specification

## 1. Mission & Vision
- **Mission**: Enable product and design teams to express high-fidelity cross-platform UI intent in natural, structured language that AI agents can translate into production-ready .NET MAUI interfaces.
- **Vision**: Wirevana is the canonical AI-first workflow for .NET MAUI UI creation. Teams describe experiences once, leverage AI co-pilots to produce interactive wireframes, and continuously synchronize specifications with XAML and component libraries.

## 2. Problem Statement & Target Users
- **Problem**: Traditional UI handoff from product/design to engineering is slow, ambiguous, and rarely AI-friendly. Current tooling lacks a single source of truth that both language models and human engineers can consume.
- **Primary Users**:
  - Product managers and UX designers who want to articulate UI flows rapidly.
  - Front-end/MAUI engineers responsible for generating XAML and ensuring component parity.
  - AI co-pilot agents (ChatGPT, GitHub Copilot, internal assistants) that read Wirevana DSL files to output code and documentation.
- **Secondary Users**: QA teams validating UX consistency, developer advocates creating samples, and community contributors adding components.

## 3. Guiding Principles
1. **AI-native**: Every artifact is optimized for LLM consumption: self-describing schemas, consistent metadata, and explicit rendering instructions.
2. **Single Source of Truth**: DSL documents capture UI intent, interactivity, and component constraints and feed both the XAML generation pipeline and the interactive mock app.
3. **Extensible**: Pluggable component registry and rendering adapters allow rapid support for new MAUI controls or third-party libraries.
4. **Bidirectional Flow**: Changes in generated MAUI XAML can be diffed back to DSL sources through annotations and telemetry.

## 4. Scope Overview
- **In-scope (MVP)**:
  - JavaScript/TypeScript DSL modules for describing MAUI UI components, layouts, bindings, interactions, and metadata.
  - TypeScript/JSX rendering runtime that interprets DSL and renders interactive wireframes in the browser (suitable for ChatGPT Canvas embedding).
  - Component coverage for all built-in .NET MAUI iOS/Android controls plus MAUI Community Toolkit components.
  - CLI + npm package for parsing DSL, bundling mock app, and publishing component registry.
  - Documentation, sample projects, and automated tests.
- **Out-of-scope (MVP)**: Full fidelity XAML exporter, server-side collaboration features, analytics pipeline, non-MAUI targets.

## 5. System Architecture
### 5.1 High-Level Modules
1. **DSL Compiler**
   - Parser and validator for runnable JavaScript/TypeScript DSL modules with `import` and `render()` semantics.
   - Emits normalized AST consumed by both MAUI generator and JS renderer.
2. **MAUI Generator (Phase 2)**
   - Converts AST into annotated XAML snippets.
   - Generates resource dictionaries, view models, and sample data.
3. **Interactive Renderer**
   - TypeScript/React runtime with custom JSX components matching MAUI controls.
   - Renders AST into an interactive, visually approximate wireframe.
4. **Component Registry**
   - Metadata describing control props, layout rules, bindings, default styles.
   - Shared across compiler and renderer.
5. **Tooling & Distribution**
   - CLI for scaffolding projects, linting DSL files, running preview servers, and exporting assets.
   - NPM package exposing runtime, CLI binaries, and React components.

### 5.2 Data Flow
1. Author creates DSL file (`.wirevana.js`/`.wirevana.ts`) importing component libraries, defining the UI dictionary, and invoking `render()`.
2. CLI validates schema, resolves imports to component registry, and compiles AST.
3. AST feeds:
   - **Interactive preview**: JS runtime renders AST within ChatGPT Canvas or standalone preview.
   - **Code generation**: (Phase 2) XAML generator produces MAUI pages and resource files.
4. Feedback loops: Telemetry and comments from preview feed into DSL revisions.

### 5.3 Deployment Targets
- **NPM Package**: `@wirevana/core` bundling CLI, renderer, components.
- **Static CDN Assets**: optional prebuilt runtime for embedding without bundling.
- **Docs & Examples**: Published via GitHub Pages or similar static site.

## 6. DSL Specification
### 6.1 File Structure & Execution Model
```ts
import { defineWireframe, render } from "@wirevana/runtime";

const uiMock = defineWireframe({
  $schema: "https://wirevana.dev/schemas/v1",
  name: "LoginFlow",
  imports: [
    "@wirevana/maui-core",
    "@wirevana/maui-community-toolkit"
  ],
  metadata: {
    platforms: ["ios", "android"],
    theme: "light",
    owner: "ProductSquadAlpha"
  },
  components: {
    LoginPage: {
      type: "ContentPage",
      title: "Sign in",
      layout: {
        type: "Grid",
        rows: ["auto", "*", "auto"],
        columns: ["*"],
        children: [
          { slot: "header", component: "BrandHero" },
          { slot: "form", component: "LoginForm" },
          { slot: "footer", component: "SocialLogin" }
        ]
      }
    }
  },
  render: "LoginPage"
});

render(uiMock);

export default uiMock;
```

- DSL files are runnable ESM modules. When imported, they register a UI dictionary (`uiMock`) and immediately render to the active runtime target (CLI preview, Canvas adapter, or custom host).
- `defineWireframe` normalizes the dictionary and provides type safety; `render` mounts the UI using the interactive renderer.
- `imports`: logical packages containing component definitions, theme tokens, and behaviors.
- `render`: entry point referencing a component defined in the same file or imported modules.

### 6.2 Component Definitions
The DSL dictionary retains a JSON-like structure but lives inside executable modules. Components are declared under the `components` key and can reference other components or imported modules. Nested objects follow the same rules as the original JSON schema, benefiting from JavaScript tooling (autocompletion, comments, computed values if enabled via build config).

### 6.3 Props, Bindings, and Interactions
- **Props**: Declared as object literals mapping to MAUI properties. Example: `props: { text: "Sign in", fontSize: 24 }`.
- **Bindings**: Use declarative expressions referencing view model state, e.g. `bind: { text: "user.email" }`.
- **Interactions**: Define event handlers referencing actions: `interactions: { Tapped: "actions.submit" }`.
- **Actions**: Declared under `"actions"` with types (`navigation`, `command`, `apiCall`).
- **State Models**: JSON schema (consumed from within the module) describing view model state enabling AI to reason about data flow.

### 6.4 Layout Primitives
- **FlexLayout** & **Grid** abstractions with cross-platform constraints.
- **Adaptive Rules**: Provide `when` clauses for device type/orientation adjustments.
- **Design Tokens**: `tokens: { color: "primary/500" }` referencing design system.

### 6.5 Metadata for AI Agents
- `description`: Natural language hints for agents.
- `acceptsVariants`: boolean to allow LLMs to suggest alternative components.
- `constraints`: Accessibility requirements, platform-specific limitations, performance notes.

### 6.6 Validation & Tooling
- JSON Schema-based validation with Ajv.
- TypeScript typings (`*.d.ts`) for stronger tooling in editors.
- CLI commands:
  - `wirevana validate <file>`
  - `wirevana preview <file>` (executes the module and spawns renderer)
  - `wirevana export-xaml <file>` (future)

## 7. Interactive Renderer Specification
### 7.1 Runtime Stack
- TypeScript + React (or Preact for lightweight embedding).
- Vite-based bundler for rapid dev server and library packaging.
- Tailwind CSS (optional) or CSS-in-JS for consistent theming.
- Canvas integration wrapper exposing `initialize(canvasElement, dslFile)`.
- Support standalone execution of DSL modules (no external bootstrap) so a single `.wirevana.js` file can hydrate the UI when imported in Canvas or a local preview.

### 7.2 JSX Component Library
- Mirror MAUI component taxonomy with prop mapping.
- Provide fallback visuals for native-specific controls (e.g., `DatePicker`, `CollectionView`).
- Include interaction mocks (modal overlays, navigation stack) for flow simulation.
- Use Storybook or Ladle for component gallery integrated with DSL examples.

### 7.3 State & Data Simulation
- Mock data provider seeded from DSL `sampleData` section.
- Navigation context to simulate multi-page flows.
- Accessibility overlays to highlight focus order, contrast warnings.

### 7.4 Performance & Embedding
- Bundle size target < 500KB gzipped for Canvas embedding.
- Provide ESM and UMD builds.
- Offer `wirevana-canvas-adapter` to integrate with ChatGPT UI extension APIs.
- Ship a `wirevana-single-file` command that bundles the runtime, DSL dictionary, and assets into one self-contained file for quick sharing and Canvas import.

## 8. Component Coverage Strategy
- **Baseline**: All controls listed in [Microsoft.Maui.Controls](https://learn.microsoft.com/en-us/dotnet/maui/user-interface/controls/).
- **Community Toolkit**: Include `StateContainer`, `Popup`, `Expander`, `TabView`, `MediaElement`, `SnackBar`, etc.
- **Component Metadata**:
  - `props`: supported properties with types and default values.
  - `events`: event names and payload shapes.
  - `platformSupport`: { ios: true, android: true, windows: false }.
  - `visualization`: mapping to JSX renderer component.
- **Extensibility**: YAML or JSON descriptors stored in `packages/components/registry` enabling contributions without touching core runtime.

## 9. AI & Copilot Integrations
- Provide prompt templates and embeddings for DSL constructs to improve Copilot suggestions.
- Publish OpenAPI/JSON schema describing CLI commands for agentic workflows.
- `wirevana-agent-kit`: optional package with LangChain/semantic-kernel connectors.
- Observability: log agent operations (file generations, conversions) for telemetry.

## 10. Tooling & Developer Experience
- Monorepo with pnpm workspaces (`packages/core`, `packages/renderer`, `packages/cli`).
- Use Turborepo for build orchestration and incremental caching.
- Automated formatting via Prettier + ESLint; Zod for runtime validation.
- GitHub Actions CI covering lint, unit, integration, and visual regression tests (Playwright).
- Release workflow using Changesets to publish npm packages.

## 11. Documentation & Samples
- `docs/` site built with Docusaurus featuring:
  - Getting started guides for DSL authoring and Canvas embedding.
  - Component reference generated from registry metadata.
  - AI co-pilot playbooks and prompt recipes.
- Interactive playground allowing users to edit DSL and preview in browser.
- Sample repository showcasing end-to-end flow (DSL -> MAUI XAML).

## 12. Roadmap & Milestones
1. **Milestone 0 – Foundations (Weeks 0-2)**
   - Finalize DSL schema draft, publish JSON schema v0.1.
   - Build parser/validator, set up repo, CI, and documentation site skeleton.
2. **Milestone 1 – Interactive Renderer (Weeks 3-6)**
   - Implement core JSX components and layout engine.
   - Deliver Canvas adapter and preview CLI.
   - Cover top 20 MAUI controls.
3. **Milestone 2 – Toolkit Expansion (Weeks 7-10)**
   - Add MAUI Community Toolkit controls and advanced interactions.
   - Introduce component registry management tooling.
4. **Milestone 3 – Copilot Integration (Weeks 11-14)**
   - Release agent kit, prompt templates, and telemetry pipeline.
   - Prepare `@wirevana/core` v1.0 npm release.
5. **Milestone 4 – XAML Generation Beta (Weeks 15-18)**
   - Implement AST-to-XAML translator and diff tooling.
   - Validate with pilot teams and gather feedback.

## 13. Success Metrics
- Time from DSL specification to usable wireframe < 5 minutes.
- 90%+ of MAUI components supported with accurate property mapping.
- 80% of AI-generated XAML passes linting without manual correction.
- < 1% preview runtime errors across published DSL samples.
- Community adoption: 500 npm downloads/month within six months of launch.

## 14. Risks & Mitigations
- **Complexity of MAUI parity**: Start with visual approximations; document gaps; engage community.
- **LLM misinterpretation**: Provide rich metadata, schema examples, and guardrails in CLI.
- **Bundle size creep**: Modular architecture, tree-shaking, optional polyfills.
- **Canvas API changes**: Abstract adapter layer with versioned compatibility matrix.
- **Cross-platform inconsistencies**: Automated snapshots and heuristics for iOS/Android alignment.

## 15. Open Questions
- Should DSL allow inline scripting (e.g., expressions) or remain declarative?
- Strategy for theming beyond light/dark (material, fluent, custom design tokens)?
- How to manage localization strings within DSL vs. external resources?
- Governance for community-submitted components and schema extensions.

## 16. Next Steps
- Validate schema with initial stakeholders and gather feedback.
- Prototype parser + renderer handshake using sample DSL file.
- Define contribution guidelines and component registry format.
- Begin drafting developer documentation and AI prompt library.

