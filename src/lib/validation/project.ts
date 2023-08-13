import * as z from "zod";
export const projectSchema = z.object({
  name: z.string().min(1, {
    message: "Must be at least 1 character",
  }),
  description: z.string().max(50).optional(),
  isActive: z.boolean(),
});

export const projectUpdateSchema = z.object({
  description: z.string().max(50).optional(),
  isActive: z.boolean(),
});


