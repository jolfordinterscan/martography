import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Placeholder } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";
import { getStory, stories, type Story } from "@/data/stories";
import { getPhotograph } from "@/data/photographs";

export const Route = createFileRoute("/stories/$slug")({
  loader: ({ params }) => {
    const story = getStory(params.slug);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Story — Martography" }, { name: "robots", content: "noindex" }] };
    const { story } = loaderData;
    return {
      meta: [
        { title: `${story.title} — Martography` },
        { name: "description", content: story.dek },
        { property: "og:title", content: `${story.title} — Martography` },
        { property: "og:description", content: story.dek },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: StoryDetail,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <div className="eyebrow">Not Found</div>
        <h1 className="mt-4 font-serif text-5xl text-ivory">Story unavailable</h1>
        <Link to="/stories" className="btn-ghost mt-8 inline-block">Back to Stories</Link>
      </div>
    </div>
  ),
});

function StoryDetail() {
  const { story } = Route.useLoaderData() as { story: Story };
  const linkedPhoto = story.photoSlug ? getPhotograph(story.photoSlug) : undefined;
  const others = stories.filter((s) => s.slug !== story.slug).slice(0, 3);

  return (
    <>
      <section className="pt-32 md:pt-40 pb-12">
        <div className="container-editorial max-w-4xl">
          <Reveal>
            <Link to="/stories" className="eyebrow text-ivory-muted hover:text-bronze transition-colors">
              ← Field Journal
            </Link>
          </Reveal>
          <Reveal>
            <div className="mt-10">
              <div className="eyebrow"><span className="rule-bronze mr-3" />Signature Story</div>
              <h1
                className="mt-8 font-serif text-ivory leading-[1.02] tracking-[-0.015em]"
                style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
              >
                {story.title}
              </h1>
              <p className="mt-8 text-sm uppercase tracking-[0.22em] text-bronze">
                {story.place} · {story.readingMinutes} min read
              </p>
              <p
                className="mt-10 font-serif italic text-ivory-muted leading-[1.35]"
                style={{ fontSize: "clamp(1.35rem, 2.2vw, 1.85rem)" }}
              >
                {story.dek}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="container-editorial">
          <Reveal>
            <Placeholder
              subject={story.title}
              location={story.place}
              filename={story.coverFilename}
              ratio="aspect-[16/9]"
            />
          </Reveal>
        </div>
      </section>

      <section className="pb-32 md:pb-40">
        <div className="container-editorial max-w-3xl">
          <Reveal>
            <div
              className="space-y-8 text-ivory-muted leading-[1.85] font-light"
              style={{ fontSize: "clamp(1.1rem, 1.35vw, 1.3rem)" }}
            >
              {story.body.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "first-letter:font-serif first-letter:text-6xl first-letter:mr-2 first-letter:float-left first-letter:leading-[0.9] first-letter:text-ivory first-letter:pt-1"
                      : ""
                  }
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-16 pt-10 border-t border-border eyebrow text-ivory-muted">
              — Paul Marto
            </div>
          </Reveal>

          {linkedPhoto && (
            <Reveal>
              <div className="mt-24 border-t border-border pt-16">
                <div className="eyebrow mb-6"><span className="rule-bronze mr-3" />The Photograph</div>
                <Link to="/gallery/$slug" params={{ slug: linkedPhoto.slug }} className="group block">
                  <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] items-center">
                    <Placeholder
                      subject={linkedPhoto.title}
                      filename={linkedPhoto.filename}
                      ratio="aspect-[4/3]"
                      className="transition-transform duration-[1600ms] group-hover:scale-[1.02]"
                    />
                    <div>
                      <h3 className="font-serif text-3xl md:text-4xl text-ivory group-hover:text-bronze transition-colors">
                        {linkedPhoto.title}
                      </h3>
                      <p className="mt-3 text-ivory-muted italic">{linkedPhoto.species}</p>
                      <p className="mt-2 text-sm text-ivory-muted">{linkedPhoto.location}</p>
                      <span className="btn-ghost mt-8">View in the Gallery</span>
                    </div>
                  </div>
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <section className="py-24 md:py-32 border-t border-border">
        <div className="container-editorial">
          <div className="eyebrow mb-14"><span className="rule-bronze mr-3" />More From the Journal</div>
          <div className="grid gap-10 md:grid-cols-3">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 100}>
                <Link to="/stories/$slug" params={{ slug: o.slug }} className="group block">
                  <Placeholder
                    subject={o.title}
                    filename={o.coverFilename}
                    ratio="aspect-[4/3]"
                    className="transition-transform duration-[1400ms] group-hover:scale-[1.02]"
                  />
                  <div className="mt-5">
                    <div className="eyebrow text-bronze">{o.place}</div>
                    <h4 className="mt-3 font-serif text-2xl text-ivory group-hover:text-bronze transition-colors">
                      {o.title}
                    </h4>
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
