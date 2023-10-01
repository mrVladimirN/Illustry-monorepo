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

interface TreeMapProp {
  data: HierarchyData;
  colors: string[];
}

const TreeMapView = ({ data, colors }: TreeMapProp) => {
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
    <div className="w-full mt-4 h-screens-90 sm:mt-6 lg:mt-8">
      <ReactEcharts
        option={option}
        className="w-full h-[90vh] sm:h-120 lg:h-160"
      />
    </div>
  );
};

export default TreeMapView;
