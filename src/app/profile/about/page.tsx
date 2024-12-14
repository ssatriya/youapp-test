"use client";

import Editor from "@/app/components/about/editor";
import AppbarWrapper from "@/app/components/appbar-wrapper";
import BackButton from "@/app/components/back-button";
import Card from "@/app/components/card";
import GoldenText from "@/app/components/golden-text";
import PlusIcon from "@/app/components/icons/plus-icon";
import Layout from "@/app/components/layout";

export default function Page() {
  return (
    <Layout backgroundColor={0} appBar={<AppBar />}>
      <div className="w-full mt-7 flex flex-col gap-6">
        <div className="relative bg-[#162329] rounded-2xl h-[190px] w-full">
          <span className="font-bold text-[17px] absolute bottom-3 left-3">
            @johndoe
          </span>
        </div>
        <Card>
          <Card.Header>
            <span className="font-bold text-xs">About</span>
            <button>
              <GoldenText>
                <span className="text-xs">Save & Update</span>
              </GoldenText>
            </button>
          </Card.Header>
          <div className="flex gap-3 items-center my-8">
            <input type="file" className="hidden" />
            <button
              aria-label="add image"
              className="h-[57px] w-[57px] rounded-[17px] bg-white/10 flex items-center justify-center"
            >
              <PlusIcon />
            </button>
            <span className="text-xs">Add image</span>
          </div>
          <Editor />
        </Card>
      </div>
    </Layout>
  );
}

const AppBar = () => {
  return (
    <AppbarWrapper classNames="flex relative items-center">
      <BackButton />
      <div className="absolute right-1/2 translate-x-1/2">
        <span className="font-semibold text-[17px]">@johndoe</span>
      </div>
    </AppbarWrapper>
  );
};
