import { authenticatedInstance } from "@/lib/api";
import { UserProfile } from "@/lib/zod-schema";
import moment from "moment";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payload = UserProfile.safeParse(body);

    if (!payload.success) {
      return new Response("invalid payload", { status: 400 });
    }

    const { name, birthday, height, weight } = payload.data;

    const res = await authenticatedInstance.post("/createProfile", {
      name,
      birthday: moment(birthday, "DD MM YYYY").format("YYYY/MM/DD"),
      height: Number(height),
      weight: Number(weight),
    });
    return new Response(res.data.message, { status: 201 });
  } catch (error) {
    return new Response("internal server error", { status: 500 });
  }
}
