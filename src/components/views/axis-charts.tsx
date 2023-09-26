import * as React from "react";
import ReactEcharts from "./generic/echarts";
import { EChartsOption } from "echarts/types/dist/echarts";

import { AxisChartData } from "types/visualizations";
import { constructSeries } from "@/lib/visualizations/chart/helper";
import { SeriesOption } from "echarts";
interface AxisChartProp {
  data: AxisChartData;
  colors: string[];
  type: "line" | "bar";
}

const AxisChartView = ({ data, colors, type }: AxisChartProp) => {
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
    series: constructSeries(values, colors, false, type, false) as SeriesOption ,
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
export default AxisChartView;
