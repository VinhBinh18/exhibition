import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../query-keys";
import { getEvents } from "@/lib/api/events";

import { PaginatedResponse } from "@/types/global";
import { EventType, UseEventsParams } from "@/types/event";

export const useEvents = (params: UseEventsParams = { page: 1, limit: 10 }) =>
  useQuery<PaginatedResponse<EventType>>({
    queryKey: queryKeys.event.list(params),
    queryFn: () => getEvents(params),
  });
