import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
          return (
            <button
              key={i}
              onClick={() => hs && onSelect?.(hs[0])}
              className={cn(
                "relative aspect-square rounded-md border border-transparent p-1 text-sm transition-colors",
                hs
                  ? "border-primary/20 bg-primary/10 font-semibold text-foreground hover:bg-primary/20"
                  : "text-muted-foreground hover:bg-accent",
                isToday && "ring-2 ring-primary"
              )}
              title={hs?.map((h) => h.localName).join(", ")}
            >
              <span>{d}</span>
              {hs && (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}