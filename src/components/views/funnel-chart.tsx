import * as React from "react";
import ReactEcharts from "./generic/echarts";
import { EChartsOption } from "echarts/types/dist/echarts";
import { FunnelData } from "types/visualizations";
import {
  computeLegendColors,
  computeValues,
} from "@/lib/visualizations/pieFunnel/helper";
import Legend from "../ui/legend";

interface FunnelProp {
  data: FunnelData;
  colors: string[];
}

const FunnelView = ({ data, colors }: FunnelProp) => {
  const option: EChartsOption = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "funnel",
        minSize: "0%",
        maxSize: "100%",
        gap: 2,
        label: {
          show: true,
          position: "inside",
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: "solid",
          },
        },
        emphasis: {
          label: {
            fontSize: 20,
          },
        },
        data: computeValues(data, colors),
      },
    ],
  };
  return (
    <div className="relative mt-[4%] flex flex-col items-center">
      <Legend legendData={computeLegendColors(data, colors)} />
      <div className="w-full mt-4 h-[80vh]">
        <ReactEcharts option={option} className="w-full h-full" />
      </div>
    </div>
  );
};
export default FunnelView;
