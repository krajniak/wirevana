# Development Workflow

This guide explains how to easily develop and run the Wirevana showcase in the dev container.

## When Building or Rebuilding Dev Container

When you build/rebuild the dev container, everything is automatically set up:

1. **pnpm** is enabled via corepack
2. **Dependencies** are installed via `pnpm install`
3. **All packages** are built via `pnpm -r run build`

No manual steps needed!

## Running the Showcase

### Option 1: VS Code Run Menu (Recommended)
1. Go to **Run** → **Start Debugging** (F5)
2. Select **"Start Wirevana Showcase"**
3. This will:
   - Install dependencies (if needed)
   - Build all packages
   - Build the canvas showcase
   - Start the HTTP server on port 3000
   - Automatically open the browser

### Option 2: VS Code Run Menu (Quick)
1. Go to **Run** → **Start Debugging** (F5) 
2. Select **"Quick Build and Run Showcase"**
3. This runs everything in a single command (faster for development)

### Option 3: Run Without Debugging
Use **Run** → **Run Without Debugging** (Ctrl+F5) for the same effect without the debugger attached.

## Available VS Code Tasks

You can also run individual tasks via **Terminal** → **Run Task**:

- **Setup and Build Everything**: Full dependency install + build chain
- **Monorepo: Install**: Just install dependencies
- **Monorepo: Build All**: Just build all packages
- **Build Canvas**: Just build the canvas showcase
- **Quick Build and Run**: Single command to build and run

## What Gets Built

1. **@wirevana/runtime** - Core runtime and DSL types
2. **@wirevana/renderer** - React components
3. **@wirevana/cli** - CLI tool for building canvas bundles
4. **Canvas Showcase** - The example showcase from `examples/mvp-showcase.wirevana.ts`

## Troubleshooting

- If port 3000 is busy, the setup will automatically kill existing processes
- If builds fail, check the **Problems** panel in VS Code
- All output is shown in the integrated terminal
- The browser should automatically open to `http://localhost:3000`

## File Structure After Build

```
dist/
├── index.html          # Main showcase page
└── canvas/
    ├── wirevana-canvas.mjs     # Built canvas bundle
    └── wirevana-canvas.mjs.map # Source map
```