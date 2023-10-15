"use client";
import { EChartsOption } from "echarts";
import React from "react";
import { HierarchyData } from "types/visualizations";
import ReactEcharts from "./generic/echarts";
import {
  computeMaxDepth,
  createLevels,
  computeCategories,
  computeNodesHierarchy,
  calculateMeanValue,
  computeUniqueValues,
} from "@/lib/visualizations/hierarchy-charts/helper";
import Legend from "../ui/legend";
import { computeLegendColors } from "@/lib/visualizations/calendar/helper";
import { with_legend, with_options } from "@/lib/types/utils";
import { useThemeColors } from "../theme-provider";

interface TreeMapProp extends with_legend, with_options {
  data: HierarchyData;
}

const TreeMapView = ({ data, legend, options }: TreeMapProp) => {
  const activeTheme = useThemeColors();
  const theme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : "light";
  const isDarkTheme = theme === "dark";
  const colors = isDarkTheme
    ? activeTheme.treeMap.dark.colors
    : activeTheme.treeMap.light.colors;

  const { nodes } = data;
  const categories = computeCategories(nodes);
  const maxDepth = computeMaxDepth(nodes);
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
        type: "treemap",
        visibleMin: calculateMeanValue(computeUniqueValues(nodes)),
        data: computeNodesHierarchy(nodes, categories, colors),
        leafDepth: maxDepth,
        levels: createLevels(2),
      },
    ],
  };
  return (
    <div className="relative mt-[4%] flex flex-col items-center">
      {legend && (
        <Legend legendData={computeLegendColors(categories, colors)} />
      )}
      <div className="w-full mt-4 h-[80vh]">
        <ReactEcharts option={option} className="w-full h-full" />
      </div>
    </div>
  );
};

export default TreeMapView;
