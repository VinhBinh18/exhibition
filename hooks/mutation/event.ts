import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "../query-keys";
import {
  EventPayload,
  UpdateEventPayload,
  createEvent,
  deleteEvent,
  updateEvent,
} from "@/lib/api/events";

import { toastError, toastSuccess } from "@/components/ui/toaster";

export const useCreateEvent = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EventPayload) => createEvent(payload),

    onSuccess: (data: any) => {
      toastSuccess(data.message, data.description);
      queryClient.invalidateQueries({ queryKey: queryKeys.event?.root ?? [] });
      onSuccessCallback?.();
    },

    onError: (err: any) => {
      toastError(err.message, err.description);
    },
  });
};

export const useUpdateEvent = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateEventPayload) => updateEvent(payload),

    onSuccess: (data: any) => {
      toastSuccess(data.message, data.description);
      queryClient.invalidateQueries({ queryKey: queryKeys.event?.root ?? [] });
      onSuccessCallback?.();
    },

    onError: (err: any) => {
      toastError(err.message, err.description);
    },
  });
};

export const useDeleteEvent = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteEvent(id),

    onSuccess: (data: any) => {
      toastSuccess(data.message, data.description);
      queryClient.invalidateQueries({
        queryKey: queryKeys.event?.root ?? [],
      });
      onSuccessCallback?.();
    },

    onError: (err: any) => {
      toastError(err.message, err.description);
    },
  });
};
