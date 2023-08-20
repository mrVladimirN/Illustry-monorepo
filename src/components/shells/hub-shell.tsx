"use client";
import { Suspense } from "react";
import { Icons } from "../icons";
import Fallback from "../ui/fallback";
import dynamic from "next/dynamic";
import {
  CalendarData,
  NodeLinkData,
  VisualizationType,
  WordCloudData,
} from "types/visualizations";

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
export function HubShell({ data }: HubShellProps) {
  const renderGraph = () => {
    if (data) {
      switch (data.type) {
        case "hierarchical-edge-bundling":
          return (
            <Suspense fallback={<Fallback />}>
              <HierarchicalEdgeBundlingView data={data.data as NodeLinkData} />
            </Suspense>
          );
        case "force-directed-graph":
          return (
            <Suspense fallback={<Fallback />}>
              <ForcedLayoutGraphView data={data.data as NodeLinkData} />
            </Suspense>
          );
        case "sankey":
          return (
            <Suspense fallback={<Fallback />}>
              <SankeyGraphView data={data.data as NodeLinkData} />
            </Suspense>
          );
        case "calendar":
          return (
            <Suspense fallback={<Fallback />}>
              <CalendarView data={data.data as CalendarData} />
            </Suspense>
          );
        case "word-cloud":
          return (
            <Suspense fallback={<Fallback />}>
              <WordCloudView data={data.data as WordCloudData} />
            </Suspense>
          );
        default:
          return null;
      }
    }
  };

  return <div>{renderGraph()}</div>;
}
