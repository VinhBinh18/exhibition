import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

import { Toaster } from "@/components/ui/sonner";

import { NuqsProvider } from "@/components/providers/nuqs-provider";
import { QueryProvider } from "@/components/providers/query-provider";

const manrope = localFont({
  src: "./fonts/manrope-latin-wght-normal.woff2",
  display: "swap",
  variable: "--font-manrope",
  weight: "200 800",
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    },
  ],
});

const manropeVietnamese = localFont({
  src: "./fonts/manrope-vietnamese-wght-normal.woff2",
  display: "swap",
  variable: "--font-manrope-vi",
  weight: "200 800",
  declarations: [
    {
      prop: "unicode-range",
      value:
        "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB",
    },
  ],
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
      <body className={`${manrope.variable} ${manropeVietnamese.variable} antialiased`}>
        <QueryProvider>
          <NuqsProvider>
            <Toaster />
            {children}
          </NuqsProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
