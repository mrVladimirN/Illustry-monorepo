import { colors } from "@/config/theme1";
import { Link, Node } from "@/types";
export const computeCategories = (nodes: Node[]) => {
  return [
    ...new Set(
      nodes.map((node) => {
        return node.category;
      })
    ),
  ];
};

export const computeNodes = (nodes: Node[]) => {
  const colorMapSchema = new Map<string, string>();
  computeCategories(nodes).forEach((cat, index) => {
    colorMapSchema.set(cat, colors[index] as string);
  });
  return nodes.map((node) => {
    return {
      name: node.name,
      itemStyle: {
        color: colorMapSchema.get(node.category),
        borderColor: colorMapSchema.get(node.category),
      },
      prop: createPropertiesForToolTip(node.properties),
    };
  });
};

export const computeLinks = (links: Link[]) => {
  return links.map((link, index) => {
    return {
      source: link.source,
      target: link.target,
      value: link.value,
      prop: createPropertiesForToolTip(link.properties, link.value),
    };
  });
};
const createPropertiesForToolTip = (
  properties: any,
  value?: number | string
) => {
  let prop = "";

  if (typeof properties === "object") {
    for (const key in properties) {
      if (Object.hasOwnProperty.call(properties, key)) {
        const propValue = properties[key];
        prop += `<div style="font-weight: bold">${key}:${propValue}</div>`;
      }
    }

    if (value) {
      prop += `<div style="font-weight: bold">value:${value}</div>`;
    }
  } else if (typeof properties === "string") {
    if (value) {
      prop +=
        properties + `<div style="font-weight: bold">value:${value}</div>`;
    } else {
      prop += properties;
    }
  } else if (value) {
    prop += `<div style="font-weight: bold">value:${value}</div>`;
  }

  return prop;
};
