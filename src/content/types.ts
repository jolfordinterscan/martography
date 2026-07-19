export type ContentStatus = "published" | "draft" | "awaiting-title" | "awaiting-story";
export type PhotoOrientation = "landscape" | "portrait" | "square";
export type PhotoCategory = "birds" | "mammals" | "behavior" | "conservation";
export type ImageFocus = "center" | "right" | "left" | "top" | "bottom";

export interface ResponsiveImage {
  key: string;
  src: string;
  width: number;
  height: number;
  webpSrcSet?: string;
}

export interface Photo {
  id: string;
  slug: string;
  title: string;
  workingTitle?: string;
  status: ContentStatus;
  image?: string;
  responsiveImageKey?: string;
  missingImageFilename?: string;
  alt: string;
  speciesId?: string;
  orientation: PhotoOrientation;
  location?: string;
  dateTaken?: string;
  year?: number;
  shortCaption?: string;
  storyExcerpt?: string;
  storyBody?: string[];
  behaviors: string[];
  habitats: string[];
  collectionIds: string[];
  storyIds: string[];
  printId?: string;
  featured: boolean;
  heroCandidate: boolean;
  educationSuitable: boolean;
  conservationTopics: string[];
  photographerCredit: string;
  category: PhotoCategory;
  ratio?: string;
  span?: boolean;
  focus?: ImageFocus;
  galleryVisible?: boolean;
}

export interface Species {
  id: string;
  slug: string;
  commonName: string;
  scientificName?: string;
  category: PhotoCategory;
  summary?: string;
  conservationStatus?: string;
  habitat?: string;
  photoIds: string[];
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  photoIds: string[];
  featured: boolean;
  number?: string;
  coverPhotoId?: string;
  coverLocation?: string;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  dek: string;
  body: string[];
  heroPhotoId?: string;
  photoIds: string[];
  speciesIds: string[];
  status: ContentStatus;
  publishedAt?: string;
  number: string;
  place: string;
  season: string;
  readingMinutes: number;
  coverAlt: string;
  coverImageKey?: string;
  coverRatio?: string;
  homepageExcerpt?: string;
  homepageIntro?: string;
  homepageCaption?: string;
  homepageMeta?: string;
  homepageBody?: string;
}

export interface PrintSize {
  label: string;
  dimensions: string;
}

export interface Print {
  id: string;
  slug: string;
  photoId: string;
  title: string;
  status: "preview" | "available" | "unavailable";
  edition?: string;
  sizes: PrintSize[];
  material?: string;
  pricingStatus: "pending" | "priced";
  description: string;
  featured?: boolean;
}
