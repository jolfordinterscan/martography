import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Placeholder } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Education & Conservation — Martography" },
      {
        name: "description",
        content:
          "Wildlife photography programs, student workshops, conservation talks, and teacher resources for schools, libraries, and nature centers by Paul Marto.",
      },
      { property: "og:title", content: "Education & Conservation — Martography" },
      {
        property: "og:description",
        content:
          "Presentations, guided photography walks, workshops, and conservation talks for students, educators, and community organizations.",
      },
    ],
  }),
  component: Education,
});

/* ============================================================
   Audiences — who these programs are built for
   ============================================================ */
const audiences = [
  { label: "Elementary Schools",       note: "Grades K–5" },
  { label: "Middle Schools",           note: "Grades 6–8" },
  { label: "High Schools",             note: "Grades 9–12" },
  { label: "Nature Centers",           note: "All ages" },
  { label: "Libraries",                note: "Community programming" },
  { label: "Community Organizations",  note: "Clubs, scouts, camps" },
];

/* ============================================================
   Programs — the six pillars
   ============================================================ */
type Program = {
  numeral: string;
  eyebrow: string;
  title: string;
  ages: string;
  format: string;
  duration: string;
  body: string;
  highlights: string[];
};

const programs: Program[] = [
  {
    numeral: "I",
    eyebrow: "In the Classroom",
    title: "School Presentations",
    ages: "K–12",
    format: "Assembly · Classroom · Auditorium",
    duration: "45–60 minutes",
    body:
      "A cinematic, story-first presentation that carries students into the lives of the animals in Paul's photographs — how they live, what they need, and why paying attention matters. Every image is a doorway into a bigger question about the natural world.",
    highlights: [
      "Full-screen wildlife photography, projected large",
      "Age-appropriate storytelling, adapted per grade band",
      "Live Q&A designed to reward curiosity",
    ],
  },
  {
    numeral: "II",
    eyebrow: "Outside, Together",
    title: "Guided Wildlife Photography Walks",
    ages: "Ages 8+ with an adult · Teens · Adults",
    format: "Small-group field outing",
    duration: "2–3 hours",
    body:
      "A slow walk through a local park, preserve, or schoolyard, learning to see the wildlife that has always been there. Students learn to read light, movement, and behavior — the same skills Paul uses in the field — and leave with a handful of their own photographs.",
    highlights: [
      "Any camera or smartphone welcome",
      "Held at a partner nature center, preserve, or school grounds",
      "Focus on ethical, low-impact observation",
    ],
  },
  {
    numeral: "III",
    eyebrow: "Hands on the Camera",
    title: "Student Photography Workshops",
    ages: "Grades 5–12",
    format: "Single session or multi-week series",
    duration: "90 minutes to a full semester unit",
    body:
      "A workshop for young photographers who want to go deeper — composition, patience, light, and the quiet discipline of waiting for a wild animal to allow itself to be seen. Students critique their own work and build a small portfolio by the end of the series.",
    highlights: [
      "Foundational technique — no jargon, no gatekeeping",
      "Group critiques modeled on how working photographers edit",
      "Final showcase or in-school exhibit",
    ],
  },
  {
    numeral: "IV",
    eyebrow: "For Older Audiences",
    title: "Conservation Talks",
    ages: "High School · Adults · Community",
    format: "Keynote · Fireside · Panel",
    duration: "45–75 minutes",
    body:
      "A longer-form talk for high school assemblies, library series, and community groups on what a life spent watching wildlife has to teach us — about attention, about habitat, and about the small, local choices that decide whether a species stays.",
    highlights: [
      "Grounded in first-person field stories",
      "Framed around stewardship, not alarm",
      "Ends with concrete, local ways to help",
    ],
  },
  {
    numeral: "V",
    eyebrow: "For the Educator",
    title: "Teacher Resources",
    ages: "For classroom teachers & librarians",
    format: "Printable guide · Discussion prompts",
    duration: "Sent ahead of each visit",
    body:
      "Every school and library visit comes with a companion packet built for teachers: pre-visit discussion prompts, a short vocabulary sheet, curriculum-aligned follow-up activities, and a small selection of photographs cleared for classroom display and student writing prompts.",
    highlights: [
      "Aligned to grade-band science and language arts standards",
      "Photograph packet cleared for in-classroom educational use",
      "Optional follow-up video Q&A with the artist",
    ],
  },
  {
    numeral: "VI",
    eyebrow: "Plan a Visit",
    title: "Booking Inquiries",
    ages: "All partner organizations",
    format: "Direct inquiry · Custom program",
    duration: "Typically booked 6–10 weeks ahead",
    body:
      "Every visit is shaped around the audience — a first-grade classroom is not a library evening series is not a high school assembly. Reach out with your school, dates, grade band, and what you'd like students to walk away with, and Paul will design the visit with you.",
    highlights: [
      "Public schools · Title I schools · non-profit rates available",
      "Travel throughout the region; virtual visits offered nationally",
      "Two-week response window on all inquiries",
    ],
  },
];

