export type ExhibitionSession = {
  city: string;
  fromDate: string;
  toDate: string;
  venue: string;
  address: string;
};

export type ExhibitionReason = {
  title: string;
  description: string;
};

export type ExhibitionProfile = {
  banner: string;
  poster: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  market: string;
  sessions: ExhibitionSession[];
  reasons: ExhibitionReason[];
};

const ETE_2027: ExhibitionProfile = {
  banner: "/mock/events/ete-2027-banner-vi.jpg",
  poster: "/mock/events/ete-2027-poster-en.jpg",
  eyebrow: "Lý do trưng bày & giá trị",
  tagline: "Tâm điểm kết nối ngành điện & năng lượng tại Việt Nam và Đông Nam Á",
  summary:
    "Vietnam ETE & Greenergy Expo 2027 mang đến cơ hội giới thiệu sản phẩm, gặp khách hàng, kết nối đối tác và mở rộng kinh doanh trong một triển lãm chuyên ngành quy mô lớn.",
  market:
    "Việt Nam là thị trường điện và năng lượng năng động, với nhu cầu ngày càng cao về điện, hạ tầng, công nghiệp và các giải pháp năng lượng mới.",
  sessions: [
    {
      city: "TP. Hồ Chí Minh",
      fromDate: "2027-07-21",
      toDate: "2027-07-23",
      venue: "Trung tâm Hội chợ và Triển lãm Sài Gòn (SECC)",
      address: "799 Nguyễn Văn Linh, phường Tân Mỹ, TP. Hồ Chí Minh",
    },
    {
      city: "Hà Nội",
      fromDate: "2027-10-07",
      toDate: "2027-10-09",
      venue: "Trung tâm Triển lãm Việt Nam (VEC)",
      address: "Đường Cầu Tứ Liên, Đông Anh, Hà Nội",
    },
  ],
  reasons: [
    {
      title: "Tiếp cận khách hàng & đối tác",
      description:
        "Gặp gỡ khách mua từ nhà máy, khu công nghiệp, điện lực, nhà thầu, chủ đầu tư và nhà phân phối.",
    },
    {
      title: "Tìm kiếm cơ hội kinh doanh",
      description:
        "Giới thiệu sản phẩm, tìm khách hàng mới, phát triển đại lý và tiếp cận dự án.",
    },
    {
      title: "Nâng cao nhận diện thương hiệu",
      description:
        "Đưa thương hiệu đến gần khách hàng và các doanh nghiệp chủ chốt trong ngành.",
    },
    {
      title: "Cập nhật xu hướng & công nghệ",
      description:
        "Nắm bắt xu hướng, công nghệ mới và nhu cầu đang thay đổi của thị trường.",
    },
    {
      title: "Mở rộng thị trường",
      description:
        "Kết nối doanh nghiệp trong nước và quốc tế, mở rộng hợp tác và cơ hội xuất khẩu.",
    },
  ],
};

const PROFILES: { match: (name: string) => boolean; profile: ExhibitionProfile }[] = [
  {
    match: (name) => /ete/i.test(name) && /greenergy/i.test(name),
    profile: ETE_2027,
  },
];

export const exhibitionProfileOf = (name: string) =>
  PROFILES.find((item) => item.match(name))?.profile;
