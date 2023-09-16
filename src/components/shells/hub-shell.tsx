"use client";
import { Suspense } from "react";
import Fallback from "../ui/fallback";
import dynamic from "next/dynamic";
import {
  CalendarData,
  NodeLinkData,
  VisualizationType,
  WordCloudData,
} from "types/visualizations";
import { useThemeColors } from "../theme-provider";

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
        default:
          return null;
      }
    }
  };

  return <div>{renderGraph()}</div>;
}
