export const EXPO_BRAND = "VietBest® Expo";

export const EXPO_NAV = {
  home: { label: "Trang chủ", href: "/" },
  exhibitions: {
    label: "Triển lãm",
    href: "/trien-lam",
    children: [
      { label: "Đang & Sắp diễn ra", href: "/trien-lam" },
    ],
  },
  contact: { label: "Liên hệ", href: "/lien-he" },
};

export const EXPO_HERO = {
  eyebrow: "Nền tảng truyền thông sự kiện & xúc tiến thương mại",
  title: "Kết nối hội chợ triển lãm.\nMở rộng cơ hội kinh doanh.",
  description:
    "Kết nối Ban tổ chức, Nhà trưng bày, Nhà mua hàng, Khách tham quan và các nhà cung cấp dịch vụ trong hệ sinh thái triển lãm tại Việt Nam và quốc tế — trước, trong và sau sự kiện.",
  primaryCta: { label: "Khám phá Hội chợ Triển lãm", href: "/trien-lam" },
  secondaryCta: { label: "Đăng & Quảng bá Sự kiện", href: "/lien-he" },
  note: "Bắt đầu từ 0 đồng",
};

export const EXPO_SUPPORTS = [
  {
    title: "Khám phá sự kiện",
    description:
      "Tìm hội chợ triển lãm phù hợp theo ngành, thị trường và mục tiêu kinh doanh.",
  },
  {
    title: "Quảng bá triển lãm",
    description:
      "Gia tăng khả năng tiếp cận sự kiện và kết nối với các nhóm doanh nghiệp phù hợp.",
  },
  {
    title: "Tìm cơ hội trưng bày",
    description:
      "Khám phá triển lãm và cơ hội gian hàng phù hợp với sản phẩm, thị trường và kế hoạch phát triển.",
  },
  {
    title: "Kết nối đối tác",
    description:
      "Tiếp cận nhà mua hàng, đối tác và khách hàng tiềm năng trong hệ sinh thái triển lãm.",
  },
];

export const EXPO_JOURNEYS = [
  {
    title: "Dành cho Nhà trưng bày",
    description:
      "Khám phá triển lãm phù hợp với sản phẩm và thị trường mục tiêu, tìm hiểu cơ hội gian hàng và tiếp cận những thị trường có tiềm năng phát triển.",
    href: "/trien-lam",
    cta: "Tìm cơ hội trưng bày",
  },
  {
    title: "Dành cho Nhà mua hàng",
    description:
      "Tìm triển lãm theo ngành, khám phá sản phẩm, nhà cung cấp và các cơ hội kết nối phục vụ nhu cầu tìm nguồn hàng và hợp tác kinh doanh.",
    href: "/trien-lam",
    cta: "Khám phá triển lãm",
  },
  {
    title: "Dành cho Ban tổ chức",
    description:
      "Giới thiệu triển lãm tới cộng đồng doanh nghiệp, mở rộng khả năng được khám phá và tiếp cận các doanh nghiệp có nhu cầu tham gia trưng bày.",
    href: "/lien-he",
    cta: "Đăng & Quảng bá Sự kiện",
  },
];

export const EXPO_INDUSTRY_COPY: Record<
  string,
  { title: string; description: string }
> = {
  manufacturing: {
    title: "Công nghiệp Chế tạo & Công nghệ Sản xuất",
    description:
      "Khám phá các hội chợ, triển lãm về kỹ thuật chế tạo, tự động hóa công nghiệp, gia công cơ khí, công nghệ kim loại và các giải pháp phục vụ sản xuất hiện đại.",
  },
  food: {
    title: "Thực phẩm & Đồ uống",
    description:
      "Khám phá các hội chợ, triển lãm về thực phẩm, đồ uống, chế biến thực phẩm, công nghệ sản xuất và các giải pháp phục vụ ngành thực phẩm – đồ uống.",
  },
  "smart-city": {
    title: "Đô thị Thông minh & Công nghệ Đô thị",
    description:
      "Khám phá các hội chợ, triển lãm về hạ tầng số đô thị, quản trị đô thị thông minh, công nghệ kết nối và các giải pháp phát triển đô thị hiện đại.",
  },
};

export const EXPO_VALUES = [
  {
    title: "Hiểu sự kiện nhanh hơn",
    description:
      "Thông tin về ngành, thời gian, địa điểm, cơ hội trưng bày và các nội dung quan trọng được trình bày rõ ràng để doanh nghiệp dễ dàng đánh giá mức độ phù hợp của từng sự kiện.",
  },
  {
    title: "Đi từ quan tâm đến hành động",
    description:
      "Tiếp tục hành trình bằng cách tìm hiểu cơ hội gian hàng, gửi yêu cầu thông tin, liên hệ Ban tổ chức hoặc khám phá thêm các triển lãm và cơ hội kinh doanh liên quan.",
  },
];

export const EXPO_LISTING_HERO = {
  title: "Hội chợ Triển lãm sắp diễn ra",
  description:
    "Khám phá các hội chợ, triển lãm thương mại đang và sắp diễn ra tại Việt Nam và quốc tế để tìm cơ hội tham gia trưng bày, kết nối đối tác và mở rộng thị trường. Lọc theo ngành hàng, quốc gia, thành phố, địa điểm tổ chức và thời gian để tìm sự kiện phù hợp với nhu cầu kinh doanh.",
  image:
    "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1600&q=80",
  breadcrumbs: [
    { label: "Trang chủ", href: "/" },
    { label: "Hội chợ & Triển lãm", href: "/trien-lam" },
    { label: "Đang & Sắp diễn ra" },
  ],
  highlights: [
    { label: "Công nghiệp & Sản xuất", icon: "factory" },
    { label: "Thực phẩm & Đồ uống", icon: "food" },
    { label: "Công nghệ & Điện tử", icon: "tech" },
    { label: "Năng lượng & Môi trường", icon: "energy" },
    { label: "Y tế & Dược phẩm", icon: "health" },
    { label: "và nhiều lĩnh vực khác", icon: "more" },
  ],
};
