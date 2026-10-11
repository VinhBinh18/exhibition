import { API_ENDPOINTS } from "@/lib/api-config";
import { toQuery, unwrap } from "@/lib/api-client";
import { apiService } from "@/lib/api-service";
import { Message, UseMessageParams } from "@/types/chat";
import { PaginatedResponse } from "@/types/global";

export const getMessagesByRoom = async (
  roomId: string,
  params: UseMessageParams = { page: 1, limit: 20 }
) => {
  const query = toQuery(params);
  const response = await apiService.get<{ result: PaginatedResponse<Message> }>(
    `${API_ENDPOINTS.chat.room(roomId)}?${query}`
  );
  return response.data.result;
};

export const getLatestMessages = async (params: UseMessageParams) => {
  const query = toQuery(params);
  const response = await apiService.get<{ result: PaginatedResponse<Message> }>(
    `${API_ENDPOINTS.chat.latest}?${query}`
  );
  return response.data.result;
};

export const uploadChatFiles = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  const response = await unwrap<{ result: string[] }>(
    await apiService.post(API_ENDPOINTS.chat.upload, formData)
  );
  return response.result;
};

export const deleteChat = async (userId: string) => {
  return unwrap(await apiService.delete(API_ENDPOINTS.chat.byUser(userId)));
};

export const deleteChats = async (userIds: string[]) => {
  return unwrap(await apiService.delete(API_ENDPOINTS.chat.root, { userIds }));
};

export const connectChatSocket = async () => {
  const response = await apiService.get<{ url: string }>(API_ENDPOINTS.chat.socket);
  return response.data.url;
};
