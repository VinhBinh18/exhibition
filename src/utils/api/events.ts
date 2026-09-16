import { USE_MOCK_API } from "@/config.global";
import { MOCK_EVENTS } from "@/mocks/data";
import { EventType } from "@/types/event";

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
