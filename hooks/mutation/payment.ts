import { useMutation } from "@tanstack/react-query";

import { CreatePaymentPayload } from "@/types/payment";
import { createPayment } from "@/lib/api/payment";

import { toastError } from "@/components/ui/toaster";

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: (payload: CreatePaymentPayload) => createPayment(payload),

    onSuccess: (data) => {
      if (data?.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    },

    onError: () => {
      toastError("Tạo thanh toán thất bại", "Đã có lỗi xảy ra.");
    },
  });
};
