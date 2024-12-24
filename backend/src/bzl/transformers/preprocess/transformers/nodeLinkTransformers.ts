import { TransformerTypes, VisualizationTypes } from '@illustry/types';
import { visualizationDetailsExtractor, toStringWithDefault } from '../../../../utils/helper';

const nodeLinkTransformer = (
  mapping: { [key: string]: string },
  values: (string | number)[],
  allFileDetails: boolean
): TransformerTypes.FullNodeLinkDetails | TransformerTypes.SimpleNodeLinkDetails => {
  const {
    nodes, categories, properties, sources, targets, values: mValues
  } = mapping;
  const nodeLink: TransformerTypes.NodeLinkType = {
    name:
      typeof values[+nodes] === 'string'
        ? values[+nodes] as string
        : toStringWithDefault(values[+nodes]),
    category:
      typeof values[+categories] === 'string'
        ? values[+categories] as string
        : toStringWithDefault(values[+categories]),
    properties:
      typeof values[+properties] === 'string'
        ? values[+properties] as string
        : toStringWithDefault(values[+properties]),
    source:
      typeof values[+sources] === 'string'
        ? values[+sources] as string
        : toStringWithDefault(values[+sources]),
    target:
      typeof values[+targets] === 'string'
        ? values[+targets] as string
        : toStringWithDefault(values[+targets]),
    value:
      typeof values[+mValues] === 'string'
        ? +(values[+mValues] as string)
        : values[+mValues]
  };
  if (allFileDetails) {
    const { visualizationDescription, visualizationName, visualizationTags } = visualizationDetailsExtractor(mapping, values);
    const fullNodeLinkDetails: TransformerTypes.FullNodeLinkDetails = {
      nodeLink,
      visualizationDescription,
      visualizationName,
      visualizationTags
    };
    return fullNodeLinkDetails;
  }
  return { nodeLink };
};

const nodesLinksExtractorCsvOrExcel = (
  data: TransformerTypes.FullNodeLinkDetails[] | TransformerTypes.SimpleNodeLinkDetails[]
): VisualizationTypes.NodeLinkData => {
  const transformedData = data.reduce(
    (result, item) => {
      const { nodeLink } = item;
      let node;
      let link;
      const {
        category, name, properties, source, target, value
      } = nodeLink;
      node = result.nodes.find((n: VisualizationTypes.Node) => n.name === name);
      link = result.links.find(
        (n: VisualizationTypes.Link) => n.source === source && n.target === target
      );
      if (!node) {
        node = { name, category, properties } as VisualizationTypes.Node;
        if (name && category) {
          (result.nodes as VisualizationTypes.Node[]).push(node);
        }
      }
      if (!link) {
        link = { source, target, value } as VisualizationTypes.Link;
        if (source && target && typeof value === 'number') {
          (result.links as VisualizationTypes.Link[]).push(link);
        }
      }
      return result;
    },
    { nodes: [], links: [] }
  );
  return transformedData;
};

const nodeExtractorXml = (
  nodes: TransformerTypes.XMLNode[]
): VisualizationTypes.Node[] => nodes.map((el) => {
  const { name, category, properties } = el;
  const finalNode: VisualizationTypes.Node = {
    name: name[0],
    category: category[0]
  };
  if (properties) {
    finalNode.properties = properties;
  }
  return finalNode;
});

const linkExtractorXml = (
  links: TransformerTypes.XMLLink[]
): VisualizationTypes.Link[] => links.map((el) => {
  const {
    source, target, value, properties
  } = el;
  const finalLink: VisualizationTypes.Link = {
    source: source[0],
    target: target[0],
    value: +value[0]
  };
  if (properties) {
    finalLink.properties = properties;
  }
  return finalLink;
});

const nodeLinksExtractorXml = (
  xmlData: TransformerTypes.XMLVisualizationDetails,
  allFileDetails: boolean
): VisualizationTypes.VisualizationCreate | { data: VisualizationTypes.NodeLinkData } => {
  const {
    name, description, tags, type, data: rootData
  } = xmlData.root;
  const {
    nodes, links
  } = rootData[0] as TransformerTypes.XMLNodeLinkData;
  const data = {
    data: {
      nodes: nodeExtractorXml(nodes),
      links: linkExtractorXml(links)
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

export { nodeLinkTransformer, nodesLinksExtractorCsvOrExcel, nodeLinksExtractorXml };
