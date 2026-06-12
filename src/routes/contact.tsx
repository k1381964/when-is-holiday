import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Bank Holiday Finder" },
      { name: "description", content: "Get in touch with the Bank Holiday Finder team." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <article className="container mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
        <p className="mt-4 text-muted-foreground">
          Have feedback, a feature request, or a correction? We’d love to hear from you.
        </p>
        <a
          href="mailto:hello@bankholidayfinder.app"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Mail className="h-4 w-4" /> hello@bankholidayfinder.app
        </a>
      </article>
    </SiteLayout>
  ),
});