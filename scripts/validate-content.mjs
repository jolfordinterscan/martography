import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { collections } from "../src/content/collections.ts";
import { photos, responsiveImages } from "../src/content/photos.ts";
import { prints } from "../src/content/prints.ts";
import { species } from "../src/content/species.ts";
import { stories } from "../src/content/stories.ts";

const errors = [];
const wildlifeCategories = new Set([
  "mammals",
  "birds",
  "insects",
  "arachnids",
  "reptiles",
  "amphibians",
  "aquatic-life",
]);
const publicFileExists = (url) =>
  existsSync(resolve(process.cwd(), "public", url.replace(/^\//, "")));
const duplicateCheck = (records, label, field) => {
  const seen = new Set();
  for (const record of records) {
    if (seen.has(record[field])) errors.push(`Duplicate ${label} ${field}: ${record[field]}`);
    seen.add(record[field]);
  }
};
for (const [label, records] of [
  ["photo", photos],
  ["species", species],
  ["collection", collections],
  ["story", stories],
  ["print", prints],
]) {
  duplicateCheck(records, label, "id");
  duplicateCheck(records, label, "slug");
}

const photoIds = new Set(photos.map(({ id }) => id));
const speciesIds = new Set(species.map(({ id }) => id));
const collectionIds = new Set(collections.map(({ id }) => id));
const storyIds = new Set(stories.map(({ id }) => id));
const printIds = new Set(prints.map(({ id }) => id));
const registeredProductionImages = new Set(
  photos.flatMap((photo) => (photo.image ? [photo.image.replace(/^\/images\//, "")] : [])),
);

for (const filename of readdirSync(resolve(process.cwd(), "public/images"))) {
  if (/\.(?:jpe?g|png)$/i.test(filename) && !registeredProductionImages.has(filename))
    errors.push(`Production image has no content record: /images/${filename}`);
}

for (const image of Object.values(responsiveImages)) {
  if (!publicFileExists(image.src)) errors.push(`${image.key} source does not exist: ${image.src}`);
  for (const candidate of image.webpSrcSet?.split(",") ?? []) {
    const url = candidate.trim().split(/\s+/)[0];
    if (!publicFileExists(url)) errors.push(`${image.key} derivative does not exist: ${url}`);
  }
}

for (const photo of photos) {
  if (!photo.workingTitle?.trim()) errors.push(`${photo.id} has no working title`);
  if (photo.workingTitle === "Title Pending Artist Approval")
    errors.push(`${photo.id} uses the pending-title placeholder as its working title`);
  if (photo.artistTitle?.trim() === "Title Pending Artist Approval")
    errors.push(`${photo.id} uses the pending-title placeholder as its artist title`);
  if ("title" in photo) errors.push(`${photo.id} uses the legacy photo title field`);
  if (photo.speciesId && !speciesIds.has(photo.speciesId))
    errors.push(`${photo.id} references missing species ${photo.speciesId}`);
  if (photo.archiveEligible !== false && !wildlifeCategories.has(photo.category))
    errors.push(`${photo.id} has no valid wildlife category`);
  if (photo.archiveEligible !== false && !photo.speciesId)
    errors.push(`${photo.id} has no species assignment`);
  for (const id of photo.collectionIds)
    if (!collectionIds.has(id)) errors.push(`${photo.id} references missing collection ${id}`);
  for (const id of photo.storyIds)
    if (!storyIds.has(id)) errors.push(`${photo.id} references missing story ${id}`);
  if (photo.printId && !printIds.has(photo.printId))
    errors.push(`${photo.id} references missing print ${photo.printId}`);
  if (photo.status !== "draft" && !photo.alt.trim())
    errors.push(`${photo.id} is public but has no alt text`);
  if (photo.image && !publicFileExists(photo.image))
    errors.push(`${photo.id} image does not exist: ${photo.image}`);
  if (photo.responsiveImageKey && !responsiveImages[photo.responsiveImageKey])
    errors.push(`${photo.id} references missing responsive image ${photo.responsiveImageKey}`);
  if (photo.status === "published") {
    if (!photo.image || !photo.responsiveImageKey)
      errors.push(`${photo.id} is published but has no public image`);
    if (photo.archiveEligible !== false && photo.galleryVisible === false)
      errors.push(`${photo.id} is published wildlife but is not reachable from the gallery`);
  }
  if (
    photo.status !== "draft" &&
    photo.archiveEligible !== false &&
    photo.image &&
    photo.galleryVisible === false
  )
    errors.push(`${photo.id} is public and image-backed but excluded from the gallery`);
  if (photo.status === "draft" && photo.galleryVisible !== false)
    errors.push(`${photo.id} is draft but is not explicitly excluded from the public gallery`);

  if (photo.speciesId) {
    const item = species.find(({ id }) => id === photo.speciesId);
    if (item && item.category !== photo.category)
      errors.push(`${photo.id} category does not match ${item.id}`);
    if (item && !item.photoIds.includes(photo.id))
      errors.push(`${photo.id} is missing from ${item.id}.photoIds`);
  }
  for (const id of photo.collectionIds) {
    const collection = collections.find((item) => item.id === id);
    if (collection && !collection.photoIds.includes(photo.id))
      errors.push(`${photo.id} is missing from ${collection.id}.photoIds`);
  }
}
for (const print of prints)
  if (!photoIds.has(print.photoId))
    errors.push(`${print.id} references missing photo ${print.photoId}`);
for (const story of stories) {
  for (const id of story.photoIds)
    if (!photoIds.has(id)) errors.push(`${story.id} references missing photo ${id}`);
  for (const id of story.speciesIds)
    if (!speciesIds.has(id)) errors.push(`${story.id} references missing species ${id}`);
  if (story.heroPhotoId && !photoIds.has(story.heroPhotoId))
    errors.push(`${story.id} references missing hero photo ${story.heroPhotoId}`);
  if (story.status !== "draft" && !story.coverAlt.trim())
    errors.push(`${story.id} is public but has no cover alt text`);
}
for (const collection of collections)
  for (const id of collection.photoIds)
    if (!photoIds.has(id)) errors.push(`${collection.id} references missing photo ${id}`);
    else if (!photos.find((photo) => photo.id === id)?.collectionIds.includes(collection.id))
      errors.push(`${collection.id} is missing from ${id}.collectionIds`);
for (const item of species)
  for (const id of item.photoIds)
    if (!photoIds.has(id)) errors.push(`${item.id} references missing photo ${id}`);
    else if (photos.find((photo) => photo.id === id)?.speciesId !== item.id)
      errors.push(`${item.id} does not match ${id}.speciesId`);

if (errors.length) {
  console.error(
    `Content validation failed (${errors.length}):\n${errors.map((error) => `- ${error}`).join("\n")}`,
  );
  process.exit(1);
}
console.log(
  `Content validation passed: ${photos.length} photos, ${species.length} species, ${collections.length} collections, ${stories.length} stories, ${prints.length} prints.`,
);
