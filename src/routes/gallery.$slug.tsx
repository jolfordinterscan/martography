import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Placeholder } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";
import {
  categoryLabels,
  getAdjacentGalleryPhotos,
  getCollectionsForPhoto,
  getPhotoDisplayTitle,
  getPhotoBySlug,
  getPrintDisplayTitle,
  getPrintsForPhoto,
  getRelatedPhotos,
  getSpeciesDisplayName,
  getSpeciesForPhoto,
  type Photo,
} from "@/content";

const EDITORIAL_PLACEHOLDER = [
  "Every remarkable wildlife photograph begins with a moment worth waiting for.",
  "Paul's story behind this photograph will be published before launch.",
];

const BEHIND_PHOTOGRAPH_PLACEHOLDER = [
  "Behind every Martography photograph is patience, observation, and respect for the natural world.",
  "Paul will share the story behind this encounter before launch.",
];

const isConfirmed = (value?: string) =>
  Boolean(value?.trim() && !value.toLowerCase().includes("to be confirmed"));

export const Route = createFileRoute("/gallery/$slug")({
  loader: ({ params }) => {
    const photo = getPhotoBySlug(params.slug);
    if (!photo) throw notFound();
    return { photo };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Photograph — Martography" }, { name: "robots", content: "noindex" }],
      };
    }
    const { photo } = loaderData;
    const displayTitle = getPhotoDisplayTitle(photo);
    const description = [
      getSpeciesDisplayName(photo.id),
      isConfirmed(photo.location) ? photo.location : undefined,
      photo.shortCaption,
    ]
      .filter(Boolean)
      .join(" · ");
    return {
      meta: [
        { title: `${displayTitle} — Martography` },
        { name: "description", content: description || photo.alt },
        { property: "og:title", content: `${displayTitle} — Martography` },
        { property: "og:description", content: photo.shortCaption ?? photo.alt },
      ],
    };
  },
  component: PhotoDetail,
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center px-6">
      <p className="text-ivory-muted">{error.message}</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <div className="eyebrow">Not Found</div>
        <h1 className="mt-4 font-serif text-5xl text-ivory">Photograph unavailable</h1>
        <Link to="/gallery" className="btn-ghost mt-8 inline-block">
          Back to Gallery
        </Link>
      </div>
    </div>
  ),
});

