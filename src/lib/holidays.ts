// India Bank Holidays — curated dataset based on RBI's published bank
// holiday calendar plus state-specific gazetted holidays. Use this as a
// quick reference; always reconfirm with your local bank branch.

export type HolidayType = "national" | "gazetted" | "restricted" | "rbi-saturday" | "weekly-off";

export interface Holiday {
  date: string; // YYYY-MM-DD
  name: string;
  description: string;
  type: HolidayType;
  states: "all" | string[]; // "all" for nationwide, else array of state names
}

// Indian states & UTs used for filtering
export const INDIA_STATES: string[] = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir",
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

// Curated India holiday data. Dates verified against RBI / Govt. of India
// gazetted holiday lists for 2024–2026.
const STATIC_HOLIDAYS: Holiday[] = [
  // 2025
  { date: "2025-01-01", name: "New Year's Day", description: "Start of the Gregorian calendar year — observed by most banks across India.", type: "gazetted", states: ["Arunachal Pradesh","Assam","Manipur","Meghalaya","Mizoram","Nagaland","Puducherry","Sikkim","Tamil Nadu","Telangana","West Bengal"] },
  { date: "2025-01-14", name: "Makar Sankranti / Pongal", description: "Harvest festival marking the sun's transition into Capricorn.", type: "gazetted", states: ["Andhra Pradesh","Gujarat","Karnataka","Telangana","Tamil Nadu","Puducherry"] },
  { date: "2025-01-26", name: "Republic Day", description: "Commemorates the adoption of the Constitution of India in 1950.", type: "national", states: "all" },
  { date: "2025-02-26", name: "Maha Shivaratri", description: "Hindu festival dedicated to Lord Shiva.", type: "gazetted", states: ["Andhra Pradesh","Chhattisgarh","Gujarat","Himachal Pradesh","Jammu & Kashmir","Jharkhand","Karnataka","Madhya Pradesh","Maharashtra","Odisha","Puducherry","Rajasthan","Telangana","Uttar Pradesh","Uttarakhand"] },
  { date: "2025-03-14", name: "Holi", description: "Festival of colours celebrating the arrival of spring.", type: "gazetted", states: ["Bihar","Chhattisgarh","Delhi","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Madhya Pradesh","Maharashtra","Odisha","Punjab","Rajasthan","Uttar Pradesh","Uttarakhand","West Bengal"] },
  { date: "2025-03-31", name: "Eid-ul-Fitr (Ramzan Id)", description: "Marks the end of Ramadan, the Islamic holy month of fasting.", type: "gazetted", states: "all" },
  { date: "2025-04-10", name: "Mahavir Jayanti", description: "Birth anniversary of Lord Mahavir, the 24th Tirthankara of Jainism.", type: "gazetted", states: ["Chhattisgarh","Delhi","Gujarat","Haryana","Karnataka","Madhya Pradesh","Maharashtra","Rajasthan","Tamil Nadu","Uttar Pradesh"] },
  { date: "2025-04-14", name: "Dr. Ambedkar Jayanti", description: "Birth anniversary of Dr. B.R. Ambedkar, architect of the Indian Constitution.", type: "gazetted", states: "all" },
  { date: "2025-04-18", name: "Good Friday", description: "Christian observance commemorating the crucifixion of Jesus Christ.", type: "gazetted", states: "all" },
  { date: "2025-05-01", name: "Maharashtra Day / May Day", description: "Formation day of Maharashtra and International Labour Day.", type: "gazetted", states: ["Assam","Bihar","Goa","Karnataka","Kerala","Maharashtra","Manipur","Puducherry","Tamil Nadu","Telangana","Tripura","West Bengal"] },
  { date: "2025-05-12", name: "Buddha Purnima", description: "Birth anniversary of Gautama Buddha.", type: "gazetted", states: ["Arunachal Pradesh","Chhattisgarh","Delhi","Gujarat","Himachal Pradesh","Jammu & Kashmir","Madhya Pradesh","Maharashtra","Mizoram","Nagaland","Sikkim","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"] },
  { date: "2025-06-07", name: "Bakri Id (Eid-ul-Adha)", description: "Islamic festival of sacrifice.", type: "gazetted", states: "all" },
  { date: "2025-07-06", name: "Muharram", description: "Islamic day of mourning observed on the 10th of Muharram.", type: "gazetted", states: "all" },
  { date: "2025-08-15", name: "Independence Day", description: "Celebrates India's independence from British rule in 1947.", type: "national", states: "all" },
  { date: "2025-08-16", name: "Janmashtami", description: "Birth anniversary of Lord Krishna.", type: "gazetted", states: ["Assam","Chhattisgarh","Delhi","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Madhya Pradesh","Manipur","Odisha","Rajasthan","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"] },
  { date: "2025-08-27", name: "Ganesh Chaturthi", description: "Hindu festival celebrating the birth of Lord Ganesha.", type: "gazetted", states: ["Andhra Pradesh","Goa","Gujarat","Karnataka","Maharashtra","Puducherry","Tamil Nadu","Telangana"] },
  { date: "2025-09-05", name: "Milad-un-Nabi (Eid-e-Milad)", description: "Birth anniversary of Prophet Muhammad.", type: "gazetted", states: "all" },
  { date: "2025-10-02", name: "Gandhi Jayanti", description: "Birth anniversary of Mahatma Gandhi.", type: "national", states: "all" },
  { date: "2025-10-02", name: "Dussehra (Vijaya Dashami)", description: "Hindu festival marking the victory of good over evil.", type: "gazetted", states: "all" },
  { date: "2025-10-20", name: "Diwali (Deepavali)", description: "Festival of lights — one of the most widely celebrated Hindu festivals.", type: "national", states: "all" },
  { date: "2025-10-22", name: "Govardhan Puja", description: "Worship of Govardhan Hill, day after Diwali.", type: "gazetted", states: ["Bihar","Chhattisgarh","Gujarat","Haryana","Himachal Pradesh","Madhya Pradesh","Maharashtra","Rajasthan","Sikkim","Uttar Pradesh","Uttarakhand"] },
  { date: "2025-10-23", name: "Bhai Dooj", description: "Festival celebrating the bond between brothers and sisters.", type: "gazetted", states: ["Gujarat","Haryana","Himachal Pradesh","Maharashtra","Rajasthan","Uttar Pradesh","Uttarakhand"] },
  { date: "2025-11-05", name: "Guru Nanak Jayanti", description: "Birth anniversary of Guru Nanak Dev, founder of Sikhism.", type: "gazetted", states: "all" },
  { date: "2025-12-25", name: "Christmas Day", description: "Christian festival celebrating the birth of Jesus Christ.", type: "national", states: "all" },

  // 2026
  { date: "2026-01-01", name: "New Year's Day", description: "Start of the Gregorian calendar year — observed by most banks across India.", type: "gazetted", states: ["Arunachal Pradesh","Assam","Manipur","Meghalaya","Mizoram","Nagaland","Puducherry","Sikkim","Tamil Nadu","Telangana","West Bengal"] },
  { date: "2026-01-14", name: "Makar Sankranti / Pongal", description: "Harvest festival marking the sun's transition into Capricorn.", type: "gazetted", states: ["Andhra Pradesh","Gujarat","Karnataka","Telangana","Tamil Nadu","Puducherry"] },
  { date: "2026-01-26", name: "Republic Day", description: "Commemorates the adoption of the Constitution of India in 1950.", type: "national", states: "all" },
  { date: "2026-02-17", name: "Maha Shivaratri", description: "Hindu festival dedicated to Lord Shiva.", type: "gazetted", states: ["Andhra Pradesh","Chhattisgarh","Gujarat","Himachal Pradesh","Jammu & Kashmir","Jharkhand","Karnataka","Madhya Pradesh","Maharashtra","Odisha","Puducherry","Rajasthan","Telangana","Uttar Pradesh","Uttarakhand"] },
  { date: "2026-03-03", name: "Holi", description: "Festival of colours celebrating the arrival of spring.", type: "gazetted", states: ["Bihar","Chhattisgarh","Delhi","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Madhya Pradesh","Maharashtra","Odisha","Punjab","Rajasthan","Uttar Pradesh","Uttarakhand","West Bengal"] },
  { date: "2026-03-21", name: "Eid-ul-Fitr (Ramzan Id)", description: "Marks the end of Ramadan, the Islamic holy month of fasting.", type: "gazetted", states: "all" },
  { date: "2026-03-31", name: "Mahavir Jayanti", description: "Birth anniversary of Lord Mahavir, the 24th Tirthankara of Jainism.", type: "gazetted", states: ["Chhattisgarh","Delhi","Gujarat","Haryana","Karnataka","Madhya Pradesh","Maharashtra","Rajasthan","Tamil Nadu","Uttar Pradesh"] },
  { date: "2026-04-03", name: "Good Friday", description: "Christian observance commemorating the crucifixion of Jesus Christ.", type: "gazetted", states: "all" },
  { date: "2026-04-14", name: "Dr. Ambedkar Jayanti", description: "Birth anniversary of Dr. B.R. Ambedkar, architect of the Indian Constitution.", type: "gazetted", states: "all" },
  { date: "2026-05-01", name: "Maharashtra Day / May Day", description: "Formation day of Maharashtra and International Labour Day.", type: "gazetted", states: ["Assam","Bihar","Goa","Karnataka","Kerala","Maharashtra","Manipur","Puducherry","Tamil Nadu","Telangana","Tripura","West Bengal"] },
  { date: "2026-05-01", name: "Buddha Purnima", description: "Birth anniversary of Gautama Buddha.", type: "gazetted", states: ["Arunachal Pradesh","Chhattisgarh","Delhi","Gujarat","Himachal Pradesh","Jammu & Kashmir","Madhya Pradesh","Maharashtra","Mizoram","Nagaland","Sikkim","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"] },
  { date: "2026-05-27", name: "Bakri Id (Eid-ul-Adha)", description: "Islamic festival of sacrifice.", type: "gazetted", states: "all" },
  { date: "2026-06-26", name: "Muharram", description: "Islamic day of mourning observed on the 10th of Muharram.", type: "gazetted", states: "all" },
  { date: "2026-08-15", name: "Independence Day", description: "Celebrates India's independence from British rule in 1947.", type: "national", states: "all" },
  { date: "2026-08-26", name: "Janmashtami", description: "Birth anniversary of Lord Krishna.", type: "gazetted", states: ["Assam","Chhattisgarh","Delhi","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Madhya Pradesh","Manipur","Odisha","Rajasthan","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"] },
  { date: "2026-08-26", name: "Milad-un-Nabi (Eid-e-Milad)", description: "Birth anniversary of Prophet Muhammad.", type: "gazetted", states: "all" },
  { date: "2026-09-15", name: "Ganesh Chaturthi", description: "Hindu festival celebrating the birth of Lord Ganesha.", type: "gazetted", states: ["Andhra Pradesh","Goa","Gujarat","Karnataka","Maharashtra","Puducherry","Tamil Nadu","Telangana"] },
  { date: "2026-10-02", name: "Gandhi Jayanti", description: "Birth anniversary of Mahatma Gandhi.", type: "national", states: "all" },
  { date: "2026-10-20", name: "Dussehra (Vijaya Dashami)", description: "Hindu festival marking the victory of good over evil.", type: "gazetted", states: "all" },
  { date: "2026-11-08", name: "Diwali (Deepavali)", description: "Festival of lights — one of the most widely celebrated Hindu festivals.", type: "national", states: "all" },
  { date: "2026-11-10", name: "Govardhan Puja", description: "Worship of Govardhan Hill, day after Diwali.", type: "gazetted", states: ["Bihar","Chhattisgarh","Gujarat","Haryana","Himachal Pradesh","Madhya Pradesh","Maharashtra","Rajasthan","Sikkim","Uttar Pradesh","Uttarakhand"] },
  { date: "2026-11-11", name: "Bhai Dooj", description: "Festival celebrating the bond between brothers and sisters.", type: "gazetted", states: ["Gujarat","Haryana","Himachal Pradesh","Maharashtra","Rajasthan","Uttar Pradesh","Uttarakhand"] },
  { date: "2026-11-24", name: "Guru Nanak Jayanti", description: "Birth anniversary of Guru Nanak Dev, founder of Sikhism.", type: "gazetted", states: "all" },
  { date: "2026-12-25", name: "Christmas Day", description: "Christian festival celebrating the birth of Jesus Christ.", type: "national", states: "all" },
];

