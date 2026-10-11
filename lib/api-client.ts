export interface ApiResult<T> {
  data: T;
  ok: boolean;
  status: number;
  error?: string;
}

export function toQuery(
  params: Record<string, unknown> | object
): string {
  const queryParams = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => [key, String(value)]);

  return new URLSearchParams(queryParams).toString();
}

export async function apiClient<T>(
  endpoint: string,
  method: string = "GET",
  body?: unknown,
  headers: HeadersInit = {}
): Promise<ApiResult<T>> {
  try {
    const isFormData =
      typeof FormData !== "undefined" && body instanceof FormData;
    const requestHeaders: Record<string, string> = {
      ...(headers as Record<string, string>),
    };

    let payload: BodyInit | undefined;
    if (body !== undefined && body !== null) {
      if (isFormData) {
        payload = body;
      } else {
        payload = JSON.stringify(body);
        if (!requestHeaders["Content-Type"]) {
          requestHeaders["Content-Type"] = "application/json";
        }
      }
    }

    const response = await fetch(endpoint, {
      method,
      credentials: "include",
      headers: requestHeaders,
      body: payload,
    });

    let data = {} as T;
    try {
      data = await response.json();
    } catch {
      data = {} as T;
    }

    if (!response.ok) {
      return {
        data,
        ok: false,
        status: response.status,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    return { data, ok: true, status: response.status };
  } catch (error) {
    console.error(`API call failed: ${endpoint}`, error);
    return {
      data: {} as T,
      ok: false,
      status: 0,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}

export const get = <T>(endpoint: string, headers?: HeadersInit) =>
  apiClient<T>(endpoint, "GET", undefined, headers);

export const post = <T>(endpoint: string, body?: unknown, headers?: HeadersInit) =>
  apiClient<T>(endpoint, "POST", body, headers);

export const put = <T>(endpoint: string, body?: unknown, headers?: HeadersInit) =>
  apiClient<T>(endpoint, "PUT", body, headers);

export const del = <T>(endpoint: string, body?: unknown, headers?: HeadersInit) =>
  apiClient<T>(endpoint, "DELETE", body, headers);

export function unwrap<T>(result: ApiResult<T>): T {
  if (!result.ok) throw result.data;
  return result.data;
}
