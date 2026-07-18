import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "../components/site/Nav";
import { Footer } from "../components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-lg text-center">
        <div className="eyebrow">Not Found</div>
        <h1 className="mt-4 font-serif text-6xl text-ivory">404</h1>
        <p className="mt-4 text-ivory-muted">
          The trail ends here. This page could not be found.
        </p>
        <a href="/" className="btn-primary mt-8">Return Home</a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-lg text-center">
        <div className="eyebrow">Something went wrong</div>
        <h1 className="mt-4 font-serif text-4xl text-ivory">This page didn't load</h1>
        <div className="mt-8 flex justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-primary">Try again</button>
          <a href="/" className="btn-ghost">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Martography — Wildlife Photography by Paul Marto" },
      { name: "description", content: "A quiet, cinematic archive of wildlife photography by Paul Marto. Every photograph has a story." },
      { property: "og:title", content: "Martography — Wildlife Photography by Paul Marto" },
      { property: "og:description", content: "A quiet, cinematic archive of wildlife photography by Paul Marto. Every photograph has a story." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Martography — Wildlife Photography by Paul Marto" },
      { name: "twitter:description", content: "A quiet, cinematic archive of wildlife photography by Paul Marto. Every photograph has a story." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/05cd632d-83e1-4257-874d-f97ad7ef6aba/id-preview-cfbecdc7--54e0a7d3-6045-4fd1-92bb-90e761631178.lovable.app-1784402078036.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/05cd632d-83e1-4257-874d-f97ad7ef6aba/id-preview-cfbecdc7--54e0a7d3-6045-4fd1-92bb-90e761631178.lovable.app-1784402078036.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Martography",
          url: "https://martography.co",
          email: "info@martography.co",
          founder: { "@type": "Person", name: "Paul Marto" },
          contactPoint: [{
            "@type": "ContactPoint",
            email: "info@martography.co",
            contactType: "customer support",
          }],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
