import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Placeholder } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";
import { getPublishedStories } from "@/content";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Stories — Martography" },
      {
        name: "description",
        content: "Long-form wildlife stories and field journals by Paul Marto.",
      },
      { property: "og:title", content: "Stories — Martography" },
      {
        property: "og:description",
        content: "Long-form wildlife stories and field journals by Paul Marto.",
      },
    ],
  }),
  component: Stories,
});

function Stories() {
  const stories = getPublishedStories();
  const [featured, ...archive] = stories;
  return (
    <>
      <PageHeader
        eyebrow="Stories · Field Journal"
        title="Every photograph has a story."
        intro="Long-form writing from the field — the encounters, the patience, and the ideas that shape each frame."
      />

      <section className="pb-32 md:pb-48">
        <div className="container-editorial">
          <Reveal>
            <article className="grid gap-12 lg:gap-20 lg:grid-cols-[1.5fr_1fr] items-center">
              <Link to="/stories/$slug" params={{ slug: featured.slug }} className="group block">
                <Placeholder
                  subject={featured.coverAlt}
                  location={featured.place}
                  responsiveImageKey={featured.coverImageKey}
                  mode="natural"
                />
              </Link>
              <div>
                <div className="eyebrow">
                  <span className="rule-bronze mr-3" />
                  Signature Story
                </div>
                <h2
                  className="mt-8 font-serif text-ivory leading-[1.02] tracking-[-0.01em]"
                  style={{ fontSize: "clamp(2.75rem, 5.2vw, 5rem)" }}
                >
                  {featured.title}
                </h2>
                <p className="mt-6 text-sm uppercase tracking-[0.22em] text-bronze">
                  {featured.place} · {featured.readingMinutes} min read
                </p>
                <p className="mt-10 text-lg text-ivory-muted leading-[1.75]">{featured.dek}</p>
                <Link
                  to="/stories/$slug"
                  params={{ slug: featured.slug }}
                  className="btn-ghost mt-12"
                >
                  Read the Story
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32 border-t border-border">
        <div className="container-editorial">
          <div className="eyebrow mb-16">
            <span className="rule-bronze mr-3" />
            From the Journal
          </div>
          <div className="divide-y divide-border">
            {archive.map((s, i) => (
              <Reveal key={s.slug} delay={i * 80}>
                <Link
                  to="/stories/$slug"
                  params={{ slug: s.slug }}
                  className="group grid gap-10 md:grid-cols-[280px_1fr_auto] items-center py-12"
                >
                  <div className="max-w-[280px] w-full">
                    <Placeholder
                      subject={s.coverAlt}
                      responsiveImageKey={s.coverImageKey}
                      ratio="aspect-[4/3]"
                      mode="mobile-natural"
                      className="lg:transition-transform lg:duration-[1400ms] lg:group-hover:scale-[1.03]"
                    />
                  </div>
                  <div>
                    <div className="eyebrow text-bronze">{s.place}</div>
                    <h3
                      className="mt-4 font-serif text-ivory leading-[1.05] group-hover:text-bronze transition-colors"
                      style={{ fontSize: "clamp(1.75rem, 3vw, 2.75rem)" }}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-4 text-ivory-muted max-w-2xl leading-[1.7]">{s.dek}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.22em] text-ivory-muted/60">
                      {s.readingMinutes} min read
                    </p>
                  </div>
                  <span className="eyebrow text-ivory-muted group-hover:text-bronze transition-colors md:pl-6">
                    Read →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
