import Link from "next/link";

import { EXPO_BRAND, EXPO_NAV } from "@/constants/expo/home";

export const Footer = () => (
  <footer className="bg-[#08052f] text-slate-300" aria-label="Thông tin cuối trang">
    <div className="wrapper py-12 lg:py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
      <div className="space-y-3 lg:col-span-1">
        <p className="text-white text-lg font-semibold">{EXPO_BRAND}</p>
        <p className="text-sm leading-relaxed">
          Kết nối Hội chợ Triển lãm. Mở rộng Cơ hội Kinh doanh.
        </p>
        <p className="text-sm leading-relaxed">
          Nền tảng truyền thông sự kiện và xúc tiến thương mại, kết nối doanh
          nghiệp với hội chợ triển lãm tại Việt Nam và quốc tế.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-white font-semibold">Khám phá</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href={EXPO_NAV.exhibitions.href} className="hover:text-white">
              Hội chợ triển lãm
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-white">
              Trang chủ
            </Link>
          </li>
        </ul>
      </div>

      <div className="space-y-3">
        <p className="text-white font-semibold">Thông tin hỗ trợ</p>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href={EXPO_NAV.contact.href} className="hover:text-white">
              Liên hệ với chúng tôi
            </Link>
          </li>
        </ul>
      </div>

      <div className="space-y-3 text-sm">
        <p className="text-white font-semibold">Kết nối với chúng tôi</p>
        <p>
          <span className="text-white font-medium">Email</span>
          <br />
          <a href="mailto:contact@expo.vietbest.vn" className="hover:text-white">
            contact@expo.vietbest.vn
          </a>
        </p>
        <p>
          <span className="text-white font-medium">Giờ làm việc</span>
          <br />
          Thứ Hai – Thứ Sáu · 09:00 – 16:00 (GMT+7)
        </p>
        <p>
          <span className="text-white font-medium">Tiếp nhận yêu cầu</span>
          <br />
          24/7
        </p>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="wrapper py-6 text-xs text-slate-500 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <p>© 2026 {EXPO_BRAND}. Bảo lưu mọi quyền.</p>
        <p>Khám phá hội chợ triển lãm. Kết nối doanh nghiệp. Mở rộng cơ hội.</p>
      </div>
    </div>
  </footer>
);
