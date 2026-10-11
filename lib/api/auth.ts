import { API_ENDPOINTS } from "@/lib/api-config";
import { unwrap } from "@/lib/api-client";
import { apiService } from "@/lib/api-service";
import {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "@/types/auth";

export const login = async (data: LoginPayload) => {
  const response = await apiService.post<Record<string, unknown>>(
    API_ENDPOINTS.auth.login,
    data
  );
  if (!response.ok) {
    if (response.status === 400) {
      throw { type: "verify-account", ...response.data };
    }
    throw response.data;
  }
  return response.data;
};

export const register = async (data: RegisterPayload) => {
  return unwrap(await apiService.post(API_ENDPOINTS.auth.register, data));
};

export const resetPassword = async (data: ResetPasswordPayload) => {
  return unwrap(await apiService.post(API_ENDPOINTS.auth.resetPassword, data));
};

export const forgotPassword = async (data: ForgotPasswordPayload) => {
  return unwrap(await apiService.post(API_ENDPOINTS.auth.forgotPassword, data));
};

export const logout = async () => {
  return unwrap(await apiService.post(API_ENDPOINTS.auth.logout));
};

export const verifyEmail = async (token: string) => {
  return apiService.get(
    `${API_ENDPOINTS.auth.verifyEmail}?verifyToken=${token}`
  );
};

export const verifyResetToken = async (token: string) => {
  return apiService.get(
    `${API_ENDPOINTS.auth.verifyResetToken}?resetToken=${token}`
  );
};
