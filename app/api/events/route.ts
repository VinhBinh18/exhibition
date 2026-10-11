import { NextRequest } from "next/server";

import { errorResponse, successResponse } from "@/app/lib/api-response";
import { supabaseAdmin } from "@/lib/supabase/server";
import {
  dbError,
  likeTerm,
  pageOf,
  readJson,
  textOf,
  toExhibitionEvent,
} from "@/lib/supabase/http";

const isDate = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);

export const GET = async (req: NextRequest) => {
  try {
    const { page, limit, from, to } = pageOf(req);
    const name = likeTerm(req.nextUrl.searchParams.get("name") || "");

    let query = supabaseAdmin()
      .from("events")
      .select("*", { count: "exact" })
      .eq("is_deleted", false)
      .order("from_date", { ascending: true })
      .range(from, to);

    if (name) query = query.ilike("name", `%${name}%`);

    const { data, error, count } = await query;
    if (error) return dbError(error);

    const total = count ?? 0;
    return successResponse({
      message: "Lấy danh sách sự kiện thành công",
      result: {
        data: (data ?? []).map((row: any) => toExhibitionEvent(row)),
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      detail: error instanceof Error ? error.message : error,
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await readJson(req);
    if (!body) {
      return errorResponse({ status: 400, message: "Body không hợp lệ" });
    }

    const name = textOf(body.name);
    const location = textOf(body.location);
    const fromDate = textOf(body.fromDate);
    const toDate = textOf(body.toDate);
    const description = textOf(body.description);
    if (!name || !location || !fromDate || !toDate || !description) {
      return errorResponse({
        status: 400,
        message: "Thiếu thông tin sự kiện",
        description: "Cần name, location, fromDate, toDate và description.",
      });
    }

    if (!isDate(fromDate) || !isDate(toDate) || toDate < fromDate) {
      return errorResponse({
        status: 400,
        message: "Khoảng ngày không hợp lệ",
        description:
          "Dùng định dạng YYYY-MM-DD. toDate phải sau hoặc bằng fromDate.",
      });
    }

    const { data, error } = await supabaseAdmin()
      .from("events")
      .insert({
        name,
        location,
        from_date: fromDate,
        to_date: toDate,
        description,
      })
      .select("*")
      .single();

    if (error) return dbError(error);

    return successResponse({
      status: 201,
      message: "Tạo sự kiện thành công",
      result: toExhibitionEvent(data),
    });
  } catch (error) {
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      detail: error instanceof Error ? error.message : error,
    });
  }
};
