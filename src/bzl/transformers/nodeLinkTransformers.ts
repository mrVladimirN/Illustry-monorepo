import _ from "lodash";
import { visualizationDetailsExtractor } from "../../utils/helper";
import { Node, Link } from "types/visualizations";

export const nodeLinkTransformer = (
  mapping: Record<string, unknown>,
  values: Record<string, unknown>,
  allFileDetails: boolean
) => {
  const baseValues = {
    name: values[_.toNumber(mapping.nodes)],
    category: values[_.toNumber(mapping.categories)],
    properties: values[_.toNumber(mapping.properties)],
    source: values[_.toNumber(mapping.sources)],
    target: values[_.toNumber(mapping.targets)],
    value: values[_.toNumber(mapping.values)],
  };
  const visualizationDetails = visualizationDetailsExtractor(mapping, values);
  return allFileDetails
    ? { ...{ nodeLink: baseValues }, ...visualizationDetails }
    : { nodeLink: baseValues };
};

export const nodesLinksExtractor = (data: Record<string, unknown>[]) => {
  const transformedData = data.reduce(
    (result, item) => {
      const nodeLink = item.nodeLink;
      let node;
      let link;
      const { category, name, properties, source, target, value } =
        nodeLink as Record<string, unknown>;
      node = (result.nodes as Node[]).find((n: Node) => n.name === name);
      link = (result.links as Link[]).find(
        (n: Link) => n.source === source && n.target === target
      );
      if (_.isNil(node)) {
        node = { name, category, properties } as Node;
        if (!_.isNil(node.name) && !_.isNil(node.category)) {
          (result.nodes as Node[]).push(node);
        }
      }
      if (_.isNil(link)) {
        link = { source, target, value } as Link;
        if (
          !_.isNil(link.source) &&
          !_.isNil(link.target) &&
          !_.isNil(link.value)
        ) {
          (result.links as Link[]).push(link);
        }
      }
      return result;
    },
    { nodes: [], links: [] }
  );
  return transformedData;
};
