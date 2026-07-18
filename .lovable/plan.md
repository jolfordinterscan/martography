
## Goal

Turn the current site into a production-ready, content-managed website. The homepage visual design (typography, spacing, colors, animations, layout, components) is **locked**. All changes are content, data, admin, and functionality — no redesign.

## 1. Enable Lovable Cloud

Needed for database, file storage, and admin auth. Powers the CMS, image uploads, and content editing without code changes.

## 2. Data model (Lovable Cloud tables)

All tables get RLS: public read for published rows, admin-only writes.

- **photographs** — id, title, species, location, story, category (birds | mammals | behavior | conservation | other), image_path, focus (center/right/left/top/bottom), slot (hero, collection_birds, collection_mammals, story_dinner, …), print_available (bool), sort_order, published
- **stories** — id, slug, title, dek, body (markdown), cover_image_path, published_at, published
- **prints** — id, photograph_id (FK), name, sizes (jsonb: [{size, price, edition}]), paper, description, published
- **workshops / adventures** — id, title, location, dates, price, description, cover_image_path, capacity, published
- **education_programs** — id, title, audience, format, description, cover_image_path, published
- **site_settings** — key/value (hero headline, hero subhead, about copy, contact info, social links)
- **user_roles** — user_id, role (admin) — separate table per security rules

Storage bucket `media` (public read) for all uploaded photography.

## 3. Reusable components

Refactor homepage + subpages to consume data from the CMS via typed hooks. No visual change — same DOM, same classes.

- `<CMSImage slot="hero" focus="right" />` — replaces current `<Placeholder file=…>`. Resolves slot → DB row → storage URL, falls back to current temporary Unsplash image if no upload yet, so the site never breaks during transition.
- `<CollectionCard collectionKey="birds" />` — pulls title/description/image from CMS.
- `<StoryCard />`, `<PrintCard />`, `<WorkshopCard />`, `<ProgramCard />`, `<SiteText settingKey="hero.headline" fallback="…" />`.
- Shared `Section`, `Eyebrow`, `EditorialHeading` primitives already exist — kept as-is.

## 4. Admin area (`/admin`, gated)

Auth: email/password sign-in, gated by `has_role(user, 'admin')`. First admin bootstrapped via SQL migration on a specified email.

Admin pages (functional, minimal UI — not part of the locked public design):
- Dashboard — list of slots + assigned photograph, quick "replace image" per slot
- Photographs — table + create/edit form with upload (drag-and-drop), metadata fields, slot assignment, print toggle
- Stories, Prints, Workshops, Education — CRUD tables + edit forms
- Site settings — key/value editor for hero copy, about, contact

Image upload flow: pick file → uploads to `media` bucket via signed path → row saved with `image_path` → live on public site immediately, no code change, no layout shift.

## 5. Content seeding

Migration seeds the current homepage slots (hero, 4 collections, Dinner Is Served, Prints, Adventures, Conservation & Education, About) as photograph rows pointing at the existing temporary Unsplash URLs. Site looks identical on first load; Paul can then replace each via the admin.

## 6. Production hardening

- SEO: unique `head()` per route with real titles/descriptions (already partly there — audited and completed).
- Accessibility: alt text sourced from photograph title + species; focus states; skip-to-content link; reduced-motion already respected.
- Responsiveness: audit and tighten breakpoints on nav, collections, and story sections — no layout redesign, just fixes.
- Error/not-found boundaries on every route with a loader.
- 404 route.

## Out of scope (per lock)

No changes to homepage typography, spacing, colors, animations, section order, or component visual structure. If a fix requires touching visual style, I stop and ask first.

## Technical notes

- TanStack Start server functions for all admin writes (`requireSupabaseAuth` + `has_role` check, then `supabaseAdmin`).
- Public reads via server publishable client behind narrow `TO anon` SELECT policies on `published = true` rows.
- Route loaders use `ensureQueryData` so content is SSR'd; `CMSImage` renders synchronously from loader data — no layout flash.
- Homepage data fetched in one loader query (all slots + settings) to avoid waterfalls.

## Confirmations I need before building

1. **Admin email** to bootstrap as the first admin (Paul's email, or yours).
2. **Print sizes / pricing tiers** — use placeholders for now and let admin edit, or do you have a starting list?
3. **Workshops & Education** — leave with placeholder entries for admin to fill in, OK?
