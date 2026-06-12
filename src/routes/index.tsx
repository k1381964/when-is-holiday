import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Search, Globe2, Clock, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bank Holiday Finder — Find Bank Holidays Instantly" },
      { name: "description", content: "Search and track bank holidays by country, state, and year in one place." },
      { property: "og:title", content: "Bank Holiday Finder" },
      { property: "og:description", content: "Search and track bank holidays by country, state, and year." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
        <div className="container mx-auto px-4 py-20 text-center sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" /> Updated for {new Date().getFullYear()}
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            Find Bank Holidays{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Instantly
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Search and track bank holidays by country, state, and year — all in one clean, fast place.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/holidays">
                View Holidays <ArrowRight className="ml-1.5 h-4 w-4" />
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
          <h2 className="text-3xl font-bold tracking-tight">Everything you need</h2>
          <p className="mt-2 text-muted-foreground">
            Simple tools to plan around official public holidays.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Search, title: "Easy Search", desc: "Find holidays in seconds with instant filtering." },
            { icon: CalendarDays, title: "Calendar View", desc: "Visualize the month with highlighted holidays." },
            { icon: Clock, title: "Upcoming Tracker", desc: "See the next holiday with a live countdown." },
            { icon: Globe2, title: "Country & State", desc: "Drill down by country and regional filters." },
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
              <CalendarDays className="h-4 w-4" /> Sample Holiday List
            </h3>
            <ul className="mt-4 divide-y divide-border">
              {[
                { d: "Jan 1", n: "New Year's Day", w: "Wednesday" },
                { d: "Jul 4", n: "Independence Day", w: "Friday" },
                { d: "Nov 27", n: "Thanksgiving Day", w: "Thursday" },
                { d: "Dec 25", n: "Christmas Day", w: "Thursday" },
              ].map((h) => (
                <li key={h.n} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <div className="font-medium">{h.n}</div>
                    <div className="text-xs text-muted-foreground">{h.w}</div>
                  </div>
                  <span className="font-semibold text-primary">{h.d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <MapPin className="h-4 w-4" /> Calendar Preview
            </h3>
            <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs">
              {["S","M","T","W","T","F","S"].map((d, i) => (
                <div key={i} className="py-1 font-medium text-muted-foreground">{d}</div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => {
                const day = i - 2;
                const isHoliday = [4, 18, 25].includes(day);
                if (day < 1 || day > 30) return <div key={i} />;
                return (
                  <div
                    key={i}
                    className={
                      "aspect-square rounded-md p-1 " +
                      (isHoliday
                        ? "bg-primary/15 font-semibold text-primary"
                        : "text-muted-foreground")
                    }
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            <Button asChild className="mt-6 w-full" variant="outline">
              <Link to="/holidays">Open full calendar <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
