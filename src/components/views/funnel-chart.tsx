import * as React from "react";
import ReactEcharts from "./generic/echarts";
import { EChartsOption } from "echarts/types/dist/echarts";
import { FunnelData } from "types/visualizations";
import { computeValues } from "@/lib/visualizations/pieFunnel/helper";

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
        minSize: '0%',
        maxSize: '100%',
        gap: 2,
        label: {
          show: true,
          position: 'inside'
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        emphasis: {
          label: {
            fontSize: 20
          }
        },
        data: computeValues(data, colors),
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
export default FunnelView;
