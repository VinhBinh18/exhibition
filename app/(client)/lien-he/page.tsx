import { Metadata } from "next";
import { Suspense } from "react";

import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Liên hệ | VietBest® Expo",
  description: "Đăng ký tham gia triển lãm và gửi yêu cầu hợp tác.",
};

const ContactPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ eventId?: string }>;
}) => {
  const { eventId } = await searchParams;

  return (
    <div className="bg-slate-50 min-h-[70vh]">
      <div className="wrapper py-12 lg:py-16 grid lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <p className="text-sm font-medium text-primary">Liên hệ</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-slate-600 leading-relaxed">
            Gửi yêu cầu đăng sự kiện, tìm gian hàng hoặc hợp tác truyền thông.
            Tiếp nhận 24/7 — phản hồi trong giờ làm việc.
          </p>
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              <span className="font-semibold">Email:</span> Lechau2507@gmail.com
            </p>
            <p>
              <span className="font-semibold">Giờ làm việc:</span> Thứ Hai – Thứ
              Sáu · 09:00 – 16:00 (GMT+7)
            </p>
          </div>
        </div>

        <Suspense
          fallback={<div className="h-96 animate-pulse rounded-2xl bg-white" />}
        >
          <ContactForm initialEventId={eventId} />
        </Suspense>
      </div>
    </div>
  );
};

export default ContactPage;
