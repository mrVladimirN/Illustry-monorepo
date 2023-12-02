"use client";
import * as React from "react";
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
import { with_legend, with_options } from "@/lib/types/utils";
import { useThemeColors } from "../theme-provider";
import ReactEcharts from "./generic/echarts";
interface CalendarGraphProp extends with_legend, with_options {
  data: CalendarData;
}
const CalendarGraphView = ({ data, legend, options }: CalendarGraphProp) => {
  const activeTheme = useThemeColors();
  const theme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : "light";
  const isDarkTheme = theme === "dark";
  const colors = isDarkTheme
    ? activeTheme.calendar.dark.colors
    : activeTheme.calendar.light.colors;
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
  const canvasHeight = `${computedCalendar.calendar.length * 35}vh`;
  return (
    <div className="relative mt-[4%] flex flex-col items-center">
      {legend && (
        <Legend legendData={computeLegendColors(categories, colors)} />
      )}
      <div className="w-full h-full">
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
