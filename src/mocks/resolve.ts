import { parseFilters } from "@/utils/filters";
import { sortExpoProducts, uniqueMonths, uniqueSorted } from "@/utils/expo";
import { CreateOrderPayload, Order } from "@/types/order";
import { PaginatedResponse } from "@/types/global";

import { mockOrders } from "./orders";
import { resolveVietnamMock } from "./vietnam";
import {
  MOCK_BLOGS,
  MOCK_CATEGORIES,
  MOCK_EVENTS,
  MOCK_PRODUCTS,
  MOCK_USER,
} from "./data";

type MockRequestOptions = {
  method?: string;
  body?: unknown;
};

const paginate = <T>(
  items: T[],
  page = 1,
  limit = 20,
): PaginatedResponse<T> => {
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const safeLimit = Number.isFinite(limit) && limit > 0 ? limit : 20;
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / safeLimit) || 1);
  const start = (safePage - 1) * safeLimit;

  return {
    data: items.slice(start, start + safeLimit),
    page: safePage,
    limit: safeLimit,
    total,
    totalPages,
  };
};

const notFound = (message: string) => {
  throw { status: 404, details: { message } };
};

const filterProducts = (params: URLSearchParams) => {
  const event = params.get("event") || "";
  const category = params.get("category") || "";
  const search = (params.get("search") || "").trim().toLowerCase();
  const attributes = parseFilters(params.get("attributes"));

  return MOCK_PRODUCTS.filter((product) => {
    if (event && product.event !== event) return false;
    if (category && product.category !== category) return false;
    if (search) {
      const haystack = [
        product.name,
        product.category,
        product.attributes?.city,
        product.attributes?.venue,
        product.attributes?.country,
        product.attributes?.month,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(search)) return false;
    }

    return Object.entries(attributes).every(([key, values]) => {
      if (!values.length) return true;
      const raw = product.attributes?.[key];
      return values.includes(String(raw));
    });
  });
};

export const listMockProducts = (params: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  event?: string;
  sortBy?: string;
  attributes?: Record<string, string[]>;
}) => {
  const searchParams = new URLSearchParams();
  if (params.search) searchParams.set("search", params.search);
  if (params.category) searchParams.set("category", params.category);
  if (params.event) searchParams.set("event", params.event);
  if (params.attributes && Object.keys(params.attributes).length) {
    searchParams.set(
      "attributes",
      Object.entries(params.attributes)
        .map(([k, v]) => `${k}=${v.join(",")}`)
        .join(";"),
    );
  }

  const items = filterProducts(searchParams);

  return paginate(
    params.sortBy ? sortExpoProducts(items, params.sortBy) : items,
    params.page ?? 1,
    params.limit ?? 20,
  );
};

export const getMockExpoFilterOptions = () => ({
  countries: uniqueSorted(
    MOCK_PRODUCTS.map((item) => item.attributes?.country),
  ),
  cities: uniqueSorted(MOCK_PRODUCTS.map((item) => item.attributes?.city)),
  venues: uniqueSorted(MOCK_PRODUCTS.map((item) => item.attributes?.venue)),
  years: uniqueSorted(MOCK_PRODUCTS.map((item) => item.attributes?.year)),
  months: uniqueMonths(MOCK_PRODUCTS.map((item) => item.attributes?.month)),
});

export const getMockProductBySlug = (slug: string) =>
  MOCK_PRODUCTS.find((product) => product.slug === slug) ?? null;

export const getMockRelatedProducts = (productId: string, limit = 10) => {
  const current = MOCK_PRODUCTS.find((product) => product._id === productId);
  const related = MOCK_PRODUCTS.filter(
    (product) =>
      product._id !== productId &&
      (!current || product.category === current.category),
  );
  return paginate(related, 1, limit);
};

export const listMockBlogs = (page = 1, limit = 10, search = "") => {
  const keyword = search.trim().toLowerCase();
  const blogs = keyword
    ? MOCK_BLOGS.filter(
        (blog) =>
          blog.title.toLowerCase().includes(keyword) ||
          blog.summary.toLowerCase().includes(keyword),
      )
    : MOCK_BLOGS;

  return paginate(blogs, page, limit);
};

