"use client";

import { useRouter } from "next/navigation";
import Button from "./components/button";

export default function Home() {
  const router = useRouter();

  return (
    <div className="">
      Main page
      <Button onClick={() => router.push("/login")}>Login</Button>
    </div>
  );
}
