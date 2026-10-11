const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

export const TOP_ADVERTISES = [
  {
    src: unsplash("1515187029135-18ee286d815b"),
    alt: "Vietnam Water Week 2026 - Khai mạc tuần này",
  },
  {
    src: unsplash("1515187029135-18ee286d815b"),
    alt: "Pharmedi Vietnam 2026 - Triển lãm thiết bị y tế",
  },
  {
    src: unsplash("1488521787991-ed7bbaae773c"),
    alt: "Mom & Baby Fest 2026 - Hội chợ mẹ và bé",
  },
];

export const AD_BANNERS_ROW = [
  {
    src: unsplash("1576091160399-112ba8d25d1d"),
    alt: "Elder Care Expo 2026",
  },
  {
    src: unsplash("1523580494863-6f3031224c94"),
    alt: "Vietnam Edu Expo 2026",
  },
];

export const AD_BANNERS_GRID = [
  {
    src: unsplash("1515187029135-18ee286d815b"),
    alt: "Sự kiện đang và sắp diễn ra",
  },
  {
    src: unsplash("1576091160550-2173dba999ef"),
    alt: "Triển lãm dược phẩm và thiết bị y tế",
  },
  {
    src: unsplash("1504307651254-35680f356dfd"),
    alt: "Vietbuild Hà Nội 2026",
  },
];

export const AUTO_BANNER_IMAGES = [
  { src: unsplash("1515187029135-18ee286d815b"), alt: "Khai mạc tuần này" },
  { src: unsplash("1515187029135-18ee286d815b"), alt: "Sự kiện tháng 9/2026" },
  { src: unsplash("1576091160399-112ba8d25d1d"), alt: "Y tế & chăm sóc sức khỏe" },
  { src: unsplash("1488521787991-ed7bbaae773c"), alt: "Hội chợ mẹ và bé" },
];
