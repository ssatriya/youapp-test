"use client";

import clsx from "clsx";
import Link from "next/link";
import { useForm } from "react-hook-form";

import BackButton from "./back-button";
import Button from "./button";
import Input from "./input";
import Layout from "./layout";
import PasswordInput from "./password-input";
import GoldenText from "./golden-text";
import { RegisterPayload } from "@/lib/zod-schema";

const Register = () => {
  const { register, handleSubmit, watch, formState } = useForm<RegisterPayload>(
    {
      mode: "onChange",
      defaultValues: {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
    }
  );

  const { dirtyFields } = formState;

  const email = watch("email");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const isPasswordMatch = password === confirmPassword;

  const isFilled =
    email.length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    isPasswordMatch;

  const onSubmit = async (values: RegisterPayload) => {
    await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(values),
    });
  };

  return (
    <Layout backgroundColor={1} appBar={<BackButton />}>
      <div className="flex flex-col px-3 w-full items-center gap-[52px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          <h3 className="font-bold text-2xl mt-[60px] px-4">Register</h3>
          <div className="flex flex-col gap-[15px]">
            <Input
              type="text"
              label="Enter email"
              placeholder="Enter Email"
              {...register("email")}
            />
            <Input
              type="text"
              label="Enter username"
              placeholder="Create Username"
              {...register("username")}
            />
            <PasswordInput
              label="create password"
              placeholder="Create Password"
              password={password}
              {...register("password")}
            />
            <div className="">
              <PasswordInput
                label="confirm password"
                placeholder="Confirm Password"
                password={confirmPassword}
                {...register("confirmPassword")}
              />
              <span
                className={clsx(
                  "text-xs text-red-400",
                  dirtyFields.confirmPassword && !isPasswordMatch
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                )}
              >
                Password does not match
              </span>
            </div>
          </div>
          <Button disabled={!isFilled} type="submit">
            Register
          </Button>
        </form>
        <span className="text-xs">
          Have an account?{" "}
          <Link
            href="/login"
            className="underline underline-offset-2 decoration-[#94783E]"
          >
            <GoldenText>Login here</GoldenText>
          </Link>
        </span>
      </div>
    </Layout>
  );
};

export default Register;
