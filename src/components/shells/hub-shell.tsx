import { VisualizationType } from "@/types";
import { Suspense, lazy } from "react";

interface HubShellProps {
  data?: VisualizationType;
}
const SankeyGraphView = lazy(
  () => import("@/components/views/sankey-graph-view")
);
export function HubShell({ data }: HubShellProps) {
  const renderGraph = () => {
    if (data) {
      switch (data.type) {
        case "hierarchical-edge-bundling":
          return (
            <Suspense fallback={<div>Loading...</div>}>
              {/* <HierarchicalEdgeBundlingView data={data} /> */}
            </Suspense>
          );
        case "force-directed-graph":
          return (
            <Suspense fallback={<div>Loading...</div>}>
              {/* <ForcedLayoutGraphView data={data} /> */}
            </Suspense>
          );
        case "sankey":
          return (
            <Suspense fallback={<div>Loading...</div>}>
              <SankeyGraphView data={data} />
            </Suspense>
          );
        default:
          return null;
      }
    }
  };

  return <div>{renderGraph()}</div>;
}
