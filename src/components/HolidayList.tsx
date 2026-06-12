import { useMemo, useState } from "react";
import { ArrowUpDown, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Holiday } from "@/lib/holidays";

function dow(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString(undefined, { weekday: "long" });
}
function fmt(d: string) {
  return new Date(d + "T00:00:00").toLocaleDateString(undefined, {
    month: "short", day: "numeric", year: "numeric",
  });
}

export function HolidayList({ holidays }: { holidays: Holiday[] }) {
  const [q, setQ] = useState("");
  const [asc, setAsc] = useState(true);

  const rows = useMemo(() => {
    const needle = q.toLowerCase();
    const filtered = holidays.filter((h) =>
      h.name.toLowerCase().includes(needle) ||
      h.description.toLowerCase().includes(needle)
    );
    return filtered.sort((a, b) =>
      asc ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
    );
  }, [holidays, q, asc]);

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search holidays..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="sm" onClick={() => setAsc((v) => !v)}>
          <ArrowUpDown className="mr-1 h-3.5 w-3.5" />
          Date {asc ? "Asc" : "Desc"}
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Day</th>
              <th className="px-4 py-3">Holiday</th>
              <th className="px-4 py-3">Region</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  No holidays found.
                </td>
              </tr>
            )}
            {rows.map((h) => (
              <tr key={h.date + h.name} className="border-t border-border transition-colors hover:bg-muted/30 align-top">
                <td className="whitespace-nowrap px-4 py-3 font-medium">{fmt(h.date)}</td>
                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{dow(h.date)}</td>
                <td className="px-4 py-3">
                  <div className="font-medium">{h.name}</div>
                  <div className="text-xs text-muted-foreground">{h.description}</div>
                  <Badge variant="outline" className="mt-1.5 text-[10px] capitalize">{h.type.replace("-", " ")}</Badge>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground max-w-xs">
                  {h.states === "all" ? "All India" : h.states.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}