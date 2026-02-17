# Roadmap Creation Assistance UI

Web interface for [Roadmap Creation Assistance](https://github.com/Raffael-Eloi/roadmap-creation-assistance) — an AI-powered tool that turns any project idea into a structured learning roadmap with GitHub milestones and issues.

## What it does

This frontend provides a simple form where you enter your GitHub details, an OpenAI API key, and a short project description. It then communicates with the backend API to automatically generate a complete roadmap in your GitHub repository, organized into:

- **Milestones** — Big-picture learning goals (e.g., "Programming Languages & Execution Model Fundamentals")
- **Issues** categorized as:
  - `[TECH]` — Technical implementation tasks
  - `[ME]` — Mindset Evolution reflections
  - `[HO]` — Hands-On practical challenges

## Preview

// To be added

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- The [Roadmap Creation Assistance API](https://github.com/Raffael-Eloi/roadmap-creation-assistance) running locally or deployed

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

By default, the app expects the backend API at `http://localhost:5135`. This is configured in `.env.development`.

## Tech Stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [React](https://react.dev/) 19
- [Material UI](https://mui.com/) 7
- [TypeScript](https://www.typescriptlang.org/) 5
- [Axios](https://axios-http.com/) for HTTP requests

## Deployment

The project includes a multi-stage Dockerfile and a GitHub Actions CI/CD pipeline that:

1. Builds the application
2. Pushes a Docker image to Docker Hub
3. Deploys to Azure Container Apps

## Related

- [Roadmap Creation Assistance (Backend API)](https://github.com/Raffael-Eloi/roadmap-creation-assistance)

## License

MIT
