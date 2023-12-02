import _ from "lodash";
import { visualizationDetailsExtractor } from "../../../utils/helper";
import { HierarchyNode, HierarchyData } from "types/visualizations";
const computeChildren = (
  values: unknown[],
  mapping: Record<string, unknown>
): string[] => {
  const children: string[] = [];
  (mapping.children as string).split(",").forEach((row) => {
    if (typeof values[_.toNumber(row)] === "string" &&
    isNaN(_.toNumber(values[_.toNumber(row)]))) {
      children.push(values[_.toNumber(row)] as string);
    }
  });
  return children;
};
export const hierarchyTransformer = (
  mapping: Record<string, unknown>,
  values: unknown[],
  allFileDetails: boolean
) => {
  const baseValues = {
    name: values[_.toNumber(mapping.names)],
    value:
      typeof values[_.toNumber(mapping.values)] === "string"
        ? +(values[_.toNumber(mapping.values)] as string)
        : values[_.toNumber(mapping.values)],
    category: values[_.toNumber(mapping.categories)],
    children: computeChildren(values, mapping),
    properties: values[_.toNumber(mapping.properties)],
  };
  const visualizationDetails = visualizationDetailsExtractor(mapping, values);
  return allFileDetails
    ? {
        ...{ nodes: baseValues },
        ...visualizationDetails,
      }
    : { nodes: baseValues };
};

export const hierarchyExtractor = (
  data: Record<string, unknown>[]
): HierarchyData => {
  const result: HierarchyNode[] = [];

  const transformItem = (item: HierarchyNode): HierarchyNode => {
    const newItem: HierarchyNode = {
      name: item.name,
      value: item.value,
      category: item.category,
      properties: item.properties,
    };

    if (item.children && item.children.length > 0) {
      newItem.children = item.children
        .map((childName) => {
          const child = data.find(
            (d) =>
              (d.nodes as HierarchyNode).name ===
              (childName as unknown as string)
          );
          if (child) {
            return transformItem(child.nodes as HierarchyNode);
          }
          return null;
        })
        .filter(Boolean) as HierarchyNode[];
    }
    if (newItem.children?.length === 0) {
      delete newItem.children;
    }
    return newItem;
  };

  const findItem = (item: HierarchyNode, targetName: string): boolean => {
    if (item.name === targetName) {
      return true;
    }
    return (item.children &&
      item.children.some((child) => findItem(child, targetName))) as boolean;
  };

  const findParentGroup = (
    groups: HierarchyNode[],
    targetName: string
  ): HierarchyNode | null => {
    for (const group of groups) {
      if (findItem(group, targetName)) {
        return group;
      }
    }
    return null;
  };

  data.forEach((item) => {
    const isChild = result.some((group) =>
      (group.children as HierarchyNode[]).some((child) =>
        findItem(child, (item.nodes as HierarchyNode).name)
      )
    );

    if (!isChild) {
      const transformedItem = transformItem(item.nodes as HierarchyNode);

      const parentGroup = findParentGroup(
        result,
        (item.nodes as HierarchyNode).name
      );
      if (parentGroup) {
        (parentGroup.children as HierarchyNode[]).push(transformedItem);
      } else {
        result.push(transformedItem);
      }
    }
  });

  return { nodes: result };
};
