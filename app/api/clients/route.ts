import { NextRequest } from "next/server";

import { errorResponse, successResponse } from "@/app/lib/api-response";
import { normalizePhone } from "@/lib/supabase/phone";
import { supabaseAdmin } from "@/lib/supabase/server";
import {
  dbError,
  likeTerm,
  pageOf,
  readJson,
  textOf,
  toClient,
} from "@/lib/supabase/http";

export const GET = async (req: NextRequest) => {
  try {
    const { page, limit, from, to } = pageOf(req);
    const name = likeTerm(req.nextUrl.searchParams.get("name") || "");

    let query = supabaseAdmin()
      .from("clients")
      .select("*", { count: "exact" })
      .eq("is_deleted", false)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (name) query = query.ilike("name", `%${name}%`);

    const { data, error, count } = await query;
    if (error) return dbError(error);

    const total = count ?? 0;
    return successResponse({
      message: "Lấy danh sách khách hàng thành công",
      result: {
        data: (data ?? []).map((row) => toClient(row)),
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
    const email = textOf(body.email);
    const companyName = textOf(body.companyName);
    const description = textOf(body.description);
    const phone = normalizePhone(body.phone);
    if (!name || !email || !companyName || !description || !phone) {
      return errorResponse({
        status: 400,
        message: "Thiếu thông tin khách hàng",
        description: "Cần name, email, companyName, phone và description.",
      });
    }

    const { data, error } = await supabaseAdmin()
      .from("clients")
      .insert({
        name,
        email,
        company_name: companyName,
        phone,
        description,
      })
      .select("*")
      .single();

    if (error) return dbError(error);

    return successResponse({
      status: 201,
      message: "Tạo khách hàng thành công",
      result: toClient(data),
    });
  } catch (error) {
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      detail: error instanceof Error ? error.message : error,
    });
  }
};