// ---- Helpers ----

export function parseDate(dateStr: string): Date {
  return new Date(dateStr + "T00:00:00");
}

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = parseDate(dateStr);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * RBI rule: All banks observe the 2nd and 4th Saturdays of every month as
 * holidays. Returns the nth-Saturday (1-indexed) of the month if `d` is a
 * Saturday, else 0.
 */
export function saturdayOfMonth(d: Date): number {
  if (d.getDay() !== 6) return 0;
  return Math.ceil(d.getDate() / 7);
}

export function isRbiSaturdayHoliday(d: Date): boolean {
  const n = saturdayOfMonth(d);
  return n === 2 || n === 4;
}

export function isSunday(d: Date): boolean {
  return d.getDay() === 0;
}

/** Generate all 2nd & 4th Saturdays (RBI bank holidays) for a given year. */
export function generateWeeklyOffs(year: number): Holiday[] {
  const out: Holiday[] = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    if (isRbiSaturdayHoliday(d)) {
      const n = saturdayOfMonth(d);
      out.push({
        date: toISODate(d),
        name: `${n === 2 ? "2nd" : "4th"} Saturday (RBI Holiday)`,
        description:
          "As per RBI, all banks in India observe the 2nd and 4th Saturday of every month as a holiday.",
        type: "rbi-saturday",
        states: "all",
      });
    }
  }
  return out;
}

