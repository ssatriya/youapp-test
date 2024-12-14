import moment from "moment";

import { ProfileType } from "@/type";
import { authenticatedInstance } from "@/lib/api";
import Profile from "../components/profile/profile";

export const revalidate = true;

export default async function Page() {
  const res = await authenticatedInstance.get("/getProfile");
  const profile: Awaited<ProfileType> = await res.data.data;

  const reformatDate = moment(profile.birthday, "YYYY/MM/DD").format(
    "DD MM YYYY"
  );

  return (
    <Profile
      profile={{
        ...profile,
        birthday: reformatDate,
      }}
    />
  );
}
