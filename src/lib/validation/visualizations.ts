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
const commonFileSchema = z.object({
  fullDetails: z.boolean().default(false),
  fileType: z.string(),
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

export const jsonSchema = commonFileSchema.extend({
  fileType: z.literal("JSON"),
  name: z
    .string()
    // .min(1, {
    //   message: "Must be at least 1 character",
    // })
    .optional(),
  type: z
    .union([
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
    ])
    .optional(),
  tags: z.string().optional(),
  description: z.string().max(50).optional(),
});

export const excelSchema = commonFileSchema.extend({
  fileType: z.literal("EXCEL"),
  name: z
    .string()
    // .min(1, {
    //   message: "Must be at least 1 character",
    // })
    .optional(),
  type: z
    .union([
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
    ])
    .optional(),
  tags: z.string().optional(),
  description: z.string().max(50).optional(),
  includeHeaders: z.boolean().default(false),
  sheets: z.string().default("1"),
  mapping: z.any(),
});
export const csvSchema = commonFileSchema.extend({
  name: z
    .string()
    // .min(1, {
    //   message: "Must be at least 1 character",
    // })
    .optional(),
  type: z
    .union([
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
    ])
    .optional(),
  tags: z.string().optional(),
  description: z.string().max(50).optional(),
  includeHeaders: z.boolean().default(false),
  fileType: z.literal("CSV"),
  separator: z.string().default(","),
  mapping: z.any(),
});
export const visualizationSchema = z.union([
  jsonSchema,
  excelSchema,
  csvSchema,
]);
