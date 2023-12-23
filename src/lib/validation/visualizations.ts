/* eslint-disable no-unused-vars */
import * as z from 'zod';

// eslint-disable-next-line no-shadow
export enum visualizationTypesEnum {
  WORD_CLOUD = 'word-cloud',
  FORCE_DIRECTED_GRAPH = 'force-directed-graph',
  SANKEY = 'sankey',
  CALENDAR = 'calendar',
  HIERARCHICAL_EDGE_BUNDLING = 'hierarchical-edge-bundling',
  MATRIX = 'matrix',
  LINE_CHART = 'line-chart',
  BAR_CHART = 'bar-chart',
  PIE_CHART = 'pie-chart',
  SCATTER = 'scatter',
  TREEMAP = 'treemap',
  SUNBURST = 'sunburst',
  FUNNEL = 'funnel',
  TIMELINE = 'timeline',
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
    }, 'Must be an array of File')
    .nullable()
    .default(null)
});

export const jsonSchema = commonFileSchema.extend({
  fileType: z.literal('JSON'),
  name: z
    .string()
    // .min(1, {
    //   message: "Must be at least 1 character",
    // })
    .optional(),
  type: z
    .union([
      z.literal(visualizationTypesEnum.WORD_CLOUD),
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
      z.literal(visualizationTypesEnum.TIMELINE)
    ])
    .optional(),
  tags: z.string().optional(),
  description: z.string().max(50).optional()
});
export const xmlSchema = commonFileSchema.extend({
  fileType: z.literal('XML'),
  name: z
    .string()
    // .min(1, {
    //   message: "Must be at least 1 character",
    // })
    .optional(),
  type: z
    .union([
      z.literal(visualizationTypesEnum.WORD_CLOUD),
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
      z.literal(visualizationTypesEnum.TIMELINE)
    ])
    .optional(),
  tags: z.string().optional(),
  description: z.string().max(50).optional()
});
export const excelSchema = commonFileSchema.extend({
  fileType: z.literal('EXCEL'),
  name: z
    .string()
    // .min(1, {
    //   message: "Must be at least 1 character",
    // })
    .optional(),
  type: z
    .union([
      z.literal(visualizationTypesEnum.WORD_CLOUD),
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
      z.literal(visualizationTypesEnum.TIMELINE)
    ])
    .optional(),
  tags: z.string().optional(),
  description: z.string().max(50).optional(),
  includeHeaders: z.boolean().default(false),
  sheets: z.string().default('1'),
  mapping: z.any()
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
      z.literal(visualizationTypesEnum.WORD_CLOUD),
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
      z.literal(visualizationTypesEnum.TIMELINE)
    ])
    .optional(),
  tags: z.string().optional(),
  description: z.string().max(50).optional(),
  includeHeaders: z.boolean().default(false),
  fileType: z.literal('CSV'),
  separator: z.string().default(','),
  mapping: z.any()
});
export const visualizationSchema = z.union([
  jsonSchema,
  excelSchema,
  csvSchema,
  xmlSchema
]);

const numberSchema = z.number();
const stringSchema = z.string();

// Word-cloud
const wordTypeSchema = z.object({
  name: stringSchema,
  value: numberSchema,
  properties: z.union([z.any(), z.array(z.any()), z.string()]).optional()
});

export const wordCloudDataSchema = z.object({
  words: z.array(wordTypeSchema)
});

// Calendar
const calendarTypeSchema = z.object({
  date: stringSchema,
  value: numberSchema,
  category: stringSchema,
  properties: z.union([z.any(), z.array(z.any()), z.string()]).optional()
});

export const calendarDataSchema = z.object({
  calendar: z.array(calendarTypeSchema)
});

// Node-Link (force-directed-graph, sankey, hierarchical-edge-bundling)
const labelsSchema = z.object({
  name: stringSchema,
  value: numberSchema,
  properties: z.union([z.any(), z.array(z.any()), z.string()]).optional()
});
const nodeSchema = z.object({
  name: stringSchema,
  category: stringSchema,
  labels: z.array(labelsSchema).optional(),
  properties: z.union([z.any(), z.array(z.any()), z.string()]).optional()
});

const linkSchema = z.object({
  source: stringSchema,
  target: stringSchema,
  value: numberSchema,
  properties: z.union([z.any(), z.array(z.any()), z.string()]).optional()
});

export const nodeLinkDataSchema = z.object({
  nodes: z.array(nodeSchema),
  links: z.array(linkSchema)
});

// AxisChart

export const axisChartDataSchema = z.object({
  headers: z.array(stringSchema),
  values: z.record(z.array(z.number()).min(1))
});

// Scatter
export const scatterDataSchema = z.object({
  points: z.array(
    z.object({
      value: z.tuple([z.number(), z.number()]),
      category: z.string()
    })
  )
});

// PieChart/Funnel
export const pieChartFunnelDataSchema = z.object({
  values: z.record(z.number()),
  properties: z.union([z.any(), z.array(z.any()), z.string()]).optional()
});

// TreeMap/Sunburst

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const hierarchyNode: any = z.object({
  name: z.string(),
  value: z.number(),
  category: z.string(),
  properties: z.union([z.any(), z.array(z.any()), z.string()]).optional(),
  children: z.array(z.lazy(() => hierarchyNode)).optional()
});

export const hierarchySchema = z.object({
  nodes: z.array(hierarchyNode)
});

// TimeLine

const timelineEventTagSchema = z.object({
  name: z.string()
});

const timelineEventSchema = z.object({
  summary: z.string(),
  date: z.string(),
  type: z.string(),
  author: z.string(),
  tags: z.array(timelineEventTagSchema).optional(),
  description: z.string().optional()
});

export const timelineDataSchema = z.record(
  z.object({
    summary: z
      .object({
        title: z.string().optional()
      })
      .optional(),
    events: z.array(timelineEventSchema)
  })
);
