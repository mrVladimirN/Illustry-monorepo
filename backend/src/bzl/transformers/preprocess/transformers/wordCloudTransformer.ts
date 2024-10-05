import { VisualizationTypes } from '@illustry/types';
import { visualizationDetailsExtractor, toStringWithDefault } from '../../../../utils/helper';

const wordCloudTransformer = (
  mapping: Record<string, unknown>,
  values: string[] | number[],
  allFileDetails: boolean
) => {
  const baseValues = {
    name: values[Number(mapping.names)],
    value:
      typeof values[Number(mapping.values)] === 'string'
        ? +(values[Number(mapping.values)] as string)
        : values[Number(mapping.values)],
    properties: values[Number(mapping.properties)]
  };
  const visualizationDetails = visualizationDetailsExtractor(mapping, values);
  return allFileDetails
    ? {
      ...{ word: baseValues },
      ...visualizationDetails
    }
    : { word: baseValues };
};

const wordCloudExtractorCsvOrExcel = (
  data: Record<string, unknown>[]
): VisualizationTypes.WordCloudData => {
  const transformedData = data.reduce(
    (result, item) => {
      const words = item.word;
      const { name, value, properties } = words as Record<string, unknown>;
      let word;
      word = (result.words as Record<string, unknown>[]).find(
        (w: Record<string, unknown>) => w.name === name
      );

      if (!word) {
        word = { name, value, properties } as VisualizationTypes.WordType;
        if (word.name && word.value) {
          (result.words as VisualizationTypes.WordType[]).push(word);
        }
      }
      return result;
    },
    { words: [] }
  );
  return transformedData as unknown as VisualizationTypes.WordCloudData;
};

const wordCloudWordExtractorXml = (
  words: Record<string, unknown>[]
): VisualizationTypes.WordType[] => words.map((el: Record<string, unknown>) => ({
  name:
    typeof (el.name as string[])[0] === 'string'
      ? (el.name as string[])[0]
      : toStringWithDefault((el.name as string[])[0]),
  value:
    typeof (el.value as string[])[0] === 'string'
      ? +(el.value as string[])[0]
      : (el.value as string[])[0],
  properties:
    el.properties && (el.properties as Record<string, unknown>[]).length
      ? (el.properties as string[])[0]
      : undefined
})) as unknown as VisualizationTypes.WordType[];

const wordCloudExtractorXml = (
  xmlData: Record<string, unknown>,
  allFileDetails: boolean
) => {
  const {
    name, description, tags, type, data, words
  } = xmlData.root as Record<
    string,
    unknown
  >;
  const finalData = {
    data: {
      words: allFileDetails
        ? wordCloudWordExtractorXml(
          (data as Record<string, unknown>[])[0].words as Record<
            string,
            unknown
          >[]
        )
        : wordCloudWordExtractorXml(words as Record<string, unknown>[])
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

export { wordCloudExtractorXml, wordCloudTransformer, wordCloudExtractorCsvOrExcel };
