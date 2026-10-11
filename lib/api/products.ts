import { API_ENDPOINTS } from "@/lib/api-config";
import { toQuery, unwrap } from "@/lib/api-client";
import { apiService } from "@/lib/api-service";
import { USE_MOCK_API } from "@/lib/config";
import {
  ProductType,
  UseProductsParams,
  CommentPayload,
  ReplyCommentPayload,
  CreateProductPayload,
  UpdateProductPayload,
  UseEditCommentParams,
} from "@/types/product";
import { PaginatedResponse } from "@/types/global";
import {
  getMockExpoFilterOptions,
  getMockProductBySlug,
  getMockRelatedProducts,
  listMockProducts,
} from "@/lib/sample-data/resolve";
import { EXPO_PAGE_SIZE, ExpoQuery } from "@/lib/expo";

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

export const getProducts = async (params: UseProductsParams) => {
  const query = toQuery(params);
  const response = await apiService.get<{ result: PaginatedResponse<ProductType> }>(
    `${API_ENDPOINTS.products.list}?${query}`
  );
  return response.data.result;
};

export const getRelatedProducts = async (
  productId: string,
  params: UseProductsParams = { page: 1, limit: 10 }
) => {
  const query = toQuery(params);
  const response = await apiService.get(
    `${API_ENDPOINTS.products.related(productId)}?${query}`
  );
  return response.data;
};

export const getProduct = async (productId: string) => {
  const response = await apiService.get<{ result: ProductType }>(
    API_ENDPOINTS.products.detail(productId)
  );
  return response.data.result;
};

export const createProduct = async (data: CreateProductPayload) => {
  const formData = new FormData();

  data.images.forEach((file) => {
    formData.append("images", file);
  });

  formData.append("name", data.name);
  formData.append("slug", data.slug);
  formData.append("category", data.category);
  formData.append("price", data.price.toString());
  formData.append("stock", data.stock.toString());
  formData.append("attributes", JSON.stringify(data.attributes));

  if (data.event) formData.append("event", data.event);
  if (data.discountPrice !== undefined) {
    formData.append("discountPrice", data.discountPrice.toString());
  }
  if (data.discountPercent !== undefined) {
    formData.append("discountPercent", data.discountPercent.toString());
  }
  if (data.description) formData.append("description", data.description);

  return unwrap(await apiService.post(API_ENDPOINTS.products.list, formData));
};

export const updateProduct = async (data: UpdateProductPayload) => {
  const formData = new FormData();
  const newImages = data.images.filter((img) => img instanceof File) as File[];
  const oldImages = data.images.filter((img) => typeof img === "string") as string[];

  newImages.forEach((file) => {
    formData.append("images", file);
  });

  formData.append("name", data.name);
  formData.append("slug", data.slug);
  formData.append("category", data.category);
  formData.append("price", data.price.toString());
  formData.append("stock", data.stock.toString());
  formData.append("oldImages", JSON.stringify(oldImages));
  formData.append("attributes", JSON.stringify(data.attributes));

  if (data.event) formData.append("event", data.event);
  if (data.discountPrice !== undefined) {
    formData.append("discountPrice", data.discountPrice.toString());
  }
  if (data.discountPercent !== undefined) {
    formData.append("discountPercent", data.discountPercent.toString());
  }
  if (data.description) formData.append("description", data.description);

  return unwrap(await apiService.put(API_ENDPOINTS.products.detail(data.id), formData));
};

export const deleteProduct = async (productId: string) => {
  return unwrap(await apiService.delete(API_ENDPOINTS.products.detail(productId)));
};

export const createComment = async (productId: string, body: CommentPayload) => {
  const formData = new FormData();
  formData.append("content", body.content);
  formData.append("rating", body.rating.toString());

  body.images?.forEach((file) => {
    formData.append("images", file);
  });

  return unwrap(await apiService.post(API_ENDPOINTS.products.comment(productId), formData));
};

export const toggleLikeComment = async (productId: string, commentId: string) => {
  return unwrap(await apiService.post(API_ENDPOINTS.products.like(productId, commentId)));
};

export const replyComment = async (
  productId: string,
  parentCommentId: string,
  body: ReplyCommentPayload
) => {
  const formData = new FormData();
  formData.append("content", body.content);
  body.images?.forEach((file) => {
    formData.append("images", file);
  });

  return unwrap(
    await apiService.post(
      API_ENDPOINTS.products.reply(productId, parentCommentId),
      formData
    )
  );
};

export const editComment = async ({
  productId,
  commentId,
  body,
}: UseEditCommentParams) => {
  const formData = new FormData();
  formData.append("content", body.content);

  const oldImages = body.images?.filter((img) => typeof img === "string") as
    | string[]
    | undefined;
  const newImages = body.images?.filter((img) => img instanceof File) as
    | File[]
    | undefined;

  newImages?.forEach((file) => formData.append("images", file));
  formData.append("oldImages", JSON.stringify(oldImages || []));

  return unwrap(
    await apiService.put(
      API_ENDPOINTS.products.commentItem(productId, commentId),
      formData
    )
  );
};

export const deleteComment = async (productId: string, commentId: string) => {
  return unwrap(
    await apiService.delete(API_ENDPOINTS.products.commentItem(productId, commentId))
  );
};