function Education() {
  return (
    <>
      <PageHeader
        eyebrow="Education & Conservation"
        title="When a child learns to look, a species gains a defender."
        intro="Wildlife photography programs, workshops, and conservation talks for schools, libraries, nature centers, and community organizations — designed to grow curiosity, stewardship, and respect for the animals we share the land with."
      />

      {/* ===== Hero Image ===== */}
      <section className="pb-20 md:pb-28">
        <div className="container-editorial">
          <Reveal>
            <Placeholder
              subject="A Field Classroom"
              location="Students, a preserve, and a photograph waiting to be made"
              filename="education-hero.jpg"
              ratio="aspect-[21/9]"
              tone="deep"
            />
            <p className="mt-5 text-xs tracking-[0.3em] uppercase text-ivory/50">
              The Field Classroom
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== Trusted By ===== */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="container-editorial">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
            <div className="lg:col-span-4">
              <div className="eyebrow text-bronze">Trusted By</div>
              <p className="mt-6 text-sm text-ivory/55 leading-[1.7] max-w-xs">
                A partial record of publications, conservancies, and community
                institutions that have featured, exhibited, or welcomed
                Martography's work.
              </p>
            </div>
            <div className="lg:col-span-8">
              <ul className="divide-y divide-border border-t border-border">
                {[
                  "National Geographic",
                  "Bolsa Chica Conservancy",
                  "Sea & Sage Audubon Society",
                  "Environmental Nature Center",
                  "Orange County Register",
                  "Irvine World News",
                  "Irvine Valley College",
                  "City of Irvine 40th Anniversary Photo Contest",
                ].map((name) => (
                  <li
                    key={name}
                    className="py-6 md:py-7 font-serif text-ivory/90 leading-tight"
                    style={{ fontSize: "clamp(1.35rem, 2.2vw, 1.9rem)" }}
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Curator's Note ===== */}
      <section className="py-24 md:py-36 border-t border-border">
        <div className="container-editorial">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
            <div className="lg:col-span-4">
              <div className="eyebrow text-bronze">A Note from Paul</div>
            </div>
            <div className="lg:col-span-8">
              <p
                className="font-serif italic text-ivory/90 leading-[1.35]"
                style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)" }}
              >
                "The first bird a student really <em>sees</em> is the one they'll spend the rest of their life protecting. My job in a classroom is not to teach photography. It's to help young people slow down long enough to fall in love with what's already outside the window."
              </p>
              <p className="mt-8 text-sm tracking-[0.25em] uppercase text-ivory/50">
                — Paul Marto
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Audiences ===== */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="container-editorial">
          <div className="max-w-3xl mb-16 md:mb-20">
            <div className="eyebrow text-bronze">Built For</div>
            <h2
              className="mt-6 font-serif text-ivory leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Wherever young people gather to learn.
            </h2>
          </div>
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((a, i) => (
              <Reveal key={a.label} delay={(i % 3) * 100}>
                <div className="border-t border-border pt-6">
                  <div className="eyebrow text-bronze/80">{a.note}</div>
                  <div className="mt-3 font-serif text-ivory text-2xl leading-tight">
                    {a.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Programs — Six Pillars ===== */}
      <section className="py-24 md:py-36 border-t border-border">
        <div className="container-editorial">
          <div className="max-w-3xl mb-20 md:mb-28">
            <div className="eyebrow text-bronze">The Programs</div>
            <h2
              className="mt-6 font-serif text-ivory leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Six ways to bring wildlife into the room.
            </h2>
            <p className="mt-6 text-lg text-ivory-muted leading-[1.7]">
              Each program is shaped around the audience in front of it. All are grounded in the same belief: attention is the beginning of stewardship.
            </p>
          </div>

          <div className="space-y-24 md:space-y-32">
            {programs.map((p, i) => (
              <Reveal key={p.title} delay={0}>
                <article className="grid gap-10 lg:grid-cols-12 lg:gap-20 border-t border-border pt-14">
                  <div className="lg:col-span-3">
                    <div className="font-serif italic text-bronze/80 text-5xl leading-none">
                      {p.numeral}
                    </div>
                    <div className="mt-6 eyebrow text-ivory/60">{p.eyebrow}</div>
                  </div>

                  <div className="lg:col-span-6">
                    <h3
                      className="font-serif text-ivory leading-[1.05]"
                      style={{ fontSize: "clamp(1.85rem, 3.2vw, 2.75rem)" }}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-6 text-lg text-ivory-muted leading-[1.75]">
                      {p.body}
                    </p>
                    <ul className="mt-8 space-y-3">
                      {p.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex gap-4 text-ivory/85 leading-[1.6]"
                        >
                          <span className="text-bronze mt-2 h-px w-6 shrink-0 bg-bronze/60" aria-hidden />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <aside className="lg:col-span-3 space-y-5 text-sm">
                    <div>
                      <div className="eyebrow text-ivory/45">Audience</div>
                      <div className="mt-2 text-ivory/90">{p.ages}</div>
                    </div>
                    <div>
                      <div className="eyebrow text-ivory/45">Format</div>
                      <div className="mt-2 text-ivory/90">{p.format}</div>
                    </div>
                    <div>
                      <div className="eyebrow text-ivory/45">Length</div>
                      <div className="mt-2 text-ivory/90">{p.duration}</div>
                    </div>
                  </aside>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Curriculum Connections ===== */}
      <section className="py-24 md:py-36 border-t border-border">
        <div className="container-editorial">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
            <div className="lg:col-span-5">
              <div className="eyebrow text-bronze">Curriculum Connections</div>
              <h2
                className="mt-6 font-serif text-ivory leading-[1.05]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
              >
                Aligned with what you're already teaching.
              </h2>
              <p className="mt-8 text-lg text-ivory-muted leading-[1.75]">
                Martography programs are built to reinforce, not replace, the
                classroom. Every visit ties directly into curriculum threads
                teachers are already carrying — supporting educational
                outcomes across science, humanities, and the arts.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="divide-y divide-border border-t border-border">
                {[
                  { subject: "Environmental Science", note: "Habitat, ecosystems, climate" },
                  { subject: "Biology",               note: "Species, adaptation, life cycles" },
                  { subject: "Ecology",               note: "Interdependence & food webs" },
                  { subject: "Conservation",          note: "Stewardship & local action" },
                  { subject: "Observation Skills",    note: "Field notes & attention" },
                  { subject: "Creative Writing",      note: "Nature journaling & narrative" },
                  { subject: "Visual Arts",           note: "Composition, light, color" },
                  { subject: "Photography",           note: "Technical & artistic craft" },
                  { subject: "STEAM",                 note: "Cross-disciplinary integration" },
                  { subject: "Outdoor Education",     note: "Place-based learning" },
                  { subject: "Career Exploration",    note: "Photographer · Naturalist · Educator" },
                ].map((c) => (
                  <li
                    key={c.subject}
                    className="py-5 md:py-6 flex items-baseline justify-between gap-8"
                  >
                    <span
                      className="font-serif text-ivory leading-tight"
                      style={{ fontSize: "clamp(1.2rem, 2vw, 1.65rem)" }}
                    >
                      {c.subject}
                    </span>
                    <span className="text-xs md:text-sm tracking-[0.15em] uppercase text-ivory/50 text-right">
                      {c.note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Martography Wildlife Academy ===== */}
      <section className="py-24 md:py-36 border-t border-border">
        <div className="container-editorial">
          <div className="max-w-4xl">
            <div className="eyebrow text-bronze">A Long-Term Initiative</div>
            <h2
              className="mt-8 font-serif italic text-ivory leading-[1.02]"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.75rem)" }}
            >
              The Martography<br />Wildlife Academy.
            </h2>
            <p className="mt-10 text-lg md:text-xl text-ivory-muted leading-[1.75]">
              An educational initiative devoted to a single idea: that the next
              generation of naturalists, scientists, artists, and stewards
              begins with a child who learns to <em>look</em>. The Wildlife
              Academy is a growing home for programs, projects, and
              partnerships that use wildlife photography as a doorway into
              curiosity, conservation, and careful observation.
            </p>
            <p className="mt-6 text-lg text-ivory-muted leading-[1.75]">
              Schools, libraries, nature centers, scout troops, and youth
              organizations are invited to participate as founding partners as
              new programs launch.
            </p>
          </div>

          <div className="mt-20 md:mt-24">
            <div className="eyebrow text-ivory/45 mb-10">In Development</div>
            <div className="grid gap-x-14 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  t: "Junior Wildlife Photographer",
                  d: "A progression-based program for young photographers to earn recognition as they grow their fieldcraft and portfolio.",
                },
                {
                  t: "Wildlife Field Journals",
                  d: "Illustrated journals designed for young naturalists to sketch, note, and photograph what they see over a season.",
                },
                {
                  t: "Photography Challenges",
                  d: "Seasonal, low-barrier challenges — a backyard bird, a shadow, a single leaf — accessible with any camera or phone.",
                },
                {
                  t: "Student Exhibitions",
                  d: "Community showings of student work, hosted in partnership with local libraries, nature centers, and schools.",
                },
                {
                  t: "Nature Observation Projects",
                  d: "Longitudinal class projects — a tree, a pond, a nesting pair — documented across weeks and shared as a group study.",
                },
                {
                  t: "More to Come",
                  d: "New programs are added as partner organizations join. Reach out to help shape what's built next.",
                  faint: true,
                },
              ].map((p) => (
                <div key={p.t} className="border-t border-border pt-6">
                  <div className="eyebrow text-bronze/80">Coming</div>
                  <h3
                    className={`mt-4 font-serif leading-tight ${p.faint ? "text-ivory/70 italic" : "text-ivory"}`}
                    style={{ fontSize: "clamp(1.35rem, 2.2vw, 1.85rem)" }}
                  >
                    {p.t}
                  </h3>
                  <p className="mt-4 text-ivory-muted leading-[1.7]">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Teacher Resources — Expanded ===== */}
      <section className="py-24 md:py-36 border-t border-border">
        <div className="container-editorial">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
            <div className="lg:col-span-5">
              <div className="eyebrow text-bronze">Teacher Resources</div>
              <h2
                className="mt-6 font-serif text-ivory leading-[1.05]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
              >
                Learning that continues after the lights come up.
              </h2>
              <p className="mt-8 text-lg text-ivory-muted leading-[1.75]">
                Every school, library, and nature center visit includes a
                companion set of educational materials — designed to extend
                the presentation into lessons, activities, and quiet
                observation long after Paul has packed up his camera.
              </p>
              <p className="mt-4 text-sm text-ivory/55 leading-[1.7]">
                Materials are provided as printable PDFs, cleared for
                classroom use. Downloadable links will appear here as each
                resource is finalized.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="divide-y divide-border border-t border-border">
                {[
                  { t: "Teacher Guide",                  d: "Presentation overview, learning objectives, and grade-band notes." },
                  { t: "Classroom Activities",           d: "Short exercises to run before, during, or after the visit." },
                  { t: "Wildlife Observation Journal",   d: "A printable journal for students to record sightings and sketches." },
                  { t: "Student Photography Challenge",  d: "A guided week-long photography prompt for any camera or phone." },
                  { t: "Vocabulary Sheet",               d: "Key terms — habitat, behavior, composition, exposure — by grade level." },
                  { t: "Parent Letter",                  d: "A short letter to send home introducing the program and how families can extend it." },
                  { t: "Follow-up Activities",           d: "Longer-form projects that connect the visit to ongoing curriculum units." },
                ].map((r) => (
                  <li key={r.t} className="py-6 md:py-7 flex items-baseline justify-between gap-6">
                    <div>
                      <div
                        className="font-serif text-ivory leading-tight"
                        style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}
                      >
                        {r.t}
                      </div>
                      <div className="mt-2 text-sm text-ivory-muted leading-[1.6]">{r.d}</div>
                    </div>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-ivory/40 whitespace-nowrap">
                      PDF · Coming
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Field Principles ===== */}
      <section className="py-24 md:py-36 border-t border-border">
        <div className="container-editorial">
          <div className="max-w-3xl">
            <div className="eyebrow text-bronze">In the Field</div>
            <h2
              className="mt-6 font-serif text-ivory leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Three promises every student hears first.
            </h2>
          </div>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "The animal comes first.",
                d: "No photograph is worth stressing, baiting, or crowding a wild animal. Every walk starts with a lesson in distance, quiet, and respect.",
              },
              {
                n: "02",
                t: "Curiosity beats gear.",
                d: "A phone in patient hands will always outperform an expensive camera in impatient ones. We teach attention, not equipment.",
              },
              {
                n: "03",
                t: "Small places matter.",
                d: "You don't have to fly to Africa to meet wildlife. The best classroom is often the schoolyard, the park, or the trail behind the library.",
              },
            ].map((v) => (
              <div key={v.n} className="border-t border-border pt-8">
                <div className="eyebrow text-bronze/80">{v.n}</div>
                <div
                  className="mt-4 font-serif text-ivory leading-[1.15]"
                  style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }}
                >
                  {v.t}
                </div>
                <p className="mt-5 text-ivory-muted leading-[1.7]">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== The Student Experience ===== */}
      <section className="py-24 md:py-36 border-t border-border">
        <div className="container-editorial">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
            <div className="lg:col-span-5">
              <div className="eyebrow text-bronze">The Student Experience</div>
              <h2
                className="mt-6 font-serif italic text-ivory leading-[1.05]"
                style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)" }}
              >
                What they carry home.
              </h2>
              <p className="mt-8 text-lg text-ivory-muted leading-[1.75]">
                A Martography visit doesn't end when the lights come back up.
                Students walk out changed in small, quiet ways — a little more
                patient, a little more observant, and a little more in love
                with the wild lives happening just outside the classroom
                window.
              </p>
              <p className="mt-6 text-lg text-ivory-muted leading-[1.75]">
                Weeks later, a parent will mention that their child stopped in
                the driveway to watch a hummingbird. A teacher will notice a
                student sketching a lizard at recess. Those are the moments
                these programs are built for.
              </p>
            </div>

            <div className="lg:col-span-7">
              <ul className="divide-y divide-border border-t border-border">
                {[
                  {
                    t: "A new appreciation for local wildlife",
                    d: "The finch on the fence. The lizard on the wall. The animals that were always there, suddenly worth watching.",
                  },
                  {
                    t: "Practical observation skills",
                    d: "How to be still. How to listen. How to notice what most people walk right past.",
                  },
                  {
                    t: "Photography techniques",
                    d: "Light, composition, patience — foundational skills for any camera or phone in any young hand.",
                  },
                  {
                    t: "Greater respect for nature",
                    d: "An understanding that wild animals are neighbors, not props, and that distance is a form of kindness.",
                  },
                  {
                    t: "A sense of curiosity",
                    d: "The quiet, life-long habit of asking, \"What is that, and how does it live?\"",
                  },
                  {
                    t: "Inspiration to explore outdoors",
                    d: "A gentle push out the door — into the yard, the park, the trail — camera or phone in hand.",
                  },
                ].map((item, i) => (
                  <li key={item.t} className="py-7 md:py-8">
                    <div className="flex items-baseline gap-6">
                      <span className="eyebrow text-bronze/80 shrink-0 w-8">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3
                          className="font-serif text-ivory leading-tight"
                          style={{ fontSize: "clamp(1.35rem, 2.2vw, 1.9rem)" }}
                        >
                          {item.t}
                        </h3>
                        <p className="mt-3 text-ivory-muted leading-[1.7]">
                          {item.d}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Consultation ===== */}
      <section className="py-32 md:py-48 border-t border-border">
        <div className="container-editorial">
          <Reveal>
            <div className="grid gap-16 lg:grid-cols-12 lg:gap-24">
              <div className="lg:col-span-6">
                <div className="eyebrow text-bronze">A Personal Consultation</div>
                <h2
                  className="mt-8 font-serif italic text-ivory leading-[1.02]"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
                >
                  Let's Inspire the<br />Next Generation Together.
                </h2>
                <p className="mt-10 text-lg md:text-xl text-ivory-muted leading-[1.75]">
                  Meaningful conservation begins with curiosity — and
                  curiosity begins the moment a young person learns to
                  <em> truly see </em> the natural world. A single walk, a
                  single photograph, a single quiet minute of attention can
                  change what a child cares about for the rest of their life.
                </p>
                <p className="mt-6 text-lg text-ivory-muted leading-[1.75]">
                  Every program is shaped around your students. The best
                  visits begin as conversations — tell us a little about your
                  school or organization and Paul will design the experience
                  with you.
                </p>
                <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-3 border border-bronze/70 text-ivory px-10 py-4 text-sm tracking-[0.3em] uppercase hover:bg-bronze hover:text-charcoal-deep transition-colors"
                  >
                    Schedule a Conversation
                    <span aria-hidden>→</span>
                  </Link>
                  <div className="text-xs tracking-[0.25em] uppercase text-ivory/50">
                    Personal reply within two weeks
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="eyebrow text-ivory/45 mb-6">I'm Inquiring On Behalf Of</div>
                <ul className="divide-y divide-border border-t border-border">
                  {[
                    "Elementary School",
                    "Middle School",
                    "High School",
                    "Library",
                    "Nature Center",
                    "Community Organization",
                    "Scout Group",
                    "Homeschool",
                  ].map((audience) => (
                    <li key={audience}>
                      <Link
                        to="/contact"
                        className="group flex items-center justify-between py-5 md:py-6 text-ivory/90 hover:text-ivory transition-colors"
                      >
                        <span
                          className="font-serif leading-tight"
                          style={{ fontSize: "clamp(1.25rem, 2vw, 1.7rem)" }}
                        >
                          {audience}
                        </span>
                        <span
                          aria-hidden
                          className="text-bronze/70 group-hover:text-bronze transition-colors text-lg"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
