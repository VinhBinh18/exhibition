import { API_ENDPOINTS } from "@/lib/api-config";
import { unwrap } from "@/lib/api-client";
import { apiService } from "@/lib/api-service";

export type ContactPayload = {
  name: string;
  email: string;
  companyName: string;
  phone: string;
  description: string;
  eventId: string;
};

export const submitContact = async (payload: ContactPayload) => {
  return unwrap(
    await apiService.post<{
      message: string;
      description?: string;
    }>(API_ENDPOINTS.contact, payload)
  );
};
