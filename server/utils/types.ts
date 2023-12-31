import { z } from "zod";

export const userInputType = z.object({
  name: z.string(),
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z
    .string()
    .length(5, { message: "Password must consists atleast 5 characters" }),
});

export const todoInputType = z.object({
  title: z.string(),
  description: z.string(),
  done: z.boolean(),
});

export const loginInputType = z.object({
  email: z.string().email({ message: "Invalid Email Address" }),

  password: z
    .string()
    .length(5, { message: "Password must consists atleast 5 characters" }),
});
