// =====================================================================
//  Martography Master Catalog
// ---------------------------------------------------------------------
//  Front-end data model for every Martography photograph.
//  Uses mock data now; every field maps 1:1 to a future Supabase column
//  so the store can be swapped for a real DB with minimal changes.
// =====================================================================

export type Category = "Birds" | "Mammals" | "Wildlife Behavior" | "Conservation" | "Fine Art";

export type Collection =
  | "Signature Collection"
  | "Birds"
  | "Mammals"
  | "Wildlife Behavior"
  | "Conservation"
  | "Fine Art Favorites";

export const COLLECTIONS: Collection[] = [
  "Signature Collection",
  "Birds",
  "Mammals",
  "Wildlife Behavior",
  "Conservation",
  "Fine Art Favorites",
];

export const CATEGORIES: Category[] = [
  "Birds",
  "Mammals",
  "Wildlife Behavior",
  "Conservation",
  "Fine Art",
];

export type Orientation = "Horizontal" | "Vertical" | "Square";
export type EditionType = "Open" | "Limited";
export type PrintSize = "8x10" | "11x14" | "16x24" | "20x30" | "24x36" | "30x45" | "40x60";

export const PRINT_SIZES: PrintSize[] = [
  "8x10",
  "11x14",
  "16x24",
  "20x30",
  "24x36",
  "30x45",
  "40x60",
];

export interface PrintInfo {
  availableForPrint: boolean;
  editionType: EditionType;
  editionSize?: number; // when Limited
  signed: boolean;
  numbered: boolean;
  certificateOfAuthenticity: boolean;
  framedAvailable: boolean;
  canvasAvailable: boolean;
  metalAvailable: boolean;
  acrylicAvailable: boolean;
  /** price in USD per size, undefined if not offered at that size */
  sizes: Partial<Record<PrintSize, number>>;
}

export interface WebsitePlacement {
  homepage: boolean;
  gallery: boolean;
  birdsCollection: boolean;
  mammalsCollection: boolean;
  wildlifeBehaviorCollection: boolean;
  conservationCollection: boolean;
  fineArtCollection: boolean;
  stories: boolean;
  aboutPage: boolean;
}

export interface MarketingStatus {
  instagramPosted: boolean;
  facebookPosted: boolean;
  newsletter: boolean;
  blogStory: boolean;
  exhibition: boolean;
  awardWinner: boolean;
  featuredPhotograph: boolean;
}

export interface ExifInfo {
  cameraBody?: string;
  lens?: string;
  focalLength?: string; // "600mm"
  aperture?: string; // "f/5.6"
  shutterSpeed?: string; // "1/1600s"
  iso?: number;
}

export interface CatalogPhotograph {
  artworkId: string; // "MT-001"
  title: string;
  species: string;
  category: Category;
  collection: Collection;

  storyTitle?: string;
  storyText?: string;
  description?: string;

  location?: string;
  datePhotographed?: string; // ISO yyyy-mm-dd

  exif: ExifInfo;
  orientation: Orientation;
  imageFilename: string; // maps to Placeholder IMAGE_MAP key

  heroImage: boolean;
  featuredCollection: boolean;
  homepageFeature: boolean;
  galleryFeature: boolean;

  print: PrintInfo;
  website: WebsitePlacement;
  marketing: MarketingStatus;

  notes?: string;
}

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------

const noPrint: PrintInfo = {
  availableForPrint: false,
  editionType: "Open",
  signed: false,
  numbered: false,
  certificateOfAuthenticity: false,
  framedAvailable: false,
  canvasAvailable: false,
  metalAvailable: false,
  acrylicAvailable: false,
  sizes: {},
};

const standardPrint = (overrides: Partial<PrintInfo> = {}): PrintInfo => ({
  availableForPrint: true,
  editionType: "Limited",
  editionSize: 50,
  signed: true,
  numbered: true,
  certificateOfAuthenticity: true,
  framedAvailable: true,
  canvasAvailable: true,
  metalAvailable: true,
  acrylicAvailable: true,
  sizes: {
    "8x10": 125,
    "11x14": 195,
    "16x24": 385,
    "20x30": 585,
    "24x36": 785,
    "30x45": 1150,
    "40x60": 1850,
  },
  ...overrides,
});

