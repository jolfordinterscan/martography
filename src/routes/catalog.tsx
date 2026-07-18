import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Placeholder } from "@/components/site/Placeholder";
import {
  CATEGORIES,
  COLLECTIONS,
  PRINT_SIZES,
  listCatalog,
  type CatalogPhotograph,
  type Category,
  type Collection,
} from "@/data/catalog";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Catalog — Martography" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Internal collection management for Martography." },
    ],
  }),
  component: CatalogPage,
});

type SortKey = "artworkId" | "title" | "species" | "category" | "date";

function CatalogPage() {
  const all = listCatalog();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [collection, setCollection] = useState<Collection | "All">("All");
  const [printOnly, setPrintOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("artworkId");
  const [selectedId, setSelectedId] = useState<string>(all[0]?.artworkId ?? "");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const rows = all.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (collection !== "All" && p.collection !== collection) return false;
      if (printOnly && !p.print.availableForPrint) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.species.toLowerCase().includes(q) ||
        p.artworkId.toLowerCase().includes(q) ||
        (p.location ?? "").toLowerCase().includes(q)
      );
    });
    rows.sort((a, b) => {
      switch (sort) {
        case "title":
          return a.title.localeCompare(b.title);
        case "species":
          return a.species.localeCompare(b.species);
        case "category":
          return a.category.localeCompare(b.category);
        case "date":
          return (b.datePhotographed ?? "").localeCompare(a.datePhotographed ?? "");
        default:
          return a.artworkId.localeCompare(b.artworkId);
      }
    });
    return rows;
  }, [all, query, category, collection, printOnly, sort]);

  const selected =
    filtered.find((p) => p.artworkId === selectedId) ??
    filtered[0] ??
    all.find((p) => p.artworkId === selectedId);

  return (
    <div className="pt-28 md:pt-32 pb-24 min-h-screen">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        {/* Masthead */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div>
            <div className="eyebrow text-bronze">
              <span className="rule-bronze mr-3" />
              Internal · Collection Management
            </div>
            <h1
              className="mt-4 font-serif text-ivory leading-[1.02] tracking-[-0.01em]"
              style={{ fontSize: "clamp(2.25rem, 4vw, 3.75rem)" }}
            >
              The Catalog
            </h1>
            <p className="mt-3 text-sm text-ivory-muted">
              Master record of every Martography photograph.
            </p>
          </div>
          <div className="flex items-baseline gap-8 text-ivory-muted">
            <Stat label="Photographs" value={all.length} />
            <Stat label="Showing" value={filtered.length} />
            <Stat
              label="For Print"
              value={all.filter((p) => p.print.availableForPrint).length}
            />
            <Stat
              label="Awarded"
              value={all.filter((p) => p.marketing.awardWinner).length}
            />
          </div>
        </div>

        {/* Toolbar */}
        <div className="mt-8 grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto] items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, species, artwork ID, location…"
            className="h-11 px-4 bg-charcoal border border-border text-ivory placeholder:text-ivory-muted/50 focus:border-bronze outline-none text-sm"
          />
          <Select
            value={category}
            onChange={(v) => setCategory(v as Category | "All")}
            options={["All", ...CATEGORIES]}
            label="Category"
          />
          <Select
            value={collection}
            onChange={(v) => setCollection(v as Collection | "All")}
            options={["All", ...COLLECTIONS]}
            label="Collection"
          />
          <Select
            value={sort}
            onChange={(v) => setSort(v as SortKey)}
            options={["artworkId", "title", "species", "category", "date"]}
            optionLabels={{
              artworkId: "Sort · Artwork ID",
              title: "Sort · Title",
              species: "Sort · Species",
              category: "Sort · Category",
              date: "Sort · Date",
            }}
            label="Sort"
          />
          <label className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-ivory-muted cursor-pointer select-none">
            <input
              type="checkbox"
              checked={printOnly}
              onChange={(e) => setPrintOnly(e.target.checked)}
              className="accent-bronze"
            />
            For Print
          </label>
        </div>

        {/* Split view */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.35fr_1fr] items-start">
          {/* Table */}
          <div className="border border-border">
            <div className="grid grid-cols-[80px_1fr_1fr_120px_100px_80px] text-[0.7rem] uppercase tracking-[0.22em] text-ivory-muted bg-charcoal/70 border-b border-border">
              <div className="px-4 py-3">ID</div>
              <div className="px-4 py-3">Title</div>
              <div className="px-4 py-3 hidden md:block">Species</div>
              <div className="px-4 py-3 hidden md:block">Category</div>
              <div className="px-4 py-3 hidden md:block">Print</div>
              <div className="px-4 py-3">Status</div>
            </div>
            <div className="max-h-[70vh] overflow-y-auto">
              {filtered.map((p) => {
                const isActive = selected?.artworkId === p.artworkId;
                return (
                  <button
                    key={p.artworkId}
                    onClick={() => setSelectedId(p.artworkId)}
                    className={`w-full text-left grid grid-cols-[80px_1fr_1fr_120px_100px_80px] items-center border-b border-border/60 transition-colors ${
                      isActive
                        ? "bg-bronze/10"
                        : "hover:bg-charcoal/60"
                    }`}
                  >
                    <div className="px-4 py-4 font-mono text-xs text-bronze">
                      {p.artworkId}
                    </div>
                    <div className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 shrink-0 overflow-hidden border border-border">
                          <Placeholder
                            subject={p.title}
                            filename={p.imageFilename}
                            ratio="aspect-square"
                            focus="center"
                          />
                        </div>
                        <div>
                          <div className="font-serif text-lg text-ivory leading-tight">
                            {p.title}
                          </div>
                          <div className="text-[11px] text-ivory-muted/70 italic mt-0.5 md:hidden">
                            {p.species}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-4 hidden md:block text-sm text-ivory-muted italic">
                      {p.species}
                    </div>
                    <div className="px-4 py-4 hidden md:block text-xs text-ivory-muted">
                      {p.category}
                    </div>
                    <div className="px-4 py-4 hidden md:block">
                      {p.print.availableForPrint ? (
                        <Badge tone="bronze">
                          {p.print.editionType === "Limited"
                            ? `Ed. ${p.print.editionSize ?? "—"}`
                            : "Open"}
                        </Badge>
                      ) : (
                        <Badge tone="muted">Archive</Badge>
                      )}
                    </div>
                    <div className="px-4 py-4 flex flex-wrap gap-1">
                      {p.heroImage && <Dot title="Hero" className="bg-bronze" />}
                      {p.homepageFeature && (
                        <Dot title="Homepage" className="bg-ivory" />
                      )}
                      {p.marketing.awardWinner && (
                        <Dot title="Award winner" className="bg-forest" />
                      )}
                    </div>
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <div className="p-12 text-center text-ivory-muted text-sm">
                  No photographs match these filters.
                </div>
              )}
            </div>
          </div>

          {/* Detail */}
          {selected && <DetailPanel entry={selected} />}
        </div>
      </div>
    </div>
  );
}

function DetailPanel({ entry }: { entry: CatalogPhotograph }) {
  return (
    <aside className="border border-border bg-charcoal/40 sticky top-28">
      <div className="p-6 border-b border-border">
        <Placeholder
          subject={entry.title}
          location={entry.location}
          filename={entry.imageFilename}
          ratio="aspect-[4/5]"
          focus="center"
        />
      </div>
      <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
        <div>
          <div className="font-mono text-xs text-bronze">{entry.artworkId}</div>
          <h2 className="mt-2 font-serif text-3xl text-ivory leading-tight">
            {entry.title}
          </h2>
          <div className="mt-1 text-sm text-ivory-muted italic">
            {entry.species} · {entry.category}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Badge tone="bronze">{entry.collection}</Badge>
            {entry.heroImage && <Badge tone="ivory">Hero</Badge>}
            {entry.featuredCollection && <Badge tone="ivory">Featured</Badge>}
            {entry.marketing.awardWinner && (
              <Badge tone="forest">Award</Badge>
            )}
            {entry.marketing.featuredPhotograph && (
              <Badge tone="forest">Signature</Badge>
            )}
          </div>
        </div>

        {entry.storyText && (
          <Section title="Story">
            {entry.storyTitle && (
              <div className="font-serif text-lg text-ivory italic mb-2">
                {entry.storyTitle}
              </div>
            )}
            <p className="text-sm text-ivory-muted leading-relaxed">
              {entry.storyText}
            </p>
          </Section>
        )}

        <Section title="Capture">
          <Grid
            rows={[
              ["Location", entry.location],
              ["Date", entry.datePhotographed],
              ["Orientation", entry.orientation],
              ["Camera", entry.exif.cameraBody],
              ["Lens", entry.exif.lens],
              ["Focal Length", entry.exif.focalLength],
              ["Aperture", entry.exif.aperture],
              ["Shutter", entry.exif.shutterSpeed],
              ["ISO", entry.exif.iso?.toString()],
              ["File", entry.imageFilename],
            ]}
          />
        </Section>

        <Section title="Print">
          {entry.print.availableForPrint ? (
            <>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <Badge tone="bronze">{entry.print.editionType}</Badge>
                {entry.print.editionType === "Limited" && entry.print.editionSize && (
                  <Badge tone="muted">Edition of {entry.print.editionSize}</Badge>
                )}
                {entry.print.signed && <Badge tone="muted">Signed</Badge>}
                {entry.print.numbered && <Badge tone="muted">Numbered</Badge>}
                {entry.print.certificateOfAuthenticity && (
                  <Badge tone="muted">COA</Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {entry.print.framedAvailable && <Badge tone="ivory">Framed</Badge>}
                {entry.print.canvasAvailable && <Badge tone="ivory">Canvas</Badge>}
                {entry.print.metalAvailable && <Badge tone="ivory">Metal</Badge>}
                {entry.print.acrylicAvailable && <Badge tone="ivory">Acrylic</Badge>}
              </div>
              <div className="border-t border-border">
                {PRINT_SIZES.map((s) => {
                  const price = entry.print.sizes[s];
                  return (
                    <div
                      key={s}
                      className="flex justify-between border-b border-border/60 py-2 text-sm"
                    >
                      <span className="text-ivory-muted font-mono">{s}</span>
                      <span className="text-ivory">
                        {price != null ? `$${price.toLocaleString()}` : "—"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p className="text-sm text-ivory-muted italic">Archive only.</p>
          )}
        </Section>

        <Section title="Website Placement">
          <FlagGrid
            flags={[
              ["Homepage", entry.website.homepage],
              ["Gallery", entry.website.gallery],
              ["Birds", entry.website.birdsCollection],
              ["Mammals", entry.website.mammalsCollection],
              ["Behavior", entry.website.wildlifeBehaviorCollection],
              ["Conservation", entry.website.conservationCollection],
              ["Fine Art", entry.website.fineArtCollection],
              ["Stories", entry.website.stories],
              ["About", entry.website.aboutPage],
            ]}
          />
        </Section>

        <Section title="Marketing">
          <FlagGrid
            flags={[
              ["Instagram", entry.marketing.instagramPosted],
              ["Facebook", entry.marketing.facebookPosted],
              ["Newsletter", entry.marketing.newsletter],
              ["Blog", entry.marketing.blogStory],
              ["Exhibition", entry.marketing.exhibition],
              ["Award", entry.marketing.awardWinner],
              ["Signature", entry.marketing.featuredPhotograph],
            ]}
          />
        </Section>

        {entry.notes && (
          <Section title="Notes">
            <p className="text-sm text-ivory-muted leading-relaxed whitespace-pre-wrap">
              {entry.notes}
            </p>
          </Section>
        )}
      </div>
    </aside>
  );
}

// ---------- primitives ----------

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="font-serif text-2xl text-ivory">{value}</div>
      <div className="eyebrow text-[0.6rem] mt-1">{label}</div>
    </div>
  );
}

function Select<T extends string>({
  value,
  onChange,
  options,
  optionLabels,
  label,
}: {
  value: T;
  onChange: (v: string) => void;
  options: readonly T[] | T[];
  optionLabels?: Record<string, string>;
  label: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      className="h-11 px-3 bg-charcoal border border-border text-ivory text-sm focus:border-bronze outline-none"
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-charcoal-deep">
          {optionLabels?.[o] ?? o}
        </option>
      ))}
    </select>
  );
}

function Badge({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "bronze" | "ivory" | "forest" | "muted";
}) {
  const styles = {
    bronze: "border-bronze/60 text-bronze",
    ivory: "border-ivory/40 text-ivory",
    forest: "border-forest text-forest",
    muted: "border-border text-ivory-muted",
  }[tone];
  return (
    <span
      className={`inline-block text-[0.6rem] uppercase tracking-[0.2em] px-2 py-1 border ${styles}`}
    >
      {children}
    </span>
  );
}

function Dot({ title, className }: { title: string; className: string }) {
  return (
    <span
      title={title}
      className={`inline-block w-1.5 h-1.5 rounded-full ${className}`}
    />
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="eyebrow text-bronze mb-3">
        <span className="rule-bronze mr-2" />
        {title}
      </div>
      {children}
    </div>
  );
}

function Grid({ rows }: { rows: Array<[string, string | undefined]> }) {
  return (
    <dl className="grid grid-cols-1 gap-1.5">
      {rows.map(([k, v]) => (
        <div
          key={k}
          className="flex justify-between gap-6 border-b border-border/60 pb-1.5 text-sm"
        >
          <dt className="text-ivory-muted">{k}</dt>
          <dd className="text-ivory text-right font-mono text-xs">{v ?? "—"}</dd>
        </div>
      ))}
    </dl>
  );
}

function FlagGrid({ flags }: { flags: Array<[string, boolean]> }) {
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {flags.map(([k, v]) => (
        <div
          key={k}
          className={`flex items-center gap-2 text-xs px-2.5 py-1.5 border ${
            v
              ? "border-bronze/50 text-ivory bg-bronze/5"
              : "border-border text-ivory-muted/60"
          }`}
        >
          <span
            className={`inline-block w-1.5 h-1.5 rounded-full ${
              v ? "bg-bronze" : "bg-ivory-muted/30"
            }`}
          />
          {k}
        </div>
      ))}
    </div>
  );
}
