import type { Print, PrintSize } from "./types.ts";

export const STANDARD_SIZES: PrintSize[] = [
  { label: "Studio", dimensions: '16" × 24"' },
  { label: "Studio", dimensions: '20" × 30"' },
  { label: "Gallery", dimensions: '24" × 36"' },
  { label: "Gallery", dimensions: '30" × 45"' },
  { label: "Statement", dimensions: '40" × 60"' },
];

const pendingTitle = "Untitled — Pending Artist Title";
const preview = (
  record: Omit<Print, "status" | "sizes" | "pricingStatus" | "edition" | "material">,
): Print => ({
  ...record,
  status: "preview",
  edition: "Limited Edition",
  sizes: STANDARD_SIZES,
  material: "Archival Fine Art Print",
  pricingStatus: "pending",
});

export const prints: Print[] = [
  preview({
    id: "print-bobcat",
    slug: "bobcat",
    photoId: "photo-bobcat-hero",
    title: pendingTitle,
    description:
      "She held me in her eyes for three seconds before the grass closed over her again. A quiet, sovereign portrait — the entrance piece of the Martography collection.",
    featured: true,
  }),
  preview({
    id: "print-painted-bunting-salvia",
    slug: "painted-bunting-salvia",
    photoId: "photo-painted-bunting-salvia",
    title: pendingTitle,
    description:
      "A male painted bunting perched on a spray of purple salvia — the primary Painted Bunting artwork in the Martography collection.",
  }),
  preview({
    id: "print-painted-bunting-portrait",
    slug: "painted-bunting-portrait",
    photoId: "photo-painted-bunting-portrait",
    title: pendingTitle,
    description:
      "A formal side portrait of a male painted bunting against a clean, neutral background — a study in feather and color.",
  }),
  preview({
    id: "print-painted-bunting-flight",
    slug: "painted-bunting-in-flight",
    photoId: "photo-painted-bunting-flight",
    title: pendingTitle,
    description:
      "Impossible blue, caught mid-wingbeat. A small bird made monumental at print scale.",
  }),
  preview({
    id: "print-foxes",
    slug: "foxes",
    photoId: "photo-red-foxes",
    title: pendingTitle,
    description:
      "A private moment between siblings — the kind of image you only earn by waiting longer than the light.",
  }),
  preview({
    id: "print-dinner-is-served",
    slug: "dinner-is-served",
    photoId: "photo-roadrunner-dinner",
    title: "Dinner Is Served",
    description:
      "A parent returning to the nest — the small drama that keeps a species alive, rendered at gallery scale.",
    featured: true,
  }),
  preview({
    id: "print-hummingbird-nest",
    slug: "hummingbird-nest",
    photoId: "photo-hummingbird-nest",
    title: pendingTitle,
    description:
      "A thimble-sized nest, two chicks, a mother returning. A conservation portrait — quiet, tender, exact.",
  }),
  preview({
    id: "print-california-quail",
    slug: "california-quail",
    photoId: "photo-california-quail",
    title: pendingTitle,
    description:
      "A near-perfect side portrait — plume, eye, feather architecture. A study in restraint.",
  }),
];
