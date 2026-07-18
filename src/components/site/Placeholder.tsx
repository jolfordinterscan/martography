import type { CSSProperties } from "react";
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
  tone?: "charcoal" | "forest" | "deep";
  style?: CSSProperties;
  /** Focal point for object-fit cover cropping. */
  focus?: "center" | "right" | "left" | "top" | "bottom";
  /** Optional mobile-only override for object-position (applied below 768px). */
  mobileObjectPosition?: string;
  /** Image fit strategy. "cover" crops to fill; "contain" shows the entire image with letterboxing. */
  fit?: "cover" | "contain";
  /**
   * When true, render the image at its natural aspect ratio (no forced frame).
   * The container sizes to the image; a charcoal background fills any surrounding space.
   * Use for fine art print artwork where the complete photograph must always be visible.
   */
  natural?: boolean;
  /**
   * When true, on mobile (<768px) the image renders at its natural aspect ratio
   * inside a charcoal panel (no forced crop). On desktop the normal ratio/cover
   * behavior is preserved. Use for gallery/collection photographs on small screens.
   */
  mobileNatural?: boolean;
  /**
   * Fine Art mobile card rendering: a normal image with no crop frame.
   * Mobile wrapper and image classes are intentionally fixed to preserve
   * every source edge; desktop uses the existing framed presentation.
   */
  mobileArtwork?: boolean;
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
  "story-roadrunner.jpg": "/images/story-dinner-is-served.jpg",
  "story-dinner-is-served.jpg": "/images/story-dinner-is-served.jpg",

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
  mobileObjectPosition,
  fit = "cover",
  natural = false,
  mobileNatural = false,
  mobileArtwork = false,
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
  if (natural) {
    // Fine Art Print artwork: preserve the complete uploaded file edge-to-edge.
    // No fixed height, no aspect ratio, no overflow-hidden, no object-cover,
    // no absolute positioning. The image element itself defines the layout.
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
          objectFit: "contain",
          display: "block",
          ...style,
        }}
      />
    );
  }

  // Use a CSS variable so we can override object-position at the mobile breakpoint via a scoped <style> block.
  const imgStyle: CSSProperties = {
    objectPosition: `var(--mtg-obj-pos, ${objectPosition})`,
  };
  const wrapperStyle: CSSProperties = {
    ...style,
    ["--mtg-obj-pos" as string]: objectPosition,
  };

  if (mobileArtwork) {
    return (
      <>
        <div className="w-full bg-black md:hidden">
          <img
            src={src}
            alt={subject}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto object-contain"
          />
        </div>
        <div
          className={`hidden md:block relative overflow-hidden bg-charcoal-deep ${ratio} ${className}`}
          style={wrapperStyle}
        >
          <img
            src={src}
            alt={subject}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
            style={imgStyle}
          />
        </div>
      </>
    );
  }

  if (mobileNatural) {
    return (
      <>
        {/* Mobile: natural aspect ratio, complete image preserved on charcoal */}
        <div
          className={`md:hidden bg-charcoal-deep flex items-center justify-center ${className}`}
          style={style}
        >
          <img
            src={src}
            alt={subject}
            loading="lazy"
            decoding="async"
            className="block w-full h-auto"
          />
        </div>
        {/* Desktop: unchanged forced-ratio behavior */}
        <div
          className={`hidden md:block relative overflow-hidden bg-charcoal-deep ${ratio} ${className}`}
          style={wrapperStyle}
        >
          <img
            src={src}
            alt={subject}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 w-full h-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
            style={imgStyle}
          />
        </div>
      </>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-charcoal-deep ${ratio} ${className}`}
      style={wrapperStyle}
      data-mobile-pos={mobileObjectPosition || undefined}
    >
      {mobileObjectPosition && (
        <style>{`@media (max-width: 767px){[data-mobile-pos="${mobileObjectPosition}"]{--mtg-obj-pos:${mobileObjectPosition} !important;}}`}</style>
      )}
      <img
        src={src}
        alt={subject}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 w-full h-full ${fit === "contain" ? "object-contain" : "object-cover"}`}
        style={imgStyle}
      />
    </div>
  );
}
