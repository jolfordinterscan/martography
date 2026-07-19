import type { CSSProperties } from "react";
import { imageAliases, responsiveImages } from "@/content";

type ImageMode = "editorial" | "natural" | "mobile-natural";

interface PlaceholderProps {
  subject: string;
  location?: string;
  /** Legacy slot key retained for the operational catalog and placeholders. */
  filename?: string;
  /** Stable content key used to look up a real Martography image asset. */
  responsiveImageKey?: string;
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
 *  2. Add its responsive image metadata to `src/content/photos.ts`.
 * =====================================================================
 */

export function Placeholder({
  subject,
  location,
  filename,
  responsiveImageKey,
  ratio = "aspect-[4/5]",
  className = "",
  style,
  focus = "center",
  mode = "editorial",
  sizes,
  priority = false,
}: PlaceholderProps) {
  const assetKey = responsiveImageKey ?? (filename ? imageAliases[filename] : undefined);
  const asset = assetKey ? responsiveImages[assetKey] : undefined;
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
