import { TransformerTypes, VisualizationTypes } from '@illustry/types';

const labelExtractorXml = (labels: TransformerTypes.XMLLabel[]) => labels.map((el) => {
  const {
    name, value, properties
  } = el;
  const finalLabel: VisualizationTypes.Label = {
    name: name[0],
    value: +value[0]
  };
  if (properties) {
    finalLabel.properties = properties;
  }
  return finalLabel;
});

const nodeExtractorXml = (
  nodes: TransformerTypes.XMLMatrixNode[]
): VisualizationTypes.Node[] => nodes.map((el) => {
  const {
    name, category, labels
  } = el;
  const finalNode: VisualizationTypes.Node = {
    name: name[0],
    category: category[0]
  };
  if (labels) {
    finalNode.labels = labelExtractorXml(labels);
  }
  return finalNode;
});

const linkExtractorXml = (
  links: TransformerTypes.XMLMatrixLink[]
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

const matrixExtractorXml = (
  xmlData: TransformerTypes.XMLVisualizationDetails,
  allFileDetails: boolean
): VisualizationTypes.VisualizationCreate | { data: VisualizationTypes.NodeLinkData } => {
  const {
    name, description, tags, type, data: rootData
  } = xmlData.root;
  const {
    nodes, links
  } = rootData[0] as TransformerTypes.XMLMatrixData;
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

export default matrixExtractorXml;
