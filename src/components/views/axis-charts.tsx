import * as React from "react";
import ReactEcharts from "./generic/echarts";
import { EChartsOption } from "echarts/types/dist/echarts";

import { AxisChartData } from "types/visualizations";
import {
  computeLegendColors,
  constructSeries,
} from "@/lib/visualizations/chart/helper";
import { SeriesOption } from "echarts";
import Legend from "../ui/legend";
import { with_legend, with_options } from "@/lib/types/utils";
interface AxisChartProp extends with_legend, with_options {
  data: AxisChartData;
  colors: string[];
  type: "line" | "bar";
}

const AxisChartView = ({
  data,
  colors,
  type,
  legend,
  options,
}: AxisChartProp) => {
  const { headers, values } = data;
  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },

    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: type === "line" ? false : true,
        data: headers,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: constructSeries(values, colors, false, type, false) as SeriesOption,
  };
  return (
    <div className="relative mt-[4%] flex flex-col items-center">
      {legend && <Legend legendData={computeLegendColors(data, colors)} />}
      <div className="w-full mt-4 h-[80vh]">
        <ReactEcharts option={option} className="w-full h-full" />
      </div>
    </div>
  );
};
export default AxisChartView;
