export const API_BASE_URL = "";

export const API_ENDPOINTS = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    logout: "/api/auth/logout",
    forgotPassword: "/api/auth/forgot-password",
    resetPassword: "/api/auth/reset-password",
    verifyEmail: "/api/auth/verify-email",
    verifyResetToken: "/api/auth/verify-reset-token",
  },
  users: {
    list: "/api/users",
    me: "/api/users/me",
    detail: (id: string) => `/api/users/${id}`,
    status: (id: string) => `/api/users/status/${id}`,
  },
  products: {
    list: "/api/products",
    detail: (id: string) => `/api/products/${id}`,
    related: (id: string) => `/api/products/related/${id}`,
    comment: (productId: string) => `/api/products/comment/${productId}`,
    commentItem: (productId: string, commentId: string) =>
      `/api/products/comment/${productId}/${commentId}`,
    like: (productId: string, commentId: string) =>
      `/api/products/comment/${productId}/${commentId}/like`,
    reply: (productId: string, commentId: string) =>
      `/api/products/comment/${productId}/${commentId}/reply`,
  },
  blogs: {
    list: "/api/blogs",
    detail: (id: string) => `/api/blogs/${id}`,
    related: (id: string) => `/api/blogs/related/${id}`,
  },
  categories: {
    list: "/api/categories",
    detail: (id: string) => `/api/categories/${id}`,
    fields: (name: string) => `/api/categories/fields/${name}`,
  },
  events: {
    list: "/api/events",
    detail: (id: string) => `/api/events/${id}`,
  },
  orders: {
    list: "/api/orders",
    me: "/api/orders/me",
    detail: (id: string) => `/api/orders/${id}`,
    byCode: (code: string) => `/api/orders/code/${code}`,
    status: (id: string) => `/api/orders/status/${id}`,
    cancel: (id: string) => `/api/orders/cancel/${id}`,
  },
  payment: {
    vnpayCreate: "/api/payment/vnpay/create",
  },
  chat: {
    root: "/api/chat",
    upload: "/api/chat/upload",
    latest: "/api/chat/latest",
    socket: "/api/chat/socket/connect",
    room: (roomId: string) => `/api/chat/room/${roomId}`,
    byUser: (userId: string) => `/api/chat/${userId}`,
  },
  dashboard: {
    summary: "/api/dashboard/summary",
  },
  vietnam: {
    provinces: "/api/vietnam/provinces",
    districts: "/api/vietnam/districts",
    wards: "/api/vietnam/wards",
  },
} as const;
