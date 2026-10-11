import { fetchFromApi } from "@/app/lib/fetch-from-api";
import { getAccessToken } from "@/app/lib/cookies";
import { successResponse, errorResponse } from "@/app/lib/api-response";

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return errorResponse({ status: 401, message: "Missing token" });
    }

    const result = await fetchFromApi("/users/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return successResponse({
      message: "Lấy thông tin người dùng thành công",
      result,
    });
  } catch (err: any) {
    return errorResponse({
      status: err.status || 500,
      message: "Đã có lỗi xảy ra",
      description: "Vui lòng thử lại sau.",
      detail: err.detail,
    });
  }
}
