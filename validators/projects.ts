import { z } from "zod";

const dateSchema = z.instanceof(Date);
const booleanSchema = z.boolean();
const numberSchema = z.number();
const stringSchema = z.string();

const projectDataSchema = z.object({
  name: stringSchema,
  description: stringSchema.optional(),
  createdAt: dateSchema.optional(),
  updatedAt: dateSchema.optional(),
  isActive: booleanSchema.optional(),
});

const withOptionalIdSchema = z.object({
  _id: stringSchema.optional(),
});

const withIdSchema = z.object({
  _id: stringSchema,
});

const withOptionalVersionSchema = z.object({
  __v: stringSchema.optional(),
});

export const projectCreateSchema = projectDataSchema
  .merge(withOptionalIdSchema)
  .merge(withOptionalVersionSchema);

export const projectTypeSchema = projectDataSchema
  .merge(withIdSchema)
  .merge(withOptionalVersionSchema);

export const projectExtendedTypeSchema = z.object({
  projects: z.array(projectTypeSchema).optional(),
  pagination: z
    .object({
      count: numberSchema,
      pageCount: numberSchema,
    })
    .optional(),
});

export const projectUpdateSchema = z.object({
  name: stringSchema.optional(),
  description: stringSchema.optional(),
  createdAt: dateSchema.optional(),
  updatedAt: dateSchema.optional(),
  isActive: booleanSchema.optional(),
});

export const projectFilterSchema = z.object({
  name: stringSchema.optional(),
  text: stringSchema.optional(),
  page: numberSchema.optional(),
  per_page: numberSchema.optional(),
  isActive: booleanSchema.optional(),
  sort: z
    .object({
      element: stringSchema,
      sortOrder: z.union([stringSchema, numberSchema]),
    })
    .optional(),
});
