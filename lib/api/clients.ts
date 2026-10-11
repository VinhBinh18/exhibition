import { API_ENDPOINTS } from "@/lib/api-config";
import { toQuery, unwrap } from "@/lib/api-client";
import { apiService } from "@/lib/api-service";
import { PaginatedResponse } from "@/types/global";
import { ClientRecord } from "@/types/records";

export type ClientListParams = {
  page?: number;
  limit?: number;
  name?: string;
};

export type ClientPayload = {
  name: string;
  email: string;
  companyName: string;
  phone: string;
  description: string;
};

export type UpdateClientPayload = {
  id: string;
  name?: string;
  email?: string;
  companyName?: string;
  phone?: string;
  description?: string;
};

export const getClients = async (params: ClientListParams = {}) => {
  const response = await apiService.get<{ result: PaginatedResponse<ClientRecord> }>(
    `${API_ENDPOINTS.clients.list}?${toQuery(params)}`
  );
  if (!response.ok) throw response.data;
  return response.data.result;
};

export const getClient = async (id: string) => {
  const response = await apiService.get<{ result: ClientRecord }>(
    API_ENDPOINTS.clients.detail(id)
  );
  return response.data.result;
};

export const createClient = async (payload: ClientPayload) => {
  return unwrap(await apiService.post(API_ENDPOINTS.clients.list, payload));
};

export const updateClient = async ({ id, ...payload }: UpdateClientPayload) => {
  return unwrap(await apiService.put(API_ENDPOINTS.clients.detail(id), payload));
};

export const deleteClient = async (id: string) => {
  return unwrap(await apiService.delete(API_ENDPOINTS.clients.detail(id), {}));
};
