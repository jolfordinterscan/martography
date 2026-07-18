import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Placeholder } from "@/components/site/Placeholder";

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

// Each collection is a room in the museum.
// Every `filename` below is a stable slot mapped in `src/components/site/Placeholder.tsx`.
// To swap in Paul's final photograph, drop the file into `src/assets/` and
// update the matching key in IMAGE_MAP — nothing here needs to change.
const exhibits = [
  {
    n: "I",
    title: "Birds",
    line: "The aerial life of a continent, held in stillness.",
    story:
      "A study of flight, feather, and color — from the painted bunting's impossible palette to the small dramas of the air.",
    subject: "Painted Bunting on Salvia",
    location: "Location — to be confirmed",
    filename: "birds-painted-bunting-salvia.jpg",
    focus: "left" as const,
    mobileObjectPosition: "35% 50%",
  },
  {
    n: "II",
    title: "Mammals",
    line: "The intelligence of a gaze. The weight of an animal at rest.",
    story:
      "Portraits made close, but never intrusively — a quiet catalogue of the animals that share these forests, deserts, and coastlines.",
    subject: "Red Fox Pair",
    location: "Northern Woodlands",
    filename: "mammals-fox.jpg",
    focus: "center" as const,
    mobileObjectPosition: "50% 50%",
  },
  {
    n: "III",
    title: "Wildlife Behavior",
    line: "The moments most photographers miss.",
    story:
      "The hunt, the courtship, the feeding of a chick — behavior seen only after long hours of stillness, and rarely captured whole.",
    subject: "Roadrunner with Prey",
    location: "Desert Southwest",
    filename: "behavior-roadrunner-feeding-chick.jpg",
    focus: "right" as const,
    mobileObjectPosition: "65% 45%",
  },
  {
    n: "IV",
    title: "Conservation",
    line: "Small lives whose futures hang on the choices being made today.",
    story:
      "A hummingbird nest, no larger than a walnut — photographed in the hope that seeing these lives clearly is the first step toward keeping them here.",
    subject: "Hummingbird at the Nest",
    location: "Backyard Oak",
    filename: "conservation-hummingbird-nest.jpg",
    focus: "left" as const,
    mobileObjectPosition: "35% 50%",
  },
];

