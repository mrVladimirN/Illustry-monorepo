"use client";
import * as React from "react";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";

const SankeyGraphView = ({ data }: any) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      myChart.hideLoading();
      const { nodes, links } = data;

      const option = {
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
          //@ts-ignore
          formatter: function (params) { 
            //@ts-ignore
            return params.data.prop;
          },
        },
        legend: {},
        animation: false,
        emphasis: {
          focus: "adjacency",
          lineStyle: {
            width: 3,
          },
        },
        series: [
          {
            type: "sankey",
            emphasis: {
              focus: "adjacency",
            },
            nodeAlign: "right",
            data: nodes,
            links: links,
            lineStyle: {
              color: "source",
              curveness: 0.5,
            },
          },
        ],
      };

      myChart.setOption(
        option as echarts.EChartOption | echarts.EChartsResponsiveOption,
        true,
        true
      );

      return () => {
        myChart.dispose();
      };
    }
  }, [data]);

  return (
    <>
      <div
        ref={chartRef}
        className="w-full"
        style={{ height: "70vh" }} // Adjust the height based on your requirements
      />
    </>
  );
};

export default SankeyGraphView;
