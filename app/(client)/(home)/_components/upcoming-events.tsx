"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { ExhibitionEventRecord } from "@/types/records";
import { EXPO_HOME_PAGE_SIZE } from "@/lib/expo";

import { Input } from "@/components/ui/input";
import { EventCard } from "@/components/expo/event-card";
import { EventPagination } from "@/components/expo/event-pagination";

type UpcomingEventsProps = {
  events: ExhibitionEventRecord[];
};

export const UpcomingEvents = ({ events }: UpcomingEventsProps) => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return events;
    return events.filter((event) =>
      `${event.name} ${event.location} ${event.description}`
        .toLowerCase()
        .includes(keyword)
    );
  }, [events, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / EXPO_HOME_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * EXPO_HOME_PAGE_SIZE,
    currentPage * EXPO_HOME_PAGE_SIZE
  );

  return (
    <div className="space-y-8">
      <form
        action="/trien-lam"
        className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:flex-row sm:items-center"
        onSubmit={() => setPage(1)}
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            name="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Tìm sự kiện theo tên, ngành, địa điểm..."
            className="h-11 rounded-xl border-0 bg-slate-50 pl-10 shadow-none focus-visible:ring-0"
          />
        </div>
        <button
          type="submit"
          className="h-11 shrink-0 rounded-xl bg-primary px-5 text-sm font-medium text-white hover:bg-primary/90"
        >
          Tìm kiếm
        </button>
      </form>

      {pageItems.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pageItems.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed bg-slate-50 py-16 text-center text-slate-500">
          Không tìm thấy sự kiện phù hợp.
        </p>
      )}

      <EventPagination
        page={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};
