import { CalendarClock } from "lucide-react";
import type { Holiday } from "@/lib/holidays";
import { daysUntil } from "@/lib/holidays";

function formatDate(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString(undefined, {
    weekday: "short", month: "short", day: "numeric", year: "numeric",
  });
}

export function UpcomingHolidays({ holidays }: { holidays: Holiday[] }) {
  const upcoming = holidays
    .filter((h) => daysUntil(h.date) >= 0)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  const next = upcoming[0];

  return (
    <div className="space-y-4">
      {next && (
        <div className="rounded-xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-primary">
            <CalendarClock className="h-4 w-4" /> Next Holiday
          </div>
          <h3 className="mt-2 text-2xl font-bold">{next.localName}</h3>
          <p className="text-sm text-muted-foreground">{formatDate(next.date)}</p>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-5xl font-extrabold tabular-nums text-primary">
              {daysUntil(next.date)}
            </span>
            <span className="text-sm text-muted-foreground">
              {daysUntil(next.date) === 1 ? "day to go" : "days to go"}
            </span>
          </div>
        </div>
      )}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="border-b border-border px-4 py-3 text-sm font-semibold">
          Upcoming Holidays
        </div>
        <ul className="divide-y divide-border">
          {upcoming.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-muted-foreground">
              No upcoming holidays this year.
            </li>
          )}
          {upcoming.map((h) => (
            <li key={h.date + h.name} className="flex items-center justify-between px-4 py-3 text-sm">
              <div className="min-w-0">
                <div className="truncate font-medium">{h.localName}</div>
                <div className="text-xs text-muted-foreground">{formatDate(h.date)}</div>
              </div>
              <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                {daysUntil(h.date)}d
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}