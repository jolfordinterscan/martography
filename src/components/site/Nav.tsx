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
        scrolled
          ? "bg-charcoal-deep/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-editorial flex items-center justify-between h-20">
        <Link to="/" className="flex flex-col leading-none group">
          <span className="font-serif text-2xl tracking-tight text-ivory">
            Martography
          </span>
          <span className="eyebrow mt-1 text-[0.6rem] tracking-[0.32em]">
            Paul Marto · Wildlife
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[0.72rem] uppercase tracking-[0.22em] text-ivory-muted hover:text-ivory transition-colors"
              activeProps={{ className: "text-ivory" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-ivory text-[0.72rem] uppercase tracking-[0.22em]"
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
                className="text-sm uppercase tracking-[0.22em] text-ivory-muted"
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
