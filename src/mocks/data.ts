import { BlogType } from "@/types/blog";
import { User } from "@/types/user";
import { EventType } from "@/types/event";
import { CategoryType } from "@/types/category";
import { Comment, ProductType } from "@/types/product";

const now = "2026-09-16T08:00:00.000Z";
const lastYear = "2025-08-20T08:00:00.000Z";

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const MOCK_USER: User = {
  _id: "user-demo",
  fullName: "Nguyễn Văn A",
  email: "demo@expo.local",
  role: "CUSTOMER",
  phone: "0901234567",
  address: "12 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
  status: "VERIFIED",
  avatarUrl: img("1535713875002-d1d0cf377fde", 200),
  createdAt: new Date("2024-02-10"),
  updatedAt: new Date("2026-01-01"),
};

const reviewer: User = {
  _id: "user-reviewer",
  fullName: "Trần Minh Tuấn",
  email: "tuan@example.com",
  role: "CUSTOMER",
  status: "VERIFIED",
  avatarUrl: img("1494790108377-be9c29b29330", 200),
  createdAt: new Date("2023-11-02"),
  updatedAt: new Date("2025-12-01"),
};

const comments: Comment[] = [
  {
    _id: "cmt-1",
    userId: reviewer,
    content:
      "Gian hàng đông, nội dung chuyên môn tốt. Check-in vé online khá nhanh.",
    rating: 5,
    likes: [],
    createdAt: "2026-09-10T10:00:00.000Z",
    replies: [],
  },
  {
    _id: "cmt-2",
    userId: MOCK_USER,
    content: "Đăng ký tham dự dễ, vị trí trung tâm thuận tiện đi lại.",
    rating: 4,
    likes: ["user-reviewer"],
    createdAt: "2026-09-12T14:20:00.000Z",
    replies: [],
  },
];

export const MOCK_CATEGORIES: CategoryType[] = [
  {
    _id: "cat-water",
    name: "water",
    label: "Cấp thoát nước",
    image: img("1581091226825-a6a2a5aee158", 400),
    createdAt: lastYear,
    updatedAt: now,
    fields: [
      {
        name: "city",
        label: "Thành phố",
        type: "text",
        options: ["Hà Nội", "TP. Hồ Chí Minh"],
      },
      {
        name: "month",
        label: "Tháng",
        type: "text",
        options: ["Tháng 9", "Tháng 10"],
      },
    ],
  },
  {
    _id: "cat-healthcare",
    name: "healthcare",
    label: "Y tế & chăm sóc sức khỏe",
    image: img("1576091160399-112ba8d25d1d", 400),
    createdAt: lastYear,
    updatedAt: now,
    fields: [
      {
        name: "city",
        label: "Thành phố",
        type: "text",
        options: ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng"],
      },
      {
        name: "type",
        label: "Loại sự kiện",
        type: "text",
        options: ["Triển lãm", "Hội nghị"],
      },
    ],
  },
  {
    _id: "cat-medical",
    name: "medical",
    label: "Thiết bị & công nghệ y tế",
    image: img("1576091160550-2173dba999ef", 400),
    createdAt: lastYear,
    updatedAt: now,
    fields: [
      {
        name: "city",
        label: "Thành phố",
        type: "text",
        options: ["TP. Hồ Chí Minh", "Hà Nội"],
      },
      {
        name: "month",
        label: "Tháng",
        type: "text",
        options: ["Tháng 9", "Tháng 11"],
      },
    ],
  },
  {
    _id: "cat-mother-baby",
    name: "mother-baby",
    label: "Mẹ & bé",
    image: img("1488521787991-ed7bbaae773c", 400),
    createdAt: lastYear,
    updatedAt: now,
    fields: [
      {
        name: "city",
        label: "Thành phố",
        type: "text",
        options: ["Cần Thơ", "TP. Hồ Chí Minh"],
      },
      {
        name: "type",
        label: "Loại sự kiện",
        type: "text",
        options: ["Hội chợ", "Festival"],
      },
    ],
  },
  {
    _id: "cat-education",
    name: "education",
    label: "Giáo dục",
    image: img("1523580494863-6f3031224c94", 400),
    createdAt: lastYear,
    updatedAt: now,
    fields: [
      {
        name: "city",
        label: "Thành phố",
        type: "text",
        options: ["Hà Nội", "TP. Hồ Chí Minh"],
      },
    ],
  },
  {
    _id: "cat-industry",
    name: "industry",
    label: "Công nghiệp & xây dựng",
    image: img("1504307651254-35680f356dfd", 400),
    createdAt: lastYear,
    updatedAt: now,
    fields: [
      {
        name: "city",
        label: "Thành phố",
        type: "text",
        options: ["Hà Nội", "TP. Hồ Chí Minh"],
      },
      {
        name: "month",
        label: "Tháng",
        type: "text",
        options: ["Tháng 9", "Tháng 10"],
      },
    ],
  },
];

