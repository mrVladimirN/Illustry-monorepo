import _ from "lodash";
import { Node, Link } from "types/visualizations";

export const nodeLinkTransformer = (
  mapping: Record<string, unknown>,
  values: Record<string, unknown>,
  allFileDetails: boolean
) => {
  const baseValues = {
    category: values[_.toNumber(mapping.categories)],
    name: values[_.toNumber(mapping.nodes)],
    properties: values[_.toNumber(mapping.properties)],
    source: values[_.toNumber(mapping.sources)],
    target: values[_.toNumber(mapping.targets)],
    value: values[_.toNumber(mapping.values)],
  };
  const visualizationDetails = {
    visualizationName:
      values[_.toNumber(mapping.visualizationName)] &&
      typeof values[_.toNumber(mapping.visualizationName)] === "string" &&
      !_.isEmpty(values[_.toNumber(mapping.visualizationName)])
        ? values[_.toNumber(mapping.visualizationName)]
        : undefined,
    visualizationDescription:
      values[_.toNumber(mapping.visualizationDescription)] &&
      typeof values[_.toNumber(mapping.visualizationDescription)] === "string"
        ? values[_.toNumber(mapping.visualizationDescription)]
        : undefined,
    visualizationTags:
      values[_.toNumber(mapping.visualizationTags)] &&
      typeof values[_.toNumber(mapping.visualizationTags)] === "string"
        ? values[_.toNumber(mapping.visualizationTags)]
        : undefined,
  };
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
      if (!_.isNil(name) && !_.isNil(category)) {
        node = (result.nodes as Node[]).find((n: Node) => n.name === name);
      }
      if (!node) {
        node = { name, category, properties } as Node;
        (result.nodes as Node[]).push(node);
      }

      if (!_.isNil(source) && !_.isNil(target) && !_.isNil(value)) {
        link = { source, target, value } as Link;
        (result.links as Link[]).push(link);
      }
      return result;
    },
    { nodes: [], links: [] }
  );
  return transformedData;
};
