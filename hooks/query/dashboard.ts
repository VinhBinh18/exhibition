import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../query-keys";
import { DashboardSummary } from "@/types/dashboard";

const getDashboardSummary = async (
  ..._args: unknown[]
): Promise<DashboardSummary> => ({
  totalRevenue: 0,
  revenueGrowth: 0,
  ordersCount: 0,
  ordersGrowth: 0,
  newCustomers: 0,
  newCustomersDecline: 0,
  topProduct: null,
  salesOrdersTrend: [],
});

export const useDashboardSummary = () =>
  useQuery<DashboardSummary>({
    queryKey: queryKeys.dashboard.summary,
    queryFn: () => getDashboardSummary(),
  });
