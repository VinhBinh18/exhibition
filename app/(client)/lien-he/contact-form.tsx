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

type FieldName = "name" | "companyName" | "email" | "phone" | "eventId";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^0\d{9}$/;

const validateContact = (values: Record<FieldName, string>) => {
  const errors: Partial<Record<FieldName, string>> = {};

  if (!values.name.trim()) errors.name = "Vui lòng nhập họ tên";
  if (!values.companyName.trim()) errors.companyName = "Vui lòng nhập tên công ty";
  if (!values.email.trim()) errors.email = "Vui lòng nhập email";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Email không hợp lệ";
  if (!values.phone.trim()) errors.phone = "Vui lòng nhập số điện thoại";
  else if (!PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = "Số điện thoại gồm 10 số và bắt đầu bằng 0";
  }
  if (!values.eventId) errors.eventId = "Vui lòng chọn triển lãm";

  return errors;
};

export const ContactForm = ({ initialEventId = "" }: ContactFormProps) => {
  const [pending, setPending] = useState(false);
  const [eventId, setEventId] = useState(initialEventId);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

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

    const nextErrors = validateContact(payload);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setPending(true);
    try {
      const result = await submitContact(payload);
      form.reset();
      setEventId("");
      setErrors({});
      toastSuccess(
        result.message || "Gửi yêu cầu thành công",
        result.description || "Đã ghi nhận đăng ký và gửi thông báo qua email."
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
      noValidate
      onSubmit={handleSubmit}
      className="p-6 sm:p-8 space-y-4 rounded-2xl bg-white border shadow-sm"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Họ tên</Label>
        <Input
          id="name"
          name="name"
          aria-invalid={Boolean(errors.name)}
          className="h-11"
          onChange={() => setErrors((current) => ({ ...current, name: undefined }))}
        />
        {errors.name ? <p className="text-sm text-red-500">{errors.name}</p> : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="companyName">Tên công ty</Label>
        <Input
          id="companyName"
          name="companyName"
          aria-invalid={Boolean(errors.companyName)}
          className="h-11"
          onChange={() =>
            setErrors((current) => ({ ...current, companyName: undefined }))
          }
        />
        {errors.companyName ? (
          <p className="text-sm text-red-500">{errors.companyName}</p>
        ) : null}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            aria-invalid={Boolean(errors.email)}
            className="h-11"
            onChange={() => setErrors((current) => ({ ...current, email: undefined }))}
          />
          {errors.email ? <p className="text-sm text-red-500">{errors.email}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            placeholder="0912345678"
            aria-invalid={Boolean(errors.phone)}
            className="h-11"
            onChange={() => setErrors((current) => ({ ...current, phone: undefined }))}
          />
          {errors.phone ? <p className="text-sm text-red-500">{errors.phone}</p> : null}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="eventId">Triển lãm đăng ký</Label>
        <Select
          value={eventId}
          onValueChange={(value) => {
            setEventId(value);
            setErrors((current) => ({ ...current, eventId: undefined }));
          }}
          disabled={eventsPending || !options.length}
        >
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
        {errors.eventId ? <p className="text-sm text-red-500">{errors.eventId}</p> : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Nội dung</Label>
        <Textarea id="description" name="description" className="min-h-32" />
      </div>
      <Button type="submit" disabled={pending || !options.length} className="w-full h-11">
        {pending ? "Đang gửi..." : "Gửi yêu cầu"}
      </Button>
    </form>
  );
};
