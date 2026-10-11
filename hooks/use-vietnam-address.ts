import { useQuery } from "@tanstack/react-query";

export type AddressItem = { code: number; name: string };

const getProvinces = async (): Promise<AddressItem[]> => [];
const getDistricts = async (_provinceCode?: string): Promise<AddressItem[]> => [];
const getWards = async (_districtCode?: string): Promise<AddressItem[]> => [];

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
