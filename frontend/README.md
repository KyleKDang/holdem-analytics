# Hold'Em Analytics Web

Next.js frontend for Hold'Em Analytics: the drag-and-drop hand analyzer, session tracking, and the analytics dashboard.

Setup, environment variables and the full project overview are in the [project README](../README.md).

## Quick reference

```bash
npm install
npm run dev      # http://localhost:3000

npm run build    # production build
npm run lint     # ESLint
npx tsc --noEmit # type check
```

API requests go to the relative path `/api/*`, which `next.config.ts` rewrites to the backend origin server-side.
