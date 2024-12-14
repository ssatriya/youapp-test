"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

import BackButton from "./back-button";
import Input from "../components/input";
import Button from "../components/button";
import Layout from "../components/layout";
import { LoginPayload } from "@/lib/zod-schema";
import GoldenText from "../components/golden-text";
import PasswordInput from "../components/password-input";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const { register, handleSubmit, watch } = useForm<LoginPayload>({
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginPayload) => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (res.ok) {
      return router.replace("/profile");
    }
  };

  const email = watch("username");
  const password = watch("password");

  const isFilled = email.length > 0 && password.length > 0;

  return (
    <Layout backgroundColor={1} appBar={<BackButton />}>
      <div className="flex flex-col px-3 w-full items-center gap-[52px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          <h3 className="font-bold text-2xl mt-[60px] px-4">Login</h3>
          <div className="flex flex-col gap-[15px]">
            <Input
              type="text"
              label="Enter email"
              placeholder="Enter Username/Email"
              {...register("username")}
            />
            <PasswordInput
              label="enter password"
              placeholder="Enter Password"
              password={password}
              {...register("password")}
            />
          </div>
          <Button disabled={!isFilled} type="submit">
            Login
          </Button>
        </form>
        <span className="text-xs">
          No account?{" "}
          <Link
            href="/register"
            className="underline underline-offset-2 decoration-[#94783E]"
          >
            <GoldenText>Register here</GoldenText>
          </Link>
        </span>
      </div>
    </Layout>
  );
};

export default Login;
