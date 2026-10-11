import { NextRequest } from "next/server";

import { errorResponse, successResponse } from "@/app/lib/api-response";
import { normalizePhone } from "@/lib/supabase/phone";
import { supabaseAdmin } from "@/lib/supabase/server";
import {
  dbError,
  readJson,
  textOf,
  toClient,
} from "@/lib/supabase/http";

type Context = { params: Promise<{ clientId: string }> };

export const GET = async (_req: NextRequest, { params }: Context) => {
  try {
    const { clientId } = await params;
    const { data, error } = await supabaseAdmin()
      .from("clients")
      .select("*")
      .eq("id", clientId)
      .eq("is_deleted", false)
      .maybeSingle();

    if (error) return dbError(error);
    if (!data) {
      return errorResponse({ status: 404, message: "Không tìm thấy khách hàng" });
    }

    return successResponse({
      message: "Lấy khách hàng thành công",
      result: toClient(data),
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
    const { clientId } = await params;
    const body = await readJson(req);
    if (!body) {
      return errorResponse({ status: 400, message: "Body không hợp lệ" });
    }

    const patch: Record<string, string> = {};
    if (body.name !== undefined) patch.name = textOf(body.name);
    if (body.email !== undefined) patch.email = textOf(body.email);
    if (body.companyName !== undefined) patch.company_name = textOf(body.companyName);
    if (body.description !== undefined) patch.description = textOf(body.description);
    if (body.phone !== undefined) {
      const phone = normalizePhone(body.phone);
      if (!phone) {
        return errorResponse({
          status: 400,
          message: "Số điện thoại không hợp lệ",
          description: "Nhập 10 số, bắt đầu bằng 0.",
        });
      }
      patch.phone = phone;
    }

    const { data, error } = await supabaseAdmin()
      .from("clients")
      .update(patch)
      .eq("id", clientId)
      .eq("is_deleted", false)
      .select("*")
      .maybeSingle();

    if (error) return dbError(error);
    if (!data) {
      return errorResponse({ status: 404, message: "Không tìm thấy khách hàng" });
    }

    return successResponse({
      message: "Cập nhật khách hàng thành công",
      result: toClient(data),
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
    const { clientId } = await params;
    const { data, error } = await supabaseAdmin()
      .from("clients")
      .update({ is_deleted: true })
      .eq("id", clientId)
      .eq("is_deleted", false)
      .select("id")
      .maybeSingle();

    if (error) return dbError(error);
    if (!data) {
      return errorResponse({ status: 404, message: "Không tìm thấy khách hàng" });
    }

    return successResponse({ message: "Đã xóa khách hàng" });
  } catch (error) {
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      detail: error instanceof Error ? error.message : error,
    });
  }
};
