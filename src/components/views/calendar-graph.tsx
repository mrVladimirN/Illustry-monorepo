import * as React from "react";
import ReactEcharts from "./generic/echarts";
import { EChartsOption, SeriesOption } from "echarts/types/dist/echarts";
import {  computeCalendar, computeCategoriesCalendar, computeColors, computeElementsCalendar, computePropertiesForToolTip } from "@/lib/visualizations/calendar/helper";
import { CalendarOption } from "echarts/types/dist/shared";
import { CalendarData } from "@/types";

const CalendarGraph = ({ data }: any) => {
  const { calendar } = data;
  const categories: string[] = computeCategoriesCalendar(calendar);
  const computedCalendar = computeCalendar(calendar)
  const option: EChartsOption = {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
   
      formatter: function (params) {
        //@ts-ignore
        if(params && params.data && params.data.length) {
          const element = (calendar as CalendarData[]).find(el => {
             //@ts-ignore
            return el.date === params.data[0]
          })
          if(element) {
            if(element.properties) {
            return computePropertiesForToolTip(element.properties, element.value)
          }
          else 
          {
            return computePropertiesForToolTip(null, element.value)
          }
          }
        }
        return ""
        } 
    },
    visualMap: {
      orient: 'horizontal',
      left: 'center',
      top: 30,
      type: 'piecewise',
      categories:  categories,
      inRange: { color:  computeColors(categories) }
    },
    calendar:  computedCalendar.calendar as CalendarOption ,
    series: computedCalendar.series as SeriesOption
  };
  return (
    <div className="w-full mt-4 h-screens-90 sm:mt-6 lg:mt-8">
      <ReactEcharts
        option={option}
        className="w-full h-[100vh] sm:h-120 lg:h-160"
      />
    </div>
  );
};
export default CalendarGraph;
