# Netlify deployment

Martography is a TanStack Start application with server rendering. The official Netlify TanStack Start adapter builds the browser assets into `dist/client` and packages the application server for Netlify Functions. Do not add a generic SPA redirect to `index.html`; direct requests are handled by the generated server function.

## Import the repository

1. Sign in to Netlify and select **Add new project** → **Import an existing project**.
2. Choose GitHub and authorize access to `jolfordinterscan/martography` if prompted.
3. Select the repository and set **Production branch** to `main`.
4. Confirm the detected settings against the committed configuration:
   - Build command: `npm run build`
   - Publish directory: `dist/client`
   - Base directory: repository root
   - Node version: `22` from `.node-version`
5. No application environment variables are currently required.
6. Start the first deploy and review it at the temporary `*.netlify.app` project URL.

The committed `netlify.toml` is the source of truth for build settings and overrides conflicting values entered in the Netlify UI.

## Review before connecting the domain

Use the temporary Netlify URL to check the homepage and direct navigation to `/gallery`, `/prints`, `/stories`, and representative detail routes. Review responsive layouts, images, metadata, the sitemap, and error pages before changing any domain settings.

**Do not change DNS until the temporary deployment has been reviewed and approved.**

## Connect `martography.co` later

After approval:

1. Open **Domain management** → **Production domains** in Netlify.
2. Add `martography.co` as the production domain. Netlify will also add `www.martography.co` and can redirect the alternate hostname to the selected primary hostname.
3. Keep `martography.co` as primary if that is the desired public URL.
4. Follow the DNS instructions Netlify displays for the project and the current DNS provider. Do not copy DNS values from generic documentation; use the project-specific values shown by Netlify.
5. Wait for DNS verification and HTTPS certificate provisioning, then verify both the apex and `www` hostnames.

This repository does not create or modify DNS records.

## Production and preview deploys

- A successful push or merge to `main` creates a production deploy. With auto-publishing enabled, it replaces the version served at the primary Netlify URL and, later, the custom domain.
- Pull requests targeting `main` receive a Deploy Preview by default when continuous deployment is connected. Netlify adds the preview status and URL to the pull request.
- Branch deploys are separate from Deploy Previews and are opt-in. Enable selected branch deploys under **Project configuration** → **Build & deploy** → **Continuous deployment** → **Branches and deploy contexts** only when a stable branch URL is useful.
- Preview and branch deploys use the same build command and publish directory unless deploy-context overrides are deliberately added later.

## Roll back

1. Open the project's **Deploys** list.
2. Select a previous successful production deploy.
3. On its deploy detail page, choose **Publish Deploy**.

Netlify atomically republishes that prior deploy without rebuilding it. A later successful Git-triggered production deploy can replace the rollback when auto-publishing remains enabled.

## References

- [TanStack Start on Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/tanstack-start/)
- [Deploy Previews](https://docs.netlify.com/deploy/deploy-types/deploy-previews/)
- [Production deploys](https://docs.netlify.com/deploy/deploy-types/production-deploy/)
- [Rollbacks](https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/#rollbacks)
- [Custom domains](https://docs.netlify.com/domains-https/custom-domains/)
