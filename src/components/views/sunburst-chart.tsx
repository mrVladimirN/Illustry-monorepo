"use client";
import { EChartsOption } from "echarts";
import React from "react";
import { HierarchyData } from "types/visualizations";
import ReactEcharts from "./generic/echarts";
import {
  computeCategories,
  computeNodesHierarchy,
} from "@/lib/visualizations/hierarchy-charts/helper";
import Legend from "../ui/legend";
import { computeLegendColors } from "@/lib/visualizations/calendar/helper";
import { with_legend, with_options } from "@/lib/types/utils";

interface SunburstViewProp extends with_legend, with_options {
  data: HierarchyData;
  colors: string[];
}

const SunburstView = ({ data, colors, legend, options }: SunburstViewProp) => {
  const { nodes } = data;
  const categories = computeCategories(nodes);
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
        type: "sunburst",
        data: computeNodesHierarchy(nodes, categories, colors),
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

export default SunburstView;
