type NamedPlace = { code: number | string; name: string };

type AddressFormData = {
  ward?: string;
  street?: string;
  district?: string;
  province?: string;
};

export const buildAddress = (
  wards: NamedPlace[],
  provinces: NamedPlace[],
  districts: NamedPlace[],
  data: AddressFormData
): string => {
  return [
    data.street,
    wards.find((w) => String(w.code) === data.ward)?.name,
    districts.find((d) => String(d.code) === data.district)?.name,
    provinces.find((p) => String(p.code) === data.province)?.name,
  ]
    .filter(Boolean)
    .join(", ");
};
