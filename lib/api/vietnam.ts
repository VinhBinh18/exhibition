import { API_ENDPOINTS } from "@/lib/api-config";
import { apiService } from "@/lib/api-service";

export type AddressItem = { code: number; name: string };

export const getProvinces = async () => {
  const response = await apiService.get<{ result: AddressItem[] }>(
    API_ENDPOINTS.vietnam.provinces
  );
  return response.data.result;
};

export const getDistricts = async (provinceCode: string) => {
  const response = await apiService.get<{ result: AddressItem[] }>(
    `${API_ENDPOINTS.vietnam.districts}?provinceCode=${provinceCode}`
  );
  return response.data.result;
};

export const getWards = async (districtCode: string) => {
  const response = await apiService.get<{ result: AddressItem[] }>(
    `${API_ENDPOINTS.vietnam.wards}?districtCode=${districtCode}`
  );
  return response.data.result;
};
