# wirevana

Wirevana is an AI-first design-to-code system that introduces a declarative DSL for .NET MAUI UI surfaces and an interactive JSX renderer tailored for ChatGPT Canvas. This repository currently hosts the product specification and will evolve into the monorepo for the DSL compiler, renderer, CLI, and component registry.

## Documentation
- [AI-first product specification](docs/ai_first_spec.md)

## Vision Highlights
- Describe MAUI wireframes through runnable JavaScript/TypeScript modules with imports and a `render()` entry point.
- Render interactive mock applications via a TypeScript/React runtime that mirrors MAUI controls, including the MAUI Community Toolkit.
- Publish the runtime, CLI, and component registry to npm for seamless ChatGPT Canvas integration and agentic workflows.
