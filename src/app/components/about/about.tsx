import React, {
  Dispatch,
  ReactEventHandler,
  SetStateAction,
  useRef,
  useState,
} from "react";
import GoldenText from "../golden-text";
import Editor from "./editor";
import Card from "../card";
import { ProfileType } from "@/type";

type Props = {
  isAboutOpen: boolean;
  setIsAboutOpen: Dispatch<SetStateAction<boolean>>;
  profile: ProfileType;
};

const About = ({ isAboutOpen, setIsAboutOpen, profile }: Props) => {
  return (
    <Card>
      <Card.Header>
        <span className="font-bold text-xs">About</span>
        <button form="about-form">
          <GoldenText>
            <span className="text-xs">Save & Update</span>
          </GoldenText>
        </button>
      </Card.Header>
      <Editor profile={profile} setIsAboutOpen={setIsAboutOpen} />
    </Card>
  );
};

export default About;
