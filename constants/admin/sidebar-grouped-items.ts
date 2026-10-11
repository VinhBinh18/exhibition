import {
  Users,
  Layers,
  Calendar,
  Newspaper,
  LayoutDashboard,
} from "lucide-react";

export const SIDEBAR_GROUPED_ITEMS = [
  {
    title: "Tổng quan",
    items: [
      {
        title: "Thống kê",
        url: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Nội dung",
    items: [
      { title: "Sự kiện", url: "/admin/events", icon: Calendar },
      { title: "Danh mục", url: "/admin/categories", icon: Layers },
      { title: "Bài viết", url: "/admin/blogs", icon: Newspaper },
      { title: "Khách hàng", url: "/admin/customers", icon: Users },
    ],
  },
];
