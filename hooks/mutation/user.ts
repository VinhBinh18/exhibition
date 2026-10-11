import { queryKeys } from "@/hooks/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateUserPayload, EditUserPayload } from "@/types/user";
const removed = async (..._args: unknown[]) => {
  throw new Error("API người dùng đã được gỡ");
};
const banUser = removed;
const createUser = removed;
const deleteUser = removed;
const editUser = removed;

import { toastError, toastSuccess } from "@/components/ui/toaster";

export const useCreateUser = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUserPayload) => createUser(data),

    onSuccess: (data: any) => {
      toastSuccess(data.message, data.description);
      queryClient.invalidateQueries({ queryKey: queryKeys.user.root });
      onSuccessCallback?.();
    },

    onError: (err: any) => {
      toastError(err?.message, err?.description);
    },
  });
};

export const useEditUser = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EditUserPayload) => editUser(data),

    onSuccess: (data: any) => {
      toastSuccess(data.message, data.description);
      queryClient.invalidateQueries({ queryKey: queryKeys.user.root });
      onSuccessCallback?.();
    },

    onError: (err: any) => {
      toastError(err.message, err.description);
    },
  });
};

export const useDeleteUser = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteUser(userId),

    onSuccess: (data: any) => {
      toastSuccess(data.message, data.description);
      queryClient.invalidateQueries({ queryKey: queryKeys.user.root });
      onSuccessCallback?.();
    },

    onError: (err: any) => {
      toastError(err?.message, err?.description);
    },
  });
};

export const useBanUser = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => banUser(userId),

    onSuccess: (data: any) => {
      toastSuccess(data.message, data.description);
      queryClient.invalidateQueries({ queryKey: queryKeys.user.root });
      onSuccessCallback?.();
    },

    onError: (err: any) => {
      toastError(err?.message, err?.description);
    },
  });
};
