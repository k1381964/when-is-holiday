import { useState } from "react";
import { CalendarCheck2, CheckCircle2, XCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { checkDate, parseDate, type HolidayCheckResult } from "@/lib/holidays";

interface Props {
  state?: string;
}

function fmt(dateStr: string) {
  return parseDate(dateStr).toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

export function DateChecker({ state }: Props) {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState<string>(today);
  const [result, setResult] = useState<HolidayCheckResult | null>(null);

  const onCheck = () => {
    if (!date) return;
    setResult(checkDate(date, state && state !== "all" ? state : undefined));
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
          <CalendarCheck2 className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-base font-semibold leading-tight">Check a date</h2>
          <p className="text-xs text-muted-foreground">
            Pick any date and see if banks are open in India
            {state && state !== "all" ? ` (${state})` : ""}.
          </p>
        </div>
      </div>

      <form
        className="mt-4 flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          onCheck();
        }}
      >
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="sm:max-w-xs"
          aria-label="Select date to check"
        />
        <Button type="submit" className="shrink-0">Check</Button>
      </form>

      {result && (
        <div
          className={
            "mt-5 rounded-xl border p-4 " +
            (result.isHoliday
              ? "border-primary/30 bg-primary/5"
              : "border-border bg-muted/30")
          }
        >
          <div className="flex items-start gap-3">
            {result.isHoliday ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 text-muted-foreground" />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {fmt(result.date)}
                </span>
                <Badge variant={result.isHoliday ? "default" : "secondary"}>
                  {result.isHoliday ? "Bank Holiday" : "Working Day"}
                </Badge>
              </div>
              <p className="mt-1 text-sm font-medium">{result.reason}</p>

              {result.matches.length > 0 && (
                <div className="mt-3 space-y-3">
                  {result.matches.map((m) => (
                    <div
                      key={m.name + m.date}
                      className="rounded-lg border border-border bg-card p-3"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold">{m.name}</span>
                        <Badge variant="outline" className="text-[10px] capitalize">
                          {m.type.replace("-", " ")}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
                      <div className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        <span>
                          <span className="font-medium text-foreground">Applicable in: </span>
                          {m.states === "all" ? "All states (Nationwide)" : m.states.join(", ")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}