import { VisualizationTypesEnum } from "types/visualizations";
import { z } from "zod";

const dateSchema = z.instanceof(Date);
const numberSchema = z.number();
const stringSchema = z.string();

// Word-cloud
const wordTypeSchema = z.object({
  name: stringSchema,
  value: numberSchema,
  properties: z.union([z.any(), z.array(z.any()), z.string()]).optional(),
});

const wordCloudDataSchema = z.object({
  words: z.array(wordTypeSchema),
});

// Calendar
const calendarTypeSchema = z.object({
  date: stringSchema,
  value: numberSchema,
  category: stringSchema,
  properties: z.union([z.any(), z.array(z.any()), z.string()]).optional(),
});

const calendarDataSchema = z.object({
  calendar: z.array(calendarTypeSchema),
});

// Node-Link (force-directed-graph, sankey, hierarchical-edge-bundling)
const labelsSchema = z.object({
  name: stringSchema,
  value: numberSchema,
  properties: z.union([z.any(), z.array(z.any()), z.string()]).optional(),
});
const nodeSchema = z.object({
  name: stringSchema,
  category: stringSchema,
  labels: z.array(labelsSchema).optional(),
  properties: z.union([z.any(), z.array(z.any()), z.string()]).optional(),
});

const linkSchema = z.object({
  source: stringSchema,
  target: stringSchema,
  value: numberSchema,
  properties: z.union([z.any(), z.array(z.any()), z.string()]).optional(),
});

const nodeLinkDataSchema = z.object({
  nodes: z.array(nodeSchema),
  links: z.array(linkSchema),
});

//AxisChart

const axisChartDataSchema = z.object({
  headers: z.array(stringSchema),
  values: z.record(z.array(z.number())),
});

//Scatter
export const scatterDataSchema = z.object({
  points: z.array(
    z.object({
      value: z.tuple([z.number(), z.number()]),
      category: z.string(),
    })
  ),
});

//PieChart
export const pieChartDataSchema = z.object({
  values: z.record(z.number()),
});

// VisualizationData
const visualizationDataSchema = z.object({
  projectName: stringSchema,
  description: stringSchema.optional(),
  name: stringSchema,
  tags: z.union([stringSchema, z.array(stringSchema)]).optional(),
  createdAt: dateSchema.optional(),
  updatedAt: dateSchema.optional(),
});

const visualizationNodeLinkSchema = visualizationDataSchema.extend({
  type: z.union([
    z.literal(VisualizationTypesEnum.FORCE_DIRECTED_GRAPH),
    z.literal(VisualizationTypesEnum.SANKEY),
    z.literal(VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING),
    z.literal(VisualizationTypesEnum.MATRIX),
    z.array(
      z.union([
        z.literal(VisualizationTypesEnum.FORCE_DIRECTED_GRAPH),
        z.literal(VisualizationTypesEnum.SANKEY),
        z.literal(VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING),
        z.literal(VisualizationTypesEnum.MATRIX),
      ])
    ),
  ]),
  data: nodeLinkDataSchema,
});
const visualizationAxisChartSchema = visualizationDataSchema.extend({
  type: z.union([
    z.literal(VisualizationTypesEnum.LINE_CHART),
    z.literal(VisualizationTypesEnum.BAR_CHART),
    z.array(
      z.union([
        z.literal(VisualizationTypesEnum.LINE_CHART),
        z.literal(VisualizationTypesEnum.BAR_CHART),
      ])
    ),
  ]),
  data: axisChartDataSchema,
});
const visualizationScatterSchema = visualizationDataSchema.extend({
  type: z.union([
    z.literal(VisualizationTypesEnum.SCATTER),
    z.array(z.literal(VisualizationTypesEnum.SCATTER)),
  ]),
  data: scatterDataSchema,
});
const visualizationPieChartSchema = visualizationDataSchema.extend({
  type: z.union([
    z.literal(VisualizationTypesEnum.PIE_CHART),
    z.array(z.literal(VisualizationTypesEnum.PIE_CHART)),
  ]),
  data: pieChartDataSchema,
});
const visualizationCalendarSchema = visualizationDataSchema.extend({
  type: z.union([
    z.literal(VisualizationTypesEnum.CALENDAR),
    z.array(z.literal(VisualizationTypesEnum.CALENDAR)),
  ]),
  data: calendarDataSchema,
});
const visualizationWordCloudSchema = visualizationDataSchema.extend({
  type: z.union([
    z.literal(VisualizationTypesEnum.WORLD_CLOUD),
    z.array(z.literal(VisualizationTypesEnum.WORLD_CLOUD)),
  ]),
  data: wordCloudDataSchema,
});

