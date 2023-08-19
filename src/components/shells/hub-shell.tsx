"use client";
import { VisualizationType } from "@/types";
import { Suspense, lazy } from "react";
import { Icons } from "../icons";
import Fallback from "../ui/fallback";
import dynamic from "next/dynamic";

interface HubShellProps {
  data?: VisualizationType;
}
const SankeyGraphView = lazy(() => import("@/components/views/sankey-diagram"));
const ForcedLayoutGraphView = lazy(
  () => import("@/components/views/forced-layout-graph")
);
const HierarchicalEdgeBundlingView = lazy(
  () => import("@/components/views/hierarchical-edge-bundling")
);
const CalendarView = lazy(() => import("@/components/views/calendar-graph"));

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
              <HierarchicalEdgeBundlingView data={data.data} />
            </Suspense>
          );
        case "force-directed-graph":
          return (
            <Suspense fallback={<Fallback />}>
              <ForcedLayoutGraphView data={data.data} />
            </Suspense>
          );
        case "sankey":
          return (
            <Suspense fallback={<Fallback />}>
              <SankeyGraphView data={data.data} />
            </Suspense>
          );
        case "calendar":
          return (
            <Suspense fallback={<Fallback />}>
              <CalendarView data={data.data} />
            </Suspense>
          );
        case "word-cloud":
          return (
            <Suspense fallback={<Fallback />}>
              <WordCloudView data={data.data} />
            </Suspense>
          );
        default:
          return null;
      }
    }
  };

  return <div>{renderGraph()}</div>;
}
