
import { toStringWithDefault, visualizationDetailsExtractor } from '../../../../utils/helper';
import { VisualizationTypes } from '@illustry/types';

const computeChildren = (
  values: unknown[],
  mapping: Record<string, unknown>
): string[] => {
  const children: string[] = [];
  (mapping.children as string).split(',').forEach((row) => {
    if (
      typeof values[Number(row)] === 'string'
      && Number.isNaN(Number(values[Number(row)]))
    ) {
      children.push(values[Number(row)] as string);
    }
  });
  return children;
};

const hierarchyTransformer = (
  mapping: Record<string, unknown>,
  values: string[] | number[],
  allFileDetails: boolean
) => {
  const baseValues = {
    name:
      typeof values[Number(mapping.names)] === 'string'
        ? values[Number(mapping.names)]
        : toStringWithDefault(values[Number(mapping.names)]),
    value:
      typeof values[Number(mapping.values)] === 'string'
        ? +(values[Number(mapping.values)] as string)
        : values[Number(mapping.values)],
    category:
      typeof values[Number(mapping.categories)] === 'string'
        ? values[Number(mapping.categories)]
        : toStringWithDefault(values[Number(mapping.categories)]),
    children: computeChildren(values, mapping),
    properties:
      typeof values[Number(mapping.properties)] === 'string'
        ? values[Number(mapping.properties)]
        : toStringWithDefault(values[Number(mapping.properties)])
  };
  const visualizationDetails = visualizationDetailsExtractor(mapping, values);
  return allFileDetails
    ? {
      ...{ nodes: baseValues },
      ...visualizationDetails
    }
    : { nodes: baseValues };
};

const hierarchyExtractorCsvOrExcel = (
  data: Record<string, unknown>[]
): VisualizationTypes.HierarchyData => {
  const result: VisualizationTypes.HierarchyNode[] = [];

  const transformItem = (item: VisualizationTypes.HierarchyNode): VisualizationTypes.HierarchyNode => {
    const newItem: VisualizationTypes.HierarchyNode = {
      name: item.name,
      value: item.value,
      category: item.category,
      properties: item.properties
    };

    if (item.children && item.children.length > 0) {
      newItem.children = item.children
        .map((childName) => {
          const child = data.find(
            (d) => (d.nodes as VisualizationTypes.HierarchyNode).name
              === (childName as unknown as string)
          );
          if (child) {
            return transformItem(child.nodes as VisualizationTypes.HierarchyNode);
          }
          return null;
        })
        .filter(Boolean) as VisualizationTypes.HierarchyNode[];
    }
    if (newItem.children?.length === 0) {
      delete newItem.children;
    }
    return newItem;
  };

  const findItem = (item: VisualizationTypes.HierarchyNode, targetName: string): boolean => {
    if (item.name === targetName) {
      return true;
    }
    return (item.children
      && item.children.some((child) => findItem(child, targetName))) as boolean;
  };

  const findParentGroup = (
    groups: VisualizationTypes.HierarchyNode[],
    targetName: string
  ): VisualizationTypes.HierarchyNode | null => {
    for (const group of groups) {
      if (findItem(group, targetName)) {
        return group;
      }
    }
    return null;
  };

  data.forEach((item) => {
    const isChild = result.some((group) => (group.children as VisualizationTypes.HierarchyNode[])
      .some((child) => findItem(child, (item.nodes as VisualizationTypes.HierarchyNode).name)));

    if (!isChild) {
      const transformedItem = transformItem(item.nodes as VisualizationTypes.HierarchyNode);

      const parentGroup = findParentGroup(
        result,
        (item.nodes as VisualizationTypes.HierarchyNode).name
      );
      if (parentGroup) {
        (parentGroup.children as VisualizationTypes.HierarchyNode[]).push(transformedItem);
      } else {
        result.push(transformedItem);
      }
    }
  });

  return { nodes: result };
};

const hierarchyNodeExtractorXml = (
  nodes: Record<string, unknown>[]
): Record<string, unknown>[] => nodes.map((node: Record<string, unknown>) => ({
  name: (node.name as string[])[0],
  category: (node.category as string[])[0],
  value: +(node.value as string[])[0],
  properties:
      node.properties && (node.properties as Record<string, unknown>[]).length
        ? (node.properties as string[])[0]
        : undefined,
  children:
      node.children && (node.children as Record<string, unknown>[]).length > 0
        ? hierarchyNodeExtractorXml(node.children as Record<string, unknown>[])
        : undefined
}));

const hierarchyExtractorXml = (
  xmlData: Record<string, unknown>,
  allFileDetails: boolean
) => {
  const {
    name, description, tags, type, data, nodes
  } = xmlData.root as Record<string, unknown>;
  const finalData = {
    data: {
      nodes: allFileDetails
        ? hierarchyNodeExtractorXml(
          ((data as Record<string, unknown>[])[0].nodes) as Record<string, unknown>[]
        )
        :hierarchyNodeExtractorXml(nodes as Record<string, unknown>[])
    }
  };
  return allFileDetails
    ? {
      ...finalData,
      ...{
        name: (name as string[])[0] as string,
        description: (description as string[])[0] as string,
        tags: tags as string[],
        type: type as string
      }
    }
    : finalData;
};

export { hierarchyTransformer, hierarchyExtractorXml, hierarchyExtractorCsvOrExcel }