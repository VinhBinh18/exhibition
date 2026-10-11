import { API_ENDPOINTS } from "@/lib/api-config";
import { toQuery, unwrap } from "@/lib/api-client";
import { apiService } from "@/lib/api-service";
import { USE_MOCK_API } from "@/lib/config";
import { MOCK_CATEGORIES } from "@/lib/sample-data/data";
import {
  CategoryFields,
  CategoryType,
  CreateCategoryPayload,
  UpdateCategoryPayload,
  UseCategoriesParams,
} from "@/types/category";
import { PaginatedResponse } from "@/types/global";

export const fetchCategories = async (): Promise<CategoryType[]> => {
  if (USE_MOCK_API) {
    return MOCK_CATEGORIES;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/categories?limit=20`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const { result } = await res.json();
    return result.data;
  } catch {
    return [];
  }
};

export const fetchCategoryFieldsByName = async (
  name: string
): Promise<CategoryFields[] | null> => {
  if (USE_MOCK_API) {
    return MOCK_CATEGORIES.find((category) => category.name === name)?.fields ?? [];
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/categories/fields/${name}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return [];

    const { result } = await res.json();
    return result;
  } catch {
    return [];
  }
};

export const fetchCategoryLabel = async (
  category: string
): Promise<{ label: string | null }> => {
  if (USE_MOCK_API) {
    return {
      label:
        MOCK_CATEGORIES.find((item) => item.name === category)?.label ?? null,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/categories/label/${category}`,
      { next: { revalidate: 60 } }
    );
    if (!response.ok) return { label: null };
    const { result } = await response.json();
    return { label: result.label };
  } catch {
    return { label: null };
  }
};

export const getCategories = async (
  params: UseCategoriesParams = { page: 1, limit: 20 }
) => {
  const query = toQuery(params);
  const response = await apiService.get<{ result: PaginatedResponse<CategoryType> }>(
    `${API_ENDPOINTS.categories.list}?${query}`
  );
  return response.data.result;
};

export const getCategoryFields = async (name: string) => {
  const response = await apiService.get<{ result: CategoryFields[] }>(
    API_ENDPOINTS.categories.fields(name)
  );
  return response.data.result;
};

export const createCategory = async (data: CreateCategoryPayload) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("label", data.label);
  formData.append("fields", JSON.stringify(data.fields));
  if (data.image instanceof File) formData.append("image", data.image);
  return unwrap(await apiService.post(API_ENDPOINTS.categories.list, formData));
};

export const updateCategory = async (data: UpdateCategoryPayload) => {
  const formData = new FormData();
  if (data.name) formData.append("name", data.name);
  if (data.label) formData.append("label", data.label);
  if (data.fields) formData.append("fields", JSON.stringify(data.fields));
  if (data.image instanceof File) formData.append("image", data.image);
  return unwrap(await apiService.put(API_ENDPOINTS.categories.detail(data.id), formData));
};

export const deleteCategory = async (id: string) => {
  return unwrap(await apiService.delete(API_ENDPOINTS.categories.detail(id)));
};
