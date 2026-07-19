# Martography Content Architecture

Martography keeps editorial content in typed, version-controlled modules under `src/content/`. It has no CMS, database, or runtime API. Routes use selectors from `src/content/index.ts` and do not search raw arrays themselves.

## Previous content relationships

Before this migration, gallery photographs, prints, and stories lived in separate files under `src/data/`. Their relationships used inconsistent slugs, while the homepage repeated collection copy, titles, species labels, captions, and image aliases locally. `Placeholder.tsx` owned a second image registry. The sitemap contained only static routes.

The migrated relationships are now explicit IDs:

- a photo optionally points to one species and one print, and may point to many collections and stories;
- species, collections, and stories list their related photo IDs;
- each print points to exactly one photo;
- a story may select one related photo as its hero;
- responsive image metadata is keyed once and referenced by photos.

## Folder structure

```text
src/content/
  types.ts        Strict content and image types
  photos.ts       Photo records and responsive image metadata
  species.ts      Species records
  collections.ts  Editorial collections and homepage collection copy
  stories.ts      Journal records and structured story bodies
  prints.ts       Print previews, sizes, and pending commercial details
  index.ts        Public exports and typed selectors
scripts/
  validate-content.mjs
```

## Models and public status

`Photo`, `Species`, `Collection`, `Story`, and `Print` are defined in `types.ts`. Unknown facts are optional. Do not fill in dates, locations, conservation claims, prices, edition counts, or story copy until Paul has confirmed them.

Photo and story statuses are `published`, `draft`, `awaiting-title`, or `awaiting-story`. Public selectors exclude only `draft`; this allows established public “Photograph Coming Soon” records to retain their current treatment while ensuring new incomplete launch records remain private. A `published` photo must have a real production image. `awaiting-title` and `awaiting-story` honestly describe incomplete editorial fields.

Print statuses are `preview`, `available`, or `unavailable`. Current prints are previews. Their pricing status is `pending`, and the UI continues to say pricing is confirmed by inquiry.

## Adding a photograph

1. Optimize the source outside this repository. Full-resolution photographic masters belong in archival storage, not the production repository.
2. Add the production JPEG and responsive WebP derivatives to `public/images/`.
3. Add one responsive image entry in `src/content/photos.ts` with the real dimensions and srcset widths.
4. Add a photo record with unique `id` and `slug`, honest status, descriptive `alt`, the responsive image key, and relationship IDs.
5. Set `galleryVisible` only when the photograph belongs in the gallery. Drafts remain hidden regardless.
6. Run `npm run validate:content`.

Production filenames use lowercase descriptive kebab-case, for example `wood-duck-flight.jpg`. Keep optimized derivatives beside the JPEG using the established `name-WIDTH.webp` convention.

## Adding a species

Add a unique record to `species.ts`. Include only a confirmed common name and, when known, scientific name. Set `photoIds` to existing photo IDs, and set the matching `speciesId` on each photo. Species pages are intentionally outside the current scope.

## Connecting content

- Collection: add its ID to `photo.collectionIds`, and the photo ID to `collection.photoIds`.
- Story: add its ID to `photo.storyIds`, and the photo ID to `story.photoIds`. Set `heroPhotoId` when that photo supplies the cover.
- Print: add the print record with `photoId`, then set the photo's `printId` to the print ID.

Routes should use selectors such as `getPhotoBySlug`, `getPhotosByCollection`, `getStoryBySlug`, `getPrintBySlug`, `getPrintsForPhoto`, and `getRelatedPhotos`. Unknown dynamic slugs return the routes' existing not-found UI.

## Validation

`npm run validate:content` uses Node's built-in TypeScript stripping and adds no dependency. It checks duplicate IDs/slugs, broken species/collection/story/print/photo references, alt text on public records, responsive image keys, and real files for published photo paths. Draft records may intentionally have no image. The production build script runs validation first, so broken public content fails the build.

## Founding collection status

The nine founding-collection launch records have optimized JPEG fallbacks and responsive WebP derivatives under `public/images/` and are published in the gallery:

- `otter-carrying-fish.jpg`
- `red-shouldered-hawk-feeding.jpg`
- `green-anole-dewlap.jpg`
- `painted-bunting-green-leaves.jpg`
- `tarantula.jpg`
- `wood-duck-portrait.jpg`
- `wood-duck-flight.jpg`
- `bald-eagle-pair.jpg`
- `otter-family-swimming.jpg`

Their artist-approved titles, locations, dates, stories, collection assignments, and print decisions remain pending. The established Painted Bunting formal-portrait placeholder remains intentionally image-less and expects `birds-painted-bunting-portrait.jpg`; it is a separate photograph.

Batch-02 adds 19 image-backed draft records for editorial review. They remain hidden from public selectors and the sitemap. See `docs/BATCH_02_EDITORIAL_REPORT.md` for the complete source review, duplicate decisions, and editorial recommendations.

## Deliberately separate route copy

Page headers, navigation labels, manifesto text, education/program content, print-service language, inquiry-form labels, and layout-specific calls to action remain in routes. They are interface or page-level editorial copy rather than photograph/species/collection/story/print records. `src/data/catalog.ts` remains a separate internal catalog dataset used by `/catalog`; migrating that broader operational schema was not part of the public route migration.
