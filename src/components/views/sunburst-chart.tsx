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

interface SunburstViewProp {
  data: HierarchyData;
  colors: string[];
}

const SunburstView = ({ data, colors }: SunburstViewProp) => {
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
      <Legend legendData={computeLegendColors(categories, colors)} />
      <div className="w-full mt-4 h-[80vh]">
        <ReactEcharts option={option} className="w-full h-full" />
      </div>
    </div>
  );
};

export default SunburstView;
