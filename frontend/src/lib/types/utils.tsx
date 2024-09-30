import { VisualizationTypes } from '@illustry/types';

export interface WithLegend {
  legend: boolean;
}

export interface WithOptions {
  options: boolean;
}

export interface WithFilter {
  filter: boolean;
}

export type AllVisualizationsShell =
  | VisualizationTypes.AxisChartData
  | {
      categories: string[];
      calendar: VisualizationTypes.CalendarType[];
    }
  | {
      nodes: VisualizationTypes.Node[];
      links: VisualizationTypes.Link[];
    }
  | VisualizationTypes.FunnelData
  | VisualizationTypes.WordType[]
  | {
      points: (string | number)[][];
      categories: string[];
    }
  | VisualizationTypes.TimelineData
  | {
    categories: string[]
    nodes: VisualizationTypes.HierarchyNode[]
    }
