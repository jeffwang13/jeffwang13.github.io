# Music inbox — to organize into timeline entries

Working file for grouping Instagram + YouTube content into named "performances" / "events" before turning each into an MDX entry under `src/content/music/`.

This file is **not** rendered on the site. It lives outside `src/content/`.

## Instagram posts (raw, ungrouped)

Provided by Jeffrey, 2026-05-09. Need to: (a) view each, (b) decide grouping into events/performances, (c) match with related YouTube videos if any, (d) write MDX entries.

- https://www.instagram.com/p/DXmYYtzjVDx/
- https://www.instagram.com/p/DMyluLGRdxw/
- https://www.instagram.com/p/DM6UhUOxkzJ/
- https://www.instagram.com/p/DMtP77nxE4D/
- https://www.instagram.com/p/DKvknmVRhyw/?img_index=1
- https://www.instagram.com/p/DHZoofPxGiF/
- https://www.instagram.com/p/C4Ba4q5x7q0/
- https://www.instagram.com/p/C4BalcuRSsU/
- https://www.instagram.com/p/C4BaZsFxsat/?img_index=4

## YouTube performances (already entered)

Already in `src/content/music/`. Listed here so they're easy to cross-reference when grouping events:

| Date       | Title                          | Video ID      | File                        |
|------------|--------------------------------|---------------|-----------------------------|
| 2025-07-29 | Tishomingo (with Ella)         | pfuZWhklrVs   | tishomingo.mdx              |
| 2022-12-11 | Colder Weather (Fireside)      | TFNLmkYsX0w   | colder-weather.mdx          |
| 2022-02-01 | 2016 (Sam Hunt cover)          | ooCAASgcY30   | 2016-sam-hunt.mdx           |
| 2013-06-12 | Vehicle (RHHS Gold Fever)      | i0qDw1ZEUHw   | vehicle.mdx                 |

## When grouping

When ready, for each event/performance:

1. Decide a single MDX file per **event** (one performance can have multiple media — IG photos + IG reel + YouTube video, etc.).
2. Update the `music` schema in `src/content.config.ts` to support multiple media items per entry (currently only one `youtubeId` and one `instagram` URL per entry).
3. Write the MDX with frontmatter (title, date, venue, notes) and a list/array of media references.
4. Delete the URL from this inbox once it's organized.
