import * as React from "react";
import ReactEcharts from "./generic/echarts";
import { EChartsOption } from "echarts/types/dist/echarts";

import { ScatterData } from "types/visualizations";
import {
  computeCategoriesScatter,
  computeColors,
  computePoints,
} from "@/lib/visualizations/scatter/helper";
import { computeLegendColors } from "@/lib/visualizations/calendar/helper";
import Legend from "../ui/legend";

interface ScatterProp {
  data: ScatterData;
  colors: string[];
  isDarkTheme: boolean;
}

const ScatterView = ({ data, colors, isDarkTheme }: ScatterProp) => {
  const textColor = isDarkTheme ? "#888" : "#333";
  const { points } = data;
  const categories = computeCategoriesScatter(points);
  const option: EChartsOption = {
    tooltip: {
      formatter: "<b>({c})</b>",
      axisPointer: {
        type: "cross",
        lineStyle: {
          type: "dashed",
          width: 1,
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
        type: "value",
        scale: true,

        splitLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        scale: true,
        splitLine: {
          show: false,
        },
      },
    ],
    visualMap: {
      show: false,
      orient: "horizontal",
      left: "center",
      top: 30,
      type: "piecewise",
      categories: categories,
      textStyle: {
        color: textColor,
      },
      inRange: { color: computeColors(categories, colors) },
    },
    series: [
      {
        type: "scatter",
        emphasis: {
          focus: "series",
        },
        data: computePoints(points),
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
export default ScatterView;
