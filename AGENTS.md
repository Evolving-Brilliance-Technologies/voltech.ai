# voltech.ai AI Agent Instructions
This file contains project-specific information and structural guidelines designed to help AI assistants understand the project context, layout, and conventions.

> [!IMPORTANT]
> **CRITICAL: Design and Aesthetics**
> Before you make ANY visual changes, build screens, or create styling for components, you **MUST** read the design specifications located in `docs/design.md`. Strict adherence to the color palette, typography (Playfair Display/Inter), and stylistic principles (Glassmorphism, Mobile-first) is mandatory across all portals.

## Project Structure Overview: `voltech.ai` Frontend

The frontend is a modern, high-performance **React 19** application built with **Vite** and **TypeScript**, configured as a multi-target monorepo workspace.

### 1. Multi-Portal Architecture
The project uses a "multi-target" build system. A single codebase serves **7 different portals**, controlled by the `APP_TARGET` environment variable.

Here are the 7 specific frontend portals:
1. **Landing** (`APP_TARGET=landing`)
2. **ImpactMaker** (`APP_TARGET=impactmaker`)
3. **ChangeMaker** (`APP_TARGET=changemaker`)
4. **Verifier** (`APP_TARGET=verifier`)
5. **Gov** (`APP_TARGET=gov`)
6. **Partner** (`APP_TARGET=partner`)
7. **Admin** (`APP_TARGET=admin`)

*   **Mechanism**: The `vite.config.ts` uses `APP_TARGET` to swap which `routes` directory and `routeTree` are used. This allows each portal to have its own routing while sharing common components, hooks, and logic.

### 2. Key Technology Stack
*   **Framework**: React 19
*   **Routing**: TanStack Router (Type-safe routing)
*   **Data Fetching**: TanStack Query v5
*   **Styling**: Tailwind CSS v4 with `next-themes` for Dark Mode.
*   **Components**: Based on Radix UI primitives (similar to shadcn/ui), located in `frontend/src/components/ui`.
*   **API Client**: Automatically generated from `openapi.json` using `@hey-api/openapi-ts`.
*   **Forms**: `react-hook-form` with `zod` validation.
*   **Linter/Formatter**: Biome (replacing ESLint/Prettier for speed and consistency).

### 3. Directory Breakdown (`/frontend`)
*   **`src/routes/`**: contains subfolders for each target portal (e.g., `admin`, `landing`). This is where the specific pages for each portal live.
*   **`src/components/`**: 
    *   `ui/`: Atomic, reusable UI components (Buttons, Inputs, etc.).
    *   `Sidebar/`, `Admin/`, `UserSettings/`: Feature-specific shared components.
*   **`src/client/`**: Contains the generated API SDK and types.
*   **`src/hooks/`**: Shared React hooks.
*   **`tests/`**: Playwright End-to-End tests.
*   **`package.json`**: Orchestrates builds and dev servers for all targets.

### 4. Package Analysis
*   **Root `package.json`**: Manages the workspace and provides convenience scripts to run specific portals from the root (e.g., `bun dev:admin`).
*   **Frontend `package.json`**:
    *   **Scripts**: Includes specialized dev/build commands for each target (e.g., `dev:impactmaker` runs on port 3001, `dev:admin` on 3006).
    *   **`dev:all`**: Uses `concurrently` to run all portals at once for full-system development.
    *   **API Generation**: `generate-client` uses `openapi-ts` to keep the frontend types in sync with the backend.

### Summary of Config Files:
*   `vite.config.ts`: Handles the portal-switching logic via aliases and TanStack Router plugins.
*   `biome.json`: Root-level configuration for linting and formatting.
*   `tsconfig.json`: Configured for modern ESM and path aliases (`@/*`).
