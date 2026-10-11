import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  CommentPayload,
  ReplyCommentPayload,
  CreateProductPayload,
  UpdateProductPayload,
  UseEditCommentParams,
  UseDeleteCommentParams,
} from "@/types/product";
import { queryKeys } from "@/hooks/query-keys";
import {
  createComment,
  createProduct,
  deleteComment,
  deleteProduct,
  editComment,
  replyComment,
  toggleLikeComment,
  updateProduct,
} from "@/lib/api/products";

import { toastError, toastSuccess } from "@/components/ui/toaster";

export const useCreateProduct = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductPayload) => createProduct(data),

    onSuccess: (data: any) => {
      toastSuccess(data.message, data.description);
      queryClient.invalidateQueries({ queryKey: queryKeys.product.root });
      onSuccessCallback?.();
    },

    onError: (err: any) => {
      toastError(err.message, err.description);
    },
  });
};

export const useUpdateProduct = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductPayload) => updateProduct(data),

    onSuccess: (data: any) => {
      toastSuccess(data.message, data.description);
      queryClient.invalidateQueries({ queryKey: queryKeys.product.root });
      onSuccessCallback?.();
    },

    onError: (err: any) => {
      toastError(err?.message, err?.description);
    },
  });
};

export const useDeleteProduct = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),

    onSuccess: (data: any) => {
      toastSuccess(data.message, data.description);
      queryClient.invalidateQueries({ queryKey: queryKeys.product.root });
      onSuccessCallback?.();
    },

    onError: (err: any) => {
      toastError(err?.message, err?.description);
    },
  });
};

export const useComment = (productId: string, onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CommentPayload) => createComment(productId, body),

    onSuccess: (data: any) => {
      toastSuccess(data.message, data.description);
      queryClient.invalidateQueries({ queryKey: queryKeys.product.root });
      onSuccessCallback?.();
    },

    onError: (err: any) => {
      toastError(err?.message, err?.description);
    },
  });
};

export const useToggleLikeComment = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      productId,
      commentId,
    }: {
      productId: string;
      commentId: string;
    }) => toggleLikeComment(productId, commentId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.product.root });
      onSuccessCallback?.();
    },

    onError: (err: any) => {
      toastError(err?.message, err?.description);
    },
  });
};

export const useReplyComment = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      productId: string;
      parentCommentId: string;
      body: ReplyCommentPayload;
    }) => replyComment(params.productId, params.parentCommentId, params.body),

    onSuccess: (data: any) => {
      toastSuccess(data.message, data.description);
      queryClient.invalidateQueries({ queryKey: queryKeys.product.root });
      onSuccessCallback?.();
    },

    onError: (err: any) => {
      toastError(err?.message, err?.description);
    },
  });
};

export const useEditComment = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UseEditCommentParams) => editComment(params),

    onSuccess: (data: any) => {
      toastSuccess(data.message, data.description);
      queryClient.invalidateQueries({ queryKey: queryKeys.product.root });
      onSuccessCallback?.();
    },

    onError: (err: any) => {
      toastError(err?.message, err?.description);
    },
  });
};

export const useDeleteComment = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, commentId }: UseDeleteCommentParams) =>
      deleteComment(productId, commentId),

    onSuccess: (data: any) => {
      toastSuccess(data.message, data.description);
      queryClient.invalidateQueries({ queryKey: queryKeys.product.root });
      onSuccessCallback?.();
    },

    onError: (err: any) => {
      toastError(err?.message, err?.description);
    },
  });
};
