import _ from "lodash";
import { Node, Link, NodeLinkData } from "types/visualizations";
import { visualizationDetailsExtractor } from "../../../../utils/helper";

export const nodeLinkTransformer = (
  mapping: Record<string, unknown>,
  values: unknown[],
  allFileDetails: boolean
) => {
  const baseValues = {
    name: values[_.toNumber(mapping.nodes)],
    category: values[_.toNumber(mapping.categories)],
    properties: values[_.toNumber(mapping.properties)],
    source: values[_.toNumber(mapping.sources)],
    target: values[_.toNumber(mapping.targets)],
    value:
      typeof values[_.toNumber(mapping.values)] === "string"
        ? +(values[_.toNumber(mapping.values)] as string)
        : values[_.toNumber(mapping.values)],
  };
  const visualizationDetails = visualizationDetailsExtractor(mapping, values);
  return allFileDetails
    ? { ...{ nodeLink: baseValues }, ...visualizationDetails }
    : { nodeLink: baseValues };
};

export const nodesLinksExtractorCsvOrExcel = (
  data: Record<string, unknown>[]
): NodeLinkData => {
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
        if (
          !_.isNil(node.name) &&
          !_.isNil(node.category) &&
          !_.isEmpty(node.name) &&
          !_.isEmpty(node.category)
        ) {
          (result.nodes as Node[]).push(node);
        }
      }
      if (_.isNil(link)) {
        link = { source, target, value } as Link;

        if (
          !_.isNil(link.source) &&
          !_.isNil(link.target) &&
          !_.isNil(link.value) &&
          !_.isEmpty(link.source) &&
          !_.isEmpty(link.target)
        ) {
          (result.links as Link[]).push(link);
        }
      }
      return result;
    },
    { nodes: [], links: [] }
  );
  return transformedData as unknown as NodeLinkData;
};

const linkExtractorXml = (nodes: Record<string, unknown>[]): Node[] => {
  return nodes.map((el: Record<string, unknown>) => {
    return {
      name: (el.name as string[])[0],
      category: (el.category as string[])[0],
      properties:
        el.properties && (el.properties as Record<string, unknown>[]).length
          ? (el.properties as string[])[0]
          : undefined,
    };
  }) as unknown as Node[];
};

const nodeExtractorXml = (links: Record<string, unknown>[]): Link[] => {
  return links.map((el: Record<string, unknown>) => {
    return {
      source: (el.source as string[])[0],
      target: (el.target as string[])[0],
      value:
        typeof (el.value as string[])[0] === "string"
          ? +(el.value as string[])[0]
          : (el.value as string[])[0],
    };
  }) as unknown as Link[];
};

export const nodeLinksExtractorXml = (
  xmlData: Record<string, unknown>,
  allFileDetails: boolean
) => {
  const { name, description, tags, type, data, nodes, links } =
    xmlData.root as Record<string, unknown>;
  const finalData = {
    data: {
      nodes: allFileDetails
        ? linkExtractorXml((data as any[])[0].nodes)
        : linkExtractorXml(nodes as Record<string, unknown>[]),
      links: allFileDetails
        ? nodeExtractorXml((data as any[])[0].links)
        : nodeExtractorXml(links as Record<string, unknown>[]),
    },
  };
  return allFileDetails
    ? {
        ...finalData,
        ...{
          name: (name as string[])[0] as string,
          description: (description as string[])[0] as string,
          tags: tags as string[],
          type: type as string,
        },
      }
    : finalData;
};
