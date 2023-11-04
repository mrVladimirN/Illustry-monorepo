import * as z from "zod";

export enum visualizationTypesEnum {
  WORLD_CLOUD = "word-cloud",
  FORCE_DIRECTED_GRAPH = "force-directed-graph",
  SANKEY = "sankey",
  CALENDAR = "calendar",
  HIERARCHICAL_EDGE_BUNDLING = "hierarchical-edge-bundling",
  MATRIX = "matrix",
  LINE_CHART = "line-chart",
  BAR_CHART = "bar-chart",
  PIE_CHART = "pie-chart",
  SCATTER = "scatter",
  TREEMAP = "treemap",
  SUNBURST = "sunburst",
  FUNNEL = "funnel",
  TIMELINE = "timeline",
}

const jsonSchema = z.object({
  fileType: z.literal("JSON"),
  files: z
  .unknown()
  .refine((val) => {
    if (!Array.isArray(val)) return false;
    if (val.some((file) => !(file instanceof File))) return false;
    return true;
  }, "Must be an array of File")
  .nullable()
  .default(null),
});

const exelSchema = z.object({
  fileType: z.enum(["EXEL", "JSON"], {
    required_error: "Must be a valid type",
  }),
  files: z
    .unknown()
    .refine((val) => {
      if (!Array.isArray(val)) return false;
      if (val.some((file) => !(file instanceof File))) return false;
      return true;
    }, "Must be an array of File")
    .nullable()
    .default(null),
  name: z
    .string()
    .min(1, {
      message: "Must be at least 1 character",
    })
    .refine((value) => value !== undefined, {
      message: "Name is required", // Custom error message for the required field
    })
    .optional(),
  includeHeaders: z.boolean(),
  type: z.union([
    z.literal(visualizationTypesEnum.WORLD_CLOUD),
    z.literal(visualizationTypesEnum.FORCE_DIRECTED_GRAPH),
    z.literal(visualizationTypesEnum.SANKEY),
    z.literal(visualizationTypesEnum.CALENDAR),
    z.literal(visualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING),
    z.literal(visualizationTypesEnum.MATRIX),
    z.literal(visualizationTypesEnum.LINE_CHART),
    z.literal(visualizationTypesEnum.BAR_CHART),
    z.literal(visualizationTypesEnum.PIE_CHART),
    z.literal(visualizationTypesEnum.SCATTER),
    z.literal(visualizationTypesEnum.TREEMAP),
    z.literal(visualizationTypesEnum.SUNBURST),
    z.literal(visualizationTypesEnum.FUNNEL),
    z.literal(visualizationTypesEnum.TIMELINE),
  ]),
  tags: z.string().optional(),
  mapping: z.any(),
  description: z.string().max(50).optional(),
});
export const visualizationSchema = z.union([jsonSchema, exelSchema]);
