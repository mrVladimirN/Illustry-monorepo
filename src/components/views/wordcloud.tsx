import * as React from "react";
import ReactEcharts from "./generic/echarts";
import {
  EChartsOption,
  WordCloudSeriesOption,
} from "echarts/types/dist/echarts";
import { computeWords,computePropertiesForToolTip } from "@/lib/visualizations/word-cloud/utils";

const WordCloudView = ({ data }: any) => {
  const { words } = data;
  const option: EChartsOption = {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      //@ts-ignore
      formatter: function (params) {
        //@ts-ignore
        return computePropertiesForToolTip(
          //@ts-ignore
          params.data.properties,
          //@ts-ignore
          params.data.value
        );
      },
    },
    series: [
      {
        type: "wordCloud",
        shape: "circle",
        data: computeWords(words),
        keepAspect: true,
        left: "center",
        top: "center",
        width: "100%",
        height: "100%",
        right: null,
        bottom: null,

        sizeRange: [50, 70],

        gridSize: 8,

        emphasis: {
          focus: "self",

          textStyle: {
            textShadowBlur: 10,
            textShadowColor: "#333",
          },
        },
      },
    ] as WordCloudSeriesOption,
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
export default WordCloudView;
