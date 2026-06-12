import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Globe2, MapPin, Calendar as CalendarIcon } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { SiteLayout } from "@/components/SiteLayout";
import { HolidayCalendar } from "@/components/HolidayCalendar";
import { HolidayList } from "@/components/HolidayList";
import { UpcomingHolidays } from "@/components/UpcomingHolidays";
import { fetchCountries, fetchHolidays, getCountiesForHolidays } from "@/lib/holidays";

export const Route = createFileRoute("/holidays")({
  head: () => ({
    meta: [
      { title: "Find Bank Holidays — Bank Holiday Finder" },
      { name: "description", content: "Search bank holidays by country, region, and year. View as a list or calendar." },
      { property: "og:title", content: "Find Bank Holidays" },
      { property: "og:description", content: "Search bank holidays by country, region, and year." },
    ],
  }),
  component: HolidaysPage,
});

function HolidaysPage() {
  const currentYear = new Date().getFullYear();
  const [country, setCountry] = useState("US");
  const [year, setYear] = useState(currentYear);
  const [region, setRegion] = useState<string>("all");

  const countries = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    staleTime: 1000 * 60 * 60,
  });

  const holidays = useQuery({
    queryKey: ["holidays", country, year],
    queryFn: () => fetchHolidays(year, country),
    staleTime: 1000 * 60 * 10,
  });

  const regions = useMemo(
    () => (holidays.data ? getCountiesForHolidays(holidays.data) : []),
    [holidays.data]
  );

  const filtered = useMemo(() => {
    if (!holidays.data) return [];
    if (region === "all") return holidays.data;
    return holidays.data.filter(
      (h) => h.global || (h.counties && h.counties.includes(region))
    );
  }, [holidays.data, region]);

  const years: number[] = [];
  for (let y = currentYear - 3; y <= currentYear + 5; y++) years.push(y);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Bank Holidays</h1>
          <p className="mt-2 text-muted-foreground">
            Pick a country, region, and year to view official public holidays.
          </p>
          <div className="mt-6 grid gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:grid-cols-3">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Globe2 className="h-3.5 w-3.5" /> Country
              </label>
              <Select value={country} onValueChange={(v) => { setCountry(v); setRegion("all"); }}>
                <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                <SelectContent className="max-h-72">
                  {(countries.data ?? []).map((c) => (
                    <SelectItem key={c.countryCode} value={c.countryCode}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> Region / State
              </label>
              <Select value={region} onValueChange={setRegion} disabled={regions.length === 0}>
                <SelectTrigger>
                  <SelectValue placeholder={regions.length ? "All regions" : "Nationwide only"} />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  <SelectItem value="all">All regions</SelectItem>
                  {regions.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <CalendarIcon className="h-3.5 w-3.5" /> Year
              </label>
              <Select value={String(year)} onValueChange={(v) => setYear(Number(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid gap-6 px-4 py-8 lg:grid-cols-[1fr_340px]">
        <div className="min-w-0">
          <Tabs defaultValue="list">
            <TabsList>
              <TabsTrigger value="list">List</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="mt-4">
              {holidays.isLoading ? (
                <Skeleton className="h-96 w-full rounded-xl" />
              ) : holidays.isError ? (
                <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-6 text-sm text-destructive">
                  Failed to load holidays. Please try a different country or try again.
                </div>
              ) : (
                <HolidayList holidays={filtered} />
              )}
            </TabsContent>
            <TabsContent value="calendar" className="mt-4">
              {holidays.isLoading ? (
                <Skeleton className="h-96 w-full rounded-xl" />
              ) : (
                <HolidayCalendar year={year} holidays={filtered} />
              )}
            </TabsContent>
          </Tabs>
        </div>
        <aside className="min-w-0">
          {holidays.isLoading ? (
            <Skeleton className="h-80 w-full rounded-xl" />
          ) : (
            <UpcomingHolidays holidays={filtered} />
          )}
        </aside>
      </section>
    </SiteLayout>
  );
}