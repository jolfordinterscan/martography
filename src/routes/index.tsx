import { createFileRoute, Link } from "@tanstack/react-router";
import { Placeholder } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Martography — Wildlife Photography by Paul Marto" },
      {
        name: "description",
        content:
          "A quiet, cinematic archive of wildlife photography by Paul Marto. Every photograph has a story.",
      },
      { property: "og:title", content: "Martography — Wildlife Photography by Paul Marto" },
      {
        property: "og:description",
        content:
          "A quiet, cinematic archive of wildlife photography by Paul Marto. Every photograph has a story.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const collections = [
  {
    number: "01",
    title: "Birds",
    line: "The aerial life of a continent, held in stillness.",
    story:
      "A study of flight, feather, and color — from the painted bunting's impossible palette to the small dramas of the air.",
    subject: "Painted Bunting on Salvia",
    location: "Location — to be confirmed",
    filename: "birds-painted-bunting-salvia.jpg",
  },
  {
    number: "02",
    title: "Mammals",
    line: "The intelligence of a gaze. The weight of an animal at rest.",
    story:
      "Portraits made close, but never intrusively — a quiet catalogue of the animals that share these forests, deserts, and coastlines.",
    subject: "Red Fox Pair",
    location: "Northern Woodlands",
    filename: "mammals-fox.jpg",
  },
  {
    number: "03",
    title: "Wildlife Behavior",
    line: "The moments most photographers miss.",
    story:
      "The hunt, the courtship, the feeding of a chick — behavior seen only after long hours of stillness, and rarely captured whole.",
    subject: "Roadrunner feeding its chick",
    location: "Desert Southwest",
    filename: "behavior-roadrunner-feeding-chick.jpg",
  },
  {
    number: "04",
    title: "Conservation",
    line: "Small lives whose futures hang on the choices being made today.",
    story:
      "A hummingbird nest, no larger than a walnut — photographed in the hope that seeing these lives clearly is the first step toward keeping them here.",
    subject: "Hummingbird at the Nest",
    location: "Backyard Oak",
    filename: "conservation-hummingbird-nest.jpg",
  },
];

const editorialLink =
  "group inline-flex items-center gap-4 text-ivory transition-colors hover:text-bronze focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-bronze";