function PhotoDetail() {
  const { photo } = Route.useLoaderData() as { photo: Photo };
  const relatedPrint = getPrintsForPhoto(photo.id)[0];
  const others = getRelatedPhotos(photo.id);
  const species = getSpeciesForPhoto(photo.id);
  const photoCollections = getCollectionsForPhoto(photo.id);
  const { previous, next } = getAdjacentGalleryPhotos(photo.id);
  const storyBody = photo.storyBody?.filter((paragraph) => paragraph.trim()) ?? [];
  const heroMetadata = [
    categoryLabels[photo.category],
    isConfirmed(photo.location) ? photo.location : undefined,
    photo.dateTaken ?? (photo.year ? String(photo.year) : undefined),
  ].filter(Boolean);

  return (
    <>
      <article>
        <header className="pt-28 md:pt-36">
          <div className="container-editorial pb-8 md:pb-10">
            <Reveal>
              <Link
                to="/gallery"
                className="eyebrow inline-flex text-ivory-muted transition-colors hover:text-bronze focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bronze"
              >
                ← Back to Gallery
              </Link>
            </Reveal>
          </div>

          <Reveal>
            <figure>
              <div className="flex w-full justify-center bg-black/10">
                <Placeholder
                  subject={photo.alt}
                  location={isConfirmed(photo.location) ? photo.location : undefined}
                  responsiveImageKey={photo.responsiveImageKey}
                  mode="natural"
                  sizes="100vw"
                  priority
                  className="max-w-full"
                  style={{
                    width: "auto",
                    maxHeight: "calc(100svh - 7rem)",
                  }}
                />
              </div>

              <figcaption className="container-editorial py-12 md:py-16 lg:py-20">
                <div className="max-w-5xl">
                  <div className="eyebrow text-bronze">Photograph · Paul Marto</div>
                  <h1
                    className="mt-5 font-serif leading-[0.96] tracking-[-0.025em] text-ivory"
                    style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
                  >
                    {getPhotoDisplayTitle(photo)}
                  </h1>
                  {species && (
                    <p className="mt-6 text-base font-light tracking-wide text-ivory-muted md:text-lg">
                      <span className="text-ivory">{species.commonName}</span>
                      {species.scientificName && (
                        <span className="ml-3 italic text-ivory-muted">
                          {species.scientificName}
                        </span>
                      )}
                    </p>
                  )}
                  {heroMetadata.length > 0 && (
                    <ul
                      className="mt-8 flex flex-wrap gap-x-7 gap-y-3"
                      aria-label="Photograph metadata"
                    >
                      {heroMetadata.map((item) => (
                        <li key={item} className="eyebrow text-ivory-muted/70">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </header>

        <section
          className="border-t border-border py-24 md:py-32 lg:py-40"
          aria-labelledby="editorial-introduction"
        >
          <div className="container-editorial">
            <div className="mx-auto max-w-4xl">
              <Reveal>
                <div className="eyebrow">
                  <span className="rule-bronze mr-3" />
                  Editorial Introduction
                </div>
                <h2 id="editorial-introduction" className="sr-only">
                  Introduction to {getPhotoDisplayTitle(photo)}
                </h2>
              </Reveal>
              <div className="mt-10 space-y-8 md:mt-14">
                {(storyBody.length > 0 ? storyBody : EDITORIAL_PLACEHOLDER).map(
                  (paragraph, index) => (
                    <Reveal key={index} delay={index * 80}>
                      <p
                        className={`font-serif font-light leading-[1.45] ${
                          storyBody.length > 0 || index === 0
                            ? "text-ivory"
                            : "italic text-ivory-muted"
                        }`}
                        style={{ fontSize: "clamp(1.75rem, 3.3vw, 3.25rem)" }}
                      >
                        {paragraph}
                      </p>
                    </Reveal>
                  ),
                )}
              </div>
              {storyBody.length > 0 && (
                <Reveal>
                  <p className="mt-12 eyebrow text-ivory-muted/70">— Paul Marto</p>
                </Reveal>
              )}
            </div>
          </div>
        </section>

        {(species || photoCollections.length > 0) && (
          <section
            className="border-t border-border py-24 md:py-32"
            aria-labelledby="species-heading"
          >
            <div className="container-editorial">
              <Reveal>
                <div className="grid gap-14 lg:grid-cols-[0.8fr_1.6fr] lg:gap-24">
                  <div>
                    <div className="eyebrow">Field Record</div>
                    <h2
                      id="species-heading"
                      className="mt-5 font-serif text-4xl leading-tight text-ivory md:text-5xl"
                    >
                      The Species
                    </h2>
                  </div>
                  <dl className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
                    {species?.commonName && (
                      <div className="border-t border-border pt-4">
                        <dt className="eyebrow text-ivory-muted/70">Common Name</dt>
                        <dd className="mt-3 text-lg text-ivory">{species.commonName}</dd>
                      </div>
                    )}
                    {species?.scientificName && (
                      <div className="border-t border-border pt-4">
                        <dt className="eyebrow text-ivory-muted/70">Scientific Name</dt>
                        <dd className="mt-3 text-lg italic text-ivory">{species.scientificName}</dd>
                      </div>
                    )}
                    {species?.habitat && (
                      <div className="border-t border-border pt-4">
                        <dt className="eyebrow text-ivory-muted/70">Habitat</dt>
                        <dd className="mt-3 text-lg leading-relaxed text-ivory">
                          {species.habitat}
                        </dd>
                      </div>
                    )}
                    {species?.conservationStatus && (
                      <div className="border-t border-border pt-4">
                        <dt className="eyebrow text-ivory-muted/70">Conservation Status</dt>
                        <dd className="mt-3 text-lg text-ivory">{species.conservationStatus}</dd>
                      </div>
                    )}
                    {photoCollections.length > 0 && (
                      <div className="border-t border-border pt-4">
                        <dt className="eyebrow text-ivory-muted/70">Collections</dt>
                        <dd className="mt-3 text-lg text-ivory">
                          {photoCollections.map((collection) => collection.title).join(", ")}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        <section
          className="border-t border-border py-24 md:py-32 lg:py-40"
          aria-labelledby="behind-photograph-heading"
        >
          <div className="container-editorial">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-24">
              <Reveal>
                <div className="eyebrow">Field Notes</div>
                <h2
                  id="behind-photograph-heading"
                  className="mt-5 font-serif text-4xl leading-tight text-ivory md:text-5xl"
                >
                  Behind the Photograph
                </h2>
              </Reveal>
              <div className="space-y-8 lg:pt-10">
                {BEHIND_PHOTOGRAPH_PLACEHOLDER.map((paragraph, index) => (
                  <Reveal key={paragraph} delay={index * 80}>
                    <p
                      className={
                        index === 0
                          ? "font-serif text-2xl font-light leading-relaxed text-ivory md:text-3xl"
                          : "max-w-2xl text-lg font-light leading-relaxed text-ivory-muted"
                      }
                    >
                      {paragraph}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {others.length > 0 && (
          <section
            className="border-t border-border py-24 md:py-32 lg:py-40"
            aria-labelledby="related-heading"
          >
            <div className="container-editorial">
              <Reveal>
                <div className="mb-12 max-w-3xl md:mb-16">
                  <div className="eyebrow">Related Photographs</div>
                  <h2
                    id="related-heading"
                    className="mt-5 font-serif text-4xl leading-tight text-ivory md:text-6xl"
                  >
                    Continue through the archive.
                  </h2>
                </div>
              </Reveal>
              <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-10 xl:gap-y-20">
                {others.map((other, index) => {
                  const relatedSpecies = getSpeciesForPhoto(other.id);
                  return (
                    <Reveal key={other.slug} delay={(index % 3) * 100}>
                      <Link
                        to="/gallery/$slug"
                        params={{ slug: other.slug }}
                        className="group block focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bronze"
                      >
                        <Placeholder
                          subject={other.alt}
                          responsiveImageKey={other.responsiveImageKey}
                          mode="natural"
                          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                        />
                        <div className="mt-5">
                          <h3 className="font-serif text-2xl leading-tight text-ivory transition-colors group-hover:text-bronze md:text-3xl">
                            {getPhotoDisplayTitle(other)}
                          </h3>
                          {relatedSpecies && (
                            <p className="mt-2 text-sm text-ivory-muted">
                              {relatedSpecies.commonName}
                              {relatedSpecies.scientificName && (
                                <span className="ml-2 italic">{relatedSpecies.scientificName}</span>
                              )}
                            </p>
                          )}
                        </div>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section className="border-y border-border py-20 md:py-28" aria-labelledby="print-heading">
          <div className="container-editorial">
            <Reveal>
              <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto] lg:gap-20">
                <div className="max-w-3xl">
                  <div className="eyebrow">Fine Art Print</div>
                  <h2
                    id="print-heading"
                    className="mt-5 font-serif text-4xl leading-tight text-ivory md:text-6xl"
                  >
                    {relatedPrint ? getPrintDisplayTitle(relatedPrint) : "For the collection."}
                  </h2>
                  <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-ivory-muted">
                    {relatedPrint
                      ? "Fine art print presentation details are available for this photograph."
                      : "Fine Art Print information will be available before launch."}
                  </p>
                </div>
                {relatedPrint && (
                  <Link
                    to="/prints/$slug"
                    params={{ slug: relatedPrint.slug }}
                    className="btn-ghost w-fit focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bronze"
                  >
                    View Print Details
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        </section>

        <nav className="py-20 md:py-28" aria-label="Continue exploring photographs">
          <div className="container-editorial">
            <div className="grid gap-12 md:grid-cols-[1fr_auto_1fr] md:items-start md:gap-12">
              {previous && (
                <Link
                  to="/gallery/$slug"
                  params={{ slug: previous.slug }}
                  className="group border-t border-border pt-6 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bronze"
                  rel="prev"
                >
                  <span className="eyebrow text-ivory-muted/70">← Previous Photograph</span>
                  <span className="mt-4 block font-serif text-3xl leading-tight text-ivory transition-colors group-hover:text-bronze md:text-4xl">
                    {getPhotoDisplayTitle(previous)}
                  </span>
                </Link>
              )}
              <Link
                to="/gallery"
                className="eyebrow w-fit border-t border-border pt-6 text-ivory-muted transition-colors hover:text-bronze focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bronze md:justify-self-center"
              >
                Gallery
              </Link>
              {next && (
                <Link
                  to="/gallery/$slug"
                  params={{ slug: next.slug }}
                  className="group border-t border-border pt-6 md:text-right focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bronze"
                  rel="next"
                >
                  <span className="eyebrow text-ivory-muted/70">Next Photograph →</span>
                  <span className="mt-4 block font-serif text-3xl leading-tight text-ivory transition-colors group-hover:text-bronze md:text-4xl">
                    {getPhotoDisplayTitle(next)}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </article>
    </>
  );
}
