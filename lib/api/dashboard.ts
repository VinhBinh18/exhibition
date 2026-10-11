import { API_ENDPOINTS } from "@/lib/api-config";
import { apiService } from "@/lib/api-service";
import { DashboardSummary } from "@/types/dashboard";

export const getDashboardSummary = async () => {
  const response = await apiService.get<{ result: DashboardSummary }>(
    API_ENDPOINTS.dashboard.summary
  );
  return response.data.result;
};
