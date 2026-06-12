import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Calendar as CalendarIcon } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SiteLayout } from "@/components/SiteLayout";
import { HolidayCalendar } from "@/components/HolidayCalendar";
import { HolidayList } from "@/components/HolidayList";
import { UpcomingHolidays } from "@/components/UpcomingHolidays";
import { DateChecker } from "@/components/DateChecker";
import { getHolidaysForYear, INDIA_STATES, type Holiday } from "@/lib/holidays";

export const Route = createFileRoute("/holidays")({
  head: () => ({
    meta: [
      { title: "India Bank Holidays — Check Any Date" },
      { name: "description", content: "Check if a date is a bank holiday in India. Filter by state and year. Includes RBI 2nd & 4th Saturday holidays." },
      { property: "og:title", content: "India Bank Holidays" },
      { property: "og:description", content: "Check any date for India bank holidays — by state and year." },
    ],
  }),
  component: HolidaysPage,
});

function HolidaysPage() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [state, setState] = useState<string>("all");
  const [satOnly, setSatOnly] = useState(false);
  const [includeWeekly, setIncludeWeekly] = useState(true);

  const all: Holiday[] = useMemo(
    () => getHolidaysForYear(year, includeWeekly),
    [year, includeWeekly]
  );

  const filtered = useMemo(() => {
    let list = all;
    if (state !== "all") {
      list = list.filter(
        (h) => h.states === "all" || (Array.isArray(h.states) && h.states.includes(state))
      );
    }
    if (satOnly) {
      list = list.filter((h) => h.type === "rbi-saturday");
    }
    return list;
  }, [all, state, satOnly]);

  const years: number[] = [];
  for (let y = currentYear - 1; y <= currentYear + 1; y++) years.push(y);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-10">
          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              🇮🇳 India Bank Holidays
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Is it a bank holiday today?
            </h1>
            <p className="mt-2 text-muted-foreground">
              Pick any date below to instantly check. Filter by state and year to see all RBI bank holidays in India.
            </p>
          </div>

          <DateChecker state={state} />

          <div className="mt-6 grid gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:grid-cols-3">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> State / UT
              </label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent className="max-h-72">
                  <SelectItem value="all">All India</SelectItem>
                  {INDIA_STATES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
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
            <div className="flex flex-col justify-end gap-2 rounded-md border border-dashed border-border p-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="sat-only" className="text-xs font-medium">2nd & 4th Sat only</Label>
                <Switch id="sat-only" checked={satOnly} onCheckedChange={setSatOnly} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="weekly" className="text-xs font-medium">Include weekly offs</Label>
                <Switch id="weekly" checked={includeWeekly} onCheckedChange={setIncludeWeekly} />
              </div>
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