const createMockOrder = (payload: CreateOrderPayload): Order => {
  const order: Order = {
    _id: `ord-${Date.now()}`,
    userId: MOCK_USER,
    fullName: payload.fullName,
    phone: payload.phone,
    address: payload.address,
    note: payload.note,
    items: payload.items.map((item) => ({
      productId:
        MOCK_PRODUCTS.find((product) => product._id === item.productId) ??
        MOCK_PRODUCTS[0],
      quantity: item.quantity,
    })),
    totalAmount: payload.totalAmount,
    orderCode: `GVN${Math.floor(100000 + Math.random() * 900000)}`,
    orderStatus: "PROCESSING",
    paymentStatus: payload.paymentMethod === "VNPAY" ? "PAID" : "PENDING",
    paymentMethod: payload.paymentMethod,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  mockOrders.unshift(order);
  return order;
};

export const resolveMock = (
  endpoint: string,
  options: MockRequestOptions = {},
) => {
  const method = (options.method || "GET").toUpperCase();

  if (
    endpoint.startsWith("http") &&
    endpoint.includes("provinces.open-api.vn")
  ) {
    return resolveVietnamMock(endpoint);
  }

  const url = new URL(endpoint, "http://mock.local");
  const path = url.pathname.replace(/\/$/, "") || "/";
  const params = url.searchParams;
  const page = Number(params.get("page") || 1);
  const limit = Number(params.get("limit") || 20);

  if (path === "/users/me") {
    return null;
  }

  if (path === "/auth/logout" && method === "POST") {
    return { ok: true };
  }

  if (path === "/auth/login" && method === "POST") {
    return {
      accessToken:
        "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJyb2xlIjoiQ1VTVE9NRVIifQ.",
      refreshToken: "mock-refresh-token",
    };
  }

  if (
    method === "POST" &&
    [
      "/auth/register",
      "/auth/forgot-password",
      "/auth/reset-password",
    ].includes(path)
  ) {
    return { ok: true };
  }

  if (path === "/products") {
    return paginate(filterProducts(params), page, limit);
  }

  const productSlug = path.match(/^\/products\/slug\/([^/]+)$/);
  if (productSlug) {
    const product = getMockProductBySlug(productSlug[1]);
    if (!product) notFound("Không tìm thấy sản phẩm");
    return product;
  }

  const related = path.match(/^\/products\/related\/([^/]+)$/);
  if (related) {
    return getMockRelatedProducts(related[1], limit);
  }

  const productId = path.match(/^\/products\/([^/]+)$/);
  if (productId && method === "GET") {
    const product = MOCK_PRODUCTS.find((item) => item._id === productId[1]);
    if (!product) notFound("Không tìm thấy sản phẩm");
    return product;
  }

  if (path === "/categories") {
    return paginate(
      MOCK_CATEGORIES,
      page,
      Math.max(limit, MOCK_CATEGORIES.length),
    );
  }

  const categoryFields = path.match(/^\/categories\/fields\/([^/]+)$/);
  if (categoryFields) {
    const category = MOCK_CATEGORIES.find(
      (item) => item.name === decodeURIComponent(categoryFields[1]),
    );
    return category?.fields ?? [];
  }

  const categoryLabel = path.match(/^\/categories\/label\/([^/]+)$/);
  if (categoryLabel) {
    const category: any = MOCK_CATEGORIES.find(
      (item) => item.name === decodeURIComponent(categoryLabel[1]),
    );
    if (!category) notFound("Không tìm thấy danh mục");
    return { label: category.label };
  }

  if (path === "/events") {
    return paginate(MOCK_EVENTS, page, Math.max(limit, MOCK_EVENTS.length));
  }

  if (path === "/blogs") {
    return listMockBlogs(page, limit, params.get("search") || "");
  }

  const blogSlug = path.match(/^\/blogs\/slug\/([^/]+)$/);
  if (blogSlug) {
    const blog = MOCK_BLOGS.find((item) => item.slug === blogSlug[1]);
    if (!blog) notFound("Không tìm thấy bài viết");
    return blog;
  }

  const relatedBlogs = path.match(/^\/blogs\/related\/([^/]+)$/);
  if (relatedBlogs) {
    const blogs = MOCK_BLOGS.filter((item) => item._id !== relatedBlogs[1]);
    return paginate(blogs, 1, 6);
  }

  if (path === "/orders" && method === "POST") {
    return createMockOrder(options.body as CreateOrderPayload);
  }

  if (path === "/orders/me") {
    return paginate(mockOrders, page, limit);
  }

  const orderByCode = path.match(/^\/orders\/code\/([^/]+)$/);
  if (orderByCode) {
    const order = mockOrders.find((item) => item.orderCode === orderByCode[1]);
    if (!order) notFound("Không tìm thấy đơn hàng");
    return order;
  }

  const orderById = path.match(/^\/orders\/([^/]+)$/);
  if (orderById && method === "GET") {
    const order = mockOrders.find((item) => item._id === orderById[1]);
    if (!order) notFound("Không tìm thấy đơn hàng");
    return order;
  }

  if (path === "/payment/vnpay/create" && method === "POST") {
    return { paymentUrl: null };
  }

  if (method === "GET") {
    return [];
  }

  return { ok: true };
};
