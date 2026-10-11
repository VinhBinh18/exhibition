import { API_ENDPOINTS } from "@/lib/api-config";
import { toQuery, unwrap } from "@/lib/api-client";
import { apiService } from "@/lib/api-service";
import { USE_MOCK_API } from "@/lib/config";
import { MOCK_EVENTS } from "@/lib/sample-data/data";
import {
  CreateEventPayload,
  EventType,
  UpdateEventPayload,
  UseEventsParams,
} from "@/types/event";
import { PaginatedResponse } from "@/types/global";

export const fetchEvents = async (): Promise<EventType[]> => {
  if (USE_MOCK_API) {
    return MOCK_EVENTS;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/events?limit=10`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    const { result } = await res.json();
    return result.data;
  } catch {
    return [];
  }
};

export const getEvents = async (params: UseEventsParams = { page: 1, limit: 10 }) => {
  const query = toQuery(params);
  const response = await apiService.get<{ result: PaginatedResponse<EventType> }>(
    `${API_ENDPOINTS.events.list}?${query}`
  );
  return response.data.result;
};

export const createEvent = async (payload: CreateEventPayload) => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("tag", payload.tag);
  formData.append("frame", payload.frame);
  if (payload.image instanceof File) formData.append("image", payload.image);
  return unwrap(await apiService.post(API_ENDPOINTS.events.list, formData));
};

export const updateEvent = async (payload: UpdateEventPayload) => {
  const formData = new FormData();
  if (payload.name) formData.append("name", payload.name);
  if (payload.tag) formData.append("tag", payload.tag);
  if (payload.frame instanceof File) formData.append("frame", payload.frame);
  if (payload.image instanceof File) formData.append("image", payload.image);
  return unwrap(await apiService.put(API_ENDPOINTS.events.detail(payload.id), formData));
};

export const deleteEvent = async (eventId: string) => {
  return unwrap(await apiService.delete(API_ENDPOINTS.events.detail(eventId)));
};
