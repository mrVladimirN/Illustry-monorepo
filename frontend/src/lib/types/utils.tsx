import { VisualizationTypes } from '@illustry/types';

type WithLegend = {
  legend: boolean;
}

type WithOptions = {
  options: boolean;
}

type WithFullScreen = {
  fullScreen: boolean
}

type WithFilter = {
  filter: boolean;
}

type AllVisualizationsShell =
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

export type {
  WithLegend,
  WithOptions,
  WithFilter,
  WithFullScreen,
  AllVisualizationsShell
};
