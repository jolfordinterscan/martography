import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/gallery", label: "Gallery" },
  { to: "/prints", label: "Fine Art Prints" },
  { to: "/stories", label: "Field Notes" },
  { to: "/education", label: "Education & Conservation" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const headerFocus =
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-bronze";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-charcoal-deep/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container-editorial flex items-center justify-between h-20">
        <Link to="/" className={`group flex flex-col leading-none ${headerFocus}`}>
          <span className="font-serif text-2xl tracking-tight text-ivory">Martography</span>
          <span className="eyebrow mt-1 text-[0.6rem] tracking-[0.32em] lg:text-[0.7rem] lg:tracking-[0.24em] xl:text-[0.72rem]">
            Paul Marto · Wildlife
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex xl:gap-9 2xl:gap-10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-[0.75rem] uppercase tracking-[0.18em] text-ivory-muted transition-colors hover:text-ivory xl:text-[0.8125rem] xl:tracking-[0.16em] 2xl:text-[0.85rem] ${headerFocus}`}
              activeProps={{ className: "text-ivory" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className={`text-[0.72rem] uppercase tracking-[0.22em] text-ivory lg:hidden ${headerFocus}`}
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-charcoal-deep border-t border-border animate-fade-in">
          <nav className="container-editorial flex flex-col py-8 gap-5">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`text-sm uppercase tracking-[0.22em] text-ivory-muted ${headerFocus}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
