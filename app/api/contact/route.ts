import { NextRequest } from "next/server";

import { errorResponse, successResponse } from "@/app/lib/api-response";
import { normalizePhone } from "@/lib/supabase/phone";
import { supabaseAdmin } from "@/lib/supabase/server";
import { dbError, readJson, textOf, toClient } from "@/lib/supabase/http";

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

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
    const eventId = textOf(body.eventId);
    const phone = normalizePhone(body.phone);

    if (!name || !email || !companyName || !description || !eventId || !phone) {
      return errorResponse({
        status: 400,
        message: "Thiếu thông tin đăng ký",
        description:
          "Cần họ tên, email, tên công ty, số điện thoại, nội dung và triển lãm.",
      });
    }

    if (!isEmail(email)) {
      return errorResponse({ status: 400, message: "Email không hợp lệ" });
    }

    const supabase = supabaseAdmin();
    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("id, name")
      .eq("id", eventId)
      .eq("is_deleted", false)
      .maybeSingle();

    if (eventError) return dbError(eventError);
    if (!event) {
      return errorResponse({ status: 400, message: "Không tìm thấy triển lãm" });
    }

    const { data: existing, error: findError } = await supabase
      .from("clients")
      .select("id")
      .eq("phone", phone)
      .maybeSingle();

    if (findError) return dbError(findError);

    const clientPayload = {
      name,
      email,
      company_name: companyName,
      phone,
      description,
      is_deleted: false,
    };

    const clientQuery = existing?.id
      ? supabase
          .from("clients")
          .update(clientPayload)
          .eq("id", existing.id)
          .select("*")
          .single()
      : supabase
          .from("clients")
          .insert(clientPayload)
          .select("*")
          .single();

    const { data: client, error: clientError } = await clientQuery;
    if (clientError) return dbError(clientError);

    const { data: registrations, error: registrationFindError } = await supabase
      .from("event_registrations")
      .select("id, is_deleted")
      .eq("client_id", client.id)
      .eq("event_id", eventId);

    if (registrationFindError) return dbError(registrationFindError);

    const active = (registrations ?? []).find((item) => !item.is_deleted);
    if (active) {
      return errorResponse({
        status: 409,
        message: "Số điện thoại này đã đăng ký triển lãm đã chọn",
      });
    }

    const deleted = (registrations ?? []).find((item) => item.is_deleted);
    const registrationQuery = deleted
      ? supabase
          .from("event_registrations")
          .update({
            is_deleted: false,
          })
          .eq("id", deleted.id)
          .select("id")
          .single()
      : supabase
          .from("event_registrations")
          .insert({
            client_id: client.id,
            event_id: eventId,
          })
          .select("id")
          .single();

    const { data: registration, error: registrationError } = await registrationQuery;
    if (registrationError) return dbError(registrationError);

    return successResponse({
      status: 201,
      message: "Đăng ký triển lãm thành công",
      description: `Đã ghi nhận đăng ký ${event.name}.`,
      result: {
        client: toClient(client),
        eventId,
        registrationId: registration.id,
      },
    });
  } catch (error) {
    return errorResponse({
      message: "Đã có lỗi xảy ra",
      detail: error instanceof Error ? error.message : error,
    });
  }
};
