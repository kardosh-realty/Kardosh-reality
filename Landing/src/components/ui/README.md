# UI components (`src/components/ui`)

This folder mirrors the **shadcn/ui** convention (`components/ui`) so shared primitives stay in one place.

## This project is Vue, not React

Kardosh Landing uses **Vue 3 + Vite + Tailwind CSS 4 + JavaScript** (not React, TypeScript, or shadcn CLI).

| shadcn / React stack | This repo |
|----------------------|-----------|
| `framer-motion` | Vue `<Transition>` + CSS (see `AnimatedTextCycle.vue`) |
| `components/ui/*.tsx` | `components/ui/*.vue` |
| TypeScript | JavaScript (add TS later via `vue-tsc` if needed) |

### If you need a new React + shadcn app instead

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npx shadcn@latest init
npx shadcn@latest add button
npm install framer-motion
```

Default shadcn paths: `components/ui`, `lib/utils.ts`, `@/` alias in `tsconfig.json`.

### Why keep `components/ui` here?

- Same import path pattern: `@/components/ui/AnimatedTextCycle`
- Room for future Vue primitives (dialogs, buttons) without mixing them into page-specific `component/kardosh/`

## Included primitives

- `KardoshSlideButton.vue` — pill CTA with arrow slide
- `AnimatedTextCycle.vue` — rotating hero text
