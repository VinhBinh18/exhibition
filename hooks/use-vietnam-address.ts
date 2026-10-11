import { useQuery } from "@tanstack/react-query";

import { AddressItem, getDistricts, getProvinces, getWards } from "@/lib/api/vietnam";

export type { AddressItem };

export const useProvinces = () =>
  useQuery<AddressItem[]>({
    queryKey: ["provinces"],
    queryFn: () => getProvinces(),
  });

export const useDistricts = (provinceCode?: string) =>
  useQuery<AddressItem[]>({
    queryKey: ["districts", provinceCode],
    queryFn: async () => {
      if (!provinceCode) return [];
      return getDistricts(provinceCode);
    },
    enabled: !!provinceCode,
  });

export const useWards = (districtCode?: string) =>
  useQuery<AddressItem[]>({
    queryKey: ["wards", districtCode],
    queryFn: async () => {
      if (!districtCode) return [];
      return getWards(districtCode);
    },
    enabled: !!districtCode,
  });
