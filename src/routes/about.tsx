import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Placeholder } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Paul Marto — Martography" },
      {
        name: "description",
        content:
          "Wildlife photographer Paul Marto on patience, craft, and the quiet drama of the natural world.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Paul Marto."
        intro="Wildlife photographer. Field naturalist. Patient observer."
      />

      <section className="pb-32 md:pb-48">
        <div className="container-editorial">
          <Reveal>
            <div className="grid gap-16 lg:gap-24 lg:grid-cols-[1fr_1.5fr]">
              <Placeholder
                subject="Paul Marto · Portrait"
                location="Studio · black & white"
                filename="about-portrait.jpg"
                ratio="aspect-[4/5]"
                className="max-w-md"
                tone="deep"
              />
              <div
                className="space-y-10 text-ivory-muted leading-[1.75] font-light"
                style={{ fontSize: "clamp(1.05rem, 1.3vw, 1.25rem)" }}
              >
                <p>
                  Paul Marto is a wildlife photographer drawn to the quiet drama of the natural
                  world — the pause before flight, the tension of a hunt, the tenderness of a
                  feeding. His work sits at the intersection of art and field naturalism: images
                  made slowly, on foot, in patient partnership with the animals they portray.
                </p>
                <p>
                  Every frame in the Martography archive is made in the wild. No baiting, no captive
                  subjects, no shortcuts. What arrives on the page is what was there, in the moment
                  — a record of attention as much as a record of a place.
                </p>
                <p>
                  Beyond the camera, Paul leads small-group expeditions, teaches in classrooms and
                  lecture halls, and partners with conservation organizations that share a simple
                  belief: that when a story is told well, protection follows.
                </p>
                <div className="pt-4">
                  <Link to="/contact" className="btn-ghost">
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32 border-t border-border">
        <div className="container-editorial grid gap-14 md:grid-cols-3">
          {[
            {
              t: "Practice",
              d: "In the field, on foot, guided by the animal's rhythm — not the photographer's schedule.",
            },
            {
              t: "Ethics",
              d: "Wildlife first. If an image would cost the animal anything at all, the image is not made.",
            },
            {
              t: "Purpose",
              d: "Photography as a way of paying attention — and inviting others to do the same.",
            },
          ].map((v, i) => (
            <Reveal key={v.t} delay={i * 120}>
              <div className="eyebrow mb-5">
                <span className="rule-bronze mr-3" />
                {v.t}
              </div>
              <p className="text-ivory-muted leading-[1.75] text-lg">{v.d}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
