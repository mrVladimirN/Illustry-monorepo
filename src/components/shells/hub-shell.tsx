"use client";
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
} from "types/visualizations";
import { useThemeColors } from "../theme-provider";
import { PieChartData } from "index";

interface HubShellProps {
  data?: VisualizationType;
}
const SankeyGraphView = dynamic(
  () => import("@/components/views/sankey-diagram"),
  {
    ssr: false,
  }
);
const ForcedLayoutGraphView = dynamic(
  () => import("@/components/views/forced-layout-graph"),
  {
    ssr: false,
  }
);
const HierarchicalEdgeBundlingView = dynamic(
  () => import("@/components/views/hierarchical-edge-bundling"),
  {
    ssr: false,
  }
);
const CalendarView = dynamic(
  () => import("@/components/views/calendar-graph"),
  {
    ssr: false,
  }
);

const WordCloudView = dynamic(() => import("@/components/views/wordcloud"), {
  ssr: false,
});
const MatrixView = dynamic(() => import("@/components/views/matrix/matrix"), {
  ssr: false,
});
const AxisChartView = dynamic(() => import("@/components/views/axis-charts"), {
  ssr: false,
});
const ScatterView = dynamic(() => import("@/components/views/scatter"), {
  ssr: false,
});

const PieView = dynamic(() => import("@/components/views/pie-chart"), {
  ssr: false,
});

const TreeMapView = dynamic(() => import("@/components/views/treemap-chart"), {
  ssr: false,
});
const SunBurstView = dynamic(
  () => import("@/components/views/sunburst-chart"),
  {
    ssr: false,
  }
);
const FunnelView = dynamic(() => import("@/components/views/funnel-chart"), {
  ssr: false,
});
export function HubShell({ data }: HubShellProps) {
  const activeTheme = useThemeColors();

  const renderGraph = () => {
    if (data) {
      const theme =
        typeof window !== "undefined" ? localStorage.getItem("theme") : "light";
      const isDarkTheme = theme === "dark";

      switch (data.type) {
        case "hierarchical-edge-bundling":
          return (
            <Suspense fallback={<Fallback />}>
              <HierarchicalEdgeBundlingView
                data={data.data as NodeLinkData}
                colors={
                  isDarkTheme
                    ? activeTheme.heb.dark.colors
                    : activeTheme.heb.light.colors
                }
              />
            </Suspense>
          );
        case "force-directed-graph":
          return (
            <Suspense fallback={<Fallback />}>
              <ForcedLayoutGraphView
                data={data.data as NodeLinkData}
                colors={
                  isDarkTheme
                    ? activeTheme.flg.dark.colors
                    : activeTheme.flg.light.colors
                }
              />
            </Suspense>
          );
        case "sankey":
          return (
            <Suspense fallback={<Fallback />}>
              <SankeyGraphView
                data={data.data as NodeLinkData}
                colors={
                  isDarkTheme
                    ? activeTheme.sankey.dark.colors
                    : activeTheme.sankey.light.colors
                }
              />
            </Suspense>
          );
        case "calendar":
          return (
            <Suspense fallback={<Fallback />}>
              <CalendarView
                isDarkTheme={isDarkTheme}
                data={data.data as CalendarData}
                colors={
                  isDarkTheme
                    ? activeTheme.calendar.dark.colors
                    : activeTheme.calendar.light.colors
                }
              />
            </Suspense>
          );
        case "word-cloud":
          return (
            <Suspense fallback={<Fallback />}>
              <WordCloudView
                data={data.data as WordCloudData}
                colors={
                  isDarkTheme
                    ? activeTheme.wordcloud.dark.colors
                    : activeTheme.wordcloud.light.colors
                }
              />
            </Suspense>
          );
        case "matrix":
          return (
            <Suspense fallback={<Fallback />}>
              <MatrixView
                data={data.data as NodeLinkData}
                colors={
                  isDarkTheme
                    ? activeTheme.wordcloud.dark.colors
                    : activeTheme.wordcloud.light.colors
                }
              />
            </Suspense>
          );
        case "line-chart":
          return (
            <Suspense fallback={<Fallback />}>
              <AxisChartView
                data={data.data as AxisChartData}
                colors={
                  isDarkTheme
                    ? activeTheme.lineChart.dark.colors
                    : activeTheme.lineChart.light.colors
                }
                type="line"
              />
            </Suspense>
          );
        case "bar-chart":
          return (
            <Suspense fallback={<Fallback />}>
              <AxisChartView
                data={data.data as AxisChartData}
                colors={
                  isDarkTheme
                    ? activeTheme.barChart.dark.colors
                    : activeTheme.barChart.light.colors
                }
                type="bar"
              />
            </Suspense>
          );
        case "pie-chart":
          return (
            <Suspense fallback={<Fallback />}>
              <PieView
                data={data.data as PieChartData}
                colors={
                  isDarkTheme
                    ? activeTheme.pieChart.dark.colors
                    : activeTheme.pieChart.light.colors
                }
              />
            </Suspense>
          );
        case "funnel":
          return (
            <Suspense fallback={<Fallback />}>
              <FunnelView
                data={data.data as FunnelData}
                colors={
                  isDarkTheme
                    ? activeTheme.funnel.dark.colors
                    : activeTheme.funnel.light.colors
                }
              />
            </Suspense>
          );
        case "scatter":
          return (
            <Suspense fallback={<Fallback />}>
              <ScatterView
                data={data.data as ScatterData}
                colors={
                  isDarkTheme
                    ? activeTheme.scatter.dark.colors
                    : activeTheme.scatter.light.colors
                }
                isDarkTheme={isDarkTheme}
              />
            </Suspense>
          );
        case "treemap":
          return (
            <Suspense fallback={<Fallback />}>
              <TreeMapView
                data={data.data as HierarchyData}
                colors={
                  isDarkTheme
                    ? activeTheme.treeMap.dark.colors
                    : activeTheme.treeMap.light.colors
                }
              />
            </Suspense>
          );
        case "sunburst":
          return (
            <Suspense fallback={<Fallback />}>
              <SunBurstView
                data={data.data as HierarchyData}
                colors={
                  isDarkTheme
                    ? activeTheme.sunburst.dark.colors
                    : activeTheme.sunburst.light.colors
                }
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
