import { PAYMENT_METHOD } from "@/config.global";
import { PaymentMethodTypes } from "@/types/payment";

export const PAYMENT_METHOD_OPTIONS: {
  value: PaymentMethodTypes;
  label: string;
}[] = [
  { value: "COD", label: "COD" },
  { value: "VNPAY", label: "VNPAY" },
];

export const PAYMENT_OPTIONS = [
  {
    value: PAYMENT_METHOD.COD,
    label: "Thanh toán khi nhận hàng",
    img: "/payment/cod.svg",
    imgSize: 40,
  },
  {
    value: PAYMENT_METHOD.VNPAY,
    label: "Thanh toán qua VNPay",
    img: "/payment/vnpay.svg",
    imgSize: 40,
  },
] as const;
