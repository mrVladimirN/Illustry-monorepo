import { TransformerTypes, VisualizationTypes } from '@illustry/types';
import { visualizationDetailsExtractor } from '../../../../utils/helper';

const wordCloudTransformer = (
  mapping: { [key: string]: string },
  values: (string | number)[],
  allFileDetails: boolean
): TransformerTypes.FullWordDetails | TransformerTypes.SimpleWordDetails => {
  const {
    names, values: mValues, properties
  } = mapping;
  const word: TransformerTypes.WordType = {
    name: values[+names] as string,
    value:
      typeof values[+mValues] === 'string'
        ? +(values[+mValues] as string)
        : values[+mValues],
    properties: values[+properties] as string
  };
  if (allFileDetails) {
    const { visualizationDescription, visualizationName, visualizationTags } = visualizationDetailsExtractor(mapping, values);
    const fullWordDetails: TransformerTypes.FullWordDetails = {
      word,
      visualizationDescription,
      visualizationName,
      visualizationTags
    };
    return fullWordDetails;
  }
  return { word };
};

const wordCloudExtractorCsvOrExcel = (
  data: TransformerTypes.SimpleWordDetails[] | TransformerTypes.FullWordDetails[]
): VisualizationTypes.WordCloudData => {
  const transformedData = data.reduce(
    (result, item) => {
      const words = item.word;
      const { name, value, properties } = words;
      let word = null;
      word = result.words.find(
        (w: VisualizationTypes.WordType) => w.name === name
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
  return transformedData;
};

const wordCloudWordExtractorXml = (
  words: TransformerTypes.XMLWord[]
): VisualizationTypes.WordType[] => words.map((el) => {
  const { name, value, properties } = el;
  const finalWord: VisualizationTypes.WordType = {
    name: name[0],
    value: +value[0]
  };
  if (properties) {
    finalWord.properties = properties;
  }
  return finalWord;
});

const wordCloudExtractorXml = (
  xmlData: TransformerTypes.XMLVisualizationDetails,
  allFileDetails: boolean
) => {
  const {
    name, description, tags, type, data: rootData
  } = xmlData.root;
  const { words } = rootData[0] as TransformerTypes.XMLWordcloudData;
  const data = {
    data: {
      words: wordCloudWordExtractorXml(words)
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

export { wordCloudExtractorXml, wordCloudTransformer, wordCloudExtractorCsvOrExcel };
