import { NextRequest } from "next/server";

import { errorResponse } from "@/app/lib/api-response";
import {
  ClientRecord,
  EventRegistrationRecord,
  ExhibitionEventRecord,
} from "@/types/records";

export const pageOf = (req: NextRequest) => {
  const page = Math.max(1, Number(req.nextUrl.searchParams.get("page")) || 1);
  const limit = Math.min(
    100,
    Math.max(1, Number(req.nextUrl.searchParams.get("limit")) || 20)
  );
  const from = (page - 1) * limit;

  return { page, limit, from, to: from + limit - 1 };
};

export const likeTerm = (value: string) =>
  value.replace(/[%_,.()]/g, " ").trim();

export const readJson = async (req: NextRequest) => {
  try {
    return (await req.json()) as Record<string, unknown>;
  } catch {
    return null;
  }
};

export const textOf = (value: unknown) => String(value ?? "").trim();

export const dbError = (error: { code?: string; message?: string }) => {
  if (error.code === "23505") {
    const message = error.message?.includes("clients_phone")
      ? "Số điện thoại đã được dùng cho một khách khác"
      : error.message?.includes("event_registrations")
        ? "Khách đã đăng ký sự kiện này"
        : "Dữ liệu bị trùng";
    return errorResponse({ status: 409, message });
  }

  if (error.code === "23514") {
    const message = error.message?.includes("events_date_range")
      ? "Ngày kết thúc phải bằng hoặc sau ngày bắt đầu"
      : error.message?.includes("clients_phone_format")
        ? "Số điện thoại phải gồm 10 số và bắt đầu bằng 0"
        : "Dữ liệu không đúng ràng buộc";
    return errorResponse({ status: 400, message });
  }

  if (error.code === "23503") {
    return errorResponse({
      status: 400,
      message: "Không tìm thấy dữ liệu liên quan",
    });
  }

  return errorResponse({
    message: "Đã có lỗi xảy ra",
    detail: error.message,
  });
};

export const toClient = (row: Record<string, unknown>): ClientRecord => ({
  id: String(row.id),
  name: String(row.name),
  email: String(row.email),
  companyName: String(row.company_name),
  phone: String(row.phone),
  description: String(row.description),
  createdAt: String(row.created_at),
  updatedAt: String(row.updated_at),
  isDeleted: Boolean(row.is_deleted),
});

export const toExhibitionEvent = (
  row: Record<string, unknown>
): ExhibitionEventRecord => ({
  id: String(row.id),
  name: String(row.name),
  location: String(row.location),
  fromDate: String(row.from_date),
  toDate: String(row.to_date),
  description: String(row.description),
  createdAt: String(row.created_at),
  updatedAt: String(row.updated_at),
  isDeleted: Boolean(row.is_deleted),
});

export const toRegistration = (
  row: Record<string, any>
): EventRegistrationRecord => {
  const client = row.clients;
  const event = row.events;

  return {
    id: String(row.id),
    clientId: String(row.client_id),
    eventId: String(row.event_id),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    isDeleted: Boolean(row.is_deleted),
    client: client
      ? {
          id: String(client.id),
          name: String(client.name),
          email: String(client.email),
          companyName: String(client.company_name),
          phone: String(client.phone),
        }
      : undefined,
    event: event
      ? {
          id: String(event.id),
          name: String(event.name),
          location: String(event.location),
          fromDate: String(event.from_date),
          toDate: String(event.to_date),
        }
      : undefined,
  };
};
