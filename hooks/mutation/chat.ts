import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "../query-keys";
import { deleteChat, deleteChats, uploadChatFiles } from "@/lib/api/chat";
import { toastError, toastSuccess } from "@/components/ui/toaster";

export const useUpload = () => {
  return useMutation<string[], Error, File[]>({
    mutationFn: (files: File[]) => uploadChatFiles(files),

    onError: (err: any) => {
      toastError(err.message, err.description);
    },
  });
};

export const useDeleteMessage = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteChat(userId),

    onSuccess: (data: any) => {
      toastSuccess(data.message, data.description);
      queryClient.invalidateQueries({
        queryKey: queryKeys.chat?.root ?? [],
      });
      onSuccessCallback?.();
    },

    onError: (err: any) => {
      toastError(err.message, err.description);
    },
  });
};

export const useDeleteMessages = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userIds: string[]) => deleteChats(userIds),

    onSuccess: (data: any) => {
      toastSuccess(data.message, data.description);
      queryClient.invalidateQueries({
        queryKey: queryKeys.chat?.root ?? [],
      });
      onSuccessCallback?.();
    },

    onError: (err: any) => {
      toastError(err.message, err.description);
    },
  });
};
