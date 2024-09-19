/* eslint-disable max-len */

import { Link, Node } from 'types/visualizations';

const matrixLabelExtractorXml = (labels: Record<string, unknown>[]) => labels.map((el: Record<string, unknown>) => ({
  name: (el.name as string[])[0],
  value:
      typeof (el.value as string[])[0] === 'string'
        ? +(el.value as string[])[0]
        : (el.value as string[])[0],
  properties:
      el.properties && (el.properties as Record<string, unknown>[])
        ? (el.properties as Record<string, unknown>[])
        : undefined
}));
const matrixLinkExtractorXml = (links: Record<string, unknown>[]): Link[] => links.map((el: Record<string, unknown>) => ({
  source: (el.source as string[])[0],
  target: (el.target as string[])[0],
  value:
      typeof (el.value as string[])[0] === 'string'
        ? +(el.value as string[])[0]
        : (el.value as string[])[0],
  properties:
      el.properties && (el.properties as Record<string, unknown>[])
        ? (el.properties as Record<string, unknown>[])
        : undefined
})) as unknown as Link[];
const matrixNodeExtractorXml = (nodes: Record<string, unknown>[]): Node[] => nodes.map((el: Record<string, unknown>) => ({
  name: (el.name as string[])[0],
  category: (el.category as string[])[0],
  properties:
      el.properties && (el.properties as Record<string, unknown>[])
        ? (el.properties as Record<string, unknown>[])
        : undefined,
  labels: matrixLabelExtractorXml(el.labels as Record<string, unknown>[])
})) as unknown as Node[];

const matrixExtractorXml = (
  xmlData: Record<string, unknown>,
  allFileDetails: boolean
) => {
  const {
    name, description, tags, type, data, nodes, links
  } = xmlData.root as Record<string, unknown>;
  const finalData = {
    data: {
      nodes: allFileDetails
        ? matrixNodeExtractorXml(
            (data as Record<string, unknown>[])[0].nodes as Record<
              string,
              unknown
            >[]
        )
        : matrixNodeExtractorXml(nodes as Record<string, unknown>[]),
      links: allFileDetails
        ? matrixLinkExtractorXml(
            (data as Record<string, unknown>[])[0].links as Record<
              string,
              unknown
            >[]
        )
        : matrixLinkExtractorXml(links as Record<string, unknown>[])
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
export default matrixExtractorXml;
