import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../query-keys";
import { getMyOrders, getOrder, getOrderByCode, getOrders } from "@/lib/api/orders";

import { PaginatedResponse } from "@/types/global";
import { UseOrdersParams, Order } from "@/types/order";

export const useOrder = (orderId: string) =>
  useQuery<Order>({
    queryKey: queryKeys.order.detail(orderId),
    enabled: !!orderId,
    queryFn: () => getOrder(orderId),
  });

export const useOrderByCode = (orderCode: string) =>
  useQuery<Order>({
    queryKey: queryKeys.order.byCode(orderCode),
    enabled: !!orderCode,
    queryFn: () => getOrderByCode(orderCode),
  });

export const useMyOrders = (params: UseOrdersParams = { page: 1, limit: 10 }) =>
  useQuery<PaginatedResponse<Order>>({
    queryKey: queryKeys.order.me(params),
    queryFn: () => getMyOrders(params),
  });

export const useOrders = (params: UseOrdersParams = {}) =>
  useQuery<PaginatedResponse<Order>>({
    queryKey: queryKeys.order.list(params),
    queryFn: () => getOrders(params),
  });