function Home() {
  return (
    <div className="bg-charcoal-deep">
      {/* ══════════════════════════════════════════════════════════════
          I. HERO — silence, one line, one image.
         ══════════════════════════════════════════════════════════════ */}
      {/* ── DESKTOP / TABLET HERO (md+): full-bleed cinematic frame ── */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden hidden md:block">
        <Placeholder
          subject="Bobcat at the Edge of the Grass"
          filename="hero.jpg"
          ratio=""
          className="absolute inset-0 w-full h-full !aspect-auto animate-fade-in"
          tone="deep"
          focus="right"
        />

        {/* Cinematic vignette — desktop: strong left wash for title contrast */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.10 0.005 240 / 0.55) 0%, transparent 22%, transparent 62%, oklch(0.10 0.005 240 / 0.85) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, oklch(0.10 0.005 240 / 0.75) 0%, oklch(0.10 0.005 240 / 0.35) 38%, transparent 68%)",
          }}
        />

        {/* Title card — desktop: bottom-left as a caption plate */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="container-editorial pb-16 md:pb-24">
            <div className="max-w-3xl animate-fade-up">
              <div className="eyebrow text-ivory-muted">
                <span className="rule-bronze mr-3" />
                Paul Marto · Wildlife Photographer
              </div>
              <h1
                className="mt-8 font-serif text-ivory leading-[0.94] tracking-[-0.02em]"
                style={{ fontSize: "clamp(3rem, 8.5vw, 8rem)" }}
              >
                Every photograph
                <br />
                <span className="italic text-ivory-muted">has a story.</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Silent scroll cue */}
        <div className="absolute top-1/2 right-6 md:right-10 -translate-y-1/2 z-10 flex flex-col items-center gap-4 opacity-60">
          <span
            className="eyebrow text-[0.55rem] text-ivory-muted"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll to enter
          </span>
          <span className="block w-px h-16 bg-ivory-muted/50" />
        </div>
      </section>

      {/* ── MOBILE HERO (< md): stacked editorial block, complete photograph preserved ── */}
      <section className="md:hidden bg-charcoal-deep">
        <div className="container-editorial pt-28 pb-10">
          <div className="eyebrow text-ivory-muted">
            <span className="rule-bronze mr-3" />
            Paul Marto · Wildlife Photographer
          </div>
          <h1 className="mt-6 font-serif text-ivory leading-[0.98] tracking-[-0.02em] text-[2.35rem] xs:text-[2.6rem]">
            Every photograph
            <br />
            <span className="italic text-ivory-muted">has a story.</span>
          </h1>
        </div>
        <Placeholder
          subject="Bobcat at the Edge of the Grass"
          filename="hero.jpg"
          mobileNatural
          className="w-full"
          tone="deep"
        />
        <div className="container-editorial pt-6 pb-16">
          <div className="text-[0.6rem] tracking-[0.35em] uppercase text-ivory-muted/70">
            Bobcat · At the Edge of the Grass
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          II. CURATOR'S NOTE — a quiet editorial introduction.
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-40 md:py-64">
        <div className="container-editorial">
          <Reveal>
            <div className="max-w-4xl mx-auto text-center">
              <div className="eyebrow text-bronze justify-center flex items-center">
                <span className="rule-bronze mr-3" />A Note from the Photographer
              </div>
              <p
                className="mt-14 font-serif text-ivory leading-[1.22] tracking-[-0.01em]"
                style={{ fontSize: "clamp(1.75rem, 4.2vw, 3.5rem)" }}
              >
                Every image on this site represents patience, respect for wildlife, and the belief
                that{" "}
                <span className="italic text-ivory-muted">
                  nature's most extraordinary stories reveal themselves only to those willing to
                  wait.
                </span>
              </p>
              <div className="mt-16 flex flex-col items-center gap-8">
                <div className="text-eyebrow text-ivory-muted/70 tracking-[0.4em] text-[0.65rem] uppercase">
                  Paul Marto · Wildlife Photographer
                </div>
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-4 text-ivory hover:text-bronze transition-colors"
                >
                  <span className="eyebrow">Meet Paul</span>
                  <span className="block w-10 h-px bg-bronze transition-all duration-500 group-hover:w-20" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          III. THE EXHIBITS — four rooms, each a full-bleed image
              with a single caption plate. No cards, no grids.
         ══════════════════════════════════════════════════════════════ */}
      <section aria-label="Featured Collections">
        <div className="container-editorial pb-24 md:pb-32">
          <Reveal>
            <div className="max-w-3xl">
              <div className="eyebrow">
                <span className="rule-bronze mr-3" />
                Featured Collections
              </div>
              <h2
                className="mt-8 font-serif text-ivory leading-[1.02] tracking-[-0.015em]"
                style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)" }}
              >
                Four rooms.
                <br />
                <span className="italic text-ivory-muted">One archive.</span>
              </h2>
            </div>
          </Reveal>
        </div>

        {/* ── MOBILE (< md): stacked editorial cards, image over charcoal panel ── */}
        <div className="md:hidden space-y-8 px-6">
          {exhibits.map((ex) => (
            <Reveal key={`m-${ex.title}`} y={24}>
              <Link
                to="/gallery"
                className="group block overflow-hidden bg-charcoal-deep border border-ivory/5"
                aria-label={`Enter the ${ex.title} exhibit`}
              >
                <Placeholder
                  subject={ex.subject}
                  location={ex.location}
                  filename={ex.filename}
                  mobileNatural
                  className="w-full"
                  tone="deep"
                  focus={ex.focus}
                />

                <div className="px-6 py-8 bg-charcoal-deep">
                  <div className="eyebrow text-bronze text-[0.6rem]">
                    <span className="rule-bronze mr-2" />
                    Collection
                  </div>
                  <h3 className="mt-3 font-serif text-ivory leading-[1.0] tracking-[-0.02em] text-[2rem]">
                    {ex.title}
                  </h3>
                  <p className="mt-4 font-serif italic text-ivory-muted leading-[1.45] text-base">
                    {ex.line}
                  </p>
                  <p className="mt-4 text-ivory-muted/85 font-light leading-[1.65] text-[0.95rem]">
                    {ex.story}
                  </p>
                  <div className="mt-6 flex items-center gap-3 text-ivory-muted group-hover:text-ivory transition-colors">
                    <span className="eyebrow text-[0.6rem]">Enter the room</span>
                    <span className="block w-8 h-px bg-bronze" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* ── DESKTOP / TABLET (md+): full-bleed exhibit rooms (unchanged) ── */}
        <div className="hidden md:block">
          {exhibits.map((ex) => (
            <Reveal key={ex.title} y={40}>
              <Link
                to="/gallery"
                className="group block relative w-full overflow-hidden focus:outline-none"
                aria-label={`Enter the ${ex.title} exhibit`}
              >
                <div className="relative h-[92svh] min-h-[620px] w-full overflow-hidden">
                  <Placeholder
                    subject={ex.subject}
                    location={ex.location}
                    filename={ex.filename}
                    ratio=""
                    className="absolute inset-0 w-full h-full !aspect-auto"
                    tone="deep"
                    focus={ex.focus}
                  />

                  {/* Slow Ken-Burns feel on hover */}
                  <div
                    className="absolute inset-0 transition-transform duration-[2400ms] ease-out group-hover:scale-[1.04]"
                    aria-hidden
                  />

                  {/* Gradient plate at bottom for legibility */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, oklch(0.10 0.005 240 / 0.88) 0%, oklch(0.10 0.005 240 / 0.35) 30%, transparent 55%)",
                    }}
                  />
                  {/* Caption plate */}
                  <div className="absolute inset-x-0 bottom-0">
                    <div className="container-editorial pb-14 md:pb-20">
                      <div className="eyebrow text-bronze">
                        <span className="rule-bronze mr-3" />
                        Collection
                      </div>
                      <h3
                        className="mt-4 font-serif text-ivory leading-[0.98] tracking-[-0.02em] transition-colors duration-500 group-hover:text-bronze"
                        style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
                      >
                        {ex.title}
                      </h3>
                      <p
                        className="mt-6 max-w-xl font-serif italic text-ivory-muted leading-[1.45]"
                        style={{ fontSize: "clamp(1.15rem, 1.6vw, 1.6rem)" }}
                      >
                        {ex.line}
                      </p>
                      <p
                        className="mt-5 max-w-xl text-ivory-muted/85 font-light leading-[1.7]"
                        style={{ fontSize: "clamp(0.95rem, 1.1vw, 1.1rem)" }}
                      >
                        {ex.story}
                      </p>
                      <div className="mt-10 flex items-center gap-4 text-ivory-muted group-hover:text-ivory transition-colors">
                        <span className="eyebrow">Enter the room</span>
                        <span className="block w-10 h-px bg-bronze transition-all duration-500 group-hover:w-20" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          IV. SIGNATURE STORY — a single frame, held long.
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-40 md:py-56">
        <div className="container-editorial">
          {/* ── Masthead: eyebrow, title, dek, byline ─────────────── */}
          <Reveal>
            <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
              <div className="eyebrow text-bronze justify-center flex items-center">
                <span className="rule-bronze mr-3" />
                Signature Story
              </div>
              <h2
                className="mt-10 font-serif text-ivory leading-[0.98] tracking-[-0.02em]"
                style={{ fontSize: "clamp(2.75rem, 7.5vw, 7rem)" }}
              >
                Dinner
                <br />
                <span className="italic text-ivory-muted">Is Served.</span>
              </h2>
              <p
                className="mt-10 md:mt-12 mx-auto font-serif italic text-ivory-muted max-w-2xl leading-[1.5]"
                style={{ fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)" }}
              >
                Eleven mornings of waiting for a single four-second exchange — and the small, bright
                life it was meant to feed.
              </p>
              <div className="mt-12 flex items-center justify-center gap-6 eyebrow text-ivory-muted/80">
                <span>Words &amp; Photograph · Paul Marto</span>
                <span className="w-6 h-px bg-bronze/60" />
                <span>Sonoran Desert</span>
              </div>
            </div>
          </Reveal>

          {/* ── The photograph, given the room a feature deserves ── */}
          <Reveal y={48}>
            <figure className="max-w-6xl mx-auto">
              <Placeholder
                subject="Roadrunner returning with prey to its chicks"
                location="Sonoran Desert · 06:14"
                filename="story-dinner-is-served.jpg"
                ratio="aspect-[16/10]"
                focus="center"
                mobileObjectPosition="50% 50%"
                tone="deep"
              />
              <figcaption className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-baseline gap-6 md:gap-10 border-t border-border pt-6">
                <span className="eyebrow text-ivory-muted">Greater Roadrunner with lizard</span>
                <span className="hidden md:block w-8 h-px bg-bronze/60 justify-self-center" />
                <span className="eyebrow text-ivory-muted/70 md:text-right">
                  Sonoran Desert · 06:14
                </span>
              </figcaption>
            </figure>
          </Reveal>

          {/* ── Long-form body, set like a magazine column ────────── */}
          <Reveal>
            <div className="max-w-2xl mx-auto mt-24 md:mt-32">
              <p className="font-serif text-ivory text-xl md:text-2xl leading-[1.75] first-letter:font-serif first-letter:text-6xl md:first-letter:text-7xl first-letter:float-left first-letter:mr-4 first-letter:mt-1 first-letter:text-bronze first-letter:leading-[0.85]">
                For eleven mornings, Paul returned to the same ironwood at the edge of the arroyo —
                camera set low, breath held, the desert cooling around him before first light. He
                watched a pair of adults move through the mesquite in silhouette, and he learned the
                shape of their route without ever seeing what they carried home.
              </p>
              <p className="mt-8 font-serif text-ivory-muted text-lg md:text-xl leading-[1.8]">
                On the twelfth morning, at 06:14, one of them arrived with a lizard held crosswise
                in its beak — crest raised, eye lit copper by a sun that had not yet cleared the
                ridge. The exchange lasted less than four seconds. What the frame keeps is not the
                hunt, but the errand: a parent, arriving.
              </p>
            </div>
          </Reveal>

          {/* ── Pull quote, its own moment on the page ────────────── */}
          <Reveal y={56}>
            <figure className="max-w-4xl mx-auto mt-20 md:mt-28">
              <span
                aria-hidden
                className="block font-serif text-bronze/80 leading-none text-center"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
              >
                &ldquo;
              </span>
              <blockquote
                className="mt-2 font-serif italic text-ivory text-center leading-[1.4]"
                style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.4rem)" }}
              >
                Some wildlife moments last only a fraction of a second. Others require hours of
                patience. The most extraordinary stories unfold when no one else is watching.
              </blockquote>
              <figcaption className="mt-8 eyebrow text-ivory-muted text-center">
                <span className="rule-bronze mr-3 inline-block align-middle" />
                Paul Marto, from the field
              </figcaption>
            </figure>
          </Reveal>

          {/* ── Continue reading ──────────────────────────────────── */}
          <Reveal>
            <div className="mt-20 md:mt-28 text-center">
              <Link
                to="/stories"
                className="group inline-flex items-center gap-4 text-ivory hover:text-bronze transition-colors"
              >
                <span className="eyebrow">Read the Full Story</span>
                <span className="block w-10 h-px bg-bronze transition-all duration-500 group-hover:w-20" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          V. FINE ART PRINTS — a curated hang, not a shop.
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-40 md:py-56 border-t border-border">
        <div className="container-editorial">
          <Reveal>
            <div className="max-w-3xl mb-20 md:mb-28">
              <div className="eyebrow">
                <span className="rule-bronze mr-3" />
                Fine Art Prints
              </div>
              <h2
                className="mt-8 font-serif text-ivory leading-[1.0] tracking-[-0.02em]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
              >
                Held in the hand.
                <br />
                <span className="italic text-ivory-muted">Hung on the wall.</span>
              </h2>
            </div>
          </Reveal>

          {/* Asymmetric gallery wall — three prints hung at different
              scales and vertical offsets, the way a curator would place
              them. Not a card grid. */}
          <div className="grid grid-cols-12 gap-x-6 md:gap-x-10 gap-y-20 md:gap-y-32">
            {/* Print I — large, portrait, hung slightly low */}
            <Reveal y={40} className="col-span-12 md:col-span-6 md:col-start-1 md:mt-16">
              <Link to="/prints" className="group block">
                <div className="overflow-hidden">
                  <Placeholder
                    subject="Red Fox"
                    location="Fine art print — coming soon"
                    filename="mammals-fox.jpg"
                    ratio="aspect-[4/5]"
                    tone="deep"
                    className="transition-transform duration-[1800ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-8 flex items-baseline justify-between gap-6">
                  <div>
                    <div className="eyebrow text-bronze text-[0.6rem]">Fine Art Print</div>
                    <h3 className="mt-2 font-serif text-3xl md:text-4xl text-ivory group-hover:text-bronze transition-colors">
                      Title Pending Artist Approval
                    </h3>

                    <p className="mt-2 text-sm text-ivory-muted">Red Fox (Vulpes vulpes)</p>
                  </div>
                  <span className="eyebrow text-ivory-muted/70 text-[0.6rem] text-right shrink-0">
                    Edition — Pending Artist Approval
                  </span>
                </div>
              </Link>
            </Reveal>

            {/* Print II — smaller, landscape, sits at the top of the right column */}
            <Reveal y={40} className="col-span-12 md:col-span-5 md:col-start-8">
              <Link to="/prints" className="group block">
                <div className="overflow-hidden">
                  <Placeholder
                    subject="Roadrunner with lizard"
                    location="Fine art print — coming soon"
                    filename="story-dinner-is-served.jpg"
                    ratio="aspect-[5/4]"
                    focus="center"
                    mobileObjectPosition="50% 50%"
                    tone="deep"
                    className="transition-transform duration-[1800ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-6">
                  <div>
                    <div className="eyebrow text-bronze text-[0.6rem]">Fine Art Print</div>
                    <h3 className="mt-2 font-serif text-2xl md:text-3xl text-ivory group-hover:text-bronze transition-colors">
                      Dinner Is Served
                    </h3>
                    <p className="mt-2 text-sm text-ivory-muted">Greater Roadrunner</p>
                  </div>
                  <span className="eyebrow text-ivory-muted/70 text-[0.6rem] text-right shrink-0">
                    Edition — Pending Artist Approval
                  </span>
                </div>
              </Link>
            </Reveal>

            {/* Print III — narrow, tall, offset right, hung lower on the wall */}
            <Reveal y={40} className="col-span-12 md:col-span-4 md:col-start-9 md:mt-8">
              <Link to="/prints" className="group block">
                <div className="overflow-hidden">
                  <Placeholder
                    subject="Hummingbird at the nest"
                    location="Fine art print — coming soon"
                    filename="conservation-hummingbird-nest.jpg"
                    ratio="aspect-[3/4]"
                    tone="deep"
                    className="transition-transform duration-[1800ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-6">
                  <div className="eyebrow text-bronze text-[0.6rem]">Fine Art Print</div>
                  <h3 className="mt-2 font-serif text-2xl text-ivory group-hover:text-bronze transition-colors">
                    Title Pending Artist Approval
                  </h3>

                  <p className="mt-2 text-sm text-ivory-muted">
                    Anna's Hummingbird · Edition — Pending Artist Approval
                  </p>
                </div>
              </Link>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-20 md:mt-24 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-border pt-10">
              <p
                className="max-w-xl font-serif italic text-ivory-muted leading-[1.5]"
                style={{ fontSize: "clamp(1.05rem, 1.5vw, 1.35rem)" }}
              >
                Archival fine art prints, hand-signed and numbered by Paul. Paper, edition sizes,
                and pricing will be announced with the collection release.
              </p>
              <Link
                to="/prints"
                className="group inline-flex items-center gap-4 text-ivory hover:text-bronze transition-colors shrink-0"
              >
                <span className="eyebrow">Browse the Editions</span>
                <span className="block w-10 h-px bg-bronze transition-all duration-500 group-hover:w-20" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          VI. BEHIND THE PHOTOGRAPH — an editorial pause before the prints.
         ══════════════════════════════════════════════════════════════ */}
      <section aria-label="Behind the Photograph" className="py-40 md:py-56 border-t border-border">
        {/* Masthead — quiet, centered, museum wall label */}
        <div className="container-editorial">
          <Reveal>
            <div className="max-w-4xl mx-auto text-center">
              <div className="eyebrow justify-center inline-flex items-center">
                <span className="rule-bronze mr-3" />
                Field Notes
              </div>
              <h2
                className="mt-10 font-serif text-ivory leading-[0.98] tracking-[-0.02em]"
                style={{ fontSize: "clamp(2.75rem, 7vw, 6.5rem)" }}
              >
                Dinner Is
                <span className="italic text-ivory-muted"> Served.</span>
              </h2>
            </div>
          </Reveal>
        </div>

        {/* Full-bleed cinematic photograph */}
        <Reveal y={40}>
          <figure className="mt-20 md:mt-28">
            <div className="relative w-full overflow-hidden">
              <Placeholder
                subject="Roadrunner returning with prey"
                location="Field observation"
                filename="story-dinner-is-served.jpg"
                ratio="aspect-[21/9]"
                focus="center"
                mobileObjectPosition="50% 50%"
                tone="deep"
                className="w-full"
              />
            </div>
            <figcaption className="container-editorial mt-6">
              <div className="flex items-center gap-6 text-ivory-muted">
                <span className="block h-px w-12 bg-bronze/60" />
                <span className="eyebrow">Greater Roadrunner · Field Observation</span>
              </div>
            </figcaption>
          </figure>
        </Reveal>

        {/* Story introduction — generous whitespace, editorial column */}
        <div className="container-editorial mt-24 md:mt-32">
          <Reveal>
            <div className="max-w-2xl mx-auto">
              <p
                className="font-serif text-ivory leading-[1.55] tracking-[-0.005em]"
                style={{ fontSize: "clamp(1.35rem, 2vw, 1.9rem)" }}
              >
                Some photographs happen in an instant.
                <br />
                <span className="text-ivory-muted italic">Others require hours of patience.</span>
              </p>
              <p
                className="mt-10 text-ivory-muted leading-[1.85] font-light"
                style={{ fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)" }}
              >
                <span className="font-serif italic text-ivory">Dinner Is Served</span> captures one
                of those fleeting moments — a roadrunner returning with food for its young. The
                image is more than a wildlife photograph; it is a reminder that the greatest stories
                in nature often unfold in silence and disappear just as quickly.
              </p>
              <p
                className="mt-8 text-ivory-muted leading-[1.85] font-light"
                style={{ fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)" }}
              >
                Every photograph in the Martography collection represents patience, observation, and
                deep respect for the wildlife being photographed.
              </p>

              <div className="mt-16 text-center">
                <Link
                  to="/stories/$slug"
                  params={{ slug: "dinner-is-served" }}
                  className="group inline-flex items-center gap-4 text-ivory hover:text-bronze transition-colors"
                >
                  <span className="eyebrow">Read the Full Story</span>
                  <span className="block w-10 h-px bg-bronze transition-all duration-500 group-hover:w-20" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          VII. CONSERVATION & EDUCATION — quiet, in-service.
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-40 md:py-56">
        <div className="container-editorial">
          <div className="grid gap-16 lg:gap-24 lg:grid-cols-[1.1fr_1fr] items-center">
            <Reveal y={40}>
              <Placeholder
                subject="Field Education Program"
                location="Students & the archive"
                filename="education.jpg"
                ratio="aspect-[5/6]"
                tone="deep"
              />
            </Reveal>
            <Reveal>
              <div>
                <div className="eyebrow">
                  <span className="rule-bronze mr-3" />
                  Conservation &amp; Education
                </div>
                <h2
                  className="mt-8 font-serif text-ivory leading-[1.0] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)" }}
                >
                  Storytelling in
                  <br />
                  <span className="italic text-ivory-muted">service of the wild.</span>
                </h2>
                <p
                  className="mt-10 max-w-lg text-ivory-muted leading-[1.75] font-light"
                  style={{ fontSize: "clamp(1.05rem, 1.3vw, 1.2rem)" }}
                >
                  School programs, speaking engagements, and conservation partnerships built around
                  a single idea — when a story is told well, protection follows.
                </p>

                {/* Programme areas — read as an editorial line, not a stat grid */}
                <div className="mt-14 border-t border-border pt-8">
                  <div className="eyebrow text-ivory-muted/70">
                    <span className="rule-bronze mr-3" />
                    The Work
                  </div>
                  <p
                    className="mt-5 font-serif text-ivory leading-[1.35]"
                    style={{ fontSize: "clamp(1.15rem, 1.7vw, 1.55rem)" }}
                  >
                    Classroom programmes for K–12 and universities
                    <span className="text-bronze"> · </span>
                    keynotes and gallery talks
                    <span className="text-bronze"> · </span>
                    field partnerships with conservation NGOs.
                  </p>
                </div>

                <Link
                  to="/education"
                  className="group inline-flex items-center gap-4 mt-12 text-ivory hover:text-bronze transition-colors"
                >
                  <span className="eyebrow">Explore Programs</span>
                  <span className="block w-10 h-px bg-bronze transition-all duration-500 group-hover:w-20" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          VIII. ABOUT PAUL — the feature article.
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-40 md:py-56 border-t border-border">
        <div className="container-editorial">
          {/* Masthead */}
          <Reveal>
            <div className="max-w-4xl">
              <div className="eyebrow">
                <span className="rule-bronze mr-3" />
                The Photographer · A Feature
              </div>
              <h2
                className="mt-8 font-serif text-ivory leading-[0.98] tracking-[-0.02em]"
                style={{ fontSize: "clamp(2.75rem, 6.5vw, 6rem)" }}
              >
                Every Photograph
                <br />
                <span className="italic text-ivory-muted">Has a Story.</span>
              </h2>
              <div className="mt-10 flex items-center gap-6 text-ivory-muted">
                <span className="block h-px w-16 bg-bronze/60" />
                <span className="eyebrow">
                  A Portrait of Paul Marto · Carmel Valley to Orange County
                </span>
              </div>
            </div>
          </Reveal>

          {/* Portrait + opening column */}
          <div className="mt-24 grid gap-16 lg:gap-24 lg:grid-cols-[1fr_1.2fr] items-start">
            <Reveal y={40}>
              <div className="lg:sticky lg:top-32">
                <Placeholder
                  subject="Paul Marto · Portrait"
                  location="Studio · black & white"
                  filename="about-portrait.jpg"
                  ratio="aspect-[4/5]"
                  tone="deep"
                />
                <p className="mt-6 text-[0.72rem] uppercase tracking-[0.28em] text-ivory-muted/70">
                  Paul Marto · Photographer & Conservation Advocate
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="max-w-xl">
                <p
                  className="font-serif italic text-ivory-muted leading-[1.45]"
                  style={{ fontSize: "clamp(1.35rem, 2.2vw, 1.9rem)" }}
                >
                  Some photographs happen in an instant. Others take hours — or even days — of
                  patience, observation, and quiet persistence. For Paul Marto, those moments are
                  what wildlife photography is all about.
                </p>

                <p
                  className="mt-10 text-ivory-muted leading-[1.85] font-light first-letter:font-serif first-letter:text-bronze first-letter:text-6xl first-letter:leading-none first-letter:float-left first-letter:mr-3 first-letter:mt-1"
                  style={{ fontSize: "clamp(1rem, 1.2vw, 1.15rem)" }}
                >
                  A lifelong photographer whose passion began in the early 1980s, Paul has spent
                  decades documenting the remarkable wildlife that thrives throughout California.
                  Raised in the natural beauty of Carmel Valley and now based in Orange County, he
                  developed a deep appreciation for the animals that share our landscapes — many of
                  which go unnoticed by those who pass them every day.
                </p>

                <p
                  className="mt-8 text-ivory-muted leading-[1.85] font-light"
                  style={{ fontSize: "clamp(1rem, 1.2vw, 1.15rem)" }}
                >
                  Rather than simply photographing wildlife, Paul seeks to capture behavior,
                  emotion, and the fleeting interactions that reveal an animal's true character.
                  Whether it's a bobcat emerging silently from the brush, a roadrunner returning to
                  its nest with a meal, or a hummingbird nurturing its young, every photograph
                  represents patience, preparation, and respect for the natural world.
                </p>

                <p
                  className="mt-8 text-ivory-muted leading-[1.85] font-light"
                  style={{ fontSize: "clamp(1rem, 1.2vw, 1.15rem)" }}
                >
                  His work has been recognized by organizations including National Geographic, the
                  Bolsa Chica Conservancy, the Sea &amp; Sage Audubon Society, the Environmental
                  Nature Center, The Orange County Register, Irvine World News, and Irvine Valley
                  College. His photography has also earned honors in juried exhibitions, regional
                  competitions, and community showcases throughout Southern California.
                </p>

                <p
                  className="mt-10 font-serif italic text-ivory leading-[1.5]"
                  style={{ fontSize: "clamp(1.15rem, 1.6vw, 1.4rem)" }}
                >
                  More important than awards, however, is the mission behind the work.
                </p>

                <p
                  className="mt-8 text-ivory-muted leading-[1.85] font-light"
                  style={{ fontSize: "clamp(1rem, 1.2vw, 1.15rem)" }}
                >
                  Paul believes wildlife photography should inspire people to slow down, observe
                  more carefully, and develop a deeper appreciation for the incredible animals that
                  live alongside us.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Pull quote — full bleed within container */}
          <Reveal>
            <figure className="mt-32 md:mt-44 max-w-5xl mx-auto text-center">
              <span
                aria-hidden
                className="block font-serif text-bronze/60 leading-none"
                style={{ fontSize: "clamp(5rem, 10vw, 9rem)" }}
              >
                &ldquo;
              </span>
              <blockquote
                className="-mt-6 font-serif italic text-ivory leading-[1.35] tracking-[-0.01em]"
                style={{ fontSize: "clamp(1.75rem, 3.4vw, 3rem)" }}
              >
                Through my photography, I hope to bring awareness to the incredible collection of
                wildlife that calls Southern California home. The more we understand these
                remarkable animals and the habitats they depend on, the better prepared we are to
                live alongside them. My goal is to create photographs that inspire, educate, and
                encourage others to see the natural world with greater curiosity, appreciation, and
                respect.
              </blockquote>
              <figcaption className="mt-12 flex items-center justify-center gap-5 text-ivory-muted">
                <span className="block h-px w-12 bg-bronze/60" />
                <span className="eyebrow">Paul Marto</span>
                <span className="block h-px w-12 bg-bronze/60" />
              </figcaption>
            </figure>
          </Reveal>

          {/* Recognition */}
          <Reveal>
            <div className="mt-32 md:mt-44 border-t border-ivory/15 pt-16">
              <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
                <div>
                  <div className="eyebrow">
                    <span className="rule-bronze mr-3" />
                    Recognition
                  </div>
                  <h3
                    className="mt-6 font-serif text-ivory leading-[1.05] tracking-[-0.01em]"
                    style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.5rem)" }}
                  >
                    Featured &amp; honored
                    <br />
                    <span className="italic text-ivory-muted">by institutions</span>
                    <br />
                    across California.
                  </h3>
                </div>

                <ul className="divide-y divide-ivory/10">
                  {[
                    "National Geographic",
                    "Bolsa Chica Conservancy",
                    "Sea & Sage Audubon Society",
                    "Environmental Nature Center",
                    "The Orange County Register",
                    "Irvine World News",
                    "Irvine Valley College",
                    "City of Irvine 40th Anniversary Photo Contest",
                  ].map((name) => (
                    <li key={name} className="py-6 md:py-7 flex items-baseline gap-6">
                      <span
                        className="font-serif text-bronze/70 tabular-nums"
                        style={{ fontSize: "0.95rem" }}
                      >
                        ·
                      </span>
                      <span
                        className="font-serif text-ivory leading-[1.25]"
                        style={{ fontSize: "clamp(1.15rem, 1.7vw, 1.55rem)" }}
                      >
                        {name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-16">
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-4 text-ivory hover:text-bronze transition-colors"
                >
                  <span className="eyebrow">Read the Full Biography</span>
                  <span className="block w-10 h-px bg-bronze transition-all duration-500 group-hover:w-20" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          IX. NEWSLETTER — the field dispatch.
         ══════════════════════════════════════════════════════════════ */}
      <section className="py-40 md:py-56 border-t border-border">
        <div className="container-editorial">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="eyebrow text-bronze justify-center flex items-center">
                <span className="rule-bronze mr-3" />
                Field Dispatch
              </div>
              <h2
                className="mt-10 font-serif text-ivory leading-[1.0] tracking-[-0.02em]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5.25rem)" }}
              >
                A quiet letter,
                <br />
                <span className="italic text-ivory-muted">four times a year.</span>
              </h2>
              <p
                className="mt-10 max-w-xl mx-auto text-ivory-muted leading-[1.75] font-light"
                style={{ fontSize: "clamp(1rem, 1.2vw, 1.15rem)" }}
              >
                A new photograph, a short story from the field, and word of the next expedition. No
                noise, no marketing — just the archive as it grows.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  form.reset();
                }}
                className="mt-14 mx-auto max-w-xl flex flex-col sm:flex-row items-stretch gap-0 border-b border-ivory/25 focus-within:border-bronze transition-colors"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Your email address"
                  className="flex-1 bg-transparent py-5 px-1 text-ivory placeholder:text-ivory-muted/50 font-serif text-lg outline-none"
                />
                <button
                  type="submit"
                  className="eyebrow text-bronze hover:text-ivory transition-colors py-5 sm:pl-8 text-left sm:text-right"
                >
                  Subscribe →
                </button>
              </form>

              <p className="mt-6 text-[0.68rem] uppercase tracking-[0.28em] text-ivory-muted/60">
                No spam. Unsubscribe with a single click.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
