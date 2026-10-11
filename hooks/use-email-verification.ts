import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { verifyEmail } from "@/lib/api/auth";
import { useAuthModal } from "@/stores/use-auth-modal";

import { toastSuccess, toastError } from "@/components/ui/toaster";

export const useEmailVerification = () => {
  const router = useRouter();
  const hasVerifiedRef = useRef(false);
  const searchParams = useSearchParams();

  const { setModal } = useAuthModal();

  useEffect(() => {
    const token = searchParams.get("verifyToken");
    if (!token || hasVerifiedRef.current) return;

    hasVerifiedRef.current = true;

    const runVerifyEmail = async () => {
      try {
        const res = await verifyEmail(token);
        const data = res.data as { message?: string; description?: string };

        if (!res.ok) {
          toastError(data.message || "Đã có lỗi xảy ra", data.description);
          return;
        }

        toastSuccess(data.message || "Xác minh email thành công", data.description);
        setModal("login");
      } catch {
        toastError("Đã có lỗi xảy ra", "Vui lòng thử lại sau.");
      } finally {
        const url = new URL(window.location.href);
        url.searchParams.delete("verifyToken");
        router.replace(url.pathname + url.search, { scroll: false });
      }
    };

    runVerifyEmail();
  }, [searchParams, router, setModal]);
};
