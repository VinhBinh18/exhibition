import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  LoginPayload,
  AuthModalType,
  RegisterPayload,
  ResetPasswordPayload,
  ForgotPasswordPayload,
} from "@/types/auth";
import { queryKeys } from "../query-keys";
import { USER_ROLE } from "@/lib/config";
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
} from "@/lib/api/auth";
import { useRoleStore } from "@/stores/use-role-store";
import { useCartStore } from "@/stores/use-cart-store";

import { toastError, toastSuccess } from "@/components/ui/toaster";

export const useLogin = (
  handleCloseDialog: () => void,
  setModal: (type: AuthModalType) => void
) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginPayload) => login(data),

    onSuccess: (data: any) => {
      const { message, description, result } = data;

      handleCloseDialog();
      toastSuccess(message, description);

      if (result.role === USER_ROLE.ADMIN) {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }

      queryClient.invalidateQueries({ queryKey: queryKeys.user.me });
    },

    onError: (err: any) => {
      if (err.type === "verify-account") {
        setModal("verify-account");
      } else {
        toastError(err.message, err.description);
      }
    },
  });
};

export const useRegister = (setModal: (type: AuthModalType) => void) => {
  return useMutation({
    mutationFn: (data: RegisterPayload) => register(data),

    onSuccess: (data: any) => {
      const { message, description } = data;
      setModal("verify-account");
      toastSuccess(message, description);
    },

    onError: (err: any) => {
      toastError(err.message, err.description);
    },
  });
};

export const useResetPassword = (setModal: (type: AuthModalType) => void) => {
  return useMutation({
    mutationFn: (data: ResetPasswordPayload) => resetPassword(data),

    onSuccess: (data: any) => {
      const { message, description } = data;
      toastSuccess(message, description);
      setModal("login");
    },

    onError: (err: any) => {
      toastError(err.message, err.description);
    },
  });
};

export const useForgotPassword = (setModal: (type: AuthModalType) => void) => {
  return useMutation({
    mutationFn: (data: ForgotPasswordPayload) => forgotPassword(data),

    onSuccess: (data: any) => {
      const { message, description } = data;
      toastSuccess(message, description);
      setModal("verify-account");
    },

    onError: (err: any) => {
      toastError(err.message, err.description);
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { clearCart } = useCartStore();
  const { clearRole } = useRoleStore();

  return useMutation({
    mutationFn: () => logout(),

    onSuccess: (data: any) => {
      const { message, description } = data;
      toastSuccess(message, description);

      clearCart();
      queryClient.clear();
      router.replace("/");
      clearRole();
    },

    onError: (err: any) => {
      toastError(err.message, err.description);
    },
  });
};
