import { apiClient, ApiResult } from "./api-client";

class ApiService {
  get<T>(endpoint: string, headers?: HeadersInit) {
    return apiClient<T>(endpoint, "GET", undefined, headers);
  }

  post<T>(endpoint: string, body?: unknown, headers?: HeadersInit) {
    return apiClient<T>(endpoint, "POST", body, headers);
  }

  put<T>(endpoint: string, body?: unknown, headers?: HeadersInit) {
    return apiClient<T>(endpoint, "PUT", body, headers);
  }

  delete<T>(endpoint: string, body?: unknown, headers?: HeadersInit) {
    return apiClient<T>(endpoint, "DELETE", body, headers);
  }
}

export const apiService = new ApiService();

export type { ApiResult };
