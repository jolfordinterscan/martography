import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Placeholder } from "@/components/site/Placeholder";
import { Reveal } from "@/components/site/Reveal";
import { getPrint } from "@/data/prints";

const SIZES = ['16" × 24"', '20" × 30"', '24" × 36"', '30" × 45"', '40" × 60"'] as const;

export const Route = createFileRoute("/prints/$slug")({
  loader: ({ params }) => {
    const print = getPrint(params.slug);
    if (!print) throw notFound();
    return { print };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.print
      ? `${loaderData.print.title === "Untitled — Pending Artist Title" ? loaderData.print.subject : loaderData.print.title} — Fine Art Print`
      : "Fine Art Print";
    return {
      meta: [
        { title: `${title} — Martography` },
        {
          name: "description",
          content:
            "A limited-edition fine art print by Paul Marto. Inquire for size, framing, and pricing.",
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
  const [size, setSize] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const displayTitle =
    print.title === "Untitled — Pending Artist Title"
      ? "Title Pending Artist Approval"
      : print.title;

  return (
    <>
      <div className="pt-32 pb-6 container-editorial">
        <Link
          to="/prints"
          className="text-xs tracking-[0.25em] uppercase text-ivory/60 hover:text-bronze"
        >
          ← The Collection
        </Link>
      </div>

      <section className="pb-24 md:pb-32">
        <div className="container-editorial">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20 items-start">
            <div className="lg:col-span-7">
              <Reveal>
                <Placeholder subject={print.subject} filename={print.filename} natural />
                <p className="mt-5 text-xs tracking-[0.3em] uppercase text-ivory/50">
                  {print.species}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:pt-6">
              <div className="eyebrow text-bronze">Fine Art Print</div>
              <h1 className="mt-5 font-serif italic text-ivory leading-[1.05] text-[clamp(2.25rem,4.5vw,3.5rem)]">
                {displayTitle}
              </h1>
              <p className="mt-6 font-serif italic text-ivory/75 text-lg leading-[1.55]">
                "{print.description}"
              </p>

              <fieldset className="mt-12">
                <legend className="eyebrow text-ivory/55 mb-4">Select a Print Size</legend>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SIZES.map((s) => {
                    const selected = size === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        aria-pressed={selected}
                        className={`px-4 py-4 border font-serif text-lg tracking-wide transition-colors ${
                          selected
                            ? "border-bronze bg-bronze/[0.08] text-ivory"
                            : "border-border text-ivory/85 hover:border-ivory/50"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-10 border-t border-border pt-6">
                <div className="eyebrow text-ivory/55">Pricing</div>
                <p className="mt-2 font-serif italic text-ivory/85 text-lg">
                  Pricing confirmed by inquiry
                </p>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => setOpen(true)}
                  disabled={!size}
                  className="w-full bg-bronze text-charcoal-deep px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-bronze/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Request This Print
                </button>
                {!size && (
                  <p className="mt-3 text-xs tracking-[0.2em] uppercase text-ivory/45">
                    Select a size to continue
                  </p>
                )}
              </div>

              <div className="mt-10 space-y-2 text-xs tracking-[0.2em] uppercase text-ivory/60">
                <div>Archival Fine Art Print</div>
                <div>Hand Signed by Paul Marto</div>
                <div>Certificate of Authenticity</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-24 md:py-32">
        <div className="container-editorial grid gap-16 lg:grid-cols-3">
          <div>
            <div className="eyebrow text-bronze mb-5">Certificate of Authenticity</div>
            <p className="font-serif italic text-ivory text-2xl leading-[1.35] mb-6">
              Every print is documented and provenanced.
            </p>
            <ul className="space-y-3 text-ivory-muted text-sm leading-[1.7]">
              <li>· Hand-signed and numbered by Paul Marto</li>
              <li>· Unique certificate matching the edition number</li>
              <li>· Capture date, location, camera, and lens</li>
              <li>· Registered in the Martography archive</li>
            </ul>
          </div>

          <div>
            <div className="eyebrow text-bronze mb-5">Collector Notes</div>
            <p className="font-serif italic text-ivory text-2xl leading-[1.35] mb-6">
              For the wall you will look at for the rest of your life.
            </p>
            <ul className="space-y-3 text-ivory-muted text-sm leading-[1.7]">
              <li>· Display away from direct sunlight for longest life</li>
              <li>· Anti-reflective museum glazing recommended for framed pieces</li>
              <li>· Custom sizing available on request</li>
              <li>· Trade and interior-designer inquiries welcome</li>
            </ul>
          </div>

          <div>
            <div className="eyebrow text-bronze mb-5">Shipping</div>
            <p className="font-serif italic text-ivory text-2xl leading-[1.35] mb-6">
              Insured. Signed for. Delivered with care.
            </p>
            <ul className="space-y-3 text-ivory-muted text-sm leading-[1.7]">
              <li>· Studio &amp; Gallery sizes ship in archival tubes or flat crates</li>
              <li>· Larger and framed pieces ship in custom wood crates</li>
              <li>· Fully insured, signature required on delivery</li>
              <li>· International shipping quoted per destination</li>
            </ul>
          </div>
        </div>
      </section>

      {open && (
        <InquiryDialog
          artworkTitle={displayTitle}
          species={print.species}
          selectedSize={size!}
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
  selectedSize: string;
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

    const subject = `Print Inquiry — ${artworkTitle} (${selectedSize})`;
    const body = [
      `Artwork: ${artworkTitle}`,
      `Subject: ${species}`,
      `Size: ${selectedSize}`,
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
              Paul will follow up with availability, pricing, and production details.
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
              Request This Print
            </h2>

            <div className="mt-6 border border-border p-4 space-y-1.5 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-ivory/55 eyebrow">Artwork</span>
                <span className="font-serif text-ivory text-right">{artworkTitle}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-ivory/55 eyebrow">Size</span>
                <span className="font-serif text-ivory">{selectedSize}</span>
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
