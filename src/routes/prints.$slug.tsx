import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Placeholder } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";
import {
  getAdjacentPrints,
  getPhotoById,
  getPrintBySlug,
  getPrintDisplayTitle,
  getRelatedPrints,
  getSpeciesForPhoto,
} from "@/content";

export const Route = createFileRoute("/prints/$slug")({
  loader: ({ params }) => {
    const print = getPrintBySlug(params.slug);
    if (!print) throw notFound();
    return { print };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.print
      ? `${getPrintDisplayTitle(loaderData.print)} — Fine Art Print`
      : "Fine Art Print";
    return {
      meta: [
        { title: `${title} — Martography` },
        {
          name: "description",
          content: "A fine art wildlife photograph by Paul Marto, presented for collectors.",
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="pt-40 pb-32 container-editorial text-center">
      <div className="eyebrow text-bronze">Not Found</div>
      <h1 className="mt-6 font-serif text-5xl text-ivory">This print could not be located.</h1>
      <Link to="/prints" className="btn-primary mt-10 inline-block">
        Return to the collection
      </Link>
    </div>
  ),
  component: PrintDetail,
});

function PrintDetail() {
  const { print } = Route.useLoaderData();
  const photo = getPhotoById(print.photoId)!;
  const species = getSpeciesForPhoto(photo.id);
  const speciesName = species?.commonName ?? "Wildlife";
  const [size, setSize] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const displayTitle = getPrintDisplayTitle(print);
  const relatedPrints = getRelatedPrints(print.id);
  const { previous, next } = getAdjacentPrints(print.id);

  return (
    <>
      <article>
        <header className="pt-28 md:pt-36">
          <div className="container-editorial pb-8 md:pb-10">
            <Reveal>
              <Link
                to="/prints"
                className="eyebrow inline-flex text-ivory-muted transition-colors hover:text-bronze focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bronze"
              >
                ← The Collection
              </Link>
            </Reveal>
          </div>

          <Reveal>
            <figure>
              <div className="flex w-full justify-center bg-black/10">
                <Placeholder
                  subject={photo.alt}
                  responsiveImageKey={photo.responsiveImageKey}
                  mode="natural"
                  sizes="100vw"
                  priority
                  className="max-w-full"
                  style={{ width: "auto", maxHeight: "calc(100svh - 7rem)" }}
                />
              </div>

              <figcaption className="container-editorial py-12 md:py-16 lg:py-20">
                <div className="max-w-5xl">
                  <div className="eyebrow text-bronze">Fine Art Photograph · Paul Marto</div>
                  <h1
                    className="mt-5 font-serif leading-[0.96] tracking-[-0.025em] text-ivory"
                    style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
                  >
                    {displayTitle}
                  </h1>
                  <p className="mt-6 text-base font-light tracking-wide text-ivory-muted md:text-lg">
                    <span className="text-ivory">{speciesName}</span>
                    {species?.scientificName && (
                      <span className="ml-3 italic text-ivory-muted">{species.scientificName}</span>
                    )}
                  </p>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </header>

        <section
          className="border-t border-border py-24 md:py-32 lg:py-40"
          aria-labelledby="artwork-description"
        >
          <div className="container-editorial">
            <div className="mx-auto max-w-4xl">
              <Reveal>
                <div className="eyebrow">
                  <span className="rule-bronze mr-3" />
                  The Artwork
                </div>
                <h2 id="artwork-description" className="sr-only">
                  About {displayTitle}
                </h2>
                <p
                  className="mt-10 font-serif font-light leading-[1.45] text-ivory md:mt-14"
                  style={{ fontSize: "clamp(1.75rem, 3.3vw, 3.25rem)" }}
                >
                  {print.description}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        <section
          className="border-t border-border py-24 md:py-32"
          aria-labelledby="print-details-heading"
        >
          <div className="container-editorial">
            <div className="grid gap-16 lg:grid-cols-[0.8fr_1.6fr] lg:gap-24">
              <Reveal>
                <div className="eyebrow">Collector Information</div>
                <h2
                  id="print-details-heading"
                  className="mt-5 font-serif text-4xl leading-tight text-ivory md:text-5xl"
                >
                  The Print
                </h2>
              </Reveal>

              <div className="grid gap-14 md:grid-cols-2 md:gap-12">
                <Reveal>
                  <div className="border-t border-border pt-5">
                    <h3 className="eyebrow text-ivory-muted/70">Archival Presentation</h3>
                    {print.material && (
                      <p className="mt-5 font-serif text-2xl text-ivory">{print.material}</p>
                    )}
                    <p className="mt-5 font-light leading-relaxed text-ivory-muted">
                      Paper, edition, signing, and archival presentation details are being finalized
                      and will be available before launch.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={100}>
                  <fieldset className="border-t border-border pt-5">
                    <legend className="eyebrow text-ivory-muted/70">Available Sizes</legend>
                    <p className="mt-5 font-light leading-relaxed text-ivory-muted">
                      Select a preferred size to include it with your artwork request.
                    </p>
                    <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3">
                      {print.sizes.map((printSize) => {
                        const dimensions = printSize.dimensions;
                        const selected = size === dimensions;
                        return (
                          <button
                            key={dimensions}
                            type="button"
                            onClick={() => setSize(selected ? null : dimensions)}
                            aria-pressed={selected}
                            className={`border-t py-4 text-left font-serif text-lg tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze ${selected ? "border-bronze text-bronze" : "border-border text-ivory hover:border-ivory/50"}`}
                          >
                            {dimensions}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section
          className="border-y border-border py-20 md:py-28"
          aria-labelledby="request-heading"
        >
          <div className="container-editorial">
            <Reveal>
              <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto] lg:gap-20">
                <div className="max-w-3xl">
                  <div className="eyebrow">Private Collector Inquiry</div>
                  <h2
                    id="request-heading"
                    className="mt-5 font-serif text-4xl leading-tight text-ivory md:text-6xl"
                  >
                    Live with the photograph.
                  </h2>
                  <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-ivory-muted">
                    Request availability and presentation details directly from the Martography
                    studio.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="btn-ghost w-fit focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bronze"
                >
                  Request This Artwork
                </button>
              </div>
            </Reveal>
          </div>
        </section>

        {relatedPrints.length > 0 && (
          <section className="py-24 md:py-32 lg:py-40" aria-labelledby="related-prints-heading">
            <div className="container-editorial">
              <Reveal>
                <div className="mb-12 max-w-3xl md:mb-16">
                  <div className="eyebrow">Related Prints</div>
                  <h2
                    id="related-prints-heading"
                    className="mt-5 font-serif text-4xl leading-tight text-ivory md:text-6xl"
                  >
                    From the collection.
                  </h2>
                </div>
              </Reveal>
              <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 xl:grid-cols-3 xl:gap-y-20">
                {relatedPrints.map((relatedPrint, index) => {
                  const relatedPhoto = getPhotoById(relatedPrint.photoId)!;
                  return (
                    <Reveal key={relatedPrint.id} delay={index * 100}>
                      <Link
                        to="/prints/$slug"
                        params={{ slug: relatedPrint.slug }}
                        className="group block focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bronze"
                      >
                        <Placeholder
                          subject={relatedPhoto.alt}
                          responsiveImageKey={relatedPhoto.responsiveImageKey}
                          mode="natural"
                          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                        />
                        <h3 className="mt-5 font-serif text-2xl leading-tight text-ivory transition-colors group-hover:text-bronze md:text-3xl">
                          {getPrintDisplayTitle(relatedPrint)}
                        </h3>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <nav
          className="border-t border-border py-20 md:py-28"
          aria-label="Continue exploring prints"
        >
          <div className="container-editorial grid gap-12 md:grid-cols-[1fr_auto_1fr] md:items-start">
            {previous && (
              <Link
                to="/prints/$slug"
                params={{ slug: previous.slug }}
                rel="prev"
                className="group border-t border-border pt-6 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bronze"
              >
                <span className="eyebrow text-ivory-muted/70">← Previous Artwork</span>
                <span className="mt-4 block font-serif text-3xl leading-tight text-ivory transition-colors group-hover:text-bronze">
                  {getPrintDisplayTitle(previous)}
                </span>
              </Link>
            )}
            <Link
              to="/prints"
              className="eyebrow w-fit border-t border-border pt-6 text-ivory-muted transition-colors hover:text-bronze focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bronze md:justify-self-center"
            >
              The Collection
            </Link>
            {next && (
              <Link
                to="/prints/$slug"
                params={{ slug: next.slug }}
                rel="next"
                className="group border-t border-border pt-6 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-bronze md:text-right"
              >
                <span className="eyebrow text-ivory-muted/70">Next Artwork →</span>
                <span className="mt-4 block font-serif text-3xl leading-tight text-ivory transition-colors group-hover:text-bronze">
                  {getPrintDisplayTitle(next)}
                </span>
              </Link>
            )}
          </div>
        </nav>
      </article>

      {open && (
        <InquiryDialog
          artworkTitle={displayTitle}
          species={speciesName}
          selectedSize={size}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

/* ─── Inquiry dialog ─────────────────────────────────────────────── */

interface InquiryDialogProps {
  artworkTitle: string;
  species: string;
  selectedSize: string | null;
  onClose: () => void;
}

function InquiryDialog({ artworkTitle, species, selectedSize, onClose }: InquiryDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cityState, setCityState] = useState("");
  const [framing, setFraming] = useState("Undecided");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || trimmedName.length > 100) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) || trimmedEmail.length > 255) {
      setError("Please enter a valid email address.");
      return;
    }
    if (message.length > 1500) {
      setError("Message is too long.");
      return;
    }

    const preferredSize = selectedSize ?? "Not selected";
    const subject = `Artwork Inquiry — ${artworkTitle}`;
    const body = [
      `Artwork: ${artworkTitle}`,
      `Subject: ${species}`,
      `Preferred size: ${preferredSize}`,
      `Framing interest: ${framing}`,
      ``,
      `Name: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
      `Phone: ${phone.trim() || "—"}`,
      `City / State: ${cityState.trim() || "—"}`,
      ``,
      `Message:`,
      message.trim() || "—",
    ].join("\n");

    // Open the collector's email client addressed to Paul.
    const href = `mailto:info@martography.co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setSent(true);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-title"
      className="fixed inset-0 z-[70] flex items-start sm:items-center justify-center bg-charcoal-deep/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-charcoal-deep border border-border my-8 sm:my-0"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-5 text-ivory/60 hover:text-bronze text-xs tracking-[0.25em] uppercase"
        >
          Close
        </button>

        {sent ? (
          <div className="p-10 sm:p-14 text-center">
            <div className="eyebrow text-bronze">Inquiry Sent</div>
            <h2
              id="inquiry-title"
              className="mt-6 font-serif italic text-ivory text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1]"
            >
              Thank you.
            </h2>
            <p className="mt-6 font-serif italic text-ivory-muted text-lg leading-[1.55]">
              Paul will follow up with availability and presentation details.
            </p>
            <button
              onClick={onClose}
              className="mt-10 inline-flex items-center gap-3 border border-bronze/70 text-ivory px-8 py-3 text-xs tracking-[0.3em] uppercase hover:bg-bronze hover:text-charcoal-deep transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="p-8 sm:p-10">
            <div className="eyebrow text-bronze">Collector Inquiry</div>
            <h2
              id="inquiry-title"
              className="mt-4 font-serif italic text-ivory text-3xl leading-[1.1]"
            >
              Request This Artwork
            </h2>

            <div className="mt-6 border border-border p-4 space-y-1.5 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-ivory/55 eyebrow">Artwork</span>
                <span className="font-serif text-ivory text-right">{artworkTitle}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-ivory/55 eyebrow">Preferred Size</span>
                <span className="font-serif text-ivory">{selectedSize ?? "Not selected"}</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <Field label="Full name" value={name} onChange={setName} required maxLength={100} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field
                  label="Email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  required
                  maxLength={255}
                />
                <Field label="Phone" type="tel" value={phone} onChange={setPhone} maxLength={40} />
              </div>
              <Field
                label="Shipping city / state"
                value={cityState}
                onChange={setCityState}
                maxLength={120}
              />

              <label className="block">
                <span className="eyebrow text-ivory/55 block mb-2">Framing interest</span>
                <select
                  value={framing}
                  onChange={(e) => setFraming(e.target.value)}
                  className="w-full bg-transparent border border-border focus:border-bronze outline-none text-ivory px-4 py-3 font-serif text-base"
                >
                  <option className="bg-charcoal-deep">Undecided</option>
                  <option className="bg-charcoal-deep">Unframed print only</option>
                  <option className="bg-charcoal-deep">Framed — natural wood</option>
                  <option className="bg-charcoal-deep">Framed — dark wood</option>
                  <option className="bg-charcoal-deep">Interested in discussing options</option>
                </select>
              </label>

              <label className="block">
                <span className="eyebrow text-ivory/55 block mb-2">Message</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={1500}
                  rows={4}
                  placeholder="Anything Paul should know?"
                  className="w-full bg-transparent border border-border focus:border-bronze outline-none text-ivory px-4 py-3 font-serif text-base resize-y"
                />
              </label>
            </div>

            {error && <p className="mt-4 text-sm text-bronze">{error}</p>}

            <p className="mt-5 text-[10px] tracking-[0.28em] uppercase text-ivory/45">
              Sent to info@martography.co
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-xs tracking-[0.3em] uppercase text-ivory/70 hover:text-ivory"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-bronze text-charcoal-deep px-8 py-3 text-xs tracking-[0.3em] uppercase hover:bg-bronze/90 transition-colors"
              >
                Send Inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <label className="block">
      <span className="eyebrow text-ivory/55 block mb-2">
        {label}
        {required && <span className="text-bronze"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border border-border focus:border-bronze outline-none text-ivory px-4 py-3 font-serif text-base"
      />
    </label>
  );
}
