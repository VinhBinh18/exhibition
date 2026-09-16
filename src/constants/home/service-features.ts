import {
  MapPin,
  Ticket,
  Calendar,
  Newspaper,
  Building2,
  Headset,
} from "lucide-react";

import { ServiceFeatureType } from "@/types/global";

export const SERVICE_FEATURES: ServiceFeatureType[] = [
  { icon: Calendar, label: "Lịch sự kiện", href: "/" },
  { icon: Newspaper, label: "Tin tức hội chợ", href: "/blogs" },
  { icon: Ticket, label: "Vé tham dự", href: "/collections/healthcare" },
  { icon: Building2, label: "Đăng ký gian hàng", href: "/" },
  { icon: MapPin, label: "Địa điểm tổ chức", href: "/" },
  { icon: Headset, label: "Hỗ trợ ban tổ chức", href: "/" },
];
