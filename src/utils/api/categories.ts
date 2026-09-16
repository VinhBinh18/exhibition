import { USE_MOCK_API } from "@/config.global";
import { MOCK_CATEGORIES } from "@/mocks/data";
import { CategoryFields, CategoryType } from "@/types/category";

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
