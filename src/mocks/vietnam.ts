export type MockAddressItem = { code: number; name: string };

export const MOCK_PROVINCES: MockAddressItem[] = [
  { code: 1, name: "Hà Nội" },
  { code: 79, name: "TP. Hồ Chí Minh" },
  { code: 48, name: "Đà Nẵng" },
];

export const MOCK_DISTRICTS: Record<number, MockAddressItem[]> = {
  1: [
    { code: 101, name: "Quận Ba Đình" },
    { code: 102, name: "Quận Cầu Giấy" },
    { code: 103, name: "Quận Đống Đa" },
  ],
  79: [
    { code: 760, name: "Quận 1" },
    { code: 761, name: "Quận 3" },
    { code: 769, name: "Thành phố Thủ Đức" },
  ],
  48: [
    { code: 490, name: "Quận Hải Châu" },
    { code: 491, name: "Quận Thanh Khê" },
  ],
};

export const MOCK_WARDS: Record<number, MockAddressItem[]> = {
  101: [
    { code: 10101, name: "Phường Điện Biên" },
    { code: 10102, name: "Phường Quán Thánh" },
  ],
  102: [
    { code: 10201, name: "Phường Dịch Vọng" },
    { code: 10202, name: "Phường Nghĩa Đô" },
  ],
  103: [
    { code: 10301, name: "Phường Ô Chợ Dừa" },
    { code: 10302, name: "Phường Văn Miếu" },
  ],
  760: [
    { code: 76001, name: "Phường Bến Nghé" },
    { code: 76002, name: "Phường Bến Thành" },
  ],
  761: [
    { code: 76101, name: "Phường Võ Thị Sáu" },
    { code: 76102, name: "Phường 7" },
  ],
  769: [
    { code: 76901, name: "Phường Linh Chiểu" },
    { code: 76902, name: "Phường Hiệp Phú" },
  ],
  490: [
    { code: 49001, name: "Phường Hải Châu I" },
    { code: 49002, name: "Phường Hải Châu II" },
  ],
  491: [
    { code: 49101, name: "Phường Thanh Khê Đông" },
    { code: 49102, name: "Phường Xuân Hà" },
  ],
};

export const resolveVietnamMock = (endpoint: string) => {
  const url = new URL(endpoint);
  const parts = url.pathname.split("/").filter(Boolean);

  if (parts.includes("p") && parts.at(-1) === "p") {
    return MOCK_PROVINCES;
  }

  const pIndex = parts.indexOf("p");
  if (pIndex >= 0 && parts[pIndex + 1]) {
    const code = Number(parts[pIndex + 1]);
    return {
      code,
      name: MOCK_PROVINCES.find((p) => p.code === code)?.name,
      districts: MOCK_DISTRICTS[code] || [],
    };
  }

  const dIndex = parts.indexOf("d");
  if (dIndex >= 0 && parts[dIndex + 1]) {
    const code = Number(parts[dIndex + 1]);
    return {
      code,
      wards: MOCK_WARDS[code] || [],
    };
  }

  return MOCK_PROVINCES;
};
