import { LoginSchema } from "@/lib/zod-schema";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { unAuthenticatedInstance } from "@/lib/api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payload = LoginSchema.safeParse(body);

    if (!payload.success) {
      return new Response("invalid payload", { status: 400 });
    }

    const { username, password } = payload.data;

    const res = await unAuthenticatedInstance.post("/login", {
      username,
      email: username,
      password,
    });

    cookies().set("accessToken", res.data.access_token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
      sameSite: "strict",
    });

    return new Response(res.data.message, { status: 200 });
  } catch (error) {
    return new Response("internal server error", { status: 500 });
  }
}
