"use client";
import React, { useEffect } from "react";
import { select, cluster, lineRadial, curveBundle } from "d3";
import { NodeLinkData } from "types/visualizations";
import {
  createHebLinks,
  createHebNodes,
  createToolTip,
  onLinkMouseOver,
  onMouseMove,
  onNodeClick,
  onNodeMouseOver,
  onNodeOrLinkMouseOut,
  packageHierarchy,
} from "@/lib/visualizations/node-link/helper";
import { with_legend, with_options } from "@/lib/types/utils";
import { useThemeColors } from "../theme-provider";
interface HierarchicalEdgeBundlingGraphProp extends with_legend, with_options {
  data: NodeLinkData;
}

const HierarchicalEdgeBundlingGraphView = ({
  data,
  legend,
  options,
}: HierarchicalEdgeBundlingGraphProp) => {
  const activeTheme = useThemeColors();
  const theme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : "light";
  const isDarkTheme = theme === "dark";
  const colors = isDarkTheme
    ? activeTheme.heb.dark.colors
    : activeTheme.heb.light.colors;

  useEffect(() => {
    createHedge(data, colors);
    return () => {
      select("#hedgeBundleSvg").remove();
      select(".my-tooltip").remove();
    };
  }, [data, JSON.stringify(colors)]);
  const createHedge = (graph: NodeLinkData, colors: string[]) => {
    const colorin = colors[0];
    const colorout = colors[1];

    const tooltip = createToolTip();

    const radius = window.innerHeight / 2;
    const innerRadius = radius - 200;
    const newCluster = cluster().size([360, innerRadius]);

    const line = lineRadial()
      .curve(curveBundle.beta(0.85))
      .radius((d: any) => d.y)
      .angle((d: any) => (d.x / 180) * Math.PI);

    const svg = select("#viz")
      .append("svg")
      .attr("id", "hedgeBundleSvg")
      .attr("width", window.innerHeight)
      .attr("height", window.innerHeight - 10)
      .attr("class", "edge-bundle")
      .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");

    const root = packageHierarchy(graph.nodes).sum((d: any) => d.size);
    newCluster(root);

    let link: any = svg.append("g").selectAll(".link");
    let node: any = svg.append("g").selectAll(".node");
    node = createHebNodes(node, root, colors[2] as string)
      .on("mouseover", (event: any) => {
        return onNodeMouseOver(
          event,
          node,
          link,
          tooltip,
          colorin as string,
          colorout as string,
          colors[3] as string,
          colors[4] as string
        );
      })
      .on("mouseout", (event: any) => {
        onNodeOrLinkMouseOut(link, node, tooltip, colors[2] as string);
      })
      .on("mousemove", () => {
        return onMouseMove(tooltip);
      })
      .on("click", () => {
        return onNodeClick(tooltip);
      });
    link = createHebLinks(link, root, graph.links, line, colors[2] as string)
      .on("mouseover", (event: any) => {
        return onLinkMouseOver(
          event,
          node,
          link,
          tooltip,
          colorin as string,
          colorout as string,
          colors[2] as string
        );
      })
      .on("mousemove", () => {
        return onMouseMove(tooltip);
      })
      .on("mouseout", (event: any) => {
        onNodeOrLinkMouseOut(link, node, tooltip, colors[2] as string);
      });
  };
  return (
    <>
      <div
        id="viz"
        className="w-full h-90vh flex justify-center items-center"
        style={{ height: "90vh" }} // Adjust the height based on your requirements
      />
      <div id="tooltip"></div>
    </>
  );
};

export default HierarchicalEdgeBundlingGraphView;
