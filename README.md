# Paddle Alley – Home page (TypeScript)

Run it:

    npm install
    npm run dev       # open the link it prints
    npm run build     # type-check + production build

Team rules this project follows
- TypeScript (.ts / .tsx) only
- No `useState` – shared state lives in zustand (`src/store/useAdStore.ts`)
- Max 150 lines per file
- No inline styles or inline handlers in JSX – use CSS classes and named functions

Where things live
- `src/components`  – one component per file
- `src/data`        – text, photos, address and links
- `src/store`       – zustand store + selectors
- `src/hooks`       – scroll / slideshow logic
- `src/theme`       – brand colours and the Ant Design theme
