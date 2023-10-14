import * as React from "react";
import ReactEcharts from "./generic/echarts";
import { EChartsOption, SeriesOption } from "echarts/types/dist/echarts";
import {
  computeCalendar,
  computeCategoriesCalendar,
  computeColors,
  computeLegendColors,
  computePropertiesForToolTip,
} from "@/lib/visualizations/calendar/helper";
import { CalendarOption } from "echarts/types/dist/shared";
import { CalendarData, CalendarType } from "types/visualizations";
import Legend from "../ui/legend";

interface CalendarGraphProp {
  data: CalendarData;
  colors: string[];
  isDarkTheme: boolean;
}
const CalendarGraphView = ({
  data,
  colors,
  isDarkTheme,
}: CalendarGraphProp) => {
  const { calendar } = data;
  const categories: string[] = computeCategoriesCalendar(calendar);
  const computedCalendar = computeCalendar(calendar, isDarkTheme);
  const textColor = isDarkTheme ? "#888" : "#333";
  const option: EChartsOption = {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",

      formatter: function (params) {
        //@ts-ignore
        if (params && params.data && params.data.length) {
          const element = (calendar as CalendarType[]).find((el) => {
            //@ts-ignore
            return el.date === params.data[0];
          });
          if (element) {
            if (element.properties) {
              return computePropertiesForToolTip(
                element.properties,
                element.value
              );
            } else {
              return computePropertiesForToolTip(null, element.value);
            }
          }
        }
        return "";
      },
    },
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

    calendar: computedCalendar.calendar as CalendarOption,
    series: computedCalendar.series as SeriesOption,
  };
  const canvasHeight = `${computedCalendar.calendar.length * 17.5}vh`;
  return (
    <div className="relative mt-[4%] flex flex-col items-center">
      <Legend legendData={computeLegendColors(categories, colors)} />
      <div className="w-full w-full">
        <ReactEcharts
          option={option}
          className="w-full sm:h-120 lg:h-160"
          style={{
            height: canvasHeight,
          }}
        />
      </div>
    </div>
  );
};
export default CalendarGraphView;
