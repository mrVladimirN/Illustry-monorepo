import { colors } from "@/config/theme1";
import { Link, Node } from "@/types";

//Sankey transformers
export const computeCategoriesSankey = (nodes: Node[]) => {
  return [
    ...new Set(
      nodes.map((node) => {
        return node.category;
      })
    ),
  ];
};

export const computeNodesSankey = (nodes: Node[], categories: string[]) => {
  const colorMapSchema = new Map<string, string>();
  categories.forEach((cat, index) => {
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

export const computeLinksSankey = (links: Link[]) => {
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

// FLG transformers

export const computeCategoriesFLG = (nodes: Node[]) => {
  return [
    ...new Set(
      nodes.map((node) => {
        return node.category;
      })
    ),
  ].map((node) => {
    return { name: node };
  });
};

export const constructLegendTextColor = (
  categories: {
    name: string;
  }[]
) => {

};
export const computeNodesFLG = (
  nodes: Node[],
  categories: {
    name: string;
  }[]
) => {
  return nodes.map((node, index) => {
    const categoryIndex = categories.findIndex(
      (category) => category.name === node.category
    );
    return {
      id: index.toString(),
      name: node.name,
      category: categoryIndex,
      
    };
  });
};

export const computeLinksFLG = (
  links: Link[],
  nodes: {
    id: string;
    name: string | undefined;
    category: number;
  }[]
) => {
  return links.map((link, index) => {
    const source = nodes.findIndex((node) => node.name === link.source);
    const target = nodes.findIndex((node) => node.name === link.target);
    return {
      source: source,
      target: target,
      value: link.value,
      prop: createPropertiesForToolTip(link.properties, link.value),
    };
  });
};
