import { VisualizationTypes } from '@illustry/types';

interface ProcessedNode {
  name: string;
  value: number,
  itemStyle: {
    color?: string;
    borderColor?: string;
  };
  prop: object;
  children: ProcessedNode[];
}
// TreeMap/Sunburst

const findMaxDepth = (item: VisualizationTypes.HierarchyNode, depth: number, maxDepth: number): number => {
  let finalMaxDepth = maxDepth;
  if (Array.isArray(item.children)) {
    // If the 'children' property is an array, recursively find the maximum depth
    item.children.forEach((nestedItem) => {
      finalMaxDepth = findMaxDepth(nestedItem, depth + 1, maxDepth);
    });
  } else {
    // If there are no children or 'children' is not an array, update maxDepth if needed
    finalMaxDepth = Math.max(maxDepth, depth);
  }
  return finalMaxDepth; // Return the updated maxDepth
};

export const computeMaxDepth = (arr: VisualizationTypes.HierarchyNode[]): number => {
  let maxDepth = 0;

  arr.forEach((item) => {
    // For each TreeMapNode in the array, call findMaxDepth to compute depth
    maxDepth = findMaxDepth(item, 1, maxDepth);
  });

  return maxDepth;
};

export const computeCategories = (arr: VisualizationTypes.HierarchyNode[]): string[] => {
  const uniqueCategories = new Set<string>();

  function extractCategories(item: VisualizationTypes.HierarchyNode) {
    uniqueCategories.add(item.category); // Add the category to the Set

    if (item.children) {
      // Recursively extract categories from children
      item.children.forEach((child) => extractCategories(child));
    }
  }

  arr.forEach((item) => {
    extractCategories(item); // Start extraction for each TreeMapNode
  });

  return Array.from(uniqueCategories); // Convert Set to an array
};
const computePropertiesForToolTip = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: any,
  value?: number | string
) => {
  let prop = '';

  if (typeof properties === 'object') {
    Object.entries(properties).forEach(([key]) => {
      if (Object.hasOwnProperty.call(properties, key)) {
        const propValue = properties[key];
        prop += `<div style="font-weight: bold">${key}:${propValue}</div>`;
      }
    });

    if (value) {
      prop += `<div style="font-weight: bold">value:${value}</div>`;
    }
  } else if (typeof properties === 'string') {
    if (value) {
      prop
        += `${properties}<div style="font-weight: bold">value:${value}</div>`;
    } else {
      prop += properties;
    }
  } else if (value) {
    prop += `<div style="font-weight: bold">value:${value}</div>`;
  }

  return prop;
};

export const computeNodesHierarchy = (
  nodes: VisualizationTypes.HierarchyNode[],
  categories: string[],
  colors: string[]
) => {
  const colorMapSchema = new Map<string, string>();
  categories.forEach((cat, index) => {
    colorMapSchema.set(cat, colors[index] as string);
  });
  const processNode = (node: VisualizationTypes.HierarchyNode) => {
    const processedNode: ProcessedNode = {
      name: node.name,
      value: node.value,
      itemStyle: {
        color: colorMapSchema.get(node.category),
        borderColor: colorMapSchema.get(node.category)
      },
      prop: computePropertiesForToolTip(node.properties, node.value) as unknown as object,
      children: []
    };

    if (node.children) {
      processedNode.children = node.children.map(processNode); // Recursively process children
    }

    return processedNode;
  };

  return nodes.map(processNode);
};

export const createLevels = (nr: number) => {
  const levels = [];

  // eslint-disable-next-line no-plusplus
  for (let i = nr; i > 0; i--) {
    const borderWidth = 2 * i;
    const gapWidth = 2 * i;
    const style = {
      colorSaturation: i === nr ? undefined : [0.3, 0.5],
      itemStyle: {
        borderColor: i === nr ? '#555' : undefined,
        borderColorSaturation: 1 - (i % 10),
        borderWidth,
        gapWidth
      }
    };
    levels.push(style);
  }

  return levels;
};
export const calculateMeanValue = (numbers: number[]) => {
  if (numbers.length === 0) {
    return 0; // Return 0 for an empty array (or you can handle this case differently)
  }

  const sum = numbers.reduce((total, num) => total + num, 0);
  const mean = sum / numbers.length;

  return mean;
};

export const computeUniqueValues = (arr: VisualizationTypes.HierarchyNode[]): number[] => {
  const uniqueCategories = new Set<number>();

  function extractValues(item: VisualizationTypes.HierarchyNode) {
    uniqueCategories.add(item.value); // Add the category to the Set

    if (item.children) {
      // Recursively extract categories from children
      item.children.forEach((child) => extractValues(child));
    }
  }

  arr.forEach((item) => {
    extractValues(item); // Start extraction for each TreeMapNode
  });

  return Array.from(uniqueCategories); // Convert Set to an array
};