function Home() {
  return (
    <main className="overflow-x-clip bg-charcoal-deep">
      <Hero />

      <section aria-labelledby="manifesto-title" className="py-28 sm:py-36 lg:py-52">
        <div className="container-editorial">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-3">
                <h2 id="manifesto-title" className="eyebrow text-bronze">
                  <span className="rule-bronze mr-3" />A Note from the Photographer
                </h2>
              </div>
              <div className="lg:col-span-8 lg:col-start-5">
                <p className="font-serif text-[clamp(1.9rem,4.2vw,3.8rem)] leading-[1.16] tracking-[-0.015em] text-ivory">
                  Every image represents patience, respect for wildlife, and the belief that
                  nature’s most extraordinary stories reveal themselves only to those willing to
                  wait.
                </p>
                <div className="mt-12 flex items-center gap-5 text-ivory-muted">
                  <span className="h-px w-12 bg-bronze/70" aria-hidden />
                  <span className="eyebrow text-ivory-muted">
                    Paul Marto · Wildlife Photographer
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        aria-labelledby="collections-title"
        className="border-t border-border py-24 lg:py-36"
      >
        <div className="container-editorial">
          <Reveal>
            <div className="grid gap-8 pb-20 lg:grid-cols-12 lg:items-end lg:pb-28">
              <div className="lg:col-span-7">
                <div className="eyebrow">
                  <span className="rule-bronze mr-3" />
                  Featured Collections
                </div>
                <h2
                  id="collections-title"
                  className="mt-7 font-serif text-[clamp(2.8rem,7vw,6.8rem)] leading-[0.92] tracking-[-0.025em] text-ivory"
                >
                  Four ways of
                  <br />
                  <span className="italic text-ivory-muted">paying attention.</span>
                </h2>
              </div>
              <p className="max-w-md font-serif text-lg italic leading-[1.6] text-ivory-muted lg:col-span-4 lg:col-start-9">
                A living archive organized not by spectacle, but by the kinds of patience each
                subject asks of the photographer.
              </p>
            </div>
          </Reveal>

          <div className="space-y-24 lg:space-y-40">
            {collections.map((collection, index) => {
              const reverse = index % 2 === 1;
              return (
                <Reveal key={collection.title} y={40}>
                  <article className="border-t border-ivory/10 pt-8 lg:pt-10">
                    <Link
                      to="/gallery"
                      aria-label={`Explore the ${collection.title} collection`}
                      className="group grid gap-10 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-bronze lg:grid-cols-12 lg:items-center lg:gap-16"
                    >
                      <div
                        className={`lg:col-span-8 ${reverse ? "lg:col-start-5 lg:order-2" : ""}`}
                      >
                        <div className="overflow-hidden bg-charcoal">
                          <Placeholder
                            subject={collection.subject}
                            location={collection.location}
                            filename={collection.filename}
                            mode="natural"
                          />
                        </div>
                      </div>

                      <div
                        className={`max-w-md lg:col-span-4 ${reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}
                      >
                        <div className="flex items-center justify-between border-b border-ivory/10 pb-5">
                          <span className="font-serif text-xl tabular-nums text-bronze">
                            {collection.number}
                          </span>
                          <span className="eyebrow text-ivory-muted/70">Collection</span>
                        </div>
                        <h3 className="mt-8 font-serif text-[clamp(2.4rem,5vw,4.8rem)] leading-[0.95] text-ivory transition-colors duration-500 group-hover:text-bronze">
                          {collection.title}
                        </h3>
                        <p className="mt-6 font-serif text-xl italic leading-[1.45] text-ivory-muted">
                          {collection.line}
                        </p>
                        <p className="mt-6 text-sm font-light leading-[1.8] text-ivory-muted/80">
                          {collection.story}
                        </p>
                        <div className="mt-9 flex items-center gap-4 text-ivory">
                          <span className="eyebrow text-[0.65rem]">Enter the collection</span>
                          <span
                            className="h-px w-10 bg-bronze transition-[width] duration-500 group-hover:w-20"
                            aria-hidden
                          />
                        </div>
                      </div>
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="story-title"
        className="border-y border-border bg-charcoal py-28 lg:py-44"
      >
        <div className="container-editorial">
          <Reveal>
            <header className="grid gap-8 pb-16 lg:grid-cols-12 lg:items-end lg:pb-24">
              <div className="lg:col-span-7">
                <div className="eyebrow text-bronze">
                  <span className="rule-bronze mr-3" />
                  Signature Story · Nº 07
                </div>
                <h2
                  id="story-title"
                  className="mt-7 font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.88] tracking-[-0.025em] text-ivory"
                >
                  Dinner
                  <br />
                  <span className="italic text-ivory-muted">Is Served.</span>
                </h2>
              </div>
              <div className="max-w-md lg:col-span-4 lg:col-start-9">
                <p className="font-serif text-xl italic leading-[1.5] text-ivory-muted">
                  Eleven mornings of waiting for a single four-second exchange — and the small,
                  bright life it was meant to feed.
                </p>
                <p className="mt-6 eyebrow text-ivory-muted/70">
                  Words &amp; Photograph · Paul Marto
                </p>
              </div>
            </header>
          </Reveal>

          <Reveal y={32}>
            <figure>
              <Placeholder
                subject="A roadrunner parent feeding its chick"
                location="Sonoran Desert"
                filename="story-dinner-is-served.jpg"
                mode="natural"
              />
              <figcaption className="mt-5 flex flex-col gap-3 border-t border-ivory/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <span className="eyebrow text-ivory-muted">
                  Greater Roadrunner · Parent and chick
                </span>
                <span className="eyebrow text-ivory-muted/60">Sonoran Desert · 06:14</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal>
            <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12">
              <p className="font-serif text-2xl leading-[1.6] text-ivory lg:col-span-6 lg:col-start-2 lg:text-3xl">
                The exchange lasted less than four seconds. What the frame keeps is not the hunt,
                but the errand: a parent, arriving.
              </p>
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="text-base font-light leading-[1.85] text-ivory-muted">
                  Some wildlife moments happen in an instant. Others require hours of patience. The
                  full story begins before first light, at the edge of an arroyo.
                </p>
                <Link
                  to="/stories/$slug"
                  params={{ slug: "dinner-is-served" }}
                  className={`${editorialLink} mt-10`}
                >
                  <span className="eyebrow">Read the Full Story</span>
                  <span
                    className="h-px w-10 bg-bronze transition-[width] duration-500 group-hover:w-20"
                    aria-hidden
                  />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="prints-title" className="py-28 lg:py-48">
        <div className="container-editorial">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <div className="eyebrow">
                  <span className="rule-bronze mr-3" />
                  Fine Art Prints
                </div>
                <h2
                  id="prints-title"
                  className="mt-7 font-serif text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.025em] text-ivory"
                >
                  Rare moments,
                  <br />
                  <span className="italic text-ivory-muted">made to be lived with.</span>
                </h2>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="font-serif text-xl italic leading-[1.55] text-ivory-muted">
                  Archival fine art prints, hand-signed and numbered by Paul. Each image is
                  presented in its complete original composition.
                </p>
                <Link to="/prints" className={`${editorialLink} mt-10`}>
                  <span className="eyebrow">View the Print Collection</span>
                  <span
                    className="h-px w-10 bg-bronze transition-[width] duration-500 group-hover:w-20"
                    aria-hidden
                  />
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="mt-20 grid grid-cols-12 gap-x-5 gap-y-16 sm:gap-x-8 lg:mt-28 lg:gap-x-12">
            <Reveal y={36} className="col-span-12 lg:col-span-7 lg:pt-20">
              <Link
                to="/prints"
                className="group block focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-bronze"
              >
                <Placeholder
                  subject="Two red foxes meeting at golden hour"
                  filename="mammals-fox.jpg"
                  mode="natural"
                />
                <div className="mt-6 flex items-start justify-between gap-8 border-t border-ivory/10 pt-5">
                  <div>
                    <div className="eyebrow text-bronze">Fine Art Print · Nº 01</div>
                    <h3 className="mt-3 font-serif text-3xl text-ivory transition-colors group-hover:text-bronze">
                      Title Pending Artist Approval
                    </h3>
                  </div>
                  <span className="hidden eyebrow text-ivory-muted/60 sm:block">Red Fox</span>
                </div>
              </Link>
            </Reveal>

            <Reveal y={48} className="col-span-11 col-start-2 lg:col-span-4 lg:col-start-9">
              <Link
                to="/prints"
                className="group block focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-bronze"
              >
                <Placeholder
                  subject="Hummingbird returning to its nest"
                  filename="conservation-hummingbird-nest.jpg"
                  mode="natural"
                />
                <div className="mt-6 border-t border-ivory/10 pt-5">
                  <div className="eyebrow text-bronze">Fine Art Print · Nº 02</div>
                  <h3 className="mt-3 font-serif text-2xl text-ivory transition-colors group-hover:text-bronze">
                    Title Pending Artist Approval
                  </h3>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="education-title"
        className="border-y border-border bg-forest-deep/20 py-28 lg:py-44"
      >
        <div className="container-editorial">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-3">
                <div className="eyebrow text-bronze">
                  <span className="rule-bronze mr-3" />
                  Education &amp; Conservation
                </div>
              </div>
              <div className="lg:col-span-8 lg:col-start-5">
                <h2
                  id="education-title"
                  className="font-serif text-[clamp(2.8rem,7vw,6.4rem)] leading-[0.94] tracking-[-0.025em] text-ivory"
                >
                  When a child learns to look,
                  <br />
                  <span className="italic text-ivory-muted">a species gains a defender.</span>
                </h2>
                <div className="mt-12 grid gap-10 border-t border-ivory/10 pt-10 md:grid-cols-2 md:gap-14">
                  <p className="font-serif text-xl italic leading-[1.6] text-ivory-muted">
                    Photography can carry students into the lives of animals — how they live, what
                    they need, and why paying attention matters.
                  </p>
                  <div>
                    <p className="text-base font-light leading-[1.8] text-ivory-muted/85">
                      School programs, workshops, and conservation talks are shaped around each
                      audience, from classrooms and libraries to nature centers and community
                      organizations.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-x-8 gap-y-6">
                      <Link to="/education" className={editorialLink}>
                        <span className="eyebrow">Explore Education</span>
                        <span className="h-px w-8 bg-bronze" aria-hidden />
                      </Link>
                      <Link to="/contact" className={editorialLink}>
                        <span className="eyebrow">Book a Program</span>
                        <span className="h-px w-8 bg-bronze" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="photographer-title" className="py-28 lg:py-48">
        <div className="container-editorial">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-20">
            <Reveal y={36} className="lg:col-span-5">
              <Placeholder
                subject="Paul Marto, wildlife photographer"
                filename="about-portrait.jpg"
                mode="natural"
              />
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7">
              <div className="eyebrow">
                <span className="rule-bronze mr-3" />
                The Photographer
              </div>
              <h2
                id="photographer-title"
                className="mt-7 font-serif text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.94] tracking-[-0.025em] text-ivory"
              >
                Patience is part
                <br />
                <span className="italic text-ivory-muted">of the exposure.</span>
              </h2>
              <p className="mt-10 max-w-xl font-serif text-xl italic leading-[1.6] text-ivory-muted">
                For Paul Marto, wildlife photography is a practice of observation — waiting for
                behavior, emotion, and the fleeting interactions that reveal an animal’s character.
              </p>
              <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
                <Link to="/about" className={editorialLink}>
                  <span className="eyebrow">Meet Paul</span>
                  <span className="h-px w-8 bg-bronze" aria-hidden />
                </Link>
                <Link to="/contact" className={editorialLink}>
                  <span className="eyebrow">Get in Touch</span>
                  <span className="h-px w-8 bg-bronze" aria-hidden />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}

function Hero() {
  return (
    <>
      <section
        aria-labelledby="hero-title-desktop"
        className="relative hidden min-h-[680px] overflow-hidden lg:block lg:h-[100svh]"
      >
        <Placeholder
          subject="Bobcat watching from the edge of tall grass"
          filename="hero.jpg"
          ratio=""
          className="absolute inset-0 h-full w-full !aspect-auto animate-fade-in"
          focus="right"
          sizes="100vw"
          priority
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.10 0.005 240 / 0.88) 0%, oklch(0.10 0.005 240 / 0.42) 42%, transparent 72%), linear-gradient(0deg, oklch(0.10 0.005 240 / 0.8) 0%, transparent 42%)",
          }}
        />

        <div className="container-editorial relative z-10 flex h-full items-end pb-16 xl:pb-24">
          <div className="max-w-4xl animate-fade-up">
            <div className="eyebrow text-ivory-muted">
              <span className="rule-bronze mr-3" />
              Paul Marto · Wildlife Photographer
            </div>
            <h1
              id="hero-title-desktop"
              className="mt-7 font-serif text-[clamp(4.5rem,8.4vw,8rem)] leading-[0.86] tracking-[-0.035em] text-ivory"
            >
              Every Photograph
              <br />
              <span className="italic text-ivory-muted">Has a Story.</span>
            </h1>
            <p className="mt-8 max-w-xl font-serif text-xl italic leading-[1.45] text-ivory-muted xl:text-2xl">
              Martography is wildlife photographer Paul Marto’s visual field journal — an archive
              shaped by patience, respect, and the stories revealed in the wild.
            </p>
            <Link to="/gallery" className={`${editorialLink} mt-10`}>
              <span className="eyebrow text-ivory">Explore the photographs</span>
              <span className="h-px w-10 bg-bronze" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="absolute bottom-16 right-8 z-10 flex items-center gap-4 text-ivory-muted/70 xl:right-12">
          <span className="eyebrow text-[0.58rem]">Scroll to enter</span>
          <span className="h-px w-12 bg-bronze/70" aria-hidden />
        </div>
      </section>

      <section aria-labelledby="hero-title-mobile" className="bg-charcoal-deep lg:hidden">
        <div className="container-editorial pb-10 pt-28 sm:pb-12 sm:pt-32">
          <div className="eyebrow text-ivory-muted">
            <span className="rule-bronze mr-3" />
            Paul Marto · Wildlife Photographer
          </div>
          <h1
            id="hero-title-mobile"
            className="mt-6 font-serif text-[clamp(2.8rem,12vw,5.5rem)] leading-[0.9] tracking-[-0.03em] text-ivory"
          >
            Every Photograph
            <br />
            <span className="italic text-ivory-muted">Has a Story.</span>
          </h1>
          <p className="mt-7 max-w-xl font-serif text-lg italic leading-[1.5] text-ivory-muted sm:text-xl">
            Martography is wildlife photographer Paul Marto’s visual field journal — an archive
            shaped by patience, respect, and the stories revealed in the wild.
          </p>
          <Link to="/gallery" className={`${editorialLink} mt-8`}>
            <span className="eyebrow text-ivory">Explore the photographs</span>
            <span className="h-px w-10 bg-bronze" aria-hidden />
          </Link>
        </div>
        <Placeholder
          subject="Bobcat watching from the edge of tall grass"
          filename="hero.jpg"
          mode="natural"
          sizes="100vw"
          priority
        />
        <div className="container-editorial flex items-center justify-between gap-6 pb-14 pt-5">
          <span className="eyebrow text-[0.58rem] text-ivory-muted/70">
            Bobcat · Field Portrait
          </span>
          <span className="h-px w-10 bg-bronze/60" aria-hidden />
        </div>
      </section>
    </>
  );
}
