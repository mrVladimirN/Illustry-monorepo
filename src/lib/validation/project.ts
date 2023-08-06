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

export const visualizationSchema = z.object({
  fileType: z.enum(["CSV", "JSON"], {
    required_error: "Must be a valid type",
  }),
  files: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false;
      if (val.some((file) => !(file instanceof File))) return false;
      return true;
    }, "Must be an array of File")
    .optional()
    .nullable()
    .default(null),
});
