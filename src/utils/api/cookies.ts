import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { USE_MOCK_API } from "@/config.global";

export const getAccessToken = async () => {
  if (USE_MOCK_API) return "mock-token";

  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
};

export const setCookie = (
  res: NextResponse,
  name: string,
  value?: string,
  maxAge: number = 60 * 60
) => {
  if (!value) return;

  res.cookies.set(name, value, {
    maxAge,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
};

export const clearCookie = (res: NextResponse, name: string) => {
  res.cookies.set(name, "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
};
