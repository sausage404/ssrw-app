import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function zodDefault(object: z.ZodObject<any>) {
  return Object.fromEntries(
    Object.entries(
      object._def.shape()
    ).map(([key, schema]) => {
      if (schema instanceof z.ZodDate) return [key, undefined];
      if (schema instanceof z.ZodBoolean) return [key, undefined];
      if (schema instanceof z.ZodNumber) return [key, 0];
      if (schema instanceof z.ZodString) return [key, ""];
      return [key, undefined];
    })
  )
}