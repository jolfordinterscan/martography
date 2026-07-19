import { collections } from "./collections.ts";
import { imageAliases, photos, responsiveImages } from "./photos.ts";
import { prints, STANDARD_SIZES } from "./prints.ts";
import { species } from "./species.ts";
import { stories } from "./stories.ts";
import type { Photo, PhotoCategory } from "./types.ts";

export * from "./types.ts";
export {
  collections,
  imageAliases,
  photos,
  prints,
  responsiveImages,
  species,
  stories,
  STANDARD_SIZES,
};

export const categoryLabels: Record<PhotoCategory | "all", string> = {
  all: "All Work",
  birds: "Birds",
  mammals: "Mammals",
  behavior: "Behavior",
  conservation: "Conservation",
};

export const isPublicStatus = (status: string) => status !== "draft";

export function getPhotoById(id: string) {
  return photos.find((photo) => photo.id === id);
}
export function getPhotoBySlug(slug: string) {
  return photos.find((photo) => photo.slug === slug && isPublicStatus(photo.status));
}
export function getPublishedPhotos() {
  return photos.filter((photo) => photo.status === "published");
}
export function getPublicPhotos() {
  return photos.filter((photo) => isPublicStatus(photo.status));
}
export function getGalleryPhotos() {
  return getPublicPhotos()
    .filter((photo) => photo.galleryVisible !== false)
    .sort(
      (a, b) =>
        (a.galleryOrder ?? Number.MAX_SAFE_INTEGER) - (b.galleryOrder ?? Number.MAX_SAFE_INTEGER),
    );
}
export function getFeaturedPhotos() {
  return getPublicPhotos().filter((photo) => photo.featured);
}
export function getPhotosByCollection(collectionIdOrSlug: string) {
  const collection = collections.find(
    (item) => item.id === collectionIdOrSlug || item.slug === collectionIdOrSlug,
  );
  return collection
    ? collection.photoIds.map(getPhotoById).filter((photo) => photo && isPublicStatus(photo.status))
    : [];
}
export function getSpeciesById(id: string) {
  return species.find((item) => item.id === id);
}
export function getSpeciesBySlug(slug: string) {
  return species.find((item) => item.slug === slug);
}
export function getSpeciesForPhoto(photoId: string) {
  const photo = getPhotoById(photoId);
  return photo?.speciesId ? getSpeciesById(photo.speciesId) : undefined;
}
export function getSpeciesDisplayName(photoId: string) {
  const item = getSpeciesForPhoto(photoId);
  return item
    ? `${item.commonName}${item.scientificName ? ` (${item.scientificName})` : ""}`
    : undefined;
}
export function getPhotoDisplayTitle(photo: Photo) {
  return photo.artistTitle?.trim() || photo.workingTitle;
}
export function getPhotosForSpecies(speciesIdOrSlug: string) {
  const item = species.find(
    (entry) => entry.id === speciesIdOrSlug || entry.slug === speciesIdOrSlug,
  );
  return item
    ? item.photoIds.map(getPhotoById).filter((photo) => photo && isPublicStatus(photo.status))
    : [];
}
export function getFeaturedCollections() {
  return collections.filter((collection) => collection.featured);
}
export function getCollectionCover(collectionId: string) {
  const collection = collections.find((item) => item.id === collectionId);
  return collection?.coverPhotoId ? getPhotoById(collection.coverPhotoId) : undefined;
}
export function getStoryBySlug(slug: string) {
  return stories.find((story) => story.slug === slug && isPublicStatus(story.status));
}
export function getPublishedStories() {
  return stories.filter((story) => story.status === "published");
}
export function getPrintBySlug(slug: string) {
  return prints.find((print) => print.slug === slug && print.status !== "unavailable");
}
export function getPrintDisplayTitle(print: (typeof prints)[number]) {
  if (print.title !== "Untitled — Pending Artist Title") return print.title;
  const photo = getPhotoById(print.photoId);
  return photo ? getPhotoDisplayTitle(photo) : "Photograph";
}
export function getPublishedPrints() {
  return prints.filter((print) => print.status !== "unavailable");
}
export function getPrintsForPhoto(photoIdOrSlug: string) {
  const photo = photos.find((item) => item.id === photoIdOrSlug || item.slug === photoIdOrSlug);
  return photo
    ? prints.filter((print) => print.photoId === photo.id && print.status !== "unavailable")
    : [];
}
export function getRelatedPhotos(photoIdOrSlug: string, limit = 3) {
  const photo = photos.find((item) => item.id === photoIdOrSlug || item.slug === photoIdOrSlug);
  if (!photo) return [];
  return getGalleryPhotos()
    .filter((item) => item.id !== photo.id)
    .slice(0, limit);
}
