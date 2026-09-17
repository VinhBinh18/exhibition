import { USE_MOCK_API } from "@/config.global";
import { ProductType } from "@/types/product";
import { PaginatedResponse } from "@/types/global";
import {
  getMockExpoFilterOptions,
  getMockProductBySlug,
  getMockRelatedProducts,
  listMockProducts,
} from "@/mocks/resolve";
import { EXPO_PAGE_SIZE, ExpoQuery } from "@/utils/expo";

import { serializeFilters } from "../filters";

export const fetchProductsByEvent = async (tag: string) => {
  if (USE_MOCK_API) {
    return listMockProducts({ event: tag, limit: 10 }).data;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/products?event=${tag}&limit=10`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) return [];
  const { result } = await res.json();
  return result?.data || [];
};

export const fetchProductsByCategory = async ({
  page = 1,
  limit = 30,
  search,
  filters,
  category,
}: {
  page?: number;
  limit?: number;
  search?: string;
  category: string;
  filters?: Record<string, string[]>;
}): Promise<PaginatedResponse<ProductType>> => {
  if (USE_MOCK_API) {
    return listMockProducts({
      page,
      limit,
      search,
      category,
      attributes: filters,
    });
  }

  const params = new URLSearchParams();
  params.append("category", category);
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  if (search) params.append("search", search);

  if (filters) {
    params.set("attributes", serializeFilters(filters));
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/products?${params.toString()}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      return { data: [], page, limit, total: 0, totalPages: 0 };
    }

    const { result } = await response.json();
    return result;
  } catch {
    return { data: [], page, limit, total: 0, totalPages: 0 };
  }
};

export const fetchRelatedProducts = async (productId: string) => {
  if (USE_MOCK_API) {
    return getMockRelatedProducts(productId, 10).data;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/products/related/${productId}?limit=10`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const { result } = await res.json();
    return result.data;
  } catch {
    return [];
  }
};

export const fetchProduct = async (
  slug: string
): Promise<ProductType | null> => {
  if (USE_MOCK_API) {
    return getMockProductBySlug(slug);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/products/slug/${slug}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const { result } = await res.json();
    return result;
  } catch {
    return null;
  }
};

export const fetchUpcomingExpos = async (limit = 12): Promise<ProductType[]> => {
  const result = await fetchExpos({ limit, page: 1 });
  return result.data;
};

export const fetchExpoFilterOptions = async () => {
  return getMockExpoFilterOptions();
};

export const fetchExpos = async (
  query: ExpoQuery = {}
): Promise<PaginatedResponse<ProductType>> => {
  const page = query.page && query.page > 0 ? query.page : 1;
  const limit = query.limit && query.limit > 0 ? query.limit : EXPO_PAGE_SIZE;
  const attributes: Record<string, string[]> = {};

  if (query.country) attributes.country = [query.country];
  if (query.city) attributes.city = [query.city];
  if (query.venue) attributes.venue = [query.venue];
  if (query.year) attributes.year = [query.year];
  if (query.month) attributes.month = [query.month];

  if (USE_MOCK_API) {
    return listMockProducts({
      page,
      limit,
      search: query.search,
      category: query.category,
      sortBy: query.sort || "date",
      attributes,
    });
  }

  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (query.search) params.set("search", query.search);
  if (query.category) params.set("category", query.category);
  if (query.sort) params.set("sortBy", query.sort);
  if (Object.keys(attributes).length) {
    params.set("attributes", serializeFilters(attributes));
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/products?${params.toString()}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) {
      return { data: [], page, limit, total: 0, totalPages: 0 };
    }
    const { result } = await res.json();
    return result;
  } catch {
    return { data: [], page, limit, total: 0, totalPages: 0 };
  }
};

