# jeffwang13.github.io

Personal site at [jeffwang13.github.io](https://jeffwang13.github.io). Built with [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com), deployed to GitHub Pages.

The original 2019 Bootstrap site is preserved at [`/legacy/`](https://jeffwang13.github.io/legacy/).

## Local development

Requires Node 20+ (any LTS works). Recommended: [`fnm`](https://github.com/Schniz/fnm) or [`nvm`](https://github.com/nvm-sh/nvm).

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # static output to dist/
npm run preview      # serve the built site locally
```

## Project structure

```
src/
  pages/             # routes — file = URL
    index.astro      # /
    projects/
      index.astro    # /projects/
      [...slug].astro# /projects/<slug>/ (one page per MDX)
  layouts/
    BaseLayout.astro # html/head/body shell with Nav + Footer
  components/        # reusable Astro components
  content/
    projects/        # one .mdx per project (see "Adding a project" below)
  assets/projects/   # cover images (Astro optimizes these)
  styles/global.css  # Tailwind theme + custom CSS variables
content.config.ts    # content collection schemas
public/
  legacy/            # the 2019 site, served as-is
astro.config.mjs
```

## Adding a project

1. Drop the cover image into `src/assets/projects/` (any common format).
2. Create `src/content/projects/<slug>.mdx`:

```mdx
---
title: "Project name"
summary: "One-line description that shows on cards."
date: 2026-05-09
tags: ["TypeScript", "Side project"]
cover: "../../assets/projects/<filename>"
featured: true   # show on home page (otherwise only on /projects/)
links:
  github: "https://github.com/..."
  demo: "https://..."
---

Long-form description here in Markdown. Headings, lists, links, images all work.
```

3. `npm run dev` — the page appears at `/projects/<slug>/` automatically.

The `slug` (filename without `.mdx`) becomes the URL. Schema is defined in `content.config.ts` — adding new fields means updating the schema and any templates that read them.

## Editing the home page or nav

- **Home hero / tagline:** `src/pages/index.astro`
- **Site name in header, nav links:** `src/components/Nav.astro`
- **Footer links (GitHub, LinkedIn, legacy):** `src/components/Footer.astro`
- **Colors, fonts, spacing tokens:** `src/styles/global.css` (Tailwind `@theme` block)

## Theme

Light by default with a dark-mode toggle in the nav. Both modes share the same accent color. Tokens live in `global.css` — change them once and they propagate.

## Deploying

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages. No manual deploy step.

One-time GitHub setup: **Settings → Pages → Source = "GitHub Actions"**.

## The legacy site

Everything in `public/` is copied verbatim into the build. The 2019 site lives at `public/legacy/` — leave it alone unless you want to update the back-to-current-site banner. It's reachable at `/legacy/` in production (and `/legacy/index.html` in `npm run dev`, since the dev server doesn't auto-resolve directory indexes for static files).

## Adding new sections (music, travel, etc.)

The `projects` collection is the template. To add a new section:

1. Add a new collection to `content.config.ts` mirroring the projects schema.
2. Create `src/content/<name>/` and start dropping MDX files in.
3. Add `src/pages/<name>/index.astro` and `src/pages/<name>/[...slug].astro`, copying from the projects equivalents.
4. Add the section to `Nav.astro`.
