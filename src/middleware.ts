import { NextRequest, NextResponse } from "next/server";

import { publicRoutes } from "./routes";
import { authenticatedInstance } from "./lib/api";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const isValid = await validateAccessToken(accessToken);
  if (!isValid) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

const validateAccessToken = async (token: string): Promise<boolean> => {
  try {
    // const response = await fetch("https://techtest.youapp.ai/api/getProfil", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "x-access-token": token,
    //   },
    // });
    const response = await authenticatedInstance.get("/getProfile");
    return response.statusText === "OK";
  } catch (error) {
    return false;
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
