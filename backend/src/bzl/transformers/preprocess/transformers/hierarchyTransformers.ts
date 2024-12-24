import { TransformerTypes, VisualizationTypes } from '@illustry/types';
import { toStringWithDefault, visualizationDetailsExtractor } from '../../../../utils/helper';

const computeChildren = (
  values: (string | number)[],
  children: string
): string[] => {
  const calculatedChildren: string[] = [];
  children.split(',').forEach((row) => {
    if (
      typeof values[+row] === 'string'
      && Number.isNaN(+values[+row])
    ) {
      calculatedChildren.push(values[+row] as string);
    }
  });
  return calculatedChildren;
};

const hierarchyTransformer = (
  mapping: { [key: string]: string },
  values: (string | number)[],
  allFileDetails: boolean
): TransformerTypes.FullNodesDetails | TransformerTypes.SimpleNodesDetails => {
  const {
    names, values: mValues, categories, properties, children
  } = mapping;
  const nodes: TransformerTypes.NodeType = {
    name:
      typeof values[+names] === 'string'
        ? values[+names] as string
        : toStringWithDefault(values[+names]),
    value:
      typeof values[+mValues] === 'string'
        ? +(values[+mValues] as string)
        : values[+mValues],
    category:
      typeof values[+categories] === 'string'
        ? values[+categories] as string
        : toStringWithDefault(values[+categories]),
    children: computeChildren(values, children),
    properties:
      typeof values[+properties] === 'string'
        ? values[+properties] as string
        : toStringWithDefault(values[+properties])
  };
  if (allFileDetails) {
    const { visualizationDescription, visualizationName, visualizationTags } = visualizationDetailsExtractor(mapping, values);
    const fullComputedNodes: TransformerTypes.FullNodesDetails = {
      nodes,
      visualizationDescription,
      visualizationName,
      visualizationTags
    };
    return fullComputedNodes;
  }
  return { nodes };
};

const hierarchyExtractorCsvOrExcel = (
  data: TransformerTypes.FullNodesDetails[] | TransformerTypes.SimpleNodesDetails[]
): VisualizationTypes.HierarchyData => {
  const result: VisualizationTypes.HierarchyNode[] = [];

  const transformItem = (item: TransformerTypes.NodeType): VisualizationTypes.HierarchyNode => {
    const {
      name, value, category, properties, children
    } = item;
    const newItem: VisualizationTypes.HierarchyNode = {
      name,
      value: +value,
      category,
      properties
    };

    if (children && children.length > 0) {
      newItem.children = children
        .map((childName) => {
          const child = data.find(
            (d) => d.nodes.name === childName
          );
          if (child) {
            return transformItem(child.nodes);
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

  // const findParentGroup = (
  //   groups: VisualizationTypes.HierarchyNode[],
  //   targetName: string
  // ): VisualizationTypes.HierarchyNode | undefined => groups.find((group) => findItem(group, targetName));

  data.forEach((item) => {
    const isChild = result.some((group) => {
      if (group.children) {
        return (group.children as VisualizationTypes.HierarchyNode[])
          .some((child) => findItem(child, item.nodes.name));
      }
      return false;
    });

    if (!isChild) {
      const transformedItem = transformItem(item.nodes);
      result.push(transformedItem);
    }
  });

  return { nodes: result };
};

const hierarchyNodeExtractorXml = (
  nodes: TransformerTypes.XMLHierarchyNode[]
): VisualizationTypes.HierarchyNode[] => nodes.map((node) => {
  const {
    name, category, value, properties, children
  } = node;
  const finalNode: VisualizationTypes.HierarchyNode = {
    name: name[0],
    category: category[0],
    value: +value[0]
  };
  if (properties) {
    finalNode.properties = properties;
  }
  if (children && children.length) {
    finalNode.children = hierarchyNodeExtractorXml(children);
  }
  return finalNode;
});

const hierarchyExtractorXml = (
  xmlData: TransformerTypes.XMLVisualizationDetails,
  allFileDetails: boolean
): VisualizationTypes.VisualizationCreate | { data: VisualizationTypes.HierarchyData } => {
  const {
    name, description, tags, type, data: rootData
  } = xmlData.root;
  const {
    nodes
  } = rootData[0] as TransformerTypes.XMLHierarchyData;
  const data = {
    data: {
      nodes: hierarchyNodeExtractorXml(nodes)
    }
  };
  if (allFileDetails) {
    return {
      ...data,
      ...{
        name: name[0],
        description: description ? description[0] : '',
        tags,
        type: type[0]
      }
    };
  }
  return data;
};

export { hierarchyTransformer, hierarchyExtractorXml, hierarchyExtractorCsvOrExcel };
