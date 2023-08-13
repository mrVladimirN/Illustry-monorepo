import * as React from "react";
import ReactEcharts from "./echarts";
import { EChartsOption } from "echarts/types/dist/echarts";
import {
  computeCategoriesFLG,
  computeLinksFLG,
  computeNodesFLG,
} from "@/lib/visualizations/node-link/helper";

const ForcedLayoutGraphView = ({ data }: any) => {
  const { nodes, links } = data;
  const categories: { name: string }[] = computeCategoriesFLG(nodes);
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

    legend: {
      data: categories.map((cat) => {
        return cat.name;
      }),
      emphasis: {
        selectorLabel: {
          show: false,
          silent: true,
        },
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
    <div className="w-full mt-4 h-screens-90 sm:mt-6 lg:mt-8">
      <ReactEcharts
        option={option}
        className="w-full h-[90vh] sm:h-120 lg:h-160"
      />
    </div>
  );
};
export default ForcedLayoutGraphView;
