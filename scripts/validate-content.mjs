import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { collections } from "../src/content/collections.ts";
import { photos, responsiveImages } from "../src/content/photos.ts";
import { prints } from "../src/content/prints.ts";
import { species } from "../src/content/species.ts";
import { stories } from "../src/content/stories.ts";

const errors = [];
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

for (const photo of photos) {
  if (photo.speciesId && !speciesIds.has(photo.speciesId))
    errors.push(`${photo.id} references missing species ${photo.speciesId}`);
  for (const id of photo.collectionIds)
    if (!collectionIds.has(id)) errors.push(`${photo.id} references missing collection ${id}`);
  for (const id of photo.storyIds)
    if (!storyIds.has(id)) errors.push(`${photo.id} references missing story ${id}`);
  if (photo.printId && !printIds.has(photo.printId))
    errors.push(`${photo.id} references missing print ${photo.printId}`);
  if (photo.status !== "draft" && !photo.alt.trim())
    errors.push(`${photo.id} is public but has no alt text`);
  if (
    photo.image &&
    !existsSync(resolve(process.cwd(), "public", photo.image.replace(/^\/images\//, "images/")))
  )
    errors.push(`${photo.id} image does not exist: ${photo.image}`);
  if (photo.responsiveImageKey && !responsiveImages[photo.responsiveImageKey])
    errors.push(`${photo.id} references missing responsive image ${photo.responsiveImageKey}`);
  if (photo.status === "published") {
    if (!photo.image || !photo.responsiveImageKey)
      errors.push(`${photo.id} is published but has no public image`);
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
for (const item of species)
  for (const id of item.photoIds)
    if (!photoIds.has(id)) errors.push(`${item.id} references missing photo ${id}`);

if (errors.length) {
  console.error(
    `Content validation failed (${errors.length}):\n${errors.map((error) => `- ${error}`).join("\n")}`,
  );
  process.exit(1);
}
console.log(
  `Content validation passed: ${photos.length} photos, ${species.length} species, ${collections.length} collections, ${stories.length} stories, ${prints.length} prints.`,
);
