# Wirevana Canvas MVP Quickstart

This guide summarizes the minimum viable product (MVP) experience for describing UI intent with the Wirevana DSL and embedding the interactive renderer into ChatGPT Canvas.

## DSL Shape at a Glance
- **Executable ESM modules** – Author `.wirevana.ts`/`.wirevana.js` files that import helpers from `@wirevana/runtime`.
- **`defineWireframe()`** – Wrap the UI dictionary to normalize schema metadata such as `$schema`, `name`, `imports`, and `metadata`.
- **Component catalog** – Declare MAUI-inspired components under a `components` key with nested layout primitives (`Grid`, `FlexLayout`) and references to other components.
- **`render()` entry point** – Export a call to `render(uiMock)` (or equivalent) to mount the designated root component defined in the dictionary.
- **Props, bindings, and interactions** – Provide `props`, `bindings`, and `interactions` objects within each component to model MAUI control behavior and actions.

```ts
import { defineWireframe, render } from "@wirevana/runtime";

const uiMock = defineWireframe({
  $schema: "https://wirevana.dev/schemas/v1",
  name: "LoginFlow",
  imports: ["@wirevana/maui-core", "@wirevana/maui-community-toolkit"],
  metadata: {
    platforms: ["ios", "android"],
    theme: "light"
  },
  components: {
    LoginPage: {
      type: "ContentPage",
      layout: {
        type: "Grid",
        rows: ["auto", "*", "auto"],
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

## Supported Component Sets (MVP)
- **.NET MAUI core controls** – Mirrors `Microsoft.Maui.Controls` primitives (e.g., `ContentPage`, `StackLayout`, `Grid`, `Button`, `Entry`, `CollectionView`, `DatePicker`).
- **MAUI Community Toolkit** – Includes higher-level controls such as `StateContainer`, `Popup`, `Expander`, `TabView`, `MediaElement`, and `SnackBar`.
- **Layout & styling helpers** – Adaptive layout rules (`when` clauses), reusable styles, and metadata to guide AI-assisted variations.
- **Actions and state** – Declarative action registry (`navigation`, `command`, `apiCall`) plus sample data bindings for previewing flows.

## Embedding in ChatGPT Canvas
1. **Install tooling**
   ```bash
   pnpm add -D @wirevana/cli
   ```
2. **Bundle the Canvas runtime**
   ```bash
   wirevana build-canvas ./examples/canvas-entry.ts
   ```
   This command emits a `dist/canvas/wirevana-canvas.mjs` bundle that initializes the renderer.
3. **Embed via Canvas adapter**
   - Import the generated module inside your Canvas extension bootstrap and call `initialize(canvasElement, dslFile)` to hydrate the DSL-defined wireframe.
   - Provide the DSL module path (local or remote) so the adapter can call the exported `render()` function when Canvas loads.
4. **Iterate on the DSL**
   - Update your `.wirevana.ts` modules, re-run `wirevana build-canvas`, and refresh the Canvas session to preview changes.
   - Use the same DSL artifacts to power future XAML exporters or additional host integrations.

For deeper architectural details, see the [AI-first product specification](./ai_first_spec.md).
