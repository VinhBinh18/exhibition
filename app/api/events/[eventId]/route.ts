import { NextRequest } from "next/server";

import { errorResponse, successResponse } from "@/app/lib/api-response";
import { supabaseAdmin } from "@/lib/supabase/server";
import {
  dbError,
  readJson,
  textOf,
  toExhibitionEvent,
} from "@/lib/supabase/http";

type Context = { params: Promise<{ eventId: string }> };

const isDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);

export const GET = async (_req: NextRequest, { params }: Context) => {
  try {
    const { eventId } = await params;
    const { data, error } = await supabaseAdmin()
      .from("events")
      .select("*")
      .eq("id", eventId)
      .eq("is_deleted", false)
      .maybeSingle();

    if (error) return dbError(error);
    if (!data) {
      return errorResponse({ status: 404, message: "Không tìm thấy sự kiện" });
    }

    return successResponse({
      message: "Lấy sự kiện thành công",
      result: toExhibitionEvent(data),
    });
  } catch (error) {
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      detail: error instanceof Error ? error.message : error,
    });
  }
};

export const PUT = async (req: NextRequest, { params }: Context) => {
  try {
    const { eventId } = await params;
    const body = await readJson(req);
    if (!body) {
      return errorResponse({ status: 400, message: "Body không hợp lệ" });
    }

    const patch: Record<string, string> = {};
    if (body.name !== undefined) patch.name = textOf(body.name);
    if (body.location !== undefined) patch.location = textOf(body.location);
    if (body.description !== undefined) patch.description = textOf(body.description);
    if (body.fromDate !== undefined) patch.from_date = textOf(body.fromDate);
    if (body.toDate !== undefined) patch.to_date = textOf(body.toDate);

    if (
      (patch.from_date && !isDate(patch.from_date)) ||
      (patch.to_date && !isDate(patch.to_date))
    ) {
      return errorResponse({
        status: 400,
        message: "Khoảng ngày không hợp lệ",
        description: "Dùng định dạng YYYY-MM-DD.",
      });
    }

    const { data, error } = await supabaseAdmin()
      .from("events")
      .update(patch)
      .eq("id", eventId)
      .eq("is_deleted", false)
      .select("*")
      .maybeSingle();

    if (error) return dbError(error);
    if (!data) {
      return errorResponse({ status: 404, message: "Không tìm thấy sự kiện" });
    }

    return successResponse({
      message: "Cập nhật sự kiện thành công",
      result: toExhibitionEvent(data),
    });
  } catch (error) {
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      detail: error instanceof Error ? error.message : error,
    });
  }
};

export const DELETE = async (_req: NextRequest, { params }: Context) => {
  try {
    const { eventId } = await params;
    const { data, error } = await supabaseAdmin()
      .from("events")
      .update({ is_deleted: true })
      .eq("id", eventId)
      .eq("is_deleted", false)
      .select("id")
      .maybeSingle();

    if (error) return dbError(error);
    if (!data) {
      return errorResponse({ status: 404, message: "Không tìm thấy sự kiện" });
    }

    return successResponse({ message: "Đã xóa sự kiện" });
  } catch (error) {
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      detail: error instanceof Error ? error.message : error,
    });
  }
};
