import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Bank Holiday Finder" },
      { name: "description", content: "Learn about Bank Holiday Finder, a fast, simple tool for finding public holidays around the world." },
      { property: "og:title", content: "About Bank Holiday Finder" },
      { property: "og:description", content: "Fast, simple tool for finding public holidays around the world." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <article className="container mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight">About</h1>
        <p className="mt-4 text-muted-foreground">
          Bank Holiday Finder is a free, no-nonsense tool that helps you quickly find official
          bank and public holidays anywhere in the world. Whether you’re planning travel,
          coordinating a team, or just curious about the next long weekend, we make it easy.
        </p>
        <h2 className="mt-8 text-xl font-semibold">What we offer</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">
          <li>Search holidays by country, region and year</li>
          <li>Switch between list and calendar views</li>
          <li>Countdown to the next upcoming holiday</li>
          <li>Fully responsive — works on mobile, tablet and desktop</li>
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          Holiday data is sourced from the public Nager.Date API.
        </p>
      </article>
    </SiteLayout>
  ),
});