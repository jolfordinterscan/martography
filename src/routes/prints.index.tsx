import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Placeholder } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";
import { prints, STANDARD_SIZES } from "@/data/prints";

export const Route = createFileRoute("/prints/")({
  head: () => ({
    meta: [
      { title: "Fine Art Prints — Martography" },
      { name: "description", content: "Limited edition wildlife prints by Paul Marto. Editions, sizes, and pricing details coming soon." },
      { property: "og:title", content: "Fine Art Prints — Martography" },
      { property: "og:description", content: "Limited edition wildlife prints by Paul Marto. Editions, sizes, and pricing details coming soon." },
    ],
  }),
  component: Prints,
});

function Prints() {
  const featured = prints[0]; // Bobcat — entrance piece
  const rest = prints.slice(1);

  return (
    <>
      <PageHeader
        eyebrow="Fine Art Prints"
        title="Held in the hand. Hung on the wall. Lived with."
        intro="A first look at the artworks that will make up the Martography print collection. Editions, sizes, materials, and pricing are being finalized — full details coming soon."
      />

      {/* ===== Gallery Entrance — Featured Artwork ===== */}
      <section className="pb-24 md:pb-32">
        <div className="container-editorial">
          <Reveal>
            <div className="grid gap-12 md:gap-16 lg:grid-cols-12 lg:gap-24 items-start">
              <div className="lg:col-span-8">
                <Placeholder
                  subject={featured.subject}
                  location={featured.location ?? undefined}
                  filename={featured.filename}
                  focus={featured.focus}
                  ratio="aspect-[4/5]"
                  tone="deep"
                  mobileArtwork
                />
                <p className="mt-5 text-xs tracking-[0.3em] uppercase text-ivory/50">
                  Featured Fine Art Print
                </p>
              </div>

              <div className="lg:col-span-4 lg:pt-10">
                <div className="eyebrow text-bronze">Featured Artwork</div>
                <h2 className="mt-6 font-serif italic text-ivory leading-[1.05] text-[clamp(2.25rem,4.5vw,3.75rem)]">
                  Title Pending Artist Approval
                </h2>


                <dl className="mt-10 space-y-6">
                  <div>
                    <dt className="eyebrow text-ivory/45">Species</dt>
                    <dd className="mt-2 font-serif text-xl text-ivory/95">{featured.species}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-ivory/45">Location</dt>
                    <dd className="mt-2 font-serif italic text-ivory/60">To be announced</dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-ivory/45">Story</dt>
                    <dd className="mt-2 font-serif italic text-ivory/85 text-lg leading-[1.55]">
                      A moment held between breath and grass — the sovereign, unhurried gaze of a wild animal that has decided, briefly, to allow itself to be seen. The full story for this artwork is coming soon.
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-ivory/45">Edition</dt>
                    <dd className="mt-2 font-serif text-lg text-ivory/95">
                      Limited Edition
                      <span className="block mt-1 font-sans not-italic text-xs tracking-[0.2em] uppercase text-ivory/45">
                        Edition size to be announced
                      </span>
                    </dd>
                  </div>
                </dl>

                <div className="mt-10 border-t border-border pt-8">
                  <div className="eyebrow text-ivory/45 mb-5">Available Print Sizes</div>
                  <ul className="space-y-3">
                    {STANDARD_SIZES.map((s) => (
                      <li
                        key={s.dimensions}
                        className="font-serif text-lg text-ivory/95 tracking-wide"
                      >
                        {s.dimensions}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-xs tracking-[0.2em] uppercase text-ivory/45">
                    Pricing confirmed by inquiry
                  </p>
                </div>

                <div className="mt-10 space-y-2 text-sm tracking-[0.2em] uppercase text-ivory/70">
                  <div>Archival Fine Art Print</div>
                  <div>Hand Signed by Paul Marto</div>
                </div>

                <div className="mt-12">
                  <Link
                    to="/prints/$slug"
                    params={{ slug: featured.slug }}
                    className="inline-flex items-center gap-3 border border-bronze/70 text-ivory px-10 py-4 text-sm tracking-[0.3em] uppercase hover:bg-bronze hover:text-charcoal-deep transition-colors"
                  >
                    Request This Print
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== The Collection ===== */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="container-editorial">
          <div className="max-w-3xl mb-20">
            <div className="eyebrow text-bronze">The Collection</div>
            <h2 className="mt-6 font-serif text-ivory text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">
              A first look at the hang.
            </h2>
            <p className="mt-6 font-serif italic text-ivory-muted text-lg leading-[1.6]">
              The artworks below are part of the collection Paul is preparing for release. Titles, edition sizes, and pricing will be announced when the collection is finalized.
            </p>
          </div>

          <div className="grid gap-x-10 gap-y-24 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 120}>
                <article className="group">
                  <Placeholder
                    subject={p.subject}
                    location={p.location ?? undefined}
                    filename={p.filename}
                    focus={p.focus}
                    ratio="aspect-[4/5]"
                    className="md:transition-transform md:duration-[1600ms] md:group-hover:scale-[1.02]"
                    mobileArtwork
                  />
                  <div className="mt-6">
                    <div className="text-[11px] tracking-[0.25em] uppercase text-bronze/80">
                      Fine Art Print
                    </div>
                    <h3 className="mt-3 font-serif text-2xl md:text-3xl text-ivory leading-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-ivory/70">
                      {p.species}
                    </p>
                    <p className="mt-1 text-xs tracking-[0.2em] uppercase text-ivory/45">
                      Location — to be announced
                    </p>
                    <p className="mt-4 font-serif italic text-ivory/75 text-base leading-[1.55]">
                      "{p.description}"
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                      <span className="text-xs tracking-[0.2em] uppercase text-ivory/50">
                        Signed · Numbered
                      </span>
                      <Link
                        to="/prints/$slug"
                        params={{ slug: p.slug }}
                        className="text-xs tracking-[0.25em] uppercase text-ivory hover:text-bronze transition-colors shrink-0"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-32 border-t border-border pt-20 grid gap-12 md:grid-cols-3 text-base text-ivory-muted">
            <div>
              <div className="eyebrow mb-5">Materials</div>
              <p className="leading-[1.7]">
                Every Martography print will be produced on archival fine art paper with pigment inks. Paper stock and finishing details will be announced with the collection release.
              </p>
            </div>
            <div>
              <div className="eyebrow mb-5">Signed &amp; Numbered</div>
              <p className="leading-[1.7]">
                Each print will be hand-signed and numbered by Paul Marto. Certificate of authenticity details coming soon.
              </p>
            </div>
            <div>
              <div className="eyebrow mb-5">Commissions</div>
              <p className="leading-[1.7]">
                Custom sizes, framing, and private commission inquiries are welcome.{" "}
                <Link to="/contact" className="text-ivory underline underline-offset-4 hover:text-bronze">
                  Get in touch
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
