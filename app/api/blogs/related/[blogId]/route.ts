import { NextRequest } from "next/server";

import { fetchFromApi } from "@/app/lib/fetch-from-api";
import { successResponse, errorResponse } from "@/app/lib/api-response";

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ blogId: string }> }
) => {
  try {
    const blogId = (await params).blogId;

    const result = await fetchFromApi(`/blogs/related/${blogId}`, {
      method: "GET",
    });

    return successResponse({
      message: "Lấy bài viết liên quan thành công",
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
};
