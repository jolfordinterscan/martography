import type { Collection } from "./types.ts";

export const collections: Collection[] = [
  {
    id: "collection-birds",
    slug: "birds",
    number: "01",
    title: "Birds",
    subtitle: "The aerial life of a continent, held in stillness.",
    description:
      "A study of flight, feather, and color — from the painted bunting's impossible palette to the small dramas of the air.",
    photoIds: [
      "photo-painted-bunting-salvia",
      "photo-painted-bunting-portrait",
      "photo-painted-bunting-flight",
      "photo-california-quail",
    ],
    coverPhotoId: "photo-painted-bunting-salvia",
    coverLocation: "Location — to be confirmed",
    featured: true,
  },
  {
    id: "collection-mammals",
    slug: "mammals",
    number: "02",
    title: "Mammals",
    subtitle: "The intelligence of a gaze. The weight of an animal at rest.",
    description:
      "Portraits made close, but never intrusively — a quiet catalogue of the animals that share these forests, deserts, and coastlines.",
    photoIds: ["photo-bobcat-hero", "photo-red-foxes"],
    coverPhotoId: "photo-red-foxes",
    coverLocation: "Northern Woodlands",
    featured: true,
  },
  {
    id: "collection-behavior",
    slug: "behavior",
    number: "03",
    title: "Wildlife Behavior",
    subtitle: "The moments most photographers miss.",
    description:
      "The hunt, the courtship, the feeding of a chick — behavior seen only after long hours of stillness, and rarely captured whole.",
    photoIds: ["photo-roadrunner-dinner"],
    coverPhotoId: "photo-roadrunner-dinner",
    coverLocation: "Desert Southwest",
    featured: true,
  },
  {
    id: "collection-conservation",
    slug: "conservation",
    number: "04",
    title: "Conservation",
    subtitle: "Small lives whose futures hang on the choices being made today.",
    description:
      "A hummingbird nest, no larger than a walnut — photographed in the hope that seeing these lives clearly is the first step toward keeping them here.",
    photoIds: ["photo-hummingbird-nest"],
    coverPhotoId: "photo-hummingbird-nest",
    coverLocation: "Backyard Oak",
    featured: true,
  },
];
