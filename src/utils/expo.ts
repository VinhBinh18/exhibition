import { ProductType } from "@/types/product";
import { CategoryType } from "@/types/category";

export type ExpoQuery = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  country?: string;
  city?: string;
  venue?: string;
  year?: string;
  month?: string;
  sort?: string;
};

export type ExpoFilterOptions = {
  countries: string[];
  cities: string[];
  venues: string[];
  years: string[];
  months: string[];
};

export const EXPO_PAGE_SIZE = 8;
export const EXPO_HOME_PAGE_SIZE = 4;

export const expoDateValue = (product: ProductType) => {
  const date = String(product.attributes?.date || "");
  const match = date.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (match) {
    const [, day, month, year] = match;
    return Number(
      `${year}${month.padStart(2, "0")}${day.padStart(2, "0")}`
    );
  }

  const month =
    Number(String(product.attributes?.month || "").replace(/\D/g, "")) || 12;
  const year = Number(product.attributes?.year) || 2026;
  return year * 10000 + month * 100;
};

export const sortExpoProducts = (items: ProductType[], sortBy = "date") => {
  const copy = [...items];
  if (sortBy === "name") {
    return copy.sort((a, b) => a.name.localeCompare(b.name, "vi"));
  }
  return copy.sort((a, b) => expoDateValue(a) - expoDateValue(b));
};

export const getEventDate = (product: ProductType) =>
  String(product.attributes?.date || product.attributes?.month || "2026");

export const getEventBadge = (product: ProductType) => {
  if (product.event === "opening-now") {
    return { label: "Khai mạc", className: "bg-teal-500 text-white" };
  }
  if (product.event === "this-month") {
    const month = String(product.attributes?.month || "");
    if (month === "Tháng 9") {
      return { label: "Tháng này", className: "bg-rose-500 text-white" };
    }
    return { label: "Tuần này", className: "bg-violet-500 text-white" };
  }
  return { label: "Sắp diễn ra", className: "bg-indigo-500 text-white" };
};

export const categoryLabelOf = (
  product: ProductType,
  categories: CategoryType[]
) =>
  categories.find((category) => category.name === product.category)?.label ||
  product.category;

export const uniqueSorted = (values: (string | undefined)[]) =>
  Array.from(new Set(values.filter((value): value is string => Boolean(value))))
    .sort((a, b) => a.localeCompare(b, "vi"));

export const uniqueMonths = (values: (string | undefined)[]) =>
  uniqueSorted(values).sort(
    (a, b) =>
      Number(a.replace(/\D/g, "")) - Number(b.replace(/\D/g, ""))
  );

export const expoQueryFromSearchParams = (
  params: Record<string, string | undefined>
): ExpoQuery => ({
  page: params.page ? Number(params.page) || 1 : 1,
  search: params.search?.trim() || undefined,
  category: params.category || undefined,
  country: params.country || undefined,
  city: params.city || undefined,
  venue: params.venue || undefined,
  year: params.year || undefined,
  month: params.month || undefined,
  sort: params.sort || "date",
});

export const expoHref = (
  params: URLSearchParams | Record<string, string | undefined>,
  page: number
) => {
  const next =
    params instanceof URLSearchParams
      ? new URLSearchParams(params.toString())
      : new URLSearchParams(
          Object.entries(params).filter((entry): entry is [string, string] =>
            Boolean(entry[1])
          )
        );

  if (page <= 1) next.delete("page");
  else next.set("page", String(page));

  const qs = next.toString();
  return qs ? `/trien-lam?${qs}` : "/trien-lam";
};
