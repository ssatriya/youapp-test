import { authenticatedInstance } from "@/lib/api";

export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as string[];

    if (body.length === 0) {
      return new Response("invalid payload", { status: 4000 });
    }

    const res = await authenticatedInstance.put("/updateProfile", {
      interests: body,
    });

    return new Response(res.data.message, { status: 201 });
  } catch (error) {
    return new Response("internal server error", { status: 500 });
  }
}
