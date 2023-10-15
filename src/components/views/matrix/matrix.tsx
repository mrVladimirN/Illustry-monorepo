"use client";
import React, { useEffect, useRef, useState } from "react";
import { select } from "d3";
import { NodeLinkData, Node } from "types/visualizations";
import {
  addStyleTooltipWithHover,
  categoryMap,
  createHeadersAndPropertiesString,
  sortColumns,
  sortRows,
} from "@/lib/visualizations/node-link/helper";
import { with_legend, with_options } from "@/lib/types/utils";
interface MatrixProp extends with_legend, with_options {
  data: NodeLinkData;
  colors: string[];
}

const MatrixView = ({ data, colors, legend, options }: MatrixProp) => {
  const tableRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.innerHTML = createMatrix(data, colors);
      sortRows();
      sortColumns();
      addStyleTooltipWithHover();
    }

    return () => {
      select("showData").remove();
    };
  }, [data, JSON.stringify(colors)]);

  const createMatrix = (data: NodeLinkData, colors: string[]) => {
    const categories = categoryMap(data.nodes);
    const categoriesKeys: string[] = Object.keys(categories);

    if (categoriesKeys.length !== 2) {
      throw new Error("categories object must have exactly 2 keys");
    }

    const tableString =
      ` <table id ="myTable" style= "border-spacing: 0;width: 100%;border: 1px solid #ddd ; margin-top:5%">` +
      createHeadersAndPropertiesString(
        categories[categoriesKeys[0] as string] as Node[],
        categories[categoriesKeys[1] as string] as Node[],
        data.links
      );
    return tableString;
  };
  return <div ref={tableRef}></div>;
};

export default MatrixView;
