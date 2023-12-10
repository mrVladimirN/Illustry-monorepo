import _ from 'lodash';
import { WordCloudData, WordType } from 'types/visualizations';
import { visualizationDetailsExtractor } from '../../../../utils/helper';

export const wordCloudTransformer = (
  mapping: Record<string, unknown>,
  values: unknown[],
  allFileDetails: boolean
) => {
  const baseValues = {
    name: values[_.toNumber(mapping.names)],
    value:
      typeof values[_.toNumber(mapping.values)] === 'string'
        ? +(values[_.toNumber(mapping.values)] as string)
        : values[_.toNumber(mapping.values)],
    properties: values[_.toNumber(mapping.properties)]
  };
  const visualizationDetails = visualizationDetailsExtractor(mapping, values);
  return allFileDetails
    ? {
      ...{ word: baseValues },
      ...visualizationDetails
    }
    : { word: baseValues };
};

export const wordCloudExtractorCsvOrExcel = (
  data: Record<string, unknown>[]
): WordCloudData => {
  const transformedData = data.reduce(
    (result, item) => {
      const words = item.word;
      const { name, value, properties } = words as Record<string, unknown>;
      let word;
      word = (result.words as Record<string, unknown>[]).find(
        (w: Record<string, unknown>) => w.name === name
      );

      if (_.isNil(word)) {
        word = { name, value, properties } as WordType;
        if (
          !_.isEmpty(word.name)
          && !_.isNil(word.name)
          && !_.isNil(word.value)
          && !_.isNil(word.value)
        ) {
          (result.words as WordType[]).push(word);
        }
      }
      return result;
    },
    { words: [] }
  );
  return transformedData as unknown as WordCloudData;
};

const wordCloudWordExtractorXml = (
  words: Record<string, unknown>[]
): WordType[] => words.map((el: Record<string, unknown>) => ({
  name:
        typeof (el.name as string[])[0] === 'string'
          ? (el.name as string[])[0]
          : _.toString((el.name as string[])[0]),
  value:
        typeof (el.value as string[])[0] === 'string'
          ? +(el.value as string[])[0]
          : (el.value as string[])[0],
  properties:
        el.properties && (el.properties as Record<string, unknown>[]).length
          ? (el.properties as string[])[0]
          : undefined
})) as unknown as WordType[];

export const wordCloudExtractorXml = (
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
        ? wordCloudWordExtractorXml((data as any[])[0].words)
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
