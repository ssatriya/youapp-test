import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import DateInput from "./date-input";
import HeightInput from "./height-input";
import HoroscopeInput from "./horoscope-input";
import SelectInput from "./select-input";
import TextInput from "./text-input";
import WeightInput from "./weight-input";
import ZodiacInput from "./zodiac-input";
import { useHoroscope, useShio } from "@/app/hooks/useSign";
import { useForm } from "react-hook-form";
import { AboutPayload, UserProfilePayload } from "@/lib/zod-schema";
import { DevTool } from "@hookform/devtools";
import PlusIcon from "../icons/plus-icon";
import {
  convertImageToBase64,
  getImageFromLocalStorage,
  saveImageToLocalStorage,
} from "@/lib";
import { ProfileType } from "@/type";
import { revalidatePath } from "next/cache";

type Props = {
  profile: ProfileType;
  setIsAboutOpen: Dispatch<SetStateAction<boolean>>;
};

const Editor = ({ profile, setIsAboutOpen }: Props) => {
  const [metric, setMetric] = useState<"cm" | "in">("cm");
  const inputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onImageSelect = () => {
    if (inputRef) {
      inputRef.current?.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await convertImageToBase64(file);
      saveImageToLocalStorage(base64);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const localImage = getImageFromLocalStorage();
    if (localImage) {
      setImagePreview(localImage);
    }
  }, []);

  const { register, handleSubmit, control, watch, setValue } =
    useForm<AboutPayload>({
      defaultValues: {
        name: profile.name,
      },
    });

  const submitHandler = async (values: AboutPayload) => {
    const data = {
      ...values,
      height: {
        value: values.height,
        metric: metric,
      },
    };
    localStorage.setItem("userData", JSON.stringify(data));

    const dataToBackend: UserProfilePayload = {
      name: values.name,
      birthday: values.birthday,
      height: values.height,
      weight: values.weight,
    };

    if (profile.birthday) {
      const res = await fetch("/api/update-profile", {
        method: "PUT",
        body: JSON.stringify(dataToBackend),
      });

      if (res.ok) {
        setIsAboutOpen(false);
      }
    } else {
      const res = await fetch("/api/create-profile", {
        method: "POST",
        body: JSON.stringify(dataToBackend),
      });
      if (res.ok) {
        setIsAboutOpen(false);
      }
    }
  };

  const birthday = watch("birthday");
  const zodiac = useShio(birthday);
  const horoscope = useHoroscope(birthday);

  useEffect(() => {
    if (horoscope) {
      setValue("horoscope", horoscope);
    }
    if (zodiac) {
      setValue("zodiac", zodiac);
    }
  }, [zodiac, horoscope]);

  return (
    <form
      id="about-form"
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-3 w-full"
    >
      <div className="flex gap-3 items-center my-8">
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button
          aria-label="add image"
          className="h-[57px] w-[57px] rounded-[17px] bg-white/10 flex items-center justify-center"
          onClick={onImageSelect}
        >
          {imagePreview ? (
            <img
              ref={imageRef}
              src={imagePreview}
              alt="Preview"
              className="h-[57px] w-[57px] rounded-[17px] object-cover"
            />
          ) : (
            <PlusIcon />
          )}
        </button>
        <span className="text-xs">Add image</span>
      </div>
      <TextInput
        label="name"
        textLabel="Display name:"
        placeholder="Enter name"
        {...register("name")}
      />
      {/* TODO: This select input not work for first time first option */}
      <SelectInput
        label="gender"
        textLabel="Gender:"
        placeholder="Select gender"
        options={[
          { label: "Male", value: "1" },
          { label: "Female", value: "0" },
        ]}
        {...register("gender")}
      />
      <DateInput
        label="birthday"
        placeholder="DD MM YYYY"
        textLabel="Birthday:"
        value={profile.birthday ? profile.birthday.replaceAll("/", " ") : ""}
        {...register("birthday")}
      />
      <HoroscopeInput
        label="horoscope"
        placeholder="--"
        textLabel="Horoscope:"
        value={horoscope || profile.horoscope || ""}
        {...register("horoscope")}
      />
      <ZodiacInput
        label="zodiac"
        placeholder="--"
        textLabel="Zodiac:"
        value={zodiac || profile.zodiac || ""}
        {...register("zodiac")}
      />
      <HeightInput
        label="height"
        placeholder="Add height"
        textLabel="Height:"
        value={profile.height ? profile.height.toString() : ""}
        {...register("height")}
        metric={metric}
        setMetric={setMetric}
      />
      <WeightInput
        label="weight"
        placeholder="Add weight"
        textLabel="Weight:"
        value={profile.weight ? profile.weight.toString() : ""}
        {...register("weight")}
      />
      <DevTool control={control} />
    </form>
  );
};

export default Editor;
