import axios from "axios";
import { cookies } from "next/headers";

const BASE_URL = "https://techtest.youapp.ai/api";

export const getCookie = async (name: string): Promise<string> => {
  return cookies().get(name)?.value ?? "";
};

export const authenticatedInstance = axios.create({
  baseURL: BASE_URL,
});

export const unAuthenticatedInstance = axios.create({
  baseURL: BASE_URL,
});

authenticatedInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getCookie("accessToken");
    if (accessToken) {
      config.headers["x-access-token"] = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
