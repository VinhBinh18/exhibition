import { API_ENDPOINTS } from "@/lib/api-config";
import { unwrap } from "@/lib/api-client";
import { apiService } from "@/lib/api-service";
import { CreatePaymentPayload } from "@/types/payment";

export const createPayment = async (payload: CreatePaymentPayload) => {
  const response = await unwrap<{ result: { paymentUrl?: string } }>(
    await apiService.post(API_ENDPOINTS.payment.vnpayCreate, payload)
  );
  return response.result;
};