export const MOCK_EVENTS: EventType[] = [
  {
    _id: "evt-opening-now",
    name: "Khai mạc tuần này",
    tag: "opening-now",
    frame: "",
    image: img("1515187029135-18ee286d815b", 600),
    createdAt: lastYear,
    updatedAt: now,
  },
  {
    _id: "evt-this-month",
    name: "Sự kiện tháng này",
    tag: "this-month",
    frame: "",
    image: img("1515187029135-18ee286d815b", 600),
    createdAt: lastYear,
    updatedAt: now,
  },
];

const product = (
  data: Omit<ProductType, "createdAt" | "updatedAt" | "comments"> & {
    comments?: Comment[];
  }
): ProductType => ({
  createdAt: lastYear,
  updatedAt: now,
  comments: data.comments ?? [],
  ...data,
});

export const MOCK_PRODUCTS: ProductType[] = [
  product({
    _id: "prd-water-week",
    name: "Vietnam Water Week 2026",
    slug: "vietnam-water-week-2026",
    event: "opening-now",
    category: "water",
    price: 200000,
    discountPercent: 10,
    discountPrice: 180000,
    description:
      "<p>Triển lãm quốc tế ngành cấp thoát nước và xử lý nước thải tại Hà Nội.</p><ul><li>Thời gian: 16–18/09/2026</li><li>Địa điểm: ICE, Hà Nội</li><li>Quy mô: 300+ gian hàng</li></ul>",
    images: [img("1581091226825-a6a2a5aee158"), img("1504307651254-35680f356dfd")],
    attributes: {
      city: "Hà Nội",
      venue: "ICE Hà Nội",
      month: "Tháng 9",
      type: "Triển lãm",
      organizer: "VWSA",
    },
    averageRating: 4.7,
    ratingsCount: 18,
    stock: 120,
    soldQuantity: 860,
    comments,
  }),
  product({
    _id: "prd-water-enviro",
    name: "Enviro Water Expo 2026",
    slug: "enviro-water-expo-2026",
    event: "this-month",
    category: "water",
    price: 150000,
    description:
      "<p>Hội chợ công nghệ môi trường và xử lý nước tại TP. Hồ Chí Minh.</p>",
    images: [img("1504307651254-35680f356dfd")],
    attributes: {
      city: "TP. Hồ Chí Minh",
      venue: "SECC",
      month: "Tháng 10",
      type: "Triển lãm",
      organizer: "Enviro VN",
    },
    averageRating: 4.3,
    ratingsCount: 9,
    stock: 80,
    soldQuantity: 210,
  }),
  product({
    _id: "prd-elder-care",
    name: "Elder Care Expo 2026 – Triển lãm Quốc tế Công nghệ Chăm sóc Người cao tuổi",
    slug: "elder-care-expo-2026",
    event: "this-month",
    category: "healthcare",
    price: 150000,
    discountPercent: 8,
    discountPrice: 138000,
    description:
      "<p>Triển lãm y tế và chăm sóc sức khỏe người cao tuổi, diễn ra 22–24/09/2026 tại TP.HCM.</p>",
    images: [img("1576091160399-112ba8d25d1d"), img("1576091160550-2173dba999ef")],
    attributes: {
      city: "TP. Hồ Chí Minh",
      venue: "SECC",
      month: "Tháng 9",
      type: "Triển lãm",
      organizer: "Elder Care VN",
    },
    averageRating: 4.6,
    ratingsCount: 22,
    stock: 90,
    soldQuantity: 540,
  }),
  product({
    _id: "prd-health-summit",
    name: "Vietnam Healthcare Summit 2026",
    slug: "vietnam-healthcare-summit-2026",
    event: "opening-now",
    category: "healthcare",
    price: 450000,
    description:
      "<p>Hội nghị chuyên đề y tế công cộng và chăm sóc sức khỏe tại Hà Nội.</p>",
    images: [img("1551836022-d5d88e9218df")],
    attributes: {
      city: "Hà Nội",
      venue: "JW Marriott Hà Nội",
      month: "Tháng 9",
      type: "Hội nghị",
      organizer: "MOH Partner",
    },
    averageRating: 4.8,
    ratingsCount: 14,
    stock: 40,
    soldQuantity: 190,
  }),
  product({
    _id: "prd-pharmedi",
    name: "Pharmedi Vietnam 2026 – Triển lãm Dược phẩm, Thiết bị Y tế",
    slug: "pharmedi-vietnam-2026",
    event: "this-month",
    category: "medical",
    price: 350000,
    discountPercent: 12,
    discountPrice: 308000,
    description:
      "<p>Triển lãm quốc tế dược phẩm, thiết bị và công nghệ y tế, 22–24/09/2026 tại SECC.</p>",
    images: [img("1576091160550-2173dba999ef"), img("1576091160399-112ba8d25d1d")],
    attributes: {
      city: "TP. Hồ Chí Minh",
      venue: "SECC",
      month: "Tháng 9",
      type: "Triển lãm",
      organizer: "Pharmedi",
    },
    averageRating: 4.9,
    ratingsCount: 31,
    stock: 75,
    soldQuantity: 720,
  }),
  product({
    _id: "prd-medfair-hn",
    name: "Medical Fair Hanoi 2026",
    slug: "medical-fair-hanoi-2026",
    event: "",
    category: "medical",
    price: 280000,
    description:
      "<p>Triển lãm thiết bị chẩn đoán hình ảnh và công nghệ bệnh viện.</p>",
    images: [img("1576091160399-112ba8d25d1d")],
    attributes: {
      city: "Hà Nội",
      venue: "ICE Hà Nội",
      month: "Tháng 11",
      type: "Triển lãm",
      organizer: "MedFair Asia",
    },
    averageRating: 4.4,
    ratingsCount: 11,
    stock: 60,
    soldQuantity: 155,
  }),
  product({
    _id: "prd-mom-baby-ct",
    name: "Mom & Baby Fest Cần Thơ 2026 – Lễ hội & Triển lãm Quốc tế",
    slug: "mom-baby-fest-can-tho-2026",
    event: "this-month",
    category: "mother-baby",
    price: 80000,
    discountPercent: 20,
    discountPrice: 64000,
    description:
      "<p>Lễ hội mẹ và bé tại Cần Thơ, 24–27/09/2026. Vé tham quan, workshop và gian hàng mẹ bầu.</p>",
    images: [img("1488521787991-ed7bbaae773c"), img("1516627145497-ae6968895b74")],
    attributes: {
      city: "Cần Thơ",
      venue: "Trung tâm HNQT Cần Thơ",
      month: "Tháng 9",
      type: "Festival",
      organizer: "Mom & Baby Fest",
    },
    averageRating: 4.5,
    ratingsCount: 40,
    stock: 200,
    soldQuantity: 1340,
  }),
  product({
    _id: "prd-baby-fair-hcm",
    name: "Baby Fair TP.HCM 2026",
    slug: "baby-fair-hcm-2026",
    event: "opening-now",
    category: "mother-baby",
    price: 100000,
    description: "<p>Hội chợ sản phẩm mẹ và bé, vui chơi gia đình tại SECC.</p>",
    images: [img("1516627145497-ae6968895b74")],
    attributes: {
      city: "TP. Hồ Chí Minh",
      venue: "SECC",
      month: "Tháng 9",
      type: "Hội chợ",
      organizer: "Baby Fair VN",
    },
    averageRating: 4.2,
    ratingsCount: 16,
    stock: 150,
    soldQuantity: 410,
  }),
  product({
    _id: "prd-edu-expo",
    name: "Vietnam Edu Expo 2026",
    slug: "vietnam-edu-expo-2026",
    event: "this-month",
    category: "education",
    price: 0,
    description:
      "<p>Triển lãm du học và giáo dục quốc tế. Vé tham dự miễn phí, cần đăng ký trước.</p>",
    images: [img("1523580494863-6f3031224c94"), img("1515187029135-18ee286d815b")],
    attributes: {
      city: "Hà Nội",
      venue: "Cung Văn hóa Hữu nghị",
      month: "Tháng 9",
      type: "Triển lãm",
      organizer: "EduExpo",
    },
    averageRating: 4.6,
    ratingsCount: 28,
    stock: 500,
    soldQuantity: 2100,
  }),
  product({
    _id: "prd-vietbuild",
    name: "Vietbuild Hà Nội 2026",
    slug: "vietbuild-hanoi-2026",
    event: "opening-now",
    category: "industry",
    price: 120000,
    discountPercent: 15,
    discountPrice: 102000,
    description:
      "<p>Triển lãm quốc tế ngành xây dựng, vật liệu và nội thất tại Hà Nội.</p>",
    images: [img("1504307651254-35680f356dfd"), img("1515187029135-18ee286d815b")],
    attributes: {
      city: "Hà Nội",
      venue: "ICE Hà Nội",
      month: "Tháng 9",
      type: "Triển lãm",
      organizer: "Vietbuild",
    },
    averageRating: 4.4,
    ratingsCount: 19,
    stock: 110,
    soldQuantity: 630,
  }),
];

