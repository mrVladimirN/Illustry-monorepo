import * as React from "react";
import ReactEcharts from "./echarts";
import { EChartsOption } from "echarts/types/dist/echarts";
import {
  computeCategories,
  computeLinks,
  computeNodes,
} from "@/lib/visualizations/node-link/helper";

const SankeyGraphView = ({ data }: any) => {
  const { nodes, links } = data;
  const categories: string[] = computeCategories(nodes);
  const option: EChartsOption = {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      formatter: function (params) {
        return params.data.prop;
      },
    },
    legend: [
      {
        data: categories,
      },
    ],
    animation: false,
    emphasis: {
      focus: "adjacency",
      lineStyle: {
        width: 3,
      },
    },
    series: [
      {
        type: "sankey",
        emphasis: {
          focus: "adjacency",
        },
        nodeAlign: "right",
        data: computeNodes(nodes),
        links: computeLinks(links),
        lineStyle: {
          color: "source",
          curveness: 0.5,
        },
      },
    ],
  };
  return (
    <div className="w-full mt-4 h-screens-90 sm:mt-6 lg:mt-8">
       <ReactEcharts option={option} className="w-full h-[90vh] sm:h-120 lg:h-160" />
    </div>
  );
};
export default SankeyGraphView;
