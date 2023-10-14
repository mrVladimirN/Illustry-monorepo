import * as React from "react";
import ReactEcharts from "./generic/echarts";
import { EChartsOption } from "echarts/types/dist/echarts";
import {
  computeCategoriesSankey,
  computeLinksSankey,
  computeNodesSankey,
} from "@/lib/visualizations/node-link/helper";
import { NodeLinkData } from "types/visualizations";
import { computeLegendColors } from "@/lib/visualizations/calendar/helper";
import Legend from "../ui/legend";
interface SankeyGraphProp {
  data: NodeLinkData;
  colors: string[];
}

const SankeyGraphView = ({ data, colors }: SankeyGraphProp) => {
  const { nodes, links } = data;
  const categories: string[] = computeCategoriesSankey(nodes);
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
        data: computeNodesSankey(nodes, categories, colors),
        links: computeLinksSankey(links),
        lineStyle: {
          color: "source",
          curveness: 0.5,
        },
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
export default SankeyGraphView;
