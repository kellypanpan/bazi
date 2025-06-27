# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript web application for Chinese astrology and fortune telling using Bazi (Four Pillars) and Zi Wei Dou Shu methods. Built with Vite, Tailwind CSS, and deployed on Cloudflare Workers.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Architecture

### Core Services

- **baziAnalysisService.ts**: Main Chinese analysis service using OpenRouter API with Chinese prompts
- **aiService.ts**: Dual-method analysis (BaZi + Zi Wei Dou Shu) with English prompts and structured parsing
- **openRouterService.ts**: Basic OpenRouter API wrapper for chat completions

### Key Components

- **BirthDateForm.tsx**: Complex form with MM/DD/YY date validation and conversion to ISO format
- **AIAnalysisDisplay.tsx**: Displays dual-method analysis results (BaZi and Zi Wei)
- **BasicResultsDisplay.tsx**: Shows structured Chinese analysis results
- **Layout.tsx**: Main layout wrapper with navigation

### API Integration

Uses OpenRouter API with two different models:
- `deepseek/deepseek-r1-0528:free` (aiService.ts)
- `deepseek/deepseek-r1-0528-qwen3-8b:free` (openRouterService.ts)

Both services use hardcoded API keys (development setup).

### Data Flow

1. User fills BirthDateForm with personal details
2. Form validates MM/DD/YY format and converts to YYYY-MM-DD
3. Data sent to either baziAnalysisService (Chinese) or aiService (English dual-method)
4. API responses parsed and displayed in respective components

### Deployment

Configured for Cloudflare Workers deployment via wrangler.jsonc, serving static assets from ./dist directory.

### Tech Stack

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation
- Axios for API calls
- Lucide React for icons