import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Placeholder } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";
import { getPhotograph, photographs, categoryLabels, type Photograph } from "@/data/photographs";
import { prints } from "@/data/prints";

export const Route = createFileRoute("/gallery/$slug")({
  loader: ({ params }) => {
    const photo = getPhotograph(params.slug);
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
    return {
      meta: [
        { title: `${photo.title} — Martography` },
        { name: "description", content: `${photo.species} · ${photo.location}. ${photo.story}` },
        { property: "og:title", content: `${photo.title} — Martography` },
        { property: "og:description", content: photo.story },
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
  const { photo } = Route.useLoaderData() as { photo: Photograph };
  const relatedPrint = prints.find((p) => p.photoSlug === photo.slug);
  const others = photographs.filter((p) => p.slug !== photo.slug).slice(0, 3);

  return (
    <>
      {/* Photo band */}
      <section className="pt-32 md:pt-40 pb-16">
        <div className="container-editorial">
          <Reveal>
            <Link
              to="/gallery"
              className="eyebrow text-ivory-muted hover:text-bronze transition-colors"
            >
              ← Gallery / {categoryLabels[photo.category]}
            </Link>
          </Reveal>

          <Reveal>
            <div className="mt-10">
              <Placeholder
                subject={photo.title}
                location={photo.location}
                filename={photo.filename}
                focus={photo.focus}
                ratio={photo.ratio ?? "aspect-[4/5]"}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Meta + story */}
      <section className="pb-32 md:pb-40 border-b border-border">
        <div className="container-editorial grid gap-16 lg:gap-24 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div>
              <div className="eyebrow text-bronze">
                <span className="rule-bronze mr-3" />
                {categoryLabels[photo.category]}
              </div>
              <h1
                className="mt-8 font-serif text-ivory leading-[1.02] tracking-[-0.01em]"
                style={{ fontSize: "clamp(2.75rem, 5.5vw, 5rem)" }}
              >
                {photo.title}
              </h1>
              <dl className="mt-10 grid grid-cols-1 gap-y-6 text-sm">
                {[
                  { k: "Species", v: photo.species },
                  { k: "Location", v: photo.location },
                  { k: "Year", v: String(photo.year) },
                  { k: "Print", v: photo.printAvailable ? "Available as edition" : "Archive only" },
                ].map((row) => (
                  <div
                    key={row.k}
                    className="flex justify-between gap-6 border-b border-border pb-3"
                  >
                    <dt className="eyebrow">{row.k}</dt>
                    <dd className="text-ivory text-right">{row.v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-12 flex flex-wrap gap-4">
                {relatedPrint ? (
                  <Link
                    to="/prints/$slug"
                    params={{ slug: relatedPrint.slug }}
                    className="btn-primary"
                  >
                    View Fine Art Print
                  </Link>
                ) : (
                  <Link to="/contact" className="btn-primary">
                    Inquire About This Image
                  </Link>
                )}
                <Link to="/contact" className="btn-ghost">
                  License This Image
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div>
              <div className="eyebrow">
                <span className="rule-bronze mr-3" />
                The Story
              </div>
              <div
                className="mt-10 space-y-8 text-ivory-muted leading-[1.75] font-light"
                style={{ fontSize: "clamp(1.05rem, 1.3vw, 1.25rem)" }}
              >
                {(photo.longStory ?? [photo.story]).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="mt-12 eyebrow text-ivory-muted/70">— Paul Marto</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="py-32 md:py-40">
        <div className="container-editorial">
          <Reveal>
            <div className="eyebrow mb-14">
              <span className="rule-bronze mr-3" />
              Elsewhere in the Archive
            </div>
          </Reveal>
          <div className="grid gap-10 md:gap-14 md:grid-cols-3">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 120}>
                <Link to="/gallery/$slug" params={{ slug: o.slug }} className="group block">
                  <Placeholder
                    subject={o.title}
                    filename={o.filename}
                    ratio="aspect-[4/5]"
                    focus={o.focus}
                    className="transition-transform duration-[1600ms] group-hover:scale-[1.02]"
                  />
                  <div className="mt-5">
                    <div className="eyebrow text-bronze">{o.location}</div>
                    <div className="mt-2 font-serif text-2xl text-ivory group-hover:text-bronze transition-colors">
                      {o.title}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
