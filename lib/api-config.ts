export const API_BASE_URL = "";

export const API_ENDPOINTS = {
  clients: {
    list: "/api/clients",
    detail: (id: string) => `/api/clients/${id}`,
  },
  events: {
    list: "/api/events",
    detail: (id: string) => `/api/events/${id}`,
  },
  contact: "/api/contact",
} as const;
