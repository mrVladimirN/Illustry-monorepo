import { Icons } from "@/components/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}
export type MainNavItem = NavItemWithOptionalChildren;
export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[];
}

export interface ProjectType {
  _id?: string;
  __v?: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
}

export interface ProjectCreate {
  name: string;
  description?: string;
  isActive: boolean;
}
export interface ProjectUpdate {
  description: string;
  isActive: boolean;
}
export interface ProjectFilter {
  name?: string;
  text?: string;
  page?: number;
  per_page?: number;
  sort?: {
    element: string;
    sortOrder: string | number;
  };
}

export interface ExtendedProjectType {
  projects?: ProjectType[];
  pagination?: {
    count: number;
    pageCount: number;
  };
}

export enum VisualizationTypesEnum {
  CHART = "chart",
  WORLD_CLOUD = "word-cloud",
  PLOTLY = "plotly",
  TIMELINE = "timeline",
  FORCE_DIRECTED_GRAPH = "force-directed-graph",
  TREEMAP = "treemap",
  SANKEY = "sankey",
  CALENDAR = "calendar",
  MATRIX = "matrix",
  GRAPHVIZ = "graphviz",
  HIERARCHICAL_EDGE_BUNDLING = "hierarchical-edge-bundling",
}

interface TimelineEventTag {
  name: string;
  style: any;
}

export interface TimelineEvent {
  summary: string;
  date: string;
  type: string;
  author: string;
  tags?: TimelineEventTag[];
  description?: string;
  style: any;
}

export interface Timeline {
  [date: string]: {
    summary?: {
      title?: string;
      style?: any;
    };
    events: TimelineEvent[];
  };
}

export interface CalendarHeatmap {
  calendar: CalendarData[];
  categories: any;
  tooltip?: any;
}
export interface NodeLink {
  nodes: Node[];
  links: Link[];
  colorMapping?: any[];
}

export interface CalendarMatrix {
  calendarData: CalendarData[];
}

//Details for FLG HEB Sankey And Dot
export interface Node {
  category: string;
  name?: string;
  properties?: object | object[] | string;
}

export interface Link {
  source: string;
  target: string;
  value: number;
  properties?: object | object[] | string;
  style?: any;
}

interface CalendarData {
  date: string;
  value: number;
  year: number;
  category: string;
}

export interface VisualizationType {
  _id?: string;
  __v?: number;
  projectName?: string;
  type?: VisualizationTypesEnum | VisualizationTypesEnum[];
  description?: string;
  name?: string;
  tags?: string[];
  data?: NodeLink | CalendarHeatmap | Timeline | any;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ExtendedVisualizationType {
  visualizations?: VisualizationType[];
  pagination?: {
    count: number;
    pageCount: number;
  };
}

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
