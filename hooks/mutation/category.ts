import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "../query-keys";
import { CreateCategoryPayload, UpdateCategoryPayload } from "@/types/category";
const removed = async (..._args: unknown[]) => {
  throw new Error("API danh mục đã được gỡ");
};
const createCategory = removed;
const deleteCategory = removed;
const updateCategory = removed;

import { toastError, toastSuccess } from "@/components/ui/toaster";

export const useCreateCategory = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryPayload) => createCategory(data),

    onSuccess: (data: any) => {
      toastSuccess(data.message, data.description);
      queryClient.invalidateQueries({
        queryKey: queryKeys.category?.root ?? [],
      });
      onSuccessCallback?.();
    },

    onError: (err: any) => {
      toastError(err.message, err.description);
    },
  });
};

export const useUpdateCategory = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCategoryPayload) => updateCategory(data),

    onSuccess: (data: any) => {
      toastSuccess(data.message, data.description);
      queryClient.invalidateQueries({
        queryKey: queryKeys.category?.root ?? [],
      });
      onSuccessCallback?.();
    },

    onError: (err: any) => {
      toastError(err.message, err.description);
    },
  });
};

export const useDeleteCategory = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),

    onSuccess: (data: any) => {
      toastSuccess(data.message, data.description);
      queryClient.invalidateQueries({
        queryKey: queryKeys.category?.root ?? [],
      });
      onSuccessCallback?.();
    },

    onError: (err: any) => {
      toastError(err.message, err.description);
    },
  });
};
