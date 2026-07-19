import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Placeholder } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";
import {
  categoryLabels,
  getPhotosForSpecies,
  getPublicSpecies,
  wildlifeCategoryOrder,
} from "@/content";

export const Route = createFileRoute("/species")({
  head: () => ({
    meta: [
      { title: "Species — Martography" },
      {
        name: "description",
        content: "Browse the wildlife species documented in the Martography archive.",
      },
    ],
  }),
  component: SpeciesRouteShell,
});

function SpeciesRouteShell() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return pathname.replace(/\/+$/, "") === "/species" ? <SpeciesIndex /> : <Outlet />;
}

function SpeciesIndex() {
  const publicSpecies = getPublicSpecies();
  const populatedCategories = wildlifeCategoryOrder.filter((category) =>
    publicSpecies.some((item) => item.category === category),
  );

  return (
    <>
      <PageHeader
        eyebrow="Wildlife Archive · Species"
        title="A growing record of wild lives."
        intro="Browse the animals documented across the Martography archive. Each species record gathers every publicly released photograph in one place."
      />

      <div className="container-editorial pb-32 md:pb-48">
        {populatedCategories.map((category, categoryIndex) => {
          const categorySpecies = publicSpecies.filter((item) => item.category === category);
          return (
            <section
              key={category}
              className={categoryIndex === 0 ? "" : "border-t border-border pt-20 md:pt-28"}
              aria-labelledby={`species-${category}`}
            >
              <Reveal>
                <div className="mb-12 flex items-end justify-between gap-8 md:mb-16">
                  <h2
                    id={`species-${category}`}
                    className="font-serif text-4xl text-ivory md:text-6xl"
                  >
                    {categoryLabels[category]}
                  </h2>
                  <span className="eyebrow text-ivory-muted/60">
                    {categorySpecies.length.toString().padStart(2, "0")} species
                  </span>
                </div>
              </Reveal>

              <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-10 xl:gap-y-20">
                {categorySpecies.map((item, index) => {
                  const itemPhotos = getPhotosForSpecies(item.id);
                  const cover = itemPhotos[0];
                  return (
                    <Reveal key={item.id} delay={(index % 3) * 100}>
                      <Link
                        to="/species/$slug"
                        params={{ slug: item.slug }}
                        className="group block focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bronze"
                      >
                        <Placeholder
                          subject={cover.alt}
                          responsiveImageKey={cover.responsiveImageKey}
                          mode="natural"
                          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                        />
                        <div className="mt-5 border-t border-border pt-5">
                          <h3 className="font-serif text-3xl text-ivory transition-colors group-hover:text-bronze">
                            {item.commonName}
                          </h3>
                          <div className="mt-2 flex items-center justify-between gap-6">
                            {item.scientificName ? (
                              <span className="text-sm italic text-ivory-muted">
                                {item.scientificName}
                              </span>
                            ) : (
                              <span />
                            )}
                            <span className="eyebrow text-ivory-muted/60">
                              {itemPhotos.length} {itemPhotos.length === 1 ? "work" : "works"}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
