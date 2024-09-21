import { VisualizationTypes } from '@illustry/types';
import { visualizationDetailsExtractor, toStringWithDefault, } from '../../../../utils/helper';

const nodeLinkTransformer = (
  mapping: Record<string, unknown>,
  values: string[] | number[],
  allFileDetails: boolean
) => {
  const baseValues = {
    name:
      typeof values[Number(mapping.nodes)] === 'string'
        ? values[Number(mapping.nodes)]
        : toStringWithDefault(values[Number(mapping.nodes)]),
    category:
      typeof values[Number(mapping.categories)] === 'string'
        ? values[Number(mapping.categories)]
        : toStringWithDefault(values[Number(mapping.categories)]),
    properties:
      typeof values[Number(mapping.properties)] === 'string'
        ? values[Number(mapping.properties)]
        : toStringWithDefault(values[Number(mapping.properties)]),
    source:
      typeof values[Number(mapping.sources)] === 'string'
        ? values[Number(mapping.sources)]
        : toStringWithDefault(values[Number(mapping.sources)]),
    target:
      typeof values[Number(mapping.targets)] === 'string'
        ? values[Number(mapping.targets)]
        : toStringWithDefault(values[Number(mapping.targets)]),
    value:
      typeof values[Number(mapping.values)] === 'string'
        ? +(values[Number(mapping.values)] as string)
        : values[Number(mapping.values)]
  };
  const visualizationDetails = visualizationDetailsExtractor(mapping, values);
  return allFileDetails
    ? { ...{ nodeLink: baseValues }, ...visualizationDetails }
    : { nodeLink: baseValues };
};

const nodesLinksExtractorCsvOrExcel = (
  data: Record<string, unknown>[]
): VisualizationTypes.NodeLinkData => {
  const transformedData = data.reduce(
    (result, item) => {
      const { nodeLink } = item;
      let node;
      let link;
      const {
        category, name, properties, source, target, value
      } = nodeLink as Record<string, unknown>;
      node = (result.nodes as VisualizationTypes.Node[]).find((n: VisualizationTypes.Node) => n.name === name);
      link = (result.links as VisualizationTypes.Link[]).find(
        (n: VisualizationTypes.Link) => n.source === source && n.target === target
      );
      if (!node) {
        node = { name, category, properties } as VisualizationTypes.Node;
        if (node.name && node.category) {
          (result.nodes as VisualizationTypes.Node[]).push(node);
        }
      }
      if (!link) {
        link = { source, target, value } as VisualizationTypes.Link;

        if (link.source && link.target && typeof link.value === 'number') {
          (result.links as VisualizationTypes.Link[]).push(link);
        }
      }
      return result;
    },
    { nodes: [], links: [] }
  );
  return transformedData as unknown as VisualizationTypes.NodeLinkData;
};

const linkExtractorXml = (nodes: Record<string, unknown>[]): VisualizationTypes.Node[] => nodes.map((el: Record<string, unknown>) => ({
  name: (el.name as string[])[0],
  category: (el.category as string[])[0],
  properties:
    el.properties && (el.properties as Record<string, unknown>[]).length
      ? (el.properties as string[])[0]
      : undefined
})) as unknown as VisualizationTypes.Node[];

const nodeExtractorXml = (links: Record<string, unknown>[]): VisualizationTypes.Link[] => links.map((el: Record<string, unknown>) => ({
  source: (el.source as string[])[0],
  target: (el.target as string[])[0],
  value:
    typeof (el.value as string[])[0] === 'string'
      ? +(el.value as string[])[0]
      : (el.value as string[])[0]
})) as unknown as VisualizationTypes.Link[];

const nodeLinksExtractorXml = (
  xmlData: Record<string, unknown>,
  allFileDetails: boolean
) => {
  const {
    name, description, tags, type, data, nodes, links
  } = xmlData.root as Record<string, unknown>;
  const finalData = {
    data: {
      nodes: allFileDetails
        ? linkExtractorXml(
          (data as Record<string, unknown>[])[0].nodes as Record<
            string,
            unknown
          >[]
        )
        : linkExtractorXml(nodes as Record<string, unknown>[]),
      links: allFileDetails
        ? nodeExtractorXml(
          (data as Record<string, unknown>[])[0].links as Record<
            string,
            unknown
          >[]
        )
        : nodeExtractorXml(links as Record<string, unknown>[])
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

export { nodeLinkTransformer, nodesLinksExtractorCsvOrExcel, nodeLinksExtractorXml }