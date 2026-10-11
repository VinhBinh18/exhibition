"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getEvents } from "@/lib/api/events";
import { submitContact } from "@/lib/api/contact";
import { queryKeys } from "@/hooks/query-keys";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toastError, toastSuccess } from "@/components/ui/toaster";

type ContactFormProps = {
  initialEventId?: string;
};

export const ContactForm = ({ initialEventId = "" }: ContactFormProps) => {
  const [pending, setPending] = useState(false);
  const [eventId, setEventId] = useState(initialEventId);

  const { data: events, isPending: eventsPending } = useQuery({
    queryKey: queryKeys.event.list({ page: 1, limit: 100, name: "" }),
    queryFn: async () => {
      const first = await getEvents({ page: 1, limit: 100 });
      if (first.totalPages <= 1) return first;
      const rest = await Promise.all(
        Array.from({ length: first.totalPages - 1 }, (_, index) =>
          getEvents({ page: index + 2, limit: 100 })
        )
      );
      return {
        ...first,
        data: [first, ...rest].flatMap((page) => page.data),
      };
    },
  });

  const options = events?.data ?? [];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      companyName: String(data.get("companyName") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      description: String(data.get("description") || "").trim(),
      eventId,
    };

    if (!payload.eventId) {
      toastError("Chọn triển lãm", "Hãy chọn triển lãm muốn đăng ký.");
      return;
    }

    setPending(true);
    try {
      const result = await submitContact(payload);
      form.reset();
      setEventId("");
      toastSuccess(
        result.message || "Đăng ký thành công",
        result.description || "Chúng tôi sẽ liên hệ lại trong giờ làm việc."
      );
    } catch (error) {
      const failed = error as { message?: string; description?: string };
      toastError(
        failed.message || "Không gửi được yêu cầu",
        failed.description
      );
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 sm:p-8 space-y-4 rounded-2xl bg-white border shadow-sm"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Họ tên</Label>
        <Input id="name" name="name" required className="h-11" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="companyName">Tên công ty</Label>
        <Input id="companyName" name="companyName" required className="h-11" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required className="h-11" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            required
            pattern="0[0-9]{9}"
            title="Số điện thoại gồm 10 số và bắt đầu bằng 0"
            placeholder="0912345678"
            className="h-11"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="eventId">Triển lãm đăng ký</Label>
        <Select value={eventId} onValueChange={setEventId} disabled={eventsPending || !options.length}>
          <SelectTrigger id="eventId" className="h-11 w-full">
            <SelectValue
              placeholder={
                eventsPending
                  ? "Đang tải triển lãm..."
                  : options.length
                    ? "Chọn triển lãm"
                    : "Chưa có triển lãm"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {options.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Nội dung</Label>
        <Textarea id="description" name="description" required className="min-h-32" />
      </div>
      <Button type="submit" disabled={pending || !options.length} className="w-full h-11">
        {pending ? "Đang gửi..." : "Gửi yêu cầu"}
      </Button>
    </form>
  );
};
