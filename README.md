# jeffwang13.github.io

Personal site at [jeffwang13.github.io](https://jeffwang13.github.io). Built with [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com), deployed to GitHub Pages.

The original 2019 Bootstrap site is preserved at [`/legacy/`](https://jeffwang13.github.io/legacy/index.html).

## Sections

- `/` — home page with featured cards (currently 3 hand-picked items from music + sports)
- `/music/` — scrapbook timeline of music performances (YouTube + Instagram)
- `/sports/` — scrapbook timeline of sports / outdoor moments
- `/travel/` — blog-style timeline; each card links to a full post page at `/travel/<slug>/`
- `/projects/` — older code projects, one detail page per entry

The music, sports, and travel pages all share the same `<Timeline />` component — alternating two-column scrapbook layout with washi-tape cards, hand-drawn arrows, and dynamic per-card heights. The only difference between them is which collection they read from (and travel cards link to internal blog posts instead of external Instagram/YouTube).

## Local development

Requires Node 20+ (any LTS works). Recommended: [`fnm`](https://github.com/Schniz/fnm) or [`nvm`](https://github.com/nvm-sh/nvm).

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # static output to dist/
npm run preview      # serve the built site locally
```

If the dev server starts behaving oddly (stale content cache, missing entries after a `git merge`, image extension swap not picked up):

```bash
lsof -ti :4321 | xargs kill -9
rm -rf .astro node_modules/.vite
npm run dev
```

## Project structure

```
src/
  pages/                 # routes — file = URL
    index.astro          # /
    music/index.astro    # /music/
    sports/index.astro   # /sports/
    travel/
      index.astro        # /travel/
      [...slug].astro    # /travel/<slug>/ — blog post page
    projects/
      index.astro        # /projects/
      [...slug].astro    # /projects/<slug>/
  layouts/
    BaseLayout.astro     # html/head/body shell with Nav + Footer
  components/
    Timeline.astro       # shared scrapbook timeline used by music/sports/travel
    ProjectCard.astro    # /projects/ list card
    Nav.astro
    Footer.astro
  content/
    music/               # one .mdx per performance
    sports/              # one .mdx per sports moment
    travel/              # one .mdx per blog post (body becomes the post body)
    projects/            # one .mdx per project
  assets/
    music/               # cover images for music cards
    sports/              # cover images for sports cards
    travel/              # cover images for travel posts
    projects/            # cover images for projects
  styles/global.css      # Tailwind theme + custom CSS variables
content.config.ts        # content collection schemas
public/
  legacy/                # the 2019 site, served as-is
  favicon.svg
astro.config.mjs
```

## Adding a card to a timeline (music / sports)

Both pages read from a content collection with the same schema (`timelineSchema` in `content.config.ts`). Each card is one MDX file.

1. (Optional) Drop a cover image into `src/assets/music/` or `src/assets/sports/`. PNG or JPG, any dimensions — the card will render the image at its natural aspect ratio. If you have a YouTube video instead, you don't need a cover image; the card uses the YouTube thumbnail automatically.
2. Create `src/content/music/<slug>.mdx` (or `src/content/sports/<slug>.mdx`):

```mdx
---
title: "Song title (with whoever)"
date: 2025-08-03
venue: "Open mic night, Toronto"   # optional
tags: ["Cover", "Live"]             # optional, shown as chips
youtubeId: "abc123XYZ"              # optional — paste just the video ID, not the full URL
instagram: "https://www.instagram.com/p/POSTID/"  # optional — full URL
cover: "../../assets/music/<filename>"            # optional, path is relative to the .mdx file
featured: true                       # optional — appears on home page if true
---
```

The card body (anything below the closing `---`) is ignored on these timelines, so you can leave it empty.

3. `npm run dev` — the new card appears on `/music/` (or `/sports/`) immediately, sorted by `date` (newest first).

**Image priority on music/sports cards:** if `youtubeId` is set, the card uses YouTube's `mqdefault.jpg` (320×180) as the thumbnail. Otherwise it falls back to `cover`. If neither is set, the card shows a dashed placeholder.

**Where the card links to:** YouTube watch URL if `youtubeId`, else `instagram` URL, else `#`. Both open in a new tab.

**For Instagram Reels covers:** the og:image IG returns has a play overlay baked in. To get a clean thumbnail, take a screenshot of the post yourself and replace the file. The MDX `cover:` line should match whatever extension you use (e.g. swap `.jpg` → `.png`).

## Adding a blog post (travel)

Travel uses the same schema but each post has a full detail page rendered from the MDX body.

1. Drop a cover image into `src/assets/travel/` (optional).
2. Create `src/content/travel/<slug>.mdx`:

```mdx
---
title: "Iceland, March 2026"
date: 2026-03-15
venue: "Reykjavík"        # shown next to the date
tags: ["Iceland"]         # optional chips on both list and post
cover: "../../assets/travel/<filename>"   # optional
featured: false            # optional — appears on home if true
---

# Day 1

Long-form post body here. Markdown works. So does MDX (you can import
components and embed them inline).

![A photo](../../assets/travel/photos/something.jpg)

## Day 2

…
```

3. The card appears on `/travel/` and a full post page renders at `/travel/<slug>/`. Cards in the timeline link to their post page (not to YouTube/Instagram).

## Adding / editing a project

Projects use a different schema (`summary`, `links`, etc.) and have their own `/projects/<slug>/` detail page.

1. Drop a cover image into `src/assets/projects/`.
2. Create `src/content/projects/<slug>.mdx`:

```mdx
---
title: "Project name"
summary: "One-line description shown on cards."
date: 2018-04-01
tags: ["TypeScript", "Hackathon"]
cover: "../../assets/projects/<filename>"
featured: true             # show on /projects/ "featured" grid
links:
  github: "https://github.com/..."
  demo: "https://..."       # optional, can be a relative path like /legacy/foo.html
---

Long-form description in Markdown. Headings, lists, links, images all work.
```

The `slug` (filename without `.mdx`) becomes the URL.

## Featuring something on the home page

The home page `/` shows up to N items from `music` + `sports` collections that have `featured: true`. Sort order is newest first by `date`. To swap the featured items, set `featured: true` in the MDX you want shown and `false` (or remove the line) in the rest.

The cover image on the home grid is cropped to 16:9 with `object-position: center 10%`, so portrait shots show the upper portion (face) instead of the middle.

## Editing the home page or nav

- **Home hero / tagline:** `src/pages/index.astro`
- **Featured-card markup on home:** also `src/pages/index.astro`
- **Nav links + order:** `src/components/Nav.astro`
- **Footer links (GitHub, LinkedIn, YouTube, Instagram, legacy):** `src/components/Footer.astro`
- **Colors, fonts, spacing tokens:** `src/styles/global.css` (Tailwind `@theme` block)

## Timeline tuning

Card spacing and arrow geometry live entirely in `src/components/Timeline.astro`. The interesting knobs:

- `GAP_REM` (5) — vertical gap below the same-column predecessor
- `ARROW_MIN_REM` (5) — minimum vertical span an arrow needs (cards that would invert this constraint get pushed down extra)
- The arrow `c1Y`, `c2Y`, `c1XOffset`, `aHalfW`, `aH` constants control the curve amplitude and arrowhead size

The layout JS is intentionally inlined (`<script is:inline>`) so it runs synchronously during page parsing — fixes positions before first paint instead of after a deferred ES module loads. YouTube thumbnails declare `width="320" height="180"` so the browser knows the aspect ratio at parse time and reserves correct space; without that, the script measures cards at zero-image height and bottom cards get squished on first load.

## Theme

Light by default with a dark-mode toggle in the nav. Both modes share the same accent color (light orange). Tokens live in `global.css` — change them once and they propagate.

## Deploying

Pushing to `master` triggers `.github/workflows/deploy.yml`, which runs `npm install` + `npm run build` and publishes `dist/` to GitHub Pages.

One-time GitHub setup: **Settings → Pages → Source = "GitHub Actions"**.

Watch a deploy run live at [Actions](https://github.com/jeffwang13/jeffwang13.github.io/actions). First deploy takes 1–3 minutes.

## The legacy site

Everything under `public/` is copied verbatim into the build. The 2019 site lives at `public/legacy/`. It's reachable at `/legacy/index.html` in dev (Astro's dev server doesn't auto-resolve directory indexes for static files) and at `/legacy/` in production. Footer link uses the explicit `/legacy/index.html` path so it works in both environments.

## Adding a new top-level section

The `music` and `sports` pages are minimal wrappers around `<Timeline />`. To add another timeline-style section:

1. Add a new collection to `content.config.ts` (reuse `timelineSchema` if the schema fits).
2. Create `src/content/<name>/` and add `.mdx` files.
3. Create `src/pages/<name>/index.astro` — copy the music or sports page and swap the collection name.
4. Add the link to `Nav.astro`.

If you want a blog-style section (each card links to its own detail page), also add `src/pages/<name>/[...slug].astro` (copy `src/pages/travel/[...slug].astro`) and pass `linkBase="/<name>"` to `<Timeline />`.
