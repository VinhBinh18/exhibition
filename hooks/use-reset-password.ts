import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const verifyResetToken = async (..._args: unknown[]) => {
  throw new Error("API auth đã được gỡ");
};
import { useAuthModal } from "@/stores/use-auth-modal";
import { toastSuccess, toastError } from "@/components/ui/toaster";

export const useResetPassword = () => {
  const router = useRouter();
  const hasHandledRef = useRef(false);
  const searchParams = useSearchParams();

  const { setModal, setResetToken } = useAuthModal();

  useEffect(() => {
    const token = searchParams.get("resetToken");
    if (!token || hasHandledRef.current) return;

    hasHandledRef.current = true;

    const clearQuery = () => {
      const url = new URL(window.location.href);
      url.searchParams.delete("resetToken");
      router.replace(url.pathname + url.search, { scroll: false });
    };

    const runVerifyResetToken = async () => {
      const res = await verifyResetToken(token);
      const { message, description } = res.data as {
        message?: string;
        description?: string;
      };

      if (!res.ok) {
        toastError(message || "Đã có lỗi xảy ra", description);
        clearQuery();
        return;
      }

      setResetToken(token);
      setModal("reset-password");
      toastSuccess(message || "Xác minh thành công", description);
      clearQuery();
    };

    runVerifyResetToken();
  }, [searchParams, router, setModal, setResetToken]);
};
