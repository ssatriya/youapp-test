import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginPayload = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export type RegisterPayload = z.infer<typeof RegisterSchema>;

export const AboutSchema = z.object({
  name: z.string(),
  birthday: z.string(),
  gender: z.enum(["1", "0"]),
  horoscope: z.string(),
  zodiac: z.string(),
  height: z.string(),
  weight: z.string(),
});

export type AboutPayload = z.infer<typeof AboutSchema>;

export const UserProfile = z.object({
  name: z.string(),
  birthday: z.string(),
  height: z.string(),
  weight: z.string(),
});

export type UserProfilePayload = z.infer<typeof UserProfile>;
