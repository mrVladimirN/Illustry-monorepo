import { Suspense } from "react";
import Fallback from "../ui/fallback";
import dynamic from "next/dynamic";
import {
  CalendarData,
  AxisChartData,
  NodeLinkData,
  VisualizationType,
  WordCloudData,
  ScatterData,
  HierarchyData,
  FunnelData,
  TimelineData,
} from "types/visualizations";
import { PieChartData } from "index";

interface HubShellProps {
  data?: VisualizationType;
}
const SankeyGraphView = dynamic(
  () => import("@/components/views/sankey-diagram"),
  {
    ssr: true,
  }
);
const ForcedLayoutGraphView = dynamic(
  () => import("@/components/views/forced-layout-graph"),
  {
    ssr: true,
  }
);
const HierarchicalEdgeBundlingView = dynamic(
  () => import("@/components/views/hierarchical-edge-bundling"),
  {
    ssr: true,
  }
);
const CalendarView = dynamic(
  () => import("@/components/views/calendar-graph"),
  {
    ssr: true,
  }
);
const WordCloudView = dynamic(() => import("@/components/views/wordcloud"), {
  ssr: true,
});
const MatrixView = dynamic(() => import("@/components/views/matrix/matrix"), {
  ssr: true,
});
const AxisChartView = dynamic(() => import("@/components/views/axis-charts"), {
  ssr: true,
});
const ScatterView = dynamic(() => import("@/components/views/scatter"), {
  ssr: true,
});

const PieView = dynamic(() => import("@/components/views/pie-chart"), {
  ssr: true,
});

const TreeMapView = dynamic(() => import("@/components/views/treemap-chart"), {
  ssr: true,
});
const SunBurstView = dynamic(
  () => import("@/components/views/sunburst-chart"),
  {
    ssr: true,
  }
);
const FunnelView = dynamic(() => import("@/components/views/funnel-chart"), {
  ssr: true,
});
const TimelineView = dynamic(
  () => import("@/components/views/timeline/timeline"),
  {
    ssr: true,
  }
);
export function HubShell({ data }: HubShellProps) {

  const renderGraph = () => {
    if (data) {
      switch (data.type) {
        case "hierarchical-edge-bundling":
          return (
            <Suspense fallback={<Fallback />}>
              <HierarchicalEdgeBundlingView
                data={data.data as NodeLinkData}
                
                legend={true}
                options={true}
              />
            </Suspense>
          );
        case "force-directed-graph":
          return (
            <Suspense fallback={<Fallback />}>
              <ForcedLayoutGraphView
                data={data.data as NodeLinkData}
               
                legend={true}
                options={true}
              />
            </Suspense>
          );
        case "sankey":
          return (
            <Suspense fallback={<Fallback />}>
              <SankeyGraphView
                data={data.data as NodeLinkData}
              
                legend={true}
                options={true}
              />
            </Suspense>
          );
        case "calendar":
          return (
            <Suspense fallback={<Fallback />}>
              <CalendarView
                data={data.data as CalendarData}
                legend={true}
                options={true}
              />
            </Suspense>
          );
        case "word-cloud":
          return (
            <Suspense fallback={<Fallback />}>
              <WordCloudView
                data={data.data as WordCloudData}
                legend={true}
                options={true}
              />
            </Suspense>
          );
        case "matrix":
          return (
            <Suspense fallback={<Fallback />}>
              <MatrixView
                data={data.data as NodeLinkData}
                legend={true}
                options={true}
              />
            </Suspense>
          );
        case "line-chart":
          return (
            <Suspense fallback={<Fallback />}>
              <AxisChartView
                data={data.data as AxisChartData}
                legend={true}
                options={true}
                type="line"
              />
            </Suspense>
          );
        case "bar-chart":
          return (
            <Suspense fallback={<Fallback />}>
              <AxisChartView
                data={data.data as AxisChartData}
                legend={true}
                options={true}
                type="bar"
              />
            </Suspense>
          );
        case "pie-chart":
          return (
            <Suspense fallback={<Fallback />}>
              <PieView
                data={data.data as PieChartData}
                legend={true}
                options={true}
              />
            </Suspense>
          );
        case "funnel":
          return (
            <Suspense fallback={<Fallback />}>
              <FunnelView
                data={data.data as FunnelData}
                legend={true}
                options={true}
              />
            </Suspense>
          );
        case "scatter":
          return (
            <Suspense fallback={<Fallback />}>
              <ScatterView
                data={data.data as ScatterData}
                legend={true}
                options={true}
              />
            </Suspense>
          );
        case "treemap":
          return (
            <Suspense fallback={<Fallback />}>
              <TreeMapView
                data={data.data as HierarchyData}
               
                legend={true}
                options={true}
              />
            </Suspense>
          );
        case "sunburst":
          return (
            <Suspense fallback={<Fallback />}>
              <SunBurstView
                data={data.data as HierarchyData}
                legend={true}
                options={true}
              />
            </Suspense>
          );
        case "timeline":
          return (
            <Suspense fallback={<Fallback />}>
              <TimelineView
                data={data.data as TimelineData}
              
                legend={true}
                options={true}
              />
            </Suspense>
         );
        default:
          return null;
      }
    }
  };

  return <div>{renderGraph()}</div>;
}
