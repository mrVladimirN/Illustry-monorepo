"use client";
import { VisualizationType } from "@/types";
import { Suspense, lazy } from "react";
import { Icons } from "../icons";

interface HubShellProps {
  data?: VisualizationType;
}
const SankeyGraphView = lazy(() => import("@/components/views/sankey-diagram"));
const ForcedLayoutGraphView = lazy(
  () => import("@/components/views/forced-layout-graph")
);
export function HubShell({ data }: HubShellProps) {
  const renderGraph = () => {
    if (data) {
      switch (data.type) {
        case "hierarchical-edge-bundling":
          return (
            <Suspense
              fallback={<Icons.spinner className="h-4 w-4 animate-spin" />}
            >
              {/* <HierarchicalEdgeBundlingView data={data} /> */}
            </Suspense>
          );
        case "force-directed-graph":
          return (
            <Suspense
              fallback={<Icons.spinner className="h-4 w-4 animate-spin" />}
            >
              <ForcedLayoutGraphView data={data.data} />
            </Suspense>
          );
        case "sankey":
          return (
            <Suspense
              fallback={<Icons.spinner className="h-4 w-4 animate-spin" />}
            >
              <SankeyGraphView data={data.data} />
            </Suspense>
          );
        default:
          return null;
      }
    }
  };

  return <div>{renderGraph()}</div>;
}
