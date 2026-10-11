import { API_ENDPOINTS } from "@/lib/api-config";
import { toQuery, unwrap } from "@/lib/api-client";
import { apiService } from "@/lib/api-service";
import { PaginatedResponse } from "@/types/global";
import { ExhibitionEventRecord } from "@/types/records";

export type EventListParams = {
  page?: number;
  limit?: number;
  name?: string;
};

export type EventPayload = {
  name: string;
  location: string;
  fromDate: string;
  toDate: string;
  description: string;
};

export type UpdateEventPayload = {
  id: string;
  name?: string;
  location?: string;
  fromDate?: string;
  toDate?: string;
  description?: string;
};

export const getEvents = async (params: EventListParams = {}) => {
  const response = await apiService.get<{ result: PaginatedResponse<ExhibitionEventRecord> }>(
    `${API_ENDPOINTS.events.list}?${toQuery(params)}`
  );
  if (!response.ok) throw response.data;
  return response.data.result;
};

export const getEvent = async (id: string) => {
  const response = await apiService.get<{ result: ExhibitionEventRecord }>(
    API_ENDPOINTS.events.detail(id)
  );
  return response.data.result;
};

export const createEvent = async (payload: EventPayload) => {
  return unwrap(await apiService.post(API_ENDPOINTS.events.list, payload));
};

export const updateEvent = async ({ id, ...payload }: UpdateEventPayload) => {
  return unwrap(await apiService.put(API_ENDPOINTS.events.detail(id), payload));
};

export const deleteEvent = async (id: string) => {
  return unwrap(await apiService.delete(API_ENDPOINTS.events.detail(id), {}));
};
