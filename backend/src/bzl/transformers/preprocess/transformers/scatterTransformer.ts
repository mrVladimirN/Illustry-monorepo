import { VisualizationTypes } from '@illustry/types';
import { visualizationDetailsExtractor, toStringWithDefault } from '../../../../utils/helper';

const computeValues = (values: unknown[], mapping: string): number[] => {
  const result: number[] = [];

  mapping.split(',').forEach((row) => {
    const index = Number(row);
    const valueAtIndex = values[index];

    if (valueAtIndex
      && (typeof valueAtIndex === 'number'
        || (typeof valueAtIndex === 'string'
          && !Number.isNaN(Number(valueAtIndex))))
      && result.length <= 1) {
      result.push(Number(valueAtIndex));
    }
  });

  while (result.length < 2) {
    result.push(0);
  }

  return result;
};

const scatterTransformer = (
  mapping: Record<string, unknown>,
  values: string[] | number[],
  allFileDetails: boolean
) => {
  const baseValues = {
    value: computeValues(values, mapping.values as string),
    category:
      typeof values[Number(mapping.categories)] === 'string'
        ? values[Number(mapping.categories)]
        : toStringWithDefault(values[Number(mapping.categories)]),
    properties:
      typeof values[Number(mapping.properties)] === 'string'
        ? values[Number(mapping.properties)]
        : toStringWithDefault(values[Number(mapping.properties)])
  };
  const visualizationDetails = visualizationDetailsExtractor(mapping, values);
  return allFileDetails
    ? {
      ...{ points: baseValues },
      ...visualizationDetails
    }
    : { points: baseValues };
};

const scatterExtractorCsvOrExcel = (
  data: Record<string, unknown>[]
): VisualizationTypes.ScatterData => {
  const transformedData = data.reduce(
    (result, item) => {
      let scatterData;
      const { category, value, properties } = item.points as Record<
        string,
        unknown
      >;
      scatterData = (result.points as VisualizationTypes.ScatterPoint[]).find(
        (e: VisualizationTypes.ScatterPoint) => e.value[0] === (value as unknown[])[0]
          && e.value[1] === (value as unknown[])[1]
          && e.category === category
      );
      if (!scatterData) {
        scatterData = { category, value, properties };
        if (scatterData.category && scatterData.value) {
          (result.points as Record<string, unknown>[]).push(scatterData);
        }
      }
      return result;
    },
    { points: [] }
  );
  return transformedData as unknown as VisualizationTypes.ScatterData;
};

const scatterPointsExtractorXml = (points: Record<string, unknown>[]) => {
  const transformedData = points.map((el) => ({
    category: (el.category as string[])[0],
    value: (el.value as string[]).map((value: string) => Number(value)),
    properties:
      el.properties && (el.properties as Record<string, unknown>[]).length
        ? (el.properties as string[])[0]
        : undefined
  }));

  return transformedData;
};

const scatterExtractorXml = (
  xmlData: Record<string, unknown>,
  allFileDetails: boolean
) => {
  const {
    name, description, tags, type, data, points
  } = xmlData.root as Record<string, unknown>;
  const finalData = {
    data: {
      points: allFileDetails
        ? scatterPointsExtractorXml(
          (data as Record<string, unknown>[])[0].points as Record<
            string,
            unknown
          >[]
        )
        : scatterPointsExtractorXml(points as Record<string, string>[])
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

export { scatterTransformer, scatterExtractorCsvOrExcel, scatterExtractorXml };
