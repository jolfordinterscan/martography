import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="container-editorial py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="font-serif text-2xl text-ivory">Martography</div>
          <p className="mt-4 text-sm text-ivory-muted max-w-sm leading-relaxed">
            Wildlife photography, fine art prints, and conservation storytelling by Paul Marto.
          </p>
          <div className="mt-6 eyebrow">
            <span className="rule-bronze mr-3" />
            Every Photograph Has a Story
          </div>
        </div>

        <div className="text-sm">
          <div className="eyebrow mb-4">Explore</div>
          <ul className="space-y-3 text-ivory-muted">
            <li>
              <Link to="/gallery" className="hover:text-ivory transition-colors">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/prints" className="hover:text-ivory transition-colors">
                Fine Art Prints
              </Link>
            </li>
            <li>
              <Link to="/stories" className="hover:text-ivory transition-colors">
                Stories
              </Link>
            </li>
            <li>
              <Link to="/stories" className="hover:text-ivory transition-colors">
                Field Notes
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <div className="eyebrow mb-4">Studio</div>
          <ul className="space-y-3 text-ivory-muted">
            <li>
              <Link to="/education" className="hover:text-ivory transition-colors">
                Education
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-ivory transition-colors">
                About Paul
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-ivory transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-editorial py-6 flex flex-col md:flex-row justify-between gap-3 text-[0.68rem] uppercase tracking-[0.22em] text-ivory-muted">
          <span>© {new Date().getFullYear()} Martography. All photographs by Paul Marto.</span>
          <a
            href="mailto:info@martography.co"
            className="hover:text-ivory transition-colors normal-case tracking-normal text-sm font-serif"
          >
            info@martography.co
          </a>
        </div>
      </div>
    </footer>
  );
}
