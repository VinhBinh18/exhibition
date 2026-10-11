import { API_ENDPOINTS } from "@/lib/api-config";
import { toQuery, unwrap } from "@/lib/api-client";
import { apiService } from "@/lib/api-service";
import { PaginatedResponse } from "@/types/global";
import { CreateUserPayload, EditUserPayload, User, UseUsersParams } from "@/types/user";

export const getMe = async () => {
  const response = await apiService.get<{ result?: User | null }>(
    API_ENDPOINTS.users.me
  );
  return response.data.result || null;
};

export const getUsers = async (params: UseUsersParams = { page: 1, limit: 20 }) => {
  const query = toQuery(params);
  const response = await apiService.get<{ result: PaginatedResponse<User> }>(
    `${API_ENDPOINTS.users.list}?${query}`
  );
  return response.data.result;
};

export const createUser = async (data: CreateUserPayload) => {
  return unwrap(await apiService.post(API_ENDPOINTS.users.list, data));
};

export const editUser = async (data: EditUserPayload) => {
  const formData = new FormData();
  if (data.email) formData.append("email", data.email);
  if (data.phone) formData.append("phone", data.phone);
  if (data.address) formData.append("address", data.address);
  if (data.fullName) formData.append("fullName", data.fullName);
  if (data.avatar && data.avatar instanceof File) {
    formData.append("avatar", data.avatar);
  }
  return unwrap(await apiService.put(API_ENDPOINTS.users.detail(data.id), formData));
};

export const deleteUser = async (userId: string) => {
  return unwrap(await apiService.delete(API_ENDPOINTS.users.detail(userId)));
};

export const banUser = async (userId: string) => {
  return unwrap(
    await apiService.put(API_ENDPOINTS.users.status(userId), { status: "BANNED" })
  );
};
