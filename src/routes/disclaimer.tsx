import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — Bank Holiday Finder" },
      { name: "description", content: "Information about the accuracy of holiday data on Bank Holiday Finder." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <article className="container mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight">Disclaimer</h1>
        <p className="mt-4 text-muted-foreground">
          While we strive to provide accurate and up-to-date holiday information,
          Bank Holiday Finder makes no warranties about completeness or correctness.
          Holiday dates can change due to government decisions and regional observances.
        </p>
        <p className="mt-4 text-muted-foreground">
          Always verify critical dates with official government sources before making
          travel, business or legal decisions.
        </p>
      </article>
    </SiteLayout>
  ),
});