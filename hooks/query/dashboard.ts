import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../query-keys";
const getDashboardSummary = async (..._args: unknown[]) => ({});
import { DashboardSummary } from "@/types/dashboard";

export const useDashboardSummary = () =>
  useQuery<DashboardSummary>({
    queryKey: queryKeys.dashboard.summary,
    queryFn: () => getDashboardSummary(),
  });
