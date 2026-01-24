# Project Context: EIHR Team Landing Page

## Overview
This project is a high-performance, visually stylized landing page for "Endfield Industry Human Resource Team / 终末地工业人事部", an organization focusing on strategic resource management and data-driven analysis. It features a distinct Cyberpunk/Glitch aesthetic and is built with modern React 19 standards. The application is designed as a Single Page Application (SPA) with smooth scrolling and bilingual support (Chinese/English).

## Tech Stack
- **Core Framework:** React 19
- **Build Tool:** Vite (ESNext target)
- **Language:** TypeScript (Strict mode, ES2022)
- **Styling:** Tailwind CSS (Local PostCSS configuration)
- **Typography:** HarmonyOS Sans SC (CDN assets), JetBrains Mono (Google Fonts)
- **Animation:** Framer Motion (`LazyMotion`, `useScroll`, `useSpring`)
- **Icons:** Lucide React

## Key Commands
- **Development Server:** `npm run dev` (Runs on port 3000)
- **Production Build:** `npm run build`
- **Preview Build:** `npm run preview`

## Production Constraints
- **Tailwind CSS:** The project is configured for a standard local installation using `tailwind.config.js` and `postcss.config.js`. Ensure dependencies (`tailwindcss`, `postcss`, `autoprefixer`) are installed via `npm install`.

## Project Architecture

### Directory Structure
- `src/` (Implied root)
  - `App.tsx`: Main entry point handling layout, language state, and scroll progress.
  - `locales/`: Contains translation files (`zh.ts`, `en.ts`) implementing the `ContentData` interface.
  - `components/`:
    - `GlitchElement.tsx`: Core wrapper component for the visual glitch effects.
    - `Section.tsx`: Standard layout wrapper for page sections.
    - Feature components: `Hero`, `About`, `Projects`, `Blog`, `Contact`, `Footer`.
  - `types.ts`: TypeScript definitions, primarily for the I18n content structure.

### Data Flow
- **Internationalization (I18n):** Implemented via a lightweight custom solution. Content is loaded from `locales/` based on the `lang` state in `App.tsx` and passed down as props to components.
- **Styling:** Global styles and variables (colors) are defined in the Tailwind config script within `index.html` and `index.css`.

## Development Conventions
- **Component Style:** Functional components with Hooks.
- **Styling:** Utility-first using Tailwind classes. Note that Tailwind is currently configured in the HTML head, not via `postcss.config.js`.
- **Animation:** Use `Framer Motion` for complex interactions. Prefer `LazyMotion` to reduce bundle size.
- **Type Safety:** All data objects (especially translations) must strictly adhere to interfaces defined in `types.ts`.

## Notes for AI Assistant
- When adding new content, strictly follow the `ContentData` interface in `types.ts` and update both `zh.ts` and `en.ts`.
- The visual theme relies heavily on the `brand` color (`#FBFA2D`) and high-contrast black/white.
- `GlitchElement` is the primary way to animate content entry.
