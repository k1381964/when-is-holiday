import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, CalendarCheck2, Clock, MapPin, Zap, Info } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { DateChecker } from "@/components/DateChecker";
import { getHolidaysForYear, parseDate } from "@/lib/holidays";
import { UpcomingHolidays } from "@/components/UpcomingHolidays";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "India Bank Holiday Finder — Check Any Date Instantly" },
      { name: "description", content: "Instantly check if a date is a bank holiday in India. View RBI 2nd & 4th Saturday holidays, state-wise gazetted holidays, and weekly offs." },
      { property: "og:title", content: "India Bank Holiday Finder" },
      { property: "og:description", content: "Check any date for India bank holidays — by state, year, and RBI Saturday rules." },
    ],
  }),
  component: Index,
});

function Index() {
  const year = new Date().getFullYear();
  const allHolidays = [
    ...getHolidaysForYear(year, true),
    ...getHolidaysForYear(year + 1, true),
  ];

  return (
    <SiteLayout>
      {/* Ambient futuristic background — fixed under content */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -left-[20%] h-[60%] w-[80%] rounded-full bg-brand-saffron/20 blur-[120px]" />
        <div className="absolute top-[10%] -right-[20%] h-[55%] w-[70%] rounded-full bg-brand-emerald/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[10%] h-[40%] w-[60%] rounded-full bg-brand-violet/15 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* HERO */}
      <section className="relative border-b border-border/50">
        <div className="container mx-auto px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-emerald/30 bg-brand-emerald/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-emerald">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-emerald" />
              India · Updated for {year}
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Is it a bank
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-hero)" }}
              >
                holiday today?
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              A real-time checker for RBI's 2nd & 4th Saturday rules, weekly offs, and state-wise gazetted holidays — all in one cyber-clean dashboard.
            </p>
          </div>

          {/* Glowing date checker */}
          <div className="relative mx-auto mt-10 max-w-2xl">
            <div
              aria-hidden
              className="absolute -inset-1 rounded-3xl opacity-30 blur-xl"
              style={{ background: "var(--gradient-brand)" }}
            />
            <div className="relative">
              <DateChecker />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="shadow-[0_0_30px_-8px_var(--brand-saffron)]">
              <Link to="/holidays">
                Browse all holidays <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border/70 backdrop-blur">
              <Link to="/about">Learn more</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-saffron">
              <Zap className="h-3.5 w-3.5" /> Calendar Engine
            </div>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Built for India's banking calendar
            </h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-brand-saffron/60 via-border to-transparent" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarCheck2, title: "Instant Check", desc: "Pick any date and find out if banks are open.", tint: "saffron" },
            { icon: CalendarDays, title: "RBI Saturdays", desc: "Auto-highlights 2nd & 4th Saturday bank holidays.", tint: "emerald" },
            { icon: Clock, title: "Upcoming Tracker", desc: "See the next bank holiday with a live countdown.", tint: "azure" },
            { icon: MapPin, title: "State Filters", desc: "Drill down by Indian state and union territory.", tint: "violet" },
          ].map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-brand-saffron/50 hover:shadow-[0_0_30px_-8px_var(--brand-saffron)]"
            >
              <div
                aria-hidden
                className="absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-60"
                style={{ background: `var(--brand-${f.tint})` }}
              />
              <span
                className="relative grid h-10 w-10 place-items-center rounded-xl"
                style={{
                  background: `color-mix(in oklab, var(--brand-${f.tint}) 18%, transparent)`,
                  color: `var(--brand-${f.tint})`,
                }}
              >
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="relative mt-4 text-sm font-bold">{f.title}</h3>
              <p className="relative mt-1 text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* UPCOMING + RULES */}
      <section className="border-t border-border/50">
        <div className="container mx-auto grid gap-6 px-4 py-20 lg:grid-cols-2">
          {/* Upcoming holidays widget */}
          <UpcomingHolidays holidays={allHolidays} />

          {/* Rules */}
          <div
            className="relative overflow-hidden rounded-3xl border border-border/70 p-6 shadow-sm backdrop-blur-xl"
            style={{
              backgroundImage:
                "linear-gradient(135deg, color-mix(in oklab, var(--brand-saffron) 8%, var(--card)), var(--card))",
            }}
          >
            <Info className="absolute right-4 top-4 h-16 w-16 text-foreground/5" />
            <h3 className="flex items-center gap-2 text-sm font-bold">
              <span className="h-4 w-1 rounded-full bg-brand-emerald" />
              RBI Saturday Protocol
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              As per the Reserve Bank of India, all banks observe the{" "}
              <span className="font-semibold text-foreground">2nd and 4th Saturday</span> of every month as a holiday. The 1st, 3rd, and 5th Saturdays are regular working days. Sundays are always closed.
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-saffron shadow-[0_0_8px_var(--brand-saffron)]" />
                2nd Saturday — <span className="font-semibold">Closed</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-saffron shadow-[0_0_8px_var(--brand-saffron)]" />
                4th Saturday — <span className="font-semibold">Closed</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald shadow-[0_0_8px_var(--brand-emerald)]" />
                Other Saturdays — <span className="font-semibold">Open (half day)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                Every Sunday — <span className="font-semibold">Closed</span>
              </li>
            </ul>
            <Button
              asChild
              className="mt-6 w-full border border-brand-saffron/30 bg-brand-saffron/10 font-bold uppercase tracking-widest text-brand-saffron hover:bg-brand-saffron/20"
              variant="ghost"
            >
              <Link to="/holidays">
                View full calendar <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