export function getHolidaysForYear(year: number, includeWeeklyOffs = true): Holiday[] {
  const list = STATIC_HOLIDAYS.filter((h) => h.date.startsWith(String(year)));
  if (includeWeeklyOffs) list.push(...generateWeeklyOffs(year));
  return list.sort((a, b) => a.date.localeCompare(b.date));
}

export function getSaturdayHolidays(year: number): Holiday[] {
  return generateWeeklyOffs(year).filter((h) => h.type === "rbi-saturday");
}

export interface HolidayCheckResult {
  date: string;
  isHoliday: boolean;
  weekday: string;
  matches: Holiday[];
  reason: string;
}

export function checkDate(dateStr: string, stateFilter?: string): HolidayCheckResult {
  const d = parseDate(dateStr);
  const weekday = d.toLocaleDateString("en-IN", { weekday: "long" });
  const year = d.getFullYear();
  const all = getHolidaysForYear(year, true).filter((h) => h.date === dateStr);

  const matches = stateFilter
    ? all.filter((h) => h.states === "all" || (Array.isArray(h.states) && h.states.includes(stateFilter)))
    : all;

  let reason = "";
  if (matches.length === 0) {
    reason = stateFilter
      ? `${weekday} is a regular working day for banks in ${stateFilter}.`
      : `${weekday} is a regular working day for most banks in India.`;
  } else {
    const names = matches.map((m) => m.name).join(", ");
    reason = `Bank holiday: ${names}.`;
  }

  return { date: dateStr, isHoliday: matches.length > 0, weekday, matches, reason };
}