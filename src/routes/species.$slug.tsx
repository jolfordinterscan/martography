import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Placeholder } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";
import {
  categoryLabels,
  getCollectionsForSpecies,
  getPhotoDisplayTitle,
  getPhotosForSpecies,
  getSpeciesBySlug,
  getStoriesForSpecies,
  isPhotoCategory,
} from "@/content";

export const Route = createFileRoute("/species/$slug")({
  loader: ({ params }) => {
    const species = getSpeciesBySlug(params.slug);
    const photographs = species ? getPhotosForSpecies(species.id) : [];
    if (!species || photographs.length === 0) throw notFound();
    return { species, photographs };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.species.commonName} — Species — Martography` },
          {
            name: "description",
            content: `Explore ${loaderData.photographs.length} ${loaderData.species.commonName} ${loaderData.photographs.length === 1 ? "photograph" : "photographs"} in the Martography wildlife archive.`,
          },
        ]
      : [{ title: "Species Not Found — Martography" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="container-editorial pb-32 pt-40 text-center">
      <div className="eyebrow text-bronze">Not Found</div>
      <h1 className="mt-6 font-serif text-5xl text-ivory">This species is not yet on view.</h1>
      <Link to="/species" className="btn-ghost mt-10 inline-block">
        Browse Species
      </Link>
    </div>
  ),
  component: SpeciesDetail,
});

function SpeciesDetail() {
  const { species, photographs } = Route.useLoaderData();
  const hero = photographs[0];
  const archivePhotographs = photographs.slice(1);
  const relatedCollections = getCollectionsForSpecies(species.id);
  const relatedStories = getStoriesForSpecies(species.id);

  return (
    <main className="pb-32 pt-36 md:pb-48 md:pt-44">
      <header className="container-editorial">
        <Reveal>
          <Link
            to="/species"
            className="eyebrow text-ivory-muted transition-colors hover:text-bronze focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bronze"
          >
            ← Species Index
          </Link>
          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Link
                to="/gallery"
                search={{ category: species.category }}
                className="eyebrow text-bronze transition-colors hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bronze"
              >
                {categoryLabels[species.category]}
              </Link>
              <h1 className="mt-6 font-serif text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] tracking-[-0.03em] text-ivory">
                {species.commonName}
              </h1>
              {species.scientificName && (
                <p className="mt-6 font-serif text-2xl italic text-ivory-muted md:text-3xl">
                  {species.scientificName}
                </p>
              )}
            </div>
            <div className="lg:col-span-3 lg:col-start-10">
              <p className="eyebrow text-ivory-muted/70">
                {photographs.length.toString().padStart(2, "0")} documented{" "}
                {photographs.length === 1 ? "work" : "works"}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal y={36}>
          <figure className="mt-16 md:mt-24">
            <Link
              to="/gallery/$slug"
              params={{ slug: hero.slug }}
              className="group block focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bronze"
            >
              <Placeholder
                subject={hero.alt}
                responsiveImageKey={hero.responsiveImageKey}
                mode="natural"
                sizes="(min-width: 1440px) 1280px, 100vw"
                priority
              />
              <figcaption className="mt-5 flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="eyebrow text-bronze">Featured Photograph</div>
                  <h2 className="mt-3 font-serif text-2xl text-ivory transition-colors group-hover:text-bronze md:text-3xl">
                    {getPhotoDisplayTitle(hero)}
                  </h2>
                </div>
                <span className="eyebrow text-ivory-muted/60">View photograph →</span>
              </figcaption>
            </Link>
          </figure>
        </Reveal>

        {(species.summary || species.habitat || species.conservationStatus) && (
          <Reveal>
            <dl className="mt-20 grid gap-10 border-t border-border pt-10 md:grid-cols-3">
              {species.summary && (
                <div>
                  <dt className="eyebrow text-ivory-muted/60">Field Note</dt>
                  <dd className="mt-4 font-light leading-relaxed text-ivory-muted">
                    {species.summary}
                  </dd>
                </div>
              )}
              {species.habitat && (
                <div>
                  <dt className="eyebrow text-ivory-muted/60">Habitat</dt>
                  <dd className="mt-4 font-light leading-relaxed text-ivory-muted">
                    {species.habitat}
                  </dd>
                </div>
              )}
              {species.conservationStatus && (
                <div>
                  <dt className="eyebrow text-ivory-muted/60">Conservation Status</dt>
                  <dd className="mt-4 font-light leading-relaxed text-ivory-muted">
                    {species.conservationStatus}
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
        )}
      </header>

      {archivePhotographs.length > 0 && (
        <section
          className="container-editorial mt-24 border-t border-border pt-20 md:mt-32 md:pt-28"
          aria-labelledby="species-photographs"
        >
          <Reveal>
            <div className="mb-14 max-w-3xl">
              <div className="eyebrow">Photographs</div>
              <h2
                id="species-photographs"
                className="mt-5 font-serif text-4xl text-ivory md:text-6xl"
              >
                More from the archive.
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-10 xl:gap-y-20">
            {archivePhotographs.map((photo, index) => (
              <Reveal key={photo.id} delay={(index % 3) * 100}>
                <Link
                  to="/gallery/$slug"
                  params={{ slug: photo.slug }}
                  className="group block focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bronze"
                >
                  <Placeholder
                    subject={photo.alt}
                    responsiveImageKey={photo.responsiveImageKey}
                    mode="natural"
                    sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <h3 className="mt-5 font-serif text-2xl leading-tight text-ivory transition-colors group-hover:text-bronze md:text-3xl">
                    {getPhotoDisplayTitle(photo)}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {(relatedCollections.length > 0 || relatedStories.length > 0) && (
        <section className="container-editorial mt-24 border-t border-border pt-20 md:mt-32 md:pt-28">
          <div className="grid gap-20 lg:grid-cols-12 lg:gap-16">
            {relatedCollections.length > 0 && (
              <Reveal className="lg:col-span-5">
                <div className="eyebrow text-bronze">Related Collections</div>
                <h2 className="mt-5 font-serif text-4xl text-ivory md:text-5xl">
                  Continue through the archive.
                </h2>
                <div className="mt-10 divide-y divide-border border-t border-border">
                  {relatedCollections.map((collection) => (
                    <Link
                      key={collection.id}
                      to="/gallery"
                      search={isPhotoCategory(collection.slug) ? { category: collection.slug } : {}}
                      className="group flex items-center justify-between gap-6 py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
                    >
                      <span className="font-serif text-2xl text-ivory transition-colors group-hover:text-bronze">
                        {collection.title}
                      </span>
                      <span className="eyebrow text-ivory-muted/60">Explore →</span>
                    </Link>
                  ))}
                </div>
              </Reveal>
            )}

            {relatedStories.length > 0 && (
              <Reveal className="lg:col-span-6 lg:col-start-7">
                <div className="eyebrow text-bronze">Related Stories</div>
                <h2 className="mt-5 font-serif text-4xl text-ivory md:text-5xl">
                  From the field journal.
                </h2>
                <div className="mt-10 divide-y divide-border border-t border-border">
                  {relatedStories.map((story) => (
                    <Link
                      key={story.id}
                      to="/stories/$slug"
                      params={{ slug: story.slug }}
                      className="group block py-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
                    >
                      <div className="eyebrow text-ivory-muted/60">
                        {story.place} · {story.readingMinutes} min read
                      </div>
                      <h3 className="mt-3 font-serif text-3xl text-ivory transition-colors group-hover:text-bronze">
                        {story.title}
                      </h3>
                      <p className="mt-4 max-w-xl font-light leading-relaxed text-ivory-muted">
                        {story.dek}
                      </p>
                    </Link>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
