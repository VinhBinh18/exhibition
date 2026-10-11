import { API_ENDPOINTS } from "@/lib/api-config";
import { toQuery, unwrap } from "@/lib/api-client";
import { apiService } from "@/lib/api-service";
import { PaginatedResponse } from "@/types/global";
import {
  CreateOrderPayload,
  Order,
  UpdateOrderStatusPayload,
  UseOrdersParams,
} from "@/types/order";

export const getOrder = async (orderId: string) => {
  const response = await apiService.get<{ result: Order }>(
    API_ENDPOINTS.orders.detail(orderId)
  );
  return response.data.result;
};

export const getOrderByCode = async (orderCode: string) => {
  const response = await apiService.get<{ result: Order }>(
    API_ENDPOINTS.orders.byCode(orderCode)
  );
  return response.data.result;
};

export const getMyOrders = async (params: UseOrdersParams = { page: 1, limit: 10 }) => {
  const query = toQuery(params);
  const response = await apiService.get<{ result: PaginatedResponse<Order> }>(
    `${API_ENDPOINTS.orders.me}?${query}`
  );
  return response.data.result;
};

export const getOrders = async (params: UseOrdersParams = {}) => {
  const query = toQuery(params);
  const response = await apiService.get<{ result: PaginatedResponse<Order> }>(
    `${API_ENDPOINTS.orders.list}?${query}`
  );
  return response.data.result;
};

export const createOrder = async (payload: CreateOrderPayload) => {
  return unwrap(await apiService.post(API_ENDPOINTS.orders.list, payload));
};

export const updateOrderStatus = async ({
  orderId,
  status,
}: UpdateOrderStatusPayload) => {
  return unwrap(
    await apiService.put(API_ENDPOINTS.orders.status(orderId), {
      orderStatus: status,
    })
  );
};

export const cancelOrder = async (orderId: string) => {
  return unwrap(
    await apiService.put(
      API_ENDPOINTS.orders.cancel(orderId),
      undefined,
      { "Content-Type": "application/json" }
    )
  );
};
