import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Bank Holiday Finder" },
      { name: "description", content: "How Bank Holiday Finder handles your data." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <article className="container mx-auto max-w-2xl px-4 py-16 prose-sm">
        <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">
          Bank Holiday Finder does not require an account and does not collect personal
          information. Your country, region and year selections are kept locally in your
          browser session only.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Third-party services</h2>
        <p className="mt-2 text-muted-foreground">
          Holiday data is requested from the public Nager.Date API. Your IP address may be
          visible to that service as part of normal network requests.
        </p>
        <h2 className="mt-8 text-xl font-semibold">Cookies</h2>
        <p className="mt-2 text-muted-foreground">
          We use a single localStorage entry to remember your theme preference (light/dark).
          No tracking cookies are used.
        </p>
      </article>
    </SiteLayout>
  ),
});