import _ from "lodash";
import { visualizationDetailsExtractor } from "../../../utils/helper";
import { WordCloudData, WordType } from "types/visualizations";

export const wordCloudTransformer = (
  mapping: Record<string, unknown>,
  values: Record<string, unknown>,
  allFileDetails: boolean
) => {
  const baseValues = {
    name: values[_.toNumber(mapping.names)],
    value: values[_.toNumber(mapping.values)],
    properties: values[_.toNumber(mapping.properties)],
  };
  const visualizationDetails = visualizationDetailsExtractor(mapping, values);
  return allFileDetails
    ? {
        ...{ word: baseValues },
        ...visualizationDetails,
      }
    : { word: baseValues };
};
export const wordsExtractor = (
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
        if (!_.isNil(word.name) && !_.isNil(word.value)) {
          (result.words as WordType[]).push(word);
        }
      }
      return result;
    },
    { words: [] }
  );
  return transformedData as unknown as WordCloudData;
};
