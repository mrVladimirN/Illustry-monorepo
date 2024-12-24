import { TransformerTypes, VisualizationTypes } from '@illustry/types';
import { visualizationDetailsExtractor, toStringWithDefault } from '../../../../utils/helper';

const computeValues = (values: (string | number)[], mapping: string): [number, number] => {
  const result: number[] = [];

  mapping.split(',').forEach((row) => {
    const index = +row;
    const valueAtIndex = values[index];
    if (valueAtIndex && !Number.isNaN(+valueAtIndex) && result.length < 2) {
      result.push(+valueAtIndex);
    }
  });

  while (result.length < 2) {
    result.push(0);
  }

  return result as [number, number];
};

const scatterTransformer = (
  mapping: { [key: string]: string },
  values: (string | number)[],
  allFileDetails: boolean
): TransformerTypes.FullPointDetails | TransformerTypes.SimplePointDetails => {
  const { values: mValues, categories, properties } = mapping;
  const points: TransformerTypes.PointType = {
    value: computeValues(values, mValues),
    category:
      typeof values[+categories] === 'string'
        ? values[+categories] as string
        : toStringWithDefault(values[+categories]),
    properties:
      typeof values[+properties] === 'string'
        ? values[+properties] as string
        : toStringWithDefault(values[+properties])
  };
  if (allFileDetails) {
    const { visualizationDescription, visualizationName, visualizationTags } = visualizationDetailsExtractor(mapping, values);
    const fullNodeLinkDetails: TransformerTypes.FullPointDetails = {
      points,
      visualizationDescription,
      visualizationName,
      visualizationTags
    };
    return fullNodeLinkDetails;
  }
  return { points };
};

const scatterExtractorCsvOrExcel = (
  data: TransformerTypes.FullPointDetails[] | TransformerTypes.SimplePointDetails[]
): VisualizationTypes.ScatterData => {
  const transformedData = data.reduce(
    (result, item) => {
      let scatterData;
      const { category, value, properties } = item.points;
      scatterData = result.points.find(
        (e: VisualizationTypes.ScatterPoint) => e.value[0] === value[0]
          && e.value[1] === value[1]
          && e.category === category
      );
      if (!scatterData) {
        scatterData = { category, value, properties };
        if (scatterData.category && scatterData.value) {
          (result.points as VisualizationTypes.ScatterPoint[]).push(scatterData);
        }
      }
      return result;
    },
    { points: [] }
  );
  return transformedData;
};

const scatterPointsExtractorXml = (points: TransformerTypes.XMLPoint[]) => {
  const transformedData = points.map((el) => {
    const { category, value, properties } = el;
    const finalPoint: VisualizationTypes.ScatterPoint = {
      value: value.map((v) => +v) as [number, number],
      category: category[0]
    };
    if (properties) {
      finalPoint.properties = properties;
    }
    return finalPoint;
  });

  return transformedData;
};

const scatterExtractorXml = (
  xmlData: TransformerTypes.XMLVisualizationDetails,
  allFileDetails: boolean
): VisualizationTypes.VisualizationCreate | { data: VisualizationTypes.ScatterData } => {
  const {
    name, description, tags, type, data: rootData
  } = xmlData.root;
  const { points } = rootData[0] as TransformerTypes.XMLScatterData;
  const data = {
    data: {
      points: scatterPointsExtractorXml(points)
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

export {
  scatterTransformer, scatterExtractorCsvOrExcel, scatterExtractorXml, computeValues
};
