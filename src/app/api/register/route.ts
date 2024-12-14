import { unAuthenticatedInstance } from "@/lib/api";
import { RegisterSchema } from "@/lib/zod-schema";
import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payload = RegisterSchema.safeParse(body);

    if (!payload.success) {
      return new Response("invalid payload", { status: 400 });
    }

    const { email, username, password } = payload.data;

    const res = await unAuthenticatedInstance.post("/register", {
      email,
      username,
      password,
    });

    return new Response(res.data, { status: 201 });
  } catch (error) {
    return new Response("internal server error", { status: 500 });
  }
}
