"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Bookmark, Search, SlidersHorizontal } from "lucide-react";

import { CategoryType } from "@/types/category";
import { useDebounce } from "@/hooks/use-debounce";
import { ExpoFilterOptions } from "@/utils/expo";

import { Input } from "@/components/ui/input";

type EventFiltersProps = {
  categories: CategoryType[];
  options: ExpoFilterOptions;
};

const ALL = "all";

export const EventFilters = ({ categories, options }: EventFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") ?? "");
  const debouncedQuery = useDebounce(query, 400);

  const current = {
    search: searchParams.get("search") ?? "",
    category: searchParams.get("category") ?? ALL,
    country: searchParams.get("country") ?? ALL,
    city: searchParams.get("city") ?? ALL,
    venue: searchParams.get("venue") ?? ALL,
    year: searchParams.get("year") ?? ALL,
    month: searchParams.get("month") ?? ALL,
  };

  const pushParams = (patch: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(patch).forEach(([key, value]) => {
      if (!value || value === ALL) params.delete(key);
      else params.set(key, value);
    });
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `/trien-lam?${qs}` : "/trien-lam");
  };

  useEffect(() => {
    if (debouncedQuery === current.search) return;
    pushParams({ search: debouncedQuery || null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  useEffect(() => {
    setQuery(searchParams.get("search") ?? "");
  }, [searchParams]);

  return (
    <div className="space-y-4">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          pushParams({ search: query || null });
        }}
        className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
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

      <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-indigo-50/90 p-3">
        <div className="flex items-center gap-2 px-2 py-1 text-sm font-semibold uppercase tracking-wide text-primary">
          <SlidersHorizontal className="size-4" />
          Bộ lọc
        </div>
        <FilterSelect
          value={current.category}
          placeholder="Tất cả ngành"
          onChange={(value) => pushParams({ category: value })}
          items={categories.map((category) => ({
            value: category.name,
            label: category.label,
          }))}
        />
        <FilterSelect
          value={current.country}
          placeholder="Tất cả quốc gia"
          onChange={(value) => pushParams({ country: value })}
          items={options.countries.map((country) => ({
            value: country,
            label: country,
          }))}
        />
        <FilterSelect
          value={current.city}
          placeholder="Tất cả thành phố"
          onChange={(value) => pushParams({ city: value })}
          items={options.cities.map((city) => ({ value: city, label: city }))}
        />
        <FilterSelect
          value={current.venue}
          placeholder="Tất cả địa điểm"
          onChange={(value) => pushParams({ venue: value })}
          items={options.venues.map((venue) => ({
            value: venue,
            label: venue,
          }))}
        />
        <FilterSelect
          value={current.year}
          placeholder="Tất cả năm"
          onChange={(value) => pushParams({ year: value })}
          items={options.years.map((year) => ({ value: year, label: year }))}
        />
        <FilterSelect
          value={current.month}
          placeholder="Tất cả tháng"
          onChange={(value) => pushParams({ month: value })}
          items={options.months.map((month) => ({
            value: month,
            label: month,
          }))}
        />
      </div>
    </div>
  );
};

export const EventSort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? "date";

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "date") params.delete("sort");
    else params.set("sort", value);
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `/trien-lam?${qs}` : "/trien-lam");
  };

  return (
    <div className="flex items-center gap-2">
      <FilterSelect
        value={sort}
        placeholder="Ngày gần nhất"
        allLabel="Ngày gần nhất"
        allValue="date"
        onChange={onChange}
        items={[{ value: "name", label: "Tên A-Z" }]}
        className="min-w-[160px]"
      />
      <button
        type="button"
        aria-label="Sự kiện đã lưu"
        className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-primary"
      >
        <Bookmark className="size-4" />
      </button>
    </div>
  );
};

const FilterSelect = ({
  value,
  placeholder,
  items,
  onChange,
  allLabel,
  allValue = ALL,
  className,
}: {
  value: string;
  placeholder: string;
  items: { value: string; label: string }[];
  onChange: (value: string) => void;
  allLabel?: string;
  allValue?: string;
  className?: string;
}) => (
  <select
    value={value || allValue}
    onChange={(event) => onChange(event.target.value)}
    className={`h-10 min-w-[150px] cursor-pointer rounded-full border-0 bg-white px-4 text-sm text-slate-700 shadow-sm outline-none ${className ?? ""}`}
    aria-label={placeholder}
  >
    <option value={allValue}>{allLabel || placeholder}</option>
    {items.map((item) => (
      <option key={item.value} value={item.value}>
        {item.label}
      </option>
    ))}
  </select>
);
