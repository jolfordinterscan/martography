// Central data for photographs — only authentic Martography uploads.
// Each entry is a full record — ready to be swapped for a CMS row later.
// The `filename` maps to an image URL in src/components/site/Placeholder.tsx.

export type PhotoCategory = "birds" | "mammals" | "behavior" | "conservation";

export interface Photograph {
  slug: string;
  title: string;
  species: string;
  location: string;
  category: PhotoCategory;
  filename: string;
  ratio?: string;
  span?: boolean;
  focus?: "center" | "right" | "left" | "top" | "bottom";
  printAvailable: boolean;
  year: number;
  story: string; // short caption story
  longStory?: string[]; // paragraphs for detail page
}

export const photographs: Photograph[] = [
  {
    slug: "painted-bunting-on-salvia",
    title: "Title Pending Artist Approval",
    species: "Painted Bunting (Passerina ciris)",
    location: "Location — to be confirmed",
    category: "birds",
    filename: "birds-painted-bunting-salvia.jpg",
    ratio: "aspect-[3/2]",
    focus: "left",
    printAvailable: true,
    year: 2024,
    story: "A male painted bunting perched on a spray of purple salvia.",
  },
  {
    slug: "painted-bunting-portrait",
    title: "Title Pending Artist Approval",
    species: "Painted Bunting (Passerina ciris)",
    location: "Location — to be confirmed",
    category: "birds",
    filename: "birds-painted-bunting-portrait.jpg",
    ratio: "aspect-[3/2]",
    focus: "center",
    printAvailable: true,
    year: 2024,
    story: "A formal side portrait of a male painted bunting against a clean, neutral background.",
  },
  {
    slug: "painted-bunting-in-flight",
    title: "Impossible Blue",
    species: "Painted Bunting",
    location: "Location — to be confirmed",
    category: "birds",
    filename: "birds-painted-bunting-flight.jpg",
    ratio: "aspect-square",
    focus: "center",
    printAvailable: true,
    year: 2024,
    story:
      "Wings open, head down, eye locked. A single frame from a bird that rarely holds still long enough to be seen at all.",
    longStory: [
      "A bunting in mid-flight is measured in fractions of a second. The wings blur; the eye does not. You wait, and wait, and then the shutter chooses for you.",
      "This frame arrived on the eleventh morning of a quiet week — patience rewarded not with a landing, but with an animal briefly suspended between one branch and the next.",
      "It remains one of the truest portraits I have made of what wildlife photography actually is: hours of stillness, and then a single breath of light.",
    ],
  },
  {
    slug: "california-quail-portrait",
    title: "The Plume",
    species: "California Quail (Callipepla californica)",
    location: "Location — to be confirmed",
    category: "birds",
    filename: "birds-california-quail.jpg",
    ratio: "aspect-[4/5]",
    focus: "center",
    printAvailable: true,
    year: 2024,
    story:
      "A male quail turns his head a quarter inch and the whole portrait arrives — the crest, the scaled breast, the wet-black eye.",
    longStory: [
      "The California Quail is our state bird, and one of the most quietly ornamented animals in the West. Everything about him is drawn — the comma of the crest, the white brushstrokes on the face, the fine scaling on the belly.",
      "This frame came at the end of a long, still afternoon. He stepped up onto a low branch, held the pose for a heartbeat, and looked past the lens as if he had somewhere to be.",
      "It is a portrait, more than a wildlife photograph — but the light and the wildness are entirely his.",
    ],
  },
  {
    slug: "red-fox-golden-hour",
    title: "Ember",
    species: "Red Fox (Vulpes vulpes)",
    location: "Location — to be confirmed",
    category: "mammals",
    filename: "mammals-fox.jpg",
    ratio: "aspect-[4/5]",
    focus: "center",
    printAvailable: true,
    year: 2024,
    story:
      "Two young foxes cross paths in the last minute of sun. They held the light for four breaths, then were gone.",
  },
  {
    slug: "roadrunner-dinner",
    title: "Dinner Is Served",
    species: "Greater Roadrunner (Geococcyx californianus)",
    location: "Location — to be confirmed",
    category: "behavior",
    filename: "story-dinner-is-served.jpg",
    ratio: "aspect-[16/10]",
    focus: "right",
    span: true,
    printAvailable: true,
    year: 2024,
    story:
      "A parent returns to a hidden nest with a lizard the length of its own body. The chick called for it for twenty minutes.",
    longStory: [
      "The nest was tucked into the arms of a cholla the size of a small car. I had marked it two weeks earlier without ever getting closer than eighty yards.",
      "The chick had a voice like a rusty gate. When the parent came back — every ninety minutes or so — it would call as if the world were ending.",
      "This frame is the exchange itself. A lizard as long as the chick was, hanging in the air between two open beaks, held for perhaps a fifth of a second.",
      "The chick swallowed it whole. It looked, for a moment, like a small dinosaur that had made a terrible mistake.",
    ],
  },
  {
    slug: "hummingbird-nest",
    title: "The Nest",
    species: "Anna's Hummingbird (Calypte anna)",
    location: "Location — to be confirmed",
    category: "conservation",
    filename: "conservation-hummingbird-nest.jpg",
    ratio: "aspect-[4/5]",
    focus: "left",
    printAvailable: true,
    year: 2024,
    story:
      "A mother returns to a nest the size of a walnut. Two chicks, no larger than jellybeans, wait for her every ten minutes.",
  },
];

export function getPhotograph(slug: string): Photograph | undefined {
  return photographs.find((p) => p.slug === slug);
}

export function photographsByCategory(cat: PhotoCategory | "all"): Photograph[] {
  if (cat === "all") return photographs;
  return photographs.filter((p) => p.category === cat);
}

export const categoryLabels: Record<PhotoCategory | "all", string> = {
  all: "All Work",
  birds: "Birds",
  mammals: "Mammals",
  behavior: "Behavior",
  conservation: "Conservation",
};
