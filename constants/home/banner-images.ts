const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

export const BANNER_IMAGE_URLS: Record<string, string> = {
  "1": unsplash("1515187029135-18ee286d815b"),
  "2": unsplash("1515187029135-18ee286d815b"),
  "3": unsplash("1523580494863-6f3031224c94"),
  "4": unsplash("1576091160399-112ba8d25d1d"),
  "5": unsplash("1488521787991-ed7bbaae773c"),
  "6": unsplash("1576091160550-2173dba999ef"),
  "7": unsplash("1504307651254-35680f356dfd"),
  "8": unsplash("1581091226825-a6a2a5aee158"),
  "9": unsplash("1551836022-d5d88e9218df"),
  "10": unsplash("1475721027785-5fd3d86dd64d"),
};

export const BANNER_IMAGES = [
  {
    src: unsplash("1515187029135-18ee286d815b"),
    alt: "Vietnam Water Week 2026 - Khai mạc tại Hà Nội",
  },
  {
    src: unsplash("1515187029135-18ee286d815b"),
    alt: "Pharmedi Vietnam 2026 - Tuần này tại SECC",
  },
  {
    src: unsplash("1488521787991-ed7bbaae773c"),
    alt: "Mom & Baby Fest Cần Thơ 2026",
  },
  {
    src: unsplash("1576091160399-112ba8d25d1d"),
    alt: "Elder Care Expo 2026 - Chăm sóc người cao tuổi",
  },
];
