"use client";
import * as React from "react";
 
import { EChartsOption } from "echarts/types/dist/echarts";
import {
  computeCategoriesFLG,
  computeLinksFLG,
  computeNodesFLG,
} from "@/lib/visualizations/node-link/helper";
import { NodeLinkData } from "types/visualizations";
import { computeLegendColors } from "@/lib/visualizations/calendar/helper";
import Legend from "../ui/legend";
import { with_legend, with_options } from "@/lib/types/utils";
import { useThemeColors } from "../theme-provider";
import ReactEcharts from "./generic/echarts";
interface ForcedLayoutGraphProp extends with_legend, with_options {
  data: NodeLinkData;
}
const ForcedLayoutGraphView = ({
  data,
  legend,
  options,
}: ForcedLayoutGraphProp) => {
  const activeTheme = useThemeColors();
  const theme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : "light";
  const isDarkTheme = theme === "dark";
  const colors = isDarkTheme
    ? activeTheme.flg.dark.colors
    : activeTheme.flg.light.colors;

  const { nodes, links } = data;
  const categories: {
    name: string;
    itemStyle: { color: string | undefined };
  }[] = computeCategoriesFLG(nodes, colors);

  const option: EChartsOption = {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      //@ts-ignore
      formatter: function (params) {
        //@ts-ignore
        return params.data.prop;
      },
    },

    series: [
      {
        type: "graph",
        layout: "force",
        animation: false,
        label: {
          position: "right",
          formatter: "{b}",
        },
        draggable: true,
        data: computeNodesFLG(nodes, categories),
        categories: categories,
        force: {
          initLayout: "circular",
          edgeLength: 300,
          repulsion: 20,
          gravity: 0.2,
        },
        emphasis: {
          focus: "adjacency",
          lineStyle: {
            width: 3,
          },
        },
        edges: computeLinksFLG(links, nodes),
      },
    ],
  };
  return (
    <div className="relative mt-[4%] flex flex-col items-center">
      {legend && (
        <Legend
          legendData={computeLegendColors(
            categories.map((category) => {
              return category.name;
            }),
            colors
          )}
        />
      )}
      <div className="w-full mt-4 h-[80vh]">
        <ReactEcharts option={option} className="w-full h-full" />
      </div>
    </div>
  );
};
export default ForcedLayoutGraphView;
