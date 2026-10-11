import { supabaseAdmin } from "@/lib/supabase/server";
import { toExhibitionEvent } from "@/lib/supabase/http";
import { ExhibitionEventRecord } from "@/types/records";

export type PublicEventQuery = {
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
  year?: string;
  month?: string;
  sort?: string;
};

export type PublicEventOptions = {
  countries: string[];
  cities: string[];
  venues: string[];
  years: string[];
  months: string[];
};

const monthLabel = (month: string) => `Tháng ${Number(month)}`;

export const listPublicEvents = async (query: PublicEventQuery = {}) => {
  const page = Math.max(1, query.page || 1);
  const limit = Math.min(100, Math.max(1, query.limit || 8));
  const { data, error } = await supabaseAdmin()
    .from("events")
    .select("*")
    .eq("is_deleted", false);

  if (error) throw error;

  const events = (data ?? []).map((row) => toExhibitionEvent(row));
  const search = (query.search || "").trim().toLowerCase();
  const location = (query.location || "").trim().toLowerCase();
  const year = query.year || "";
  const monthDigits = (query.month || "").replace(/\D/g, "");
  const month = monthDigits ? monthDigits.padStart(2, "0") : "";

  const filtered = events.filter((event) => {
    const haystack = `${event.name} ${event.location} ${event.description}`.toLowerCase();
    if (search && !haystack.includes(search)) return false;
    if (location && event.location.toLowerCase() !== location) return false;
    if (year && !event.fromDate.startsWith(year)) return false;
    if (month && event.fromDate.slice(5, 7) !== month) return false;
    return true;
  });

  filtered.sort((a, b) =>
    query.sort === "name"
      ? a.name.localeCompare(b.name, "vi")
      : a.fromDate.localeCompare(b.fromDate)
  );

  const total = filtered.length;
  const start = (page - 1) * limit;

  return {
    data: filtered.slice(start, start + limit),
    page,
    limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit) || 1),
    options: eventOptions(events),
  };
};

export const getPublicEvent = async (id: string) => {
  const { data, error } = await supabaseAdmin()
    .from("events")
    .select("*")
    .eq("id", id)
    .eq("is_deleted", false)
    .maybeSingle();

  if (error) throw error;
  return data ? toExhibitionEvent(data) : null;
};

const eventOptions = (events: ExhibitionEventRecord[]): PublicEventOptions => {
  const venues = Array.from(new Set(events.map((event) => event.location).filter(Boolean))).sort(
    (a, b) => a.localeCompare(b, "vi")
  );
  const years = Array.from(
    new Set(events.map((event) => event.fromDate.slice(0, 4)).filter(Boolean))
  ).sort();
  const months = Array.from(
    new Set(events.map((event) => event.fromDate.slice(5, 7)).filter(Boolean))
  ).sort();

  return {
    countries: [],
    cities: [],
    venues,
    years,
    months: months.map(monthLabel),
  };
};
