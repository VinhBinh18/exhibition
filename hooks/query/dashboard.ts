import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../query-keys";
import { getDashboardSummary } from "@/lib/api/dashboard";
import { DashboardSummary } from "@/types/dashboard";

export const useDashboardSummary = () =>
  useQuery<DashboardSummary>({
    queryKey: queryKeys.dashboard.summary,
    queryFn: () => getDashboardSummary(),
  });
