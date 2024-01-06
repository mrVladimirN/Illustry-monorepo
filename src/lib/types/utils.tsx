import {
  AxisChartData,
  CalendarType,
  FunnelData,
  Link,
  Node
} from 'types/visualizations';

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
  | AxisChartData
  | {
      categories: string[];
      calendar: CalendarType[];
    }
  | {
      nodes: Node[];
      links: Link[];
    }
  | FunnelData
