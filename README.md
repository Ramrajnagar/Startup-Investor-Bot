# Startup Investor Bot

A specialized AI agent built to simulate a venture capital investor, providing critical evaluation, feedback, and scoring for startup pitches. This product demonstrates advanced prompt engineering and modern frontend architecture using the Next.js App Router and Vercel AI SDK.

## Project Vision

The Startup Investor Bot was created to show how a general-purpose LLM can be transformed into a highly opinionated, task-specific product. By applying strict system constraints, the model acts as a direct, analytical VC rather than a generic conversational assistant. This project highlights:
1. **Precision Prompt Engineering**: Fine-tuning AI behavior for domain-specific tasks.
2. **Intentional UI/UX**: A dark-themed, minimalist interface designed for professional context.
3. **Advanced Streaming**: Implementation of the Vercel AI SDK 6.0 for real-time, low-latency feedback.

## Key Features

- **Selective Evaluation**: The agent explicitly follows a VC framework (Verdict, Weaknesses, Core Questions, and Score).
- **Dynamic Roast Mode**: A toggleable state that shifts the personality of the investor to a more critical, sarcastic tone while dynamically updating the UI palette.
- **Visual Scoring**: Automatically extracts ratings from the AI stream and renders them as thematic UI badges.
- **Glassmorphic Design**: A premium dark-mode interface built with Tailwind CSS and Framer Motion.
- **Robust Error Handling**: Optimized for managing API rate limits and connection failures gracefully.

## Technical Architecture

- **Next.js 15**: Leveraging the App Router for server-side efficiency.
- **Vercel AI SDK**: Using the latest 6.0 modular transport protocol.
- **Google Gemini 2.0**: High-performance model integration via `@ai-sdk/google`.
- **Framer Motion**: Smooth state transitions and micro-animations.
- **Tailwind CSS V4**: Modern CSS-in-JS utility styling.

## Local Setup

1. **Clone and Install**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file from the provided `.env.example` template:
   ```bash
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
   ```

3. **Development**:
   ```bash
   npm run dev
   ```

## Design Decisions

- **Color Palette**: Utilized deep indigo and slate for the standard "VC Mode" and shifted to graded crimson for "Roast Mode" to provide immediate visual context.
- **Typography**: Focused on high-contrast, bold headlines to reflect the "brutal honesty" of the persona.
- **Empty States**: Developed interactive "idea starters" to reduce user friction and demonstrate immediate value.

---
Built for the Thinkly Labs technical assessment.
