import {
  DeepPartial,
  with_id,
  with_optional_id,
  with_optional_version,
  with_optional_properties,
  with_optional_labels,
} from "./utils";

// Word-cloud
export interface WordType extends with_optional_properties {
  name: string;
  value: number;
}

export interface WordCloudData {
  words: WordType[];
}

// Calendar
export interface CalendarType extends with_optional_properties {
  date: string;
  value: number;
  category: string;
}

export interface CalendarData {
  calendar: CalendarType[];
}

// Node-Link (force-directed-graph, sankey, hierarchical-edge-bundling )

export interface Node extends with_optional_properties, with_optional_labels {
  name: string;
  category: string;
}

export interface Link extends with_optional_properties {
  source: string;
  target: string;
  value: number;
}

export interface NodeLinkData {
  nodes: Node[];
  links: Link[];
}

export interface AxisChartData {
  headers: string[];
  values: { [key: string]: number[] };
}
export interface ScatterPoint extends with_optional_properties {
  value: [number, number];
  category: string;
}
export interface ScatterData {
  points: ScatterPoint[];
}
export interface PieChartData {
  values: { [key: string]: number };
}
export interface TreeMapNode {
  name: string;
  value: number;
  category: string;
  children?: TreeMapNode[];
}

export interface TreeMapData {
  values: TreeMapNode[];
}
export enum VisualizationTypesEnum {
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
}

interface VisualizationData {
  projectName: string;
  type: VisualizationTypesEnum | VisualizationTypesEnum[];
  description?: string;
  name: string;
  tags?: string[];
  data:
    | WordCloudData
    | NodeLinkData
    | CalendarData
    | AxisChartData
    | ScatterData
    | PieChartData
    | TreeMapData;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VisualizationCreate
  extends VisualizationData,
    with_optional_id,
    with_optional_version {}

export interface VisualizationType
  extends VisualizationData,
    with_id,
    with_optional_version {}

export interface ExtendedVisualizationType {
  visualizations?: VisualizationType[];
  pagination?: {
    count: number;
    pageCount: number;
  };
}
export interface VisualizationUpdate extends DeepPartial<VisualizationType> {}

export interface VisualizationFilter {
  projectName?: string;
  type?: string | string[];
  name?: string;
  tags?: string;
  text?: string;
  page?: number;
  sort?: {
    element: string;
    sortOrder: string | number;
  };
}
