import { VisualizationTypes } from "@illustry/types";
import { z } from 'zod';

const dateSchema = z.instanceof(Date);
const numberSchema = z.number();
const stringSchema = z.string();


const booleanSchema = z.boolean();

const projectDataSchema = z.object({
  name: stringSchema,
  description: stringSchema.optional(),
  createdAt: dateSchema.optional(),
  updatedAt: dateSchema.optional(),
  isActive: booleanSchema.optional()
});

const withOptionalIdSchema = z.object({
  _id: stringSchema.optional()
});

const withIdSchema = z.object({
  _id: stringSchema
});

const withOptionalVersionSchema = z.object({
  __v: stringSchema.optional()
});

// Word-cloud
const wordTypeSchema = z.object({
  name: stringSchema,
  value: numberSchema,
  properties: z.union([z.any(), z.array(z.any()), z.string()]).optional()
});

const wordCloudDataSchema = z.object({
  words: z.array(wordTypeSchema)
});

// Calendar
const calendarTypeSchema = z.object({
  date: stringSchema,
  value: numberSchema,
  category: stringSchema,
  properties: z.union([z.any(), z.array(z.any()), z.string()]).optional()
});

const calendarDataSchema = z.object({
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

const nodeLinkDataSchema = z.object({
  nodes: z.array(nodeSchema),
  links: z.array(linkSchema)
});

// AxisChart
const axisChartDataSchema = z.object({
  headers: z.array(stringSchema),
  values: z.record(z.array(z.number()).min(1))
});

// Scatter
const scatterDataSchema = z.object({
  points: z.array(
    z.object({
      value: z.tuple([z.number(), z.number()]),
      category: z.string()
    })
  )
});

// PieChart/Funnel
const pieChartFunnelDataSchema = z.object({
  values: z.record(z.number()),
  properties: z.union([z.any(), z.array(z.any()), z.string()]).optional()
});

// TreeMap/Sunburst
const hierarchyNode: z.ZodTypeAny = z.object({
  name: z.string(),
  value: z.number(),
  category: z.string(),
  properties: z.union([z.any(), z.array(z.any()), z.string()]).optional(),
  children: z.array(z.lazy(() => hierarchyNode)).optional()
});

const hierarchySchema = z.object({
  nodes: z.array(hierarchyNode)
});

// TimeLine

const TimelineEventTagSchema = z.object({
  name: z.string()
});

const TimelineEventSchema = z.object({
  summary: z.string(),
  date: z.string(),
  type: z.string(),
  author: z.string(),
  tags: z.array(TimelineEventTagSchema).optional(),
  description: z.string().optional()
});

const TimelineDataSchema = z.record(
  z.object({
    summary: z
      .object({
        title: z.string().optional()
      })
      .optional(),
    events: z.array(TimelineEventSchema)
  })
);

// VisualizationData
const visualizationDataSchema = z.object({
  projectName: stringSchema.min(1),
  description: stringSchema.optional(),
  name: stringSchema,
  tags: z.union([stringSchema, z.array(stringSchema)]).optional(),
  createdAt: dateSchema.optional(),
  updatedAt: dateSchema.optional()
});

const visualizationNodeLinkSchema = visualizationDataSchema.extend({
  type: z.union([
    z.literal(VisualizationTypes.VisualizationTypesEnum.FORCE_DIRECTED_GRAPH),
    z.literal(VisualizationTypes.VisualizationTypesEnum.SANKEY),
    z.literal(VisualizationTypes.VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING),
    z.literal(VisualizationTypes.VisualizationTypesEnum.MATRIX),
    z.array(
      z.union([
        z.literal(VisualizationTypes.VisualizationTypesEnum.FORCE_DIRECTED_GRAPH),
        z.literal(VisualizationTypes.VisualizationTypesEnum.SANKEY),
        z.literal(VisualizationTypes.VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING),
        z.literal(VisualizationTypes.VisualizationTypesEnum.MATRIX)
      ])
    )
  ]),
  data: nodeLinkDataSchema
});

const visualizationTimelineSchema = visualizationDataSchema.extend({
  type: z.union([
    z.literal(VisualizationTypes.VisualizationTypesEnum.TIMELINE),

    z.array(z.literal(VisualizationTypes.VisualizationTypesEnum.TIMELINE))
  ]),
  data: TimelineDataSchema
});

const visualizationAxisChartSchema = visualizationDataSchema.extend({
  type: z.union([
    z.literal(VisualizationTypes.VisualizationTypesEnum.LINE_CHART),
    z.literal(VisualizationTypes.VisualizationTypesEnum.BAR_CHART),
    z.array(
      z.union([
        z.literal(VisualizationTypes.VisualizationTypesEnum.LINE_CHART),
        z.literal(VisualizationTypes.VisualizationTypesEnum.BAR_CHART)
      ])
    )
  ]),
  data: axisChartDataSchema
});

const visualizationScatterSchema = visualizationDataSchema.extend({
  type: z.union([
    z.literal(VisualizationTypes.VisualizationTypesEnum.SCATTER),
    z.array(z.literal(VisualizationTypes.VisualizationTypesEnum.SCATTER))
  ]),
  data: scatterDataSchema
});

const visualizationPieChartFunnelSchema = visualizationDataSchema.extend({
  type: z.union([
    z.literal(VisualizationTypes.VisualizationTypesEnum.PIE_CHART),
    z.literal(VisualizationTypes.VisualizationTypesEnum.FUNNEL),
    z.array(
      z.union([
        z.literal(VisualizationTypes.VisualizationTypesEnum.PIE_CHART),
        z.literal(VisualizationTypes.VisualizationTypesEnum.FUNNEL)
      ])
    )
  ]),
  data: pieChartFunnelDataSchema
});

const visualizationCalendarSchema = visualizationDataSchema.extend({
  type: z.union([
    z.literal(VisualizationTypes.VisualizationTypesEnum.CALENDAR),
    z.array(z.literal(VisualizationTypes.VisualizationTypesEnum.CALENDAR))
  ]),
  data: calendarDataSchema
});

const visualizationWordCloudSchema = visualizationDataSchema.extend({
  type: z.union([
    z.literal(VisualizationTypes.VisualizationTypesEnum.WORD_CLOUD),
    z.array(z.literal(VisualizationTypes.VisualizationTypesEnum.WORD_CLOUD))
  ]),
  data: wordCloudDataSchema
});

const visualizationHierarchySchema = visualizationDataSchema.extend({
  type: z.union([
    z.literal(VisualizationTypes.VisualizationTypesEnum.TREEMAP),
    z.literal(VisualizationTypes.VisualizationTypesEnum.SUNBURST),
    z.array(
      z.union([
        z.literal(VisualizationTypes.VisualizationTypesEnum.TREEMAP),
        z.literal(VisualizationTypes.VisualizationTypesEnum.SUNBURST)
      ])
    )
  ]),
  data: hierarchySchema
});

const visualizationTypeSchema = z.union([
  visualizationNodeLinkSchema,
  visualizationCalendarSchema,
  visualizationWordCloudSchema,
  visualizationAxisChartSchema,
  visualizationScatterSchema,
  visualizationPieChartFunnelSchema,
  visualizationHierarchySchema,
  visualizationTimelineSchema
]);

const visualizationFilterSchema = z.object({
  projectName: stringSchema.optional(),
  name: stringSchema.optional(),
  text: stringSchema.optional(),
  page: numberSchema.optional(),
  per_page: numberSchema.optional(),
  sort: z
    .object({
      element: stringSchema,
      sortOrder: z.union([stringSchema, numberSchema])
    })
    .optional()
});

const visualizationExtendedTypeSchema = z.object({
  projects: z.array(visualizationTypeSchema).optional(),
  pagination: z
    .object({
      count: numberSchema,
      pageCount: numberSchema
    })
    .optional()
});

const projectCreateSchema = projectDataSchema
  .merge(withOptionalIdSchema)
  .merge(withOptionalVersionSchema);

const projectTypeSchema = projectDataSchema
  .merge(withIdSchema)
  .merge(withOptionalVersionSchema);

const projectExtendedTypeSchema = z.object({
  projects: z.array(projectTypeSchema).optional(),
  pagination: z
    .object({
      count: numberSchema,
      pageCount: numberSchema
    })
    .optional()
});

const projectUpdateSchema = z.object({
  name: stringSchema.optional(),
  description: stringSchema.optional(),
  createdAt: dateSchema.optional(),
  updatedAt: dateSchema.optional(),
  isActive: booleanSchema.optional()
});

const projectFilterSchema = z.object({
  name: stringSchema.optional(),
  text: stringSchema.optional(),
  page: numberSchema.optional(),
  per_page: numberSchema.optional(),
  isActive: booleanSchema.optional(),
  sort: z
    .object({
      element: stringSchema,
      sortOrder: z.union([stringSchema, numberSchema])
    })
    .optional()
});

export {
  visualizationTypeSchema,
  visualizationFilterSchema,
  visualizationExtendedTypeSchema,
  projectCreateSchema,
  projectTypeSchema,
  projectExtendedTypeSchema,
  projectUpdateSchema,
  projectFilterSchema
}