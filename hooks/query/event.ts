import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../query-keys";
import { EventListParams, getEvent, getEvents } from "@/lib/api/events";

import { PaginatedResponse } from "@/types/global";
import { ExhibitionEventRecord } from "@/types/records";

export const useEvents = (params: EventListParams = { page: 1, limit: 10 }) =>
  useQuery<PaginatedResponse<ExhibitionEventRecord>>({
    queryKey: queryKeys.event.list(params),
    queryFn: () => getEvents(params),
  });

export const useEvent = (id?: string) =>
  useQuery<ExhibitionEventRecord>({
    queryKey: queryKeys.event.detail(id ?? ""),
    queryFn: () => getEvent(id as string),
    enabled: Boolean(id),
  });
