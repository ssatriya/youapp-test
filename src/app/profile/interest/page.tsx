"use client";

import AppbarWrapper from "@/app/components/appbar-wrapper";
import BackButton from "@/app/components/back-button";
import BlueText from "@/app/components/blue-text";
import GoldenText from "@/app/components/golden-text";
import InterestField from "@/app/components/interest-field";
import Layout from "@/app/components/layout";
import useInterest from "@/app/hooks/useInterest";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { interests, handleAddInterest, handleRemoveInterest } = useInterest();

  const onSave = async () => {
    if (interests.length === 0) return;

    const res = await fetch("/api/update-interests", {
      method: "PUT",
      body: JSON.stringify(interests),
    });

    if (res.ok) {
      router.replace("/profile");
    }
  };

  return (
    <Layout backgroundColor={1} appBar={<AppBar onSave={onSave} />}>
      <div className="w-full mt-[72px]">
        <div className="font-bold mb-[35px] px-3">
          <GoldenText classNames=" text-sm">
            Tell everyone about yourself
          </GoldenText>
          <h3 className="text-xl">What interest you?</h3>
        </div>
        <InterestField
          interests={interests}
          addInterest={handleAddInterest}
          removeInterest={handleRemoveInterest}
        />
      </div>
    </Layout>
  );
}

const AppBar = ({ onSave }: { onSave: () => void }) => {
  return (
    <AppbarWrapper classNames="flex justify-between items-center">
      <BackButton />
      <button onClick={onSave}>
        <BlueText classNames="font-semibold text-sm">Save</BlueText>
      </button>
    </AppbarWrapper>
  );
};
