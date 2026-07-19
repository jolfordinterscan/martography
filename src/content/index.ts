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
  mammals: "Mammals",
  birds: "Birds",
  insects: "Insects",
  arachnids: "Arachnids",
  reptiles: "Reptiles",
  amphibians: "Amphibians",
  "aquatic-life": "Aquatic Life",
};

export const wildlifeCategoryOrder: PhotoCategory[] = [
  "mammals",
  "birds",
  "insects",
  "arachnids",
  "reptiles",
  "amphibians",
  "aquatic-life",
];

export const isPhotoCategory = (value: unknown): value is PhotoCategory =>
  typeof value === "string" && wildlifeCategoryOrder.includes(value as PhotoCategory);

export const isPublicStatus = (status: string) => status !== "draft";

export function getPhotoById(id: string) {
  return photos.find((photo) => photo.id === id);
}
export function getPhotoBySlug(slug: string) {
  return photos.find(
    (photo) =>
      photo.slug === slug && photo.archiveEligible !== false && isPublicStatus(photo.status),
  );
}
export function getPublishedPhotos() {
  return photos.filter((photo) => photo.status === "published");
}
export function getPublicPhotos() {
  return photos.filter((photo) => isPublicStatus(photo.status));
}
export function getGalleryPhotos() {
  return getPublicPhotos()
    .filter((photo) => photo.archiveEligible !== false && photo.galleryVisible !== false)
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
    ? getPublicPhotos().filter((photo) => photo.collectionIds.includes(collection.id))
    : [];
}
export function getCollectionsForPhoto(photoId: string) {
  const photo = getPhotoById(photoId);
  return photo
    ? photo.collectionIds
        .map((collectionId) => collections.find((item) => item.id === collectionId))
        .filter((collection) => collection !== undefined)
    : [];
}
export function getCollectionsForSpecies(speciesIdOrSlug: string) {
  const item = species.find(
    (entry) => entry.id === speciesIdOrSlug || entry.slug === speciesIdOrSlug,
  );
  if (!item) return [];
  const photoIds = new Set(getPhotosForSpecies(item.id).map((photo) => photo.id));
  return collections.filter((collection) =>
    collection.photoIds.some((photoId) => photoIds.has(photoId)),
  );
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
    ? getPublicPhotos().filter(
        (photo) => photo.archiveEligible !== false && photo.speciesId === item.id,
      )
    : [];
}
export function getPublicSpecies() {
  return species.filter((item) => getPhotosForSpecies(item.id).length > 0);
}
export function getPopulatedWildlifeCategories() {
  const publicPhotos = getGalleryPhotos();
  return wildlifeCategoryOrder.filter((category) =>
    publicPhotos.some((photo) => photo.category === category),
  );
}
export function getRecentlyAddedPhotos(limit = 3) {
  return [...getGalleryPhotos()].reverse().slice(0, limit);
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
export function getStoriesForSpecies(speciesIdOrSlug: string) {
  const item = species.find(
    (entry) => entry.id === speciesIdOrSlug || entry.slug === speciesIdOrSlug,
  );
  if (!item) return [];
  const photoIds = new Set(getPhotosForSpecies(item.id).map((photo) => photo.id));
  return getPublishedStories().filter(
    (story) =>
      story.speciesIds.includes(item.id) || story.photoIds.some((photoId) => photoIds.has(photoId)),
  );
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
export function getRelatedPrints(printIdOrSlug: string, limit = 3) {
  const print = prints.find((item) => item.id === printIdOrSlug || item.slug === printIdOrSlug);
  const photo = print ? getPhotoById(print.photoId) : undefined;
  if (!print || !photo) return [];

  const printOrder = new Map(getPublishedPrints().map((item, index) => [item.id, index]));

  return getPublishedPrints()
    .filter((item) => item.id !== print.id)
    .sort((a, b) => {
      const aPhoto = getPhotoById(a.photoId);
      const bPhoto = getPhotoById(b.photoId);
      const aSameSpecies = Number(
        Boolean(photo.speciesId && aPhoto?.speciesId === photo.speciesId),
      );
      const bSameSpecies = Number(
        Boolean(photo.speciesId && bPhoto?.speciesId === photo.speciesId),
      );
      if (aSameSpecies !== bSameSpecies) return bSameSpecies - aSameSpecies;

      const aCollections =
        aPhoto?.collectionIds.filter((id) => photo.collectionIds.includes(id)).length ?? 0;
      const bCollections =
        bPhoto?.collectionIds.filter((id) => photo.collectionIds.includes(id)).length ?? 0;
      if (aCollections !== bCollections) return bCollections - aCollections;

      return (printOrder.get(a.id) ?? 0) - (printOrder.get(b.id) ?? 0);
    })
    .slice(0, limit);
}
export function getAdjacentPrints(printIdOrSlug: string) {
  const availablePrints = getPublishedPrints();
  const index = availablePrints.findIndex(
    (print) => print.id === printIdOrSlug || print.slug === printIdOrSlug,
  );
  if (availablePrints.length < 2) return {};
  if (index < 0) {
    return { previous: availablePrints[availablePrints.length - 1], next: availablePrints[0] };
  }
  return {
    previous: availablePrints[(index - 1 + availablePrints.length) % availablePrints.length],
    next: availablePrints[(index + 1) % availablePrints.length],
  };
}
export function getPrintsForPhoto(photoIdOrSlug: string) {
  const photo = photos.find((item) => item.id === photoIdOrSlug || item.slug === photoIdOrSlug);
  return photo
    ? prints.filter((print) => print.photoId === photo.id && print.status !== "unavailable")
    : [];
}
export function getRelatedPhotos(photoIdOrSlug: string, limit = 6) {
  const photo = photos.find((item) => item.id === photoIdOrSlug || item.slug === photoIdOrSlug);
  if (!photo) return [];

  const galleryOrder = new Map(getGalleryPhotos().map((item, index) => [item.id, index]));

  return getGalleryPhotos()
    .filter((item) => item.id !== photo.id)
    .sort((a, b) => {
      const aSameSpecies = Number(Boolean(photo.speciesId && a.speciesId === photo.speciesId));
      const bSameSpecies = Number(Boolean(photo.speciesId && b.speciesId === photo.speciesId));
      if (aSameSpecies !== bSameSpecies) return bSameSpecies - aSameSpecies;

      const aCollections = a.collectionIds.filter((id) => photo.collectionIds.includes(id)).length;
      const bCollections = b.collectionIds.filter((id) => photo.collectionIds.includes(id)).length;
      if (aCollections !== bCollections) return bCollections - aCollections;

      const aBehaviors = a.behaviors.filter((item) => photo.behaviors.includes(item)).length;
      const bBehaviors = b.behaviors.filter((item) => photo.behaviors.includes(item)).length;
      if (aBehaviors !== bBehaviors) return bBehaviors - aBehaviors;

      return (galleryOrder.get(a.id) ?? 0) - (galleryOrder.get(b.id) ?? 0);
    })
    .slice(0, limit);
}

export function getAdjacentGalleryPhotos(photoIdOrSlug: string) {
  const gallery = getGalleryPhotos();
  const index = gallery.findIndex(
    (photo) => photo.id === photoIdOrSlug || photo.slug === photoIdOrSlug,
  );
  if (gallery.length < 2) return {};
  if (index < 0) return { previous: gallery[gallery.length - 1], next: gallery[0] };
  return {
    previous: gallery[(index - 1 + gallery.length) % gallery.length],
    next: gallery[(index + 1) % gallery.length],
  };
}