const noPlacement: WebsitePlacement = {
  homepage: false,
  gallery: false,
  birdsCollection: false,
  mammalsCollection: false,
  wildlifeBehaviorCollection: false,
  conservationCollection: false,
  fineArtCollection: false,
  stories: false,
  aboutPage: false,
};

const noMarketing: MarketingStatus = {
  instagramPosted: false,
  facebookPosted: false,
  newsletter: false,
  blogStory: false,
  exhibition: false,
  awardWinner: false,
  featuredPhotograph: false,
};

// ---------------------------------------------------------------------
// Seed catalog
// ---------------------------------------------------------------------

export const catalog: CatalogPhotograph[] = [
  {
    artworkId: "MT-001",
    title: "Eye Contact",
    species: "Bobcat",
    category: "Mammals",
    collection: "Signature Collection",
    storyTitle: "Eye Contact",
    storyText:
      "A bobcat emerges from the grass at the edge of last light. For a single held breath, she looks straight through the lens — recognizing something, not fearing it.",
    description: "Close portrait of an adult bobcat with orange eyes, framed by golden grasses.",
    location: "Orange County, California",
    datePhotographed: "2024-03-14",
    exif: {
      cameraBody: "Canon EOS R5",
      lens: "Canon RF 100-500mm f/4.5-7.1 L IS",
      focalLength: "500mm",
      aperture: "f/7.1",
      shutterSpeed: "1/800s",
      iso: 1600,
    },
    orientation: "Horizontal",
    imageFilename: "hero.jpg",
    heroImage: true,
    featuredCollection: true,
    homepageFeature: true,
    galleryFeature: true,
    print: standardPrint({ editionSize: 25 }),
    website: {
      ...noPlacement,
      homepage: true,
      gallery: true,
      mammalsCollection: true,
      fineArtCollection: true,
    },
    marketing: {
      ...noMarketing,
      instagramPosted: true,
      newsletter: true,
      featuredPhotograph: true,
      awardWinner: true,
    },
    notes:
      "Behavior: The cat had been hunting gophers in the same meadow for three consecutive evenings before this frame. She surfaced at 6:47pm, held the pose for roughly four seconds, then moved on.",
  },
  {
    artworkId: "MT-002",
    title: "Dinner Is Served",
    species: "Greater Roadrunner",
    category: "Wildlife Behavior",
    collection: "Wildlife Behavior",
    storyTitle: "Dinner Is Served",
    storyText:
      "A parent roadrunner returns to a hidden cholla nest with a lizard the length of its own body. The chick had been calling for it for twenty minutes.",
    description:
      "A greater roadrunner in profile carrying a whiptail lizard, backlit at the edge of morning.",
    location: "Southern California",
    datePhotographed: "2024-05-02",
    exif: {
      cameraBody: "Canon EOS R5",
      lens: "Canon RF 600mm f/4 L IS",
      focalLength: "600mm",
      aperture: "f/5.6",
      shutterSpeed: "1/1600s",
      iso: 800,
    },
    orientation: "Horizontal",
    imageFilename: "story-dinner-is-served.jpg",
    heroImage: false,
    featuredCollection: true,
    homepageFeature: true,
    galleryFeature: true,
    print: standardPrint(),
    website: {
      ...noPlacement,
      homepage: true,
      gallery: true,
      wildlifeBehaviorCollection: true,
      stories: true,
    },
    marketing: {
      ...noMarketing,
      instagramPosted: true,
      facebookPosted: true,
      blogStory: true,
      featuredPhotograph: true,
    },
    notes:
      "Behind the scenes: Nest was marked two weeks prior. Photographed from 80 yards with a blind. Parent returned every 90 minutes.",
  },
  {
    artworkId: "MT-003",
    title: "Painted Jewel",
    species: "Painted Bunting",
    category: "Birds",
    collection: "Birds",
    storyTitle: "Impossible Blue",
    storyText:
      "Wings open, head down, eye locked. A single frame from a bird that rarely holds still long enough to be seen at all.",
    description:
      "Male bunting in mid-flight, wings fully extended against a soft green background.",
    location: "Southern California",
    datePhotographed: "2024-04-18",
    exif: {
      cameraBody: "Canon EOS R5",
      lens: "Canon RF 100-500mm f/4.5-7.1 L IS",
      focalLength: "400mm",
      aperture: "f/6.3",
      shutterSpeed: "1/3200s",
      iso: 2000,
    },
    orientation: "Square",
    imageFilename: "birds-painted-bunting.jpg",
    heroImage: false,
    featuredCollection: true,
    homepageFeature: true,
    galleryFeature: true,
    print: standardPrint(),
    website: {
      ...noPlacement,
      homepage: true,
      gallery: true,
      birdsCollection: true,
      fineArtCollection: true,
    },
    marketing: {
      ...noMarketing,
      instagramPosted: true,
      featuredPhotograph: true,
    },
    notes:
      "Story idea: pair with the California Quail portrait for an editorial on ornament and color in California birds.",
  },
  {
    artworkId: "MT-004",
    title: "The Conversation",
    species: "Red Fox",
    category: "Mammals",
    collection: "Mammals",
    storyTitle: "Ember",
    storyText:
      "Two young foxes cross paths in the last minute of sun. They held the light for four breaths, then were gone.",
    description: "A pair of red foxes facing each other, warm side-light, soft golden background.",
    location: "Southern California",
    datePhotographed: "2024-02-09",
    exif: {
      cameraBody: "Canon EOS R5",
      lens: "Canon RF 600mm f/4 L IS",
      focalLength: "600mm",
      aperture: "f/4.0",
      shutterSpeed: "1/1250s",
      iso: 1250,
    },
    orientation: "Vertical",
    imageFilename: "mammals-fox.jpg",
    heroImage: false,
    featuredCollection: true,
    homepageFeature: true,
    galleryFeature: true,
    print: standardPrint({ editionSize: 40 }),
    website: {
      ...noPlacement,
      homepage: true,
      gallery: true,
      mammalsCollection: true,
    },
    marketing: {
      ...noMarketing,
      instagramPosted: true,
      newsletter: true,
    },
    notes:
      "Wildlife behavior: Likely siblings from a den observed three miles east. Interaction lasted under ten seconds.",
  },
  {
    artworkId: "MT-005",
    title: "A Mother's Promise",
    species: "Anna's Hummingbird",
    category: "Conservation",
    collection: "Conservation",
    storyTitle: "The Nest",
    storyText:
      "A mother returns to a nest the size of a walnut. Two chicks, no larger than jellybeans, wait for her every ten minutes.",
    description: "An Anna's hummingbird at a lichen-camouflaged nest with two chicks.",
    location: "Southern California",
    datePhotographed: "2024-03-27",
    exif: {
      cameraBody: "Canon EOS R5",
      lens: "Canon RF 100-500mm f/4.5-7.1 L IS",
      focalLength: "500mm",
      aperture: "f/7.1",
      shutterSpeed: "1/1000s",
      iso: 1600,
    },
    orientation: "Vertical",
    imageFilename: "conservation-hummingbird-nest.jpg",
    heroImage: false,
    featuredCollection: true,
    homepageFeature: true,
    galleryFeature: true,
    print: standardPrint({ editionSize: 30 }),
    website: {
      ...noPlacement,
      homepage: true,
      gallery: true,
      conservationCollection: true,
      stories: true,
    },
    marketing: {
      ...noMarketing,
      instagramPosted: true,
      newsletter: true,
      blogStory: true,
      featuredPhotograph: true,
    },
    notes: "Customer note: two collectors have inquired about a 24x36 metal print of this image.",
  },
];

// ---------------------------------------------------------------------
// Repository — swap this module later for a Supabase-backed implementation.
// ---------------------------------------------------------------------

export function listCatalog(): CatalogPhotograph[] {
  return catalog;
}

export function getCatalogEntry(id: string): CatalogPhotograph | undefined {
  return catalog.find((p) => p.artworkId === id);
}
