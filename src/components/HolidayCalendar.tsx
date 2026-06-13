import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Holiday } from "@/lib/holidays";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface Props {
  year: number;
  holidays: Holiday[];
  onSelect?: (h: Holiday) => void;
}

export function HolidayCalendar({ year, holidays, onSelect }: Props) {
  const today = new Date();
  const initialMonth =
    today.getFullYear() === year ? today.getMonth() : 0;
  const [month, setMonth] = useState(initialMonth);
  const [selected, setSelected] = useState<string | null>(null);

  const map = useMemo(() => {
    const m = new Map<string, Holiday[]>();
    for (const h of holidays) {
      const arr = m.get(h.date) ?? [];
      arr.push(h);
      m.set(h.date, arr);
    }
    return m;
  }, [holidays]);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const fmt = (d: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const selectedHolidays = selected ? map.get(selected) ?? [] : [];
  const fmtLong = (s: string) =>
    new Date(s + "T00:00:00").toLocaleDateString(undefined, {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });

  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => setMonth((m) => (m + 11) % 12)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-base font-semibold">{MONTHS[month]} {year}</h3>
        <Button variant="ghost" size="icon" onClick={() => setMonth((m) => (m + 1) % 12)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
        {WEEKDAYS.map((d) => <div key={d} className="py-1">{d}</div>)}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (d === null) return <div key={i} />;
          const dateStr = fmt(d);
          const hs = map.get(dateStr);
          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === d;
          const isSelected = selected === dateStr;
          return (
            <button
              key={i}
              onClick={() => {
                if (hs) {
                  setSelected(dateStr);
                  onSelect?.(hs[0]);
                }
              }}
              className={cn(
                "relative aspect-square rounded-md border border-transparent p-1 text-sm transition-colors",
                hs
                  ? "border-primary/20 bg-primary/10 font-semibold text-foreground hover:bg-primary/20 cursor-pointer"
                  : "text-muted-foreground hover:bg-accent",
                isToday && "ring-2 ring-primary",
                isSelected && "bg-primary/25 border-primary/50"
              )}
              title={hs?.map((h) => h.name).join(", ")}
            >
              <span>{d}</span>
              {hs && (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>

      {selected && selectedHolidays.length > 0 && (
        <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-4">
          <div className="mb-3 flex items-start justify-between gap-2">
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-primary">
                Holiday details
              </div>
              <div className="mt-0.5 text-sm font-medium">{fmtLong(selected)}</div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 shrink-0"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {selectedHolidays.map((h) => (
              <div key={h.name} className="rounded-md border border-border bg-card p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{h.name}</span>
                  <Badge variant="outline" className="text-[10px] capitalize">
                    {h.type.replace("-", " ")}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{h.description}</p>
                <div className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>
                    <span className="font-medium text-foreground">Applicable in: </span>
                    {h.states === "all" ? "All states (Nationwide)" : h.states.join(", ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}