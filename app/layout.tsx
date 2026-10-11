import "./globals.css";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { Modals } from "@/components/modals";
import { Toaster } from "@/components/ui/sonner";

import { NuqsProvider } from "@/components/providers/nuqs-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ResetStepGuard } from "@/components/guards/reset-step-guard";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VietBest® Expo - Kết nối hội chợ triển lãm, mở rộng cơ hội kinh doanh",
  description:
    "Nền tảng truyền thông sự kiện và xúc tiến thương mại, kết nối doanh nghiệp với hội chợ triển lãm tại Việt Nam và quốc tế.",
  metadataBase: new URL("https://expo.vietbest.vn"),
  openGraph: {
    title: "VietBest® Expo",
    description:
      "Kết nối Ban tổ chức, Nhà trưng bày, Nhà mua hàng và Khách tham quan trong hệ sinh thái triển lãm.",
    url: "https://expo.vietbest.vn",
    siteName: "VietBest® Expo",
    locale: "vi_VN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${manrope.variable} antialiased`}>
        <QueryProvider>
          <NuqsProvider>
            <ResetStepGuard>
              <Modals />
              <Toaster />
              {children}
            </ResetStepGuard>
          </NuqsProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
