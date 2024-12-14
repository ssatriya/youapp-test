"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Layout from "../layout";
import About from "../about/about";
import Card from "../card";
import Pencil from "../icons/pencil";
import AppbarWrapper from "../appbar-wrapper";
import BackButton from "../back-button";
import MoreButton from "../more-button";
import { ProfileType } from "@/type";
import { calculateAge, getImageFromLocalStorage } from "@/lib";
import AboutSummary from "../about/about-summary";
import InterestsPill from "../interest-pills";

type Props = {
  profile: ProfileType;
};

const Profile = ({ profile }: Props) => {
  const router = useRouter();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userPhoto, setUserPhoto] = useState("");
  const [localData, setLocalData] = useState<
    | (ProfileType & {
        gender: "0" | "1";
        height: { value: string; metric: string };
      })
    | null
  >(null);

  useEffect(() => {
    const localImage = getImageFromLocalStorage();
    if (localImage) {
      setUserPhoto(localImage);
    }
    const userData = localStorage.getItem("userData");
    if (userData) {
      setLocalData(JSON.parse(userData));
      setIsLoading(false);
    }
  }, []);

  return (
    <Layout backgroundColor={0} appBar={<AppBar username={profile.username} />}>
      <div className="w-full mt-7 flex flex-col gap-6">
        {userPhoto ? (
          <div className="relative bg-[#162329] overflow-clip rounded-2xl h-[190px] w-full">
            <img
              src={userPhoto}
              alt="user-photo"
              className="h-[190px] w-full object-cover"
            />
            <div className="absolute bottom-3 left-3 flex flex-col space-y-1">
              <span className="font-bold text-[17px]">
                @{profile.username}, {calculateAge(profile.birthday)}
              </span>
              <span className="text-[13px]">
                {localData?.gender === "1" ? "Male" : "Female"}
              </span>
              <div className="flex gap-2">
                <div className="text-sm py-2 px-3 bg-white/10 backdrop-blur rounded-full">
                  {profile.horoscope}
                </div>
                <div className="text-sm py-2 px-3 bg-white/10 backdrop-blur rounded-full">
                  {profile.zodiac}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative bg-[#162329] rounded-2xl h-[190px] w-full">
            <span className="font-bold text-[17px] absolute bottom-3 left-3">
              @{profile.username},
            </span>
          </div>
        )}
        {isAboutOpen ? (
          <About
            isAboutOpen={isAboutOpen}
            setIsAboutOpen={setIsAboutOpen}
            profile={profile}
          />
        ) : (
          <Card>
            <Card.Header>
              <span className="font-bold text-xs">About</span>
              <button onClick={() => setIsAboutOpen((prev) => !prev)}>
                <Pencil />
              </button>
            </Card.Header>
            {profile.birthday ? (
              isLoading ? (
                <div className="h-auto py-4 flex items-center justify-center">
                  <div className="loader" />
                </div>
              ) : (
                <AboutSummary
                  birthday={`${profile.birthday.replaceAll(
                    " ",
                    " / "
                  )} (Age ${calculateAge(profile.birthday)})`}
                  horoscope={profile.horoscope}
                  zodiac={profile.zodiac}
                  height={`${localData?.height.value} ${localData?.height.metric}`}
                  weight={profile.weight.toString()}
                />
              )
            ) : (
              <span className="text-sm text-white/50 mt-5">
                Add in your your to help others know you better
              </span>
            )}
          </Card>
        )}
        <Card>
          <Card.Header>
            <span className="font-bold text-xs">Interest</span>
            <button onClick={() => router.push("/profile/interest")}>
              <Pencil />
            </button>
          </Card.Header>
          {profile.interests.length > 0 ? (
            <InterestsPill interests={profile.interests} />
          ) : (
            <span className="text-sm text-white/50 mt-5">
              Add in your interest to find a better match
            </span>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;

const AppBar = ({ username }: { username: string }) => {
  return (
    <AppbarWrapper classNames="flex justify-between items-center">
      <BackButton isActive={false} />
      <span className="font-semibold text-[17px]">@{username}</span>
      <MoreButton />
    </AppbarWrapper>
  );
};
