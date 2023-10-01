"use client";
import { EChartsOption } from "echarts";
import React from "react";
import { HierarchyData } from "types/visualizations";
import ReactEcharts from "./generic/echarts";
import {
  computeCategories,
  computeNodesHierarchy,
} from "@/lib/visualizations/hierarchy-charts/helper";

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
    <div className="w-full mt-4 h-screens-90 sm:mt-6 lg:mt-8">
      <ReactEcharts
        option={option}
        className="w-full h-[90vh] sm:h-120 lg:h-160"
      />
    </div>
  );
};

export default SunburstView;
