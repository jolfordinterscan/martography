import type { CSSProperties } from "react";

type ImageMode = "editorial" | "natural" | "mobile-natural";

interface PlaceholderProps {
  subject: string;
  location?: string;
  /**
   * Stable key used to look up the image URL for this slot.
   * Only slots mapped to a real Martography asset render a photograph.
   * All other slots render an elegant "Coming Soon" panel — never stock imagery.
   */
  filename?: string;
  ratio?: string; // e.g. "aspect-[4/5]"
  className?: string;
  style?: CSSProperties;
  /** Focal point for object-fit cover cropping. */
  focus?: "center" | "right" | "left" | "top" | "bottom";
  /**
   * `natural`: always preserve every source edge.
   * `editorial`: crop to the requested ratio using the focal point.
   * `mobile-natural`: preserve every source edge below 1024px, then use the
   * requested editorial crop on larger screens.
   */
  mode?: ImageMode;
  /** Browser slot size used to select the most appropriate responsive source. */
  sizes?: string;
  /** Load immediately when the image is part of the initial viewport. */
  priority?: boolean;
}

interface ImageAsset {
  src: string;
  width: number;
  height: number;
  webpSrcSet?: string;
}

/**
 * =====================================================================
 *  Martography image slot
 * ---------------------------------------------------------------------
 *  Renders ONLY authentic photographs uploaded by Paul Marto.
 *  Any slot without a mapped asset renders an elegant placeholder panel
 *  reading "Martography Photograph Coming Soon". Stock photography is
 *  never substituted under any circumstance.
 *
 *  HOW TO ADD A NEW PHOTOGRAPH
 *  ---------------------------
 *  1. Add the optimized image to `public/images/`.
 *  2. Map the matching filename key in `IMAGE_MAP` below to its public path.
 * =====================================================================
 */

// filename -> Martography photograph URL. Only real uploads belong here.
const webpSrcSet = (stem: string, widths: number[]) =>
  widths.map((width) => `/images/${stem}-${width}.webp ${width}w`).join(", ");

const bobcat: ImageAsset = {
  src: "/images/bobcat-hero.jpg",
  width: 3840,
  height: 2561,
  webpSrcSet: webpSrcSet("bobcat-hero", [960, 1600, 2400, 3840]),
};
const bunting: ImageAsset = {
  src: "/images/birds-painted-bunting-salvia.jpg",
  width: 2841,
  height: 1894,
  webpSrcSet: webpSrcSet("birds-painted-bunting-salvia", [960, 1600, 2400, 2841]),
};
const buntingFlight: ImageAsset = {
  src: "/images/birds-bunting-in-flight.jpg",
  width: 3200,
  height: 3200,
  webpSrcSet: webpSrcSet("birds-bunting-in-flight", [960, 1600, 2400, 3200]),
};
const quail: ImageAsset = {
  src: "/images/birds-california-quail.jpg",
  width: 3093,
  height: 3092,
  webpSrcSet: webpSrcSet("birds-california-quail", [960, 1600, 2400, 3093]),
};
const foxes: ImageAsset = {
  src: "/images/mammals-fox.jpg",
  width: 2184,
  height: 1456,
  webpSrcSet: webpSrcSet("mammals-fox", [960, 1600, 2184]),
};
const roadrunners: ImageAsset = {
  src: "/images/behavior-roadrunner.jpg",
  width: 3200,
  height: 2134,
  webpSrcSet: webpSrcSet("behavior-roadrunner", [960, 1600, 2400, 3200]),
};
const hummingbird: ImageAsset = {
  src: "/images/conservation-hummingbird-nest.jpg",
  width: 3200,
  height: 2129,
  webpSrcSet: webpSrcSet("conservation-hummingbird-nest", [960, 1600, 2400, 3200]),
};
const paulPortrait: ImageAsset = {
  src: "/images/about-paul-portrait.png",
  width: 742,
  height: 638,
  webpSrcSet: "/images/about-paul-portrait-742.webp 742w",
};

