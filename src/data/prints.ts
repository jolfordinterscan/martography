// Print catalog — presentation data only.
//
// IMPORTANT: pricing, edition sizes, paper stock, and locations have NOT
// been confirmed by Paul Marto. Anything unconfirmed is marked PENDING
// and rendered on the site as "Details coming soon" (see prints.tsx).
// Do not display invented specifics as fact.

export interface PrintSize {
  label: string;
  dimensions: string;
}

export interface Print {
  slug: string;
  title: string; // "Untitled — Pending Artist Title" until confirmed
  subject: string; // internal descriptor for image + alt
  species: string; // species is factual (visible in photograph)
  location: string | null; // null when unconfirmed
  photoSlug: string;
  filename: string;
  focus?: "center" | "left" | "right" | "top" | "bottom";
  description: string; // editorial caption — presentational, not a factual claim
  featured?: boolean;
}

const PENDING = "Untitled — Pending Artist Title";
const LOCATION_TBA = null;

// A single set of standard sizes offered across the collection.
// Actual availability per artwork is still being finalized.
export const STANDARD_SIZES: PrintSize[] = [
  { label: "Studio", dimensions: '16" × 24"' },
  { label: "Studio", dimensions: '20" × 30"' },
  { label: "Gallery", dimensions: '24" × 36"' },
  { label: "Gallery", dimensions: '30" × 45"' },
  { label: "Statement", dimensions: '40" × 60"' },
];

export const prints: Print[] = [
  {
    slug: "bobcat",
    title: PENDING,
    subject: "Bobcat through the grass",
    species: "Bobcat (Lynx rufus)",
    location: LOCATION_TBA,
    photoSlug: "bobcat-portrait",
    filename: "hero.jpg",
    focus: "right",
    description:
      "She held me in her eyes for three seconds before the grass closed over her again. A quiet, sovereign portrait — the entrance piece of the Martography collection.",
    featured: true,
  },
  {
    slug: "painted-bunting-salvia",
    title: PENDING,
    subject: "Painted Bunting on salvia",
    species: "Painted Bunting (Passerina ciris)",
    location: LOCATION_TBA,
    photoSlug: "painted-bunting-on-salvia",
    filename: "birds-painted-bunting-salvia.jpg",
    focus: "left",
    description:
      "A male painted bunting perched on a spray of purple salvia — the primary Painted Bunting artwork in the Martography collection.",
  },
  {
    slug: "painted-bunting-portrait",
    title: PENDING,
    subject: "Painted Bunting — formal portrait",
    species: "Painted Bunting (Passerina ciris)",
    location: LOCATION_TBA,
    photoSlug: "painted-bunting-portrait",
    filename: "birds-painted-bunting-portrait.jpg",
    focus: "center",
    description:
      "A formal side portrait of a male painted bunting against a clean, neutral background — a study in feather and color.",
  },
  {
    slug: "painted-bunting-in-flight",
    title: PENDING,
    subject: "Bunting in flight",
    species: "Painted Bunting (Passerina ciris)",
    location: LOCATION_TBA,
    photoSlug: "painted-bunting-flight",
    filename: "birds-painted-bunting-flight.jpg",
    focus: "center",
    description:
      "Impossible blue, caught mid-wingbeat. A small bird made monumental at print scale.",
  },
  {
    slug: "foxes",
    title: PENDING,
    subject: "Two foxes at play",
    species: "Red Fox (Vulpes vulpes)",
    location: LOCATION_TBA,
    photoSlug: "foxes-at-play",
    filename: "mammals-fox.jpg",
    focus: "center",
    description:
      "A private moment between siblings — the kind of image you only earn by waiting longer than the light.",
  },
  {
    slug: "dinner-is-served",
    title: "Dinner Is Served",
    subject: "Roadrunner with lizard",
    species: "Greater Roadrunner (Geococcyx californianus)",
    location: LOCATION_TBA,
    photoSlug: "roadrunner-lizard",
    filename: "story-dinner-is-served.jpg",
    focus: "center",
    description:
      "A parent returning to the nest — the small drama that keeps a species alive, rendered at gallery scale.",
    featured: true,
  },
  {
    slug: "hummingbird-nest",
    title: PENDING,
    subject: "Hummingbird at the nest",
    species: "Anna's Hummingbird (Calypte anna)",
    location: LOCATION_TBA,
    photoSlug: "hummingbird-nest",
    filename: "conservation-hummingbird-nest.jpg",
    focus: "center",
    description:
      "A thimble-sized nest, two chicks, a mother returning. A conservation portrait — quiet, tender, exact.",
  },
  {
    slug: "california-quail",
    title: PENDING,
    subject: "California Quail — plume portrait",
    species: "California Quail (Callipepla californica)",
    location: LOCATION_TBA,
    photoSlug: "california-quail-plume",
    filename: "birds-california-quail.jpg",
    focus: "center",
    description:
      "A near-perfect side portrait — plume, eye, feather architecture. A study in restraint.",
  },
];

export function getPrint(slug: string): Print | undefined {
  return prints.find((p) => p.slug === slug);
}
