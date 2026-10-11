import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../query-keys";
const getCategories = async (..._args: unknown[]) => ({
  data: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
});
const getCategoryFields = async (..._args: unknown[]) => [];

import {
  CategoryType,
  CategoryFields,
  UseCategoriesParams,
} from "@/types/category";
import { PaginatedResponse } from "@/types/global";

export const useCategories = (
  params: UseCategoriesParams = { page: 1, limit: 20 }
) =>
  useQuery<PaginatedResponse<CategoryType>>({
    queryKey: queryKeys.category.list(params),
    queryFn: () => getCategories(params),
  });

export const useCategoryByName = (name: string) =>
  useQuery<CategoryFields[]>({
    queryKey: queryKeys.category.byName(name),
    queryFn: () => getCategoryFields(name),
  });
