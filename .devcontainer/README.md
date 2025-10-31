Wirevana Dev Container
=======================

Overview
--------
This development container provides a reproducible Node.js + pnpm environment for the Wirevana monorepo. It uses the official `javascript-node` Dev Container image pinned to Node 20 LTS (Debian Bookworm). The setup is intentionally simple: no extra mounted volumes or custom Dockerfile yet.

Key Choices
-----------
* Image: `mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm` (lean, maintained).
* User: Non-root `node` for parity and lower risk.
* pnpm: Enabled via Corepack during `onCreateCommand` (first container creation). Uses the image's global Node install; we invoke `sudo corepack enable pnpm` to elevate just for the shim creation, then run `pnpm install` as the `node` user.
* Extensions: ESLint, Prettier, TypeScript Next, Copilot, Vitest Explorer.
* Settings: Format on save enabled, TypeScript SDK set to `node_modules/typescript/lib`, end-of-line set to LF.
* Lifecycle:
  * `onCreateCommand`: `sudo corepack enable pnpm && pnpm install` (runs only once when the container is first created).
  * `postCreateCommand`: `pnpm -r run build` (runs after the initial create completes). No automatic build on every start to keep restarts fast.

Common Tasks
------------
* Rebuild after config change: F1 > Dev Containers: Rebuild Container.
* Install deps manually (after edits to workspace): `pnpm install`.
* Build all packages: `pnpm -r run build`.
* Run selected package script: `pnpm --filter <pkg> run <script>`.

Troubleshooting
---------------
* Permission error during Corepack enable: We use `sudo` once; if it still fails, open a terminal in the container and run `sudo corepack enable pnpm` manually, then `pnpm install`.
* Slow installs on Windows bind mounts: Consider cloning into a container volume (Dev Containers: Clone Repository in Container Volume...).
* Re-run build only when source changes significantly; avoid wiring `build` to `postStartCommand` to keep attach times low.

Future Improvements
-------------------
* Add a Dockerfile to pre-enable Corepack and pre-install dependencies for faster cold starts.
* Introduce caching for TypeScript incremental builds (tsbuildinfo artifacts) if build times grow.
* Integrate testing (`vitest`) and add CI workflow examples.
