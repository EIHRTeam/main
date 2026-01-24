# EIHRTeam Landing Page

## Project Overview

This project is the official landing page for STRATEGY_GROUP, a specialized team focusing on game strategy analysis and data mining. The application is designed as a responsive Single Page Application (SPA) utilizing modern web technologies to deliver a high-performance, visually distinct user experience characterized by a "Glitch" aesthetic. It includes bilingual support for Chinese and English.

## Technical Architecture

The project is built upon the following core technologies:

*   **Runtime Environment**: Node.js
*   **Frontend Framework**: React 19
*   **Build System**: Vite
*   **Language**: TypeScript (ES2022)
*   **Styling Engine**: Tailwind CSS
*   **Animation Library**: Framer Motion
*   **Iconography**: Lucide React

## Directory Structure

The source code is organized as follows:

*   **App.tsx**: The root component managing application state, including internationalization context and scroll synchronization.
*   **components/**: Contains all presentational logic and UI elements.
    *   *GlitchElement.tsx*: Implements the signature visual distortion effects.
    *   *Section.tsx*: Standardized layout container.
    *   *Hero, About, Projects, Blog, Contact, Footer*: Functional components corresponding to page sections.
*   **locales/**: Stores translation resources (`zh.ts`, `en.ts`) adhering to strict type definitions.
*   **types.ts**: Defines TypeScript interfaces for data models and internationalization structures.
*   **index.tsx**: Application entry point responsible for DOM mounting.

## Development and Deployment

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or yarn package manager

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### Development Environment

To start the local development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### Production Build

To generate optimized static assets for production deployment:

```bash
npm run build
```

The build artifacts will be output to the `dist` directory.

### Preview

To preview the production build locally:

```bash
npm run preview
```

## Configuration

Project configuration is managed via `vite.config.ts`. Path aliases are configured such that `@` resolves to the project root.

## License

Proprietary software. All rights reserved by STRATEGY_GROUP.
