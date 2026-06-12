import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, CalendarCheck2, Clock, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { DateChecker } from "@/components/DateChecker";
import { getSaturdayHolidays, parseDate } from "@/lib/holidays";

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
  const upcomingSats = getSaturdayHolidays(year)
    .filter((s) => parseDate(s.date) >= new Date(new Date().setHours(0, 0, 0, 0)))
    .slice(0, 4);

  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              🇮🇳 India · Updated for {year}
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
              Is it a bank holiday{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                today?
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Check any date for India bank holidays — including RBI's 2nd & 4th Saturday rule, weekly offs, and state-wise gazetted holidays.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-2xl">
            <DateChecker />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/holidays">
                Browse all holidays <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/about">Learn more</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">Built for India's banking calendar</h2>
          <p className="mt-2 text-muted-foreground">
            Simple tools to plan around RBI and state bank holidays.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: CalendarCheck2, title: "Instant Check", desc: "Pick any date and find out if banks are open." },
            { icon: CalendarDays, title: "RBI Saturdays", desc: "Auto-highlights 2nd & 4th Saturday bank holidays." },
            { icon: Clock, title: "Upcoming Tracker", desc: "See the next bank holiday with a live countdown." },
            { icon: MapPin, title: "State Filters", desc: "Drill down by Indian state and union territory." },
          ].map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="container mx-auto grid gap-8 px-4 py-16 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <CalendarDays className="h-4 w-4" /> Upcoming RBI Saturday Holidays
            </h3>
            <ul className="mt-4 divide-y divide-border">
              {upcomingSats.length === 0 && (
                <li className="py-3 text-sm text-muted-foreground">
                  No upcoming Saturday holidays this year.
                </li>
              )}
              {upcomingSats.map((h) => (
                <li key={h.date} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <div className="font-medium">{h.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {parseDate(h.date).toLocaleDateString("en-IN", { weekday: "long" })}
                    </div>
                  </div>
                  <span className="font-semibold text-primary">
                    {parseDate(h.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <MapPin className="h-4 w-4" /> How RBI Saturday holidays work
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              As per the Reserve Bank of India, all banks in India observe the{" "}
              <span className="font-medium text-foreground">2nd and 4th Saturday</span> of every month as a holiday.
              The 1st, 3rd, and 5th Saturdays remain regular working days. Sundays are always closed.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> 2nd Saturday — Closed</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> 4th Saturday — Closed</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" /> Other Saturdays — Open (half day)</li>
              <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> Every Sunday — Closed</li>
            </ul>
            <Button asChild className="mt-6 w-full" variant="outline">
              <Link to="/holidays">View full calendar <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