const IMAGE_MAP: Record<string, ImageAsset> = {
  // Homepage
  "hero.jpg": bobcat,

  // Featured Collections
  "birds-painted-bunting.jpg": bunting,
  "birds-painted-bunting-salvia.jpg": bunting,
  "birds-painted-bunting-flight.jpg": buntingFlight,
  "birds-california-quail.jpg": quail,
  "mammals-fox.jpg": foxes,
  "behavior-roadrunner-feeding-chick.jpg": roadrunners,
  "conservation-hummingbird-nest.jpg": hummingbird,

  // Signature Story
  "story-roadrunner.jpg": roadrunners,
  "story-dinner-is-served.jpg": roadrunners,
  "story-07.jpg": roadrunners,

  // About
  "about-portrait.jpg": paulPortrait,
};

export function Placeholder({
  subject,
  location,
  filename,
  ratio = "aspect-[4/5]",
  className = "",
  style,
  focus = "center",
  mode = "editorial",
  sizes,
  priority = false,
}: PlaceholderProps) {
  const asset = filename ? IMAGE_MAP[filename] : undefined;
  const responsiveSizes =
    sizes ?? (mode === "natural" ? "100vw" : "(min-width: 1024px) 50vw, 100vw");
  const objectPosition =
    focus === "right"
      ? "right center"
      : focus === "left"
        ? "left center"
        : focus === "top"
          ? "center top"
          : focus === "bottom"
            ? "center bottom"
            : "center";

  if (!asset) {
    return (
      <div
        className={`relative overflow-hidden bg-charcoal-deep ${ratio} ${className}`}
        style={style}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-6 md:inset-10 border border-bronze/25" aria-hidden />
          <div className="relative z-10 text-center px-8 max-w-[80%]">
            <div className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-bronze/80">
              Martography
            </div>
            <div className="mt-4 md:mt-5 font-serif italic text-ivory/90 text-lg md:text-2xl leading-tight">
              Photograph Coming Soon
            </div>
            {subject && (
              <div className="mt-4 md:mt-5 text-[10px] md:text-xs tracking-[0.25em] uppercase text-ivory/50">
                {subject}
                {location ? ` — ${location}` : ""}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  if (mode === "natural") {
    return (
      <picture className="contents">
        {asset.webpSrcSet && (
          <source type="image/webp" srcSet={asset.webpSrcSet} sizes={responsiveSizes} />
        )}
        <img
          src={asset.src}
          alt={subject}
          width={asset.width}
          height={asset.height}
          sizes={responsiveSizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className={className}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            ...style,
          }}
        />
      </picture>
    );
  }

  const imgStyle: CSSProperties = {
    objectPosition,
  };

  if (mode === "mobile-natural") {
    return (
      <>
        <div className={`bg-charcoal-deep lg:hidden ${className}`} style={style}>
          <picture className="contents">
            {asset.webpSrcSet && (
              <source type="image/webp" srcSet={asset.webpSrcSet} sizes={responsiveSizes} />
            )}
            <img
              src={asset.src}
              alt={subject}
              width={asset.width}
              height={asset.height}
              sizes={responsiveSizes}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              decoding="async"
              className="block h-auto w-full"
            />
          </picture>
        </div>
        <div
          className={`relative hidden overflow-hidden bg-charcoal-deep lg:block ${ratio} ${className}`}
          style={style}
        >
          <picture className="contents">
            {asset.webpSrcSet && (
              <source type="image/webp" srcSet={asset.webpSrcSet} sizes={responsiveSizes} />
            )}
            <img
              src={asset.src}
              alt={subject}
              width={asset.width}
              height={asset.height}
              sizes={responsiveSizes}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : "auto"}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              style={imgStyle}
            />
          </picture>
        </div>
      </>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-charcoal-deep ${ratio} ${className}`}
      style={style}
    >
      <picture className="contents">
        {asset.webpSrcSet && (
          <source type="image/webp" srcSet={asset.webpSrcSet} sizes={responsiveSizes} />
        )}
        <img
          src={asset.src}
          alt={subject}
          width={asset.width}
          height={asset.height}
          sizes={responsiveSizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={imgStyle}
        />
      </picture>
    </div>
  );
}
