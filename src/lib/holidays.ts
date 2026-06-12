const API = "https://date.nager.at/api/v3";

export interface Country {
  countryCode: string;
  name: string;
}

export interface Holiday {
  date: string; // YYYY-MM-DD
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

export async function fetchCountries(): Promise<Country[]> {
  const res = await fetch(`${API}/AvailableCountries`);
  if (!res.ok) throw new Error("Failed to load countries");
  return res.json();
}

export async function fetchHolidays(year: number, country: string): Promise<Holiday[]> {
  const res = await fetch(`${API}/PublicHolidays/${year}/${country}`);
  if (!res.ok) throw new Error("Failed to load holidays");
  return res.json();
}

export async function fetchNextWorldwide(): Promise<Holiday[]> {
  const res = await fetch(`${API}/NextPublicHolidaysWorldwide`);
  if (!res.ok) throw new Error("Failed to load upcoming holidays");
  return res.json();
}

export function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr + "T00:00:00");
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function getCountiesForHolidays(holidays: Holiday[]): string[] {
  const set = new Set<string>();
  for (const h of holidays) if (h.counties) h.counties.forEach((c) => set.add(c));
  return Array.from(set).sort();
}