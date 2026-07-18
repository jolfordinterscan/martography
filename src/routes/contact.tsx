import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Martography" },
      { name: "description", content: "Contact Paul Marto for prints, commissions, speaking, and press inquiries." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Write, quietly."
        intro="For fine art print inquiries, commissions, speaking engagements, or press."
      />

      <section className="pb-32">
        <div className="container-editorial grid gap-16 lg:gap-24 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-10 text-ivory-muted">
            {[
              { t: "Fine Art Prints", d: "info@martography.co" },
              { t: "Field Notes", d: "info@martography.co" },
              { t: "Education & Speaking", d: "info@martography.co" },
              { t: "Press & Licensing", d: "info@martography.co" },
            ].map((c) => (
              <div key={c.t}>
                <div className="eyebrow text-bronze">{c.t}</div>
                <a href={`mailto:${c.d}`} className="mt-2 font-serif text-2xl text-ivory block hover:text-bronze transition-colors">{c.d}</a>
              </div>
            ))}
            <div className="pt-8 border-t border-border text-sm leading-relaxed">
              Martography Studio<br />
              Field correspondence returned within 5 business days.
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="space-y-8"
          >
            {[
              { name: "name", label: "Your Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "subject", label: "Subject", type: "text" },
            ].map((f) => (
              <div key={f.name}>
                <label className="eyebrow block mb-3">{f.label}</label>
                <input
                  required
                  name={f.name}
                  type={f.type}
                  className="w-full bg-transparent border-0 border-b border-border py-3 text-ivory placeholder:text-ivory-muted/50 focus:outline-none focus:border-bronze transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="eyebrow block mb-3">Message</label>
              <textarea
                required
                name="message"
                rows={5}
                className="w-full bg-transparent border-0 border-b border-border py-3 text-ivory placeholder:text-ivory-muted/50 focus:outline-none focus:border-bronze transition-colors resize-none"
              />
            </div>
            <div className="pt-4">
              <button type="submit" className="btn-primary">
                {sent ? "Message Sent" : "Send Message"}
              </button>
              {sent && (
                <p className="mt-4 text-sm text-bronze">Thank you — Paul will be in touch shortly.</p>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