const visualizationPartialNodeLinkSchema = visualizationDataSchema.extend({
  type: z.union([
    z.literal(VisualizationTypesEnum.FORCE_DIRECTED_GRAPH),
    z.literal(VisualizationTypesEnum.SANKEY),
    z.literal(VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING),
    z.literal(VisualizationTypesEnum.MATRIX),
    z.array(
      z.union([
        z.literal(VisualizationTypesEnum.FORCE_DIRECTED_GRAPH),
        z.literal(VisualizationTypesEnum.SANKEY),
        z.literal(VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING),
        z.literal(VisualizationTypesEnum.MATRIX),
      ])
    ),
  ]),
  data: nodeLinkDataSchema,
  projectName: stringSchema.optional(),
});
const visualizationPartialAxisChartSchema = visualizationDataSchema.extend({
  type: z.union([
    z.literal(VisualizationTypesEnum.LINE_CHART),
    z.literal(VisualizationTypesEnum.BAR_CHART),
    z.array(
      z.union([
        z.literal(VisualizationTypesEnum.LINE_CHART),
        z.literal(VisualizationTypesEnum.BAR_CHART),
      ])
    ),
  ]),
  data: axisChartDataSchema,
  projectName: stringSchema.optional(),
});
const visualizationPartialCalendarSchema = visualizationDataSchema.extend({
  type: z.union([
    z.literal(VisualizationTypesEnum.CALENDAR),
    z.array(z.literal(VisualizationTypesEnum.CALENDAR)),
  ]),
  data: calendarDataSchema,
  projectName: stringSchema.optional(),
});
const visualizationPartialWordCloudSchema = visualizationDataSchema.extend({
  type: z.union([
    z.literal(VisualizationTypesEnum.WORLD_CLOUD),
    z.array(z.literal(VisualizationTypesEnum.WORLD_CLOUD)),
  ]),
  data: wordCloudDataSchema,
  projectName: stringSchema.optional(),
});
const visualizationPartialScatterSchema = visualizationDataSchema.extend({
  type: z.union([
    z.literal(VisualizationTypesEnum.SCATTER),
    z.array(z.literal(VisualizationTypesEnum.SCATTER)),
  ]),
  data: scatterDataSchema,
  projectName: stringSchema.optional(),
});
const visualizationPartialPieChartSchema = visualizationDataSchema.extend({
  type: z.union([
    z.literal(VisualizationTypesEnum.PIE_CHART),
    z.array(z.literal(VisualizationTypesEnum.PIE_CHART)),
  ]),
  data: pieChartDataSchema,
  projectName: stringSchema.optional(),
});
export const visualizationTypeSchema = z.union([
  visualizationNodeLinkSchema,
  visualizationCalendarSchema,
  visualizationWordCloudSchema,
  visualizationAxisChartSchema,
  visualizationScatterSchema,
  visualizationPieChartSchema,
]);
export const visualizationPartialTypeSchema = z.union([
  visualizationPartialNodeLinkSchema,
  visualizationPartialCalendarSchema,
  visualizationPartialWordCloudSchema,
  visualizationPartialAxisChartSchema,
  visualizationPartialScatterSchema,
  visualizationPartialPieChartSchema,
]);
export const visualizationFilterSchema = z.object({
  projectName: stringSchema.optional(),
  name: stringSchema.optional(),
  text: stringSchema.optional(),
  page: numberSchema.optional(),
  per_page: numberSchema.optional(),
  sort: z
    .object({
      element: stringSchema,
      sortOrder: z.union([stringSchema, numberSchema]),
    })
    .optional(),
});

export const visualizationExtendedTypeSchema = z.object({
  projects: z.array(visualizationTypeSchema).optional(),
  pagination: z
    .object({
      count: numberSchema,
      pageCount: numberSchema,
    })
    .optional(),
});

const booleanSchema = z.boolean();

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
