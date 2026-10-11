"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toastSuccess } from "@/components/ui/toaster";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    window.setTimeout(() => {
      setPending(false);
      formRef.current?.reset();
      toastSuccess(
        "Đã gửi yêu cầu",
        "Chúng tôi sẽ liên hệ lại trong giờ làm việc."
      );
    }, 400);
  };

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
              <span className="font-semibold">Email:</span>{" "}
              contact@expo.vietbest.vn
            </p>
            <p>
              <span className="font-semibold">Giờ làm việc:</span> Thứ Hai –
              Thứ Sáu · 09:00 – 16:00 (GMT+7)
            </p>
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 space-y-4 rounded-2xl bg-white border shadow-sm"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Họ tên</Label>
            <Input id="name" name="name" required className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required className="h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Nội dung</Label>
            <Textarea id="message" name="message" required className="min-h-32" />
          </div>
          <Button type="submit" disabled={pending} className="w-full h-11">
            {pending ? "Đang gửi..." : "Gửi yêu cầu"}
          </Button>
        </form>
      </div>
    </div>
  );
}
