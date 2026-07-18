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
const IMAGE_MAP: Record<string, string> = {
  // Homepage
  "hero.jpg": "/images/bobcat-hero.png",

  // Featured Collections
  "birds-painted-bunting.jpg": "/images/birds-painted-bunting-salvia.jpg",
  "birds-painted-bunting-salvia.jpg": "/images/birds-painted-bunting-salvia.jpg",
  "birds-painted-bunting-flight.jpg": "/images/birds-bunting-in-flight.jpg",
  "birds-california-quail.jpg": "/images/birds-california-quail.jpg",
  "mammals-fox.jpg": "/images/mammals-fox.jpg",
  "behavior-roadrunner-feeding-chick.jpg": "/images/behavior-roadrunner.jpg",
  "conservation-hummingbird-nest.jpg": "/images/conservation-hummingbird-nest.jpg",

  // Signature Story
  "story-roadrunner.jpg": "/images/behavior-roadrunner.jpg",
  "story-dinner-is-served.jpg": "/images/behavior-roadrunner.jpg",
  "story-07.jpg": "/images/behavior-roadrunner.jpg",

  // About
  "about-portrait.jpg": "/images/about-paul-portrait.png",
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
}: PlaceholderProps) {
  const src = filename ? IMAGE_MAP[filename] : undefined;
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

  if (!src) {
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
      <img
        src={src}
        alt={subject}
        loading="lazy"
        decoding="async"
        className={className}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          ...style,
        }}
      />
    );
  }

  const imgStyle: CSSProperties = {
    objectPosition,
  };

  if (mode === "mobile-natural") {
    return (
      <>
        <div className={`bg-charcoal-deep lg:hidden ${className}`} style={style}>
          <img
            src={src}
            alt={subject}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full"
          />
        </div>
        <div
          className={`relative hidden overflow-hidden bg-charcoal-deep lg:block ${ratio} ${className}`}
          style={style}
        >
          <img
            src={src}
            alt={subject}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            style={imgStyle}
          />
        </div>
      </>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-charcoal-deep ${ratio} ${className}`}
      style={style}
    >
      <img
        src={src}
        alt={subject}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={imgStyle}
      />
    </div>
  );
}
