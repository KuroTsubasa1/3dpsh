# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 3 application that appears to be in early development stages. The project seems to have been converted from a PHP-based Symfony/Sulu implementation to a Nuxt 3 frontend application.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server on http://localhost:3000
npm run dev

# Build for production
npm run build

# Generate static site
npm run generate

# Preview production build
npm run preview
```

## Project Structure

- **Nuxt 3 Framework**: This project uses Nuxt 3, a Vue.js framework with server-side rendering capabilities
- **TypeScript**: The project is configured with TypeScript support
- **Components Structure**: The application uses Vue components in the `components/` directory
- **Pages Structure**: Routing is handled via the `pages/` directory following Nuxt conventions
- **HTML Mockups**: The `dummy/` directory contains HTML mockups that may serve as references for implementation

## Component Architecture

The application appears to be structured around several main components:
- `header.vue` - Site header
- `hero.vue` - Hero section
- `grid.vue` and `grid-card.vue` - Content grid system
- `contact-form.vue` - Contact form component
- `footer.vue` - Site footer

## Development Workflow

1. Use `npm run dev` to start the development server
2. Components can be developed and tested independently
3. The HTML mockups in the `dummy/` directory may serve as reference designs
4. Nuxt's hot module replacement will automatically update the browser as you make changes

## Memories

- `worker exited with code 0`