export const MOCK_BLOGS: BlogType[] = [
  {
    _id: "blog-1",
    title: "Lịch triển lãm hội chợ tháng 9/2026 tại Việt Nam",
    slug: "lich-trien-lam-thang-9-2026",
    summary:
      "Tổng hợp các sự kiện đang và sắp diễn ra: Water Week, Pharmedi, Elder Care Expo và Mom & Baby Fest.",
    description:
      "<p>Tháng 9 là cao điểm hội chợ tại Hà Nội, TP.HCM và Cần Thơ. Nên đăng ký vé trước để tránh hết suất workshop.</p><p>Ưu tiên sự kiện có badge Khai mạc hoặc Tuần này nếu bạn muốn tham dự ngay.</p>",
    thumbnail: img("1515187029135-18ee286d815b", 1200),
    createdAt: new Date("2026-09-02"),
    updatedAt: new Date("2026-09-02"),
  },
  {
    _id: "blog-2",
    title: "Kinh nghiệm đăng ký gian hàng triển lãm y tế",
    slug: "dang-ky-gian-hang-trien-lam-y-te",
    summary:
      "Checklist hồ sơ, vị trí booth và chi phí tham gia Pharmedi / Medical Fair.",
    description:
      "<p>Chọn vị trí gần lối đi chính, chuẩn bị brochure song ngữ và nhân sự kỹ thuật tại gian hàng.</p>",
    thumbnail: img("1576091160550-2173dba999ef", 1200),
    createdAt: new Date("2026-08-18"),
    updatedAt: new Date("2026-08-18"),
  },
  {
    _id: "blog-3",
    title: "Tham dự hội chợ mẹ và bé cùng gia đình cần chuẩn bị gì?",
    slug: "tham-du-hoi-cho-me-va-be",
    summary:
      "Gợi ý vé, lịch workshop, khu vui chơi và mẹo di chuyển tại Cần Thơ / TP.HCM.",
    description:
      "<p>Nên đặt vé online, đến sớm khung giờ sáng và mang theo giấy tờ ưu đãi nếu có.</p>",
    thumbnail: img("1488521787991-ed7bbaae773c", 1200),
    createdAt: new Date("2026-08-09"),
    updatedAt: new Date("2026-08-09"),
  },
];
