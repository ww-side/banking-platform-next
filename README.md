## Description

This project is a Next.js application that uses a modern frontend stack and a modular architecture. Before running the project, make sure to configure the environment file and install dependencies.

## Project Structure

```
- app          # Next.js app router
- core         # Core logic, base types, services
- features     # Feature-based modules
- shared       # Shared UI components, utils, hooks
```

## Tech Stack

- **Next.js 16**
- **React 19.2**
- **Zustand** (state management)
- **Tailwind CSS** (styling)
- **shadcn/ui** (UI components)

## Setup Instructions

### 1. Install dependencies

```bash
pnpm i
```

### 2. Create `.env` file

Inside the project root, create a `.env` file with the following variable:

```env
SERVER_URL=http://localhost:8080
```

Adjust it based on your backend URL.

### 3. Run the development server

```bash
pnpm start
```

The application will start using the configured environment variables.

## Additional Scripts

You can also use:

```bash
pnpm dev      # Start dev server (if available)
pnpm build    # Build the project
pnpm lint     # Run linting
```

## Notes

- Make sure your backend server is running and accessible at the URL set in `SERVER_URL`.
- The project uses feature-driven architecture for better scalability.
