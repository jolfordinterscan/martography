import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { Placeholder } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";
import { photographs, categoryLabels, type PhotoCategory } from "@/data/photographs";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Martography" },
      {
        name: "description",
        content:
          "A curated gallery of wildlife photography by Paul Marto — birds, mammals, and rare behavior.",
      },
      { property: "og:title", content: "Gallery — Martography" },
      {
        property: "og:description",
        content: "A curated gallery of wildlife photography by Paul Marto.",
      },
    ],
  }),
  component: Gallery,
});

type Filter = PhotoCategory | "all";
const filters: Filter[] = ["all", "birds", "mammals", "behavior", "conservation"];

function Gallery() {
  const [active, setActive] = useState<Filter>("all");
  const shown = active === "all" ? photographs : photographs.filter((p) => p.category === active);

  return (
    <>
      <PageHeader
        eyebrow="Gallery · Collected Works"
        title="Frames from the field."
        intro="A rotating selection from years of quiet observation. Every image is made in the wild — no baiting, no captive subjects."
      />

      <section className="pb-32 md:pb-48">
        <div className="container-editorial">
          {/* Filter rail */}
          <Reveal>
            <div className="mb-16 md:mb-20 flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-border pb-6">
              {filters.map((f) => {
                const isActive = f === active;
                return (
                  <button
                    key={f}
                    onClick={() => setActive(f)}
                    className={`text-[0.72rem] uppercase tracking-[0.22em] transition-colors ${
                      isActive ? "text-ivory" : "text-ivory-muted hover:text-ivory"
                    }`}
                    aria-pressed={isActive}
                  >
                    {isActive && <span className="rule-bronze mr-3 align-middle" />}
                    {categoryLabels[f]}
                  </button>
                );
              })}
              <span className="ml-auto eyebrow text-ivory-muted/60">
                {shown.length.toString().padStart(2, "0")} {shown.length === 1 ? "frame" : "frames"}
              </span>
            </div>
          </Reveal>

          <div className="grid gap-8 md:gap-12 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((img, i) => (
              <Reveal
                key={img.slug}
                delay={(i % 3) * 120}
                className={img.span ? "lg:col-span-2" : ""}
              >
                <Link to="/gallery/$slug" params={{ slug: img.slug }} className="group block">
                  <figure>
                    <Placeholder
                      subject={img.title}
                      location={img.location}
                      filename={img.filename}
                      mode="natural"
                    />
                    <figcaption className="mt-5 flex items-start justify-between gap-6">
                      <div>
                        <div className="eyebrow text-bronze">{img.location}</div>
                        <div className="mt-2 font-serif text-2xl md:text-3xl text-ivory transition-colors group-hover:text-bronze">
                          {img.title}
                        </div>
                        <div className="mt-1 text-xs text-ivory-muted/70 italic">{img.species}</div>
                      </div>
                    </figcaption>
                  </figure>
                </Link>
              </Reveal>
            ))}
          </div>

          {shown.length === 0 && (
            <p className="text-center text-ivory-muted mt-24">
              No photographs in this collection yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
