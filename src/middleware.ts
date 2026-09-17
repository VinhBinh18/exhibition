import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { USE_MOCK_API, USER_ROLE } from "./config.global";

const ADMIN_PATH = /^\/admin(\/|$)/;
const PROFILE_PATH = /^\/my-profile(\/|$)/;
const SETTINGS_PATH = /^\/settings(\/|$)/;

const SETTINGS_ROLE = USER_ROLE.CUSTOMER;

const decodeJwtPayload = (token: string): { role?: string } | null => {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(normalized));
  } catch {
    return null;
  }
};

export const middleware = (req: NextRequest) => {
  if (USE_MOCK_API) {
    return NextResponse.next();
  }

  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken")?.value;

  if (ADMIN_PATH.test(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    const decoded = decodeJwtPayload(token);
    if (!decoded || decoded.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  if (PROFILE_PATH.test(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  if (SETTINGS_PATH.test(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    const decoded = decodeJwtPayload(token);
    if (!decoded || decoded.role !== SETTINGS_ROLE) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/admin/:path*", "/my-profile", "/settings/:path*"],
};
