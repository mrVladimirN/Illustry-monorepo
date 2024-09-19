import { WordType } from 'types/visualizations';
// eslint-disable-next-line import/no-cycle
import { evaluateCondition } from './generic';

export const wordCloudWords = ['values'];

const applyValuesFilter = (
  valuesFilter: string,
  defaultData: WordType[]
) => {
  try {
    let valuesOperations: string[] = [];
    const matchesValues = valuesFilter.match(/values\s*([><=!]*)\s*(\d+)/g);
    if (matchesValues) {
      valuesOperations = matchesValues.map((match) => {
        const matchResult = match.match((/values\s*([><=!]*)\s*(\d+)/));
        if (matchResult) {
          const [, operator, values] = matchResult;
          const filterValue = (values as string).trim();
          return `${operator}${filterValue}`;
        }
        return '';
      });
    }
    const filteredValues = defaultData.filter((word) => {
      if (valuesOperations.length > 0) {
        return valuesOperations
          .every((condition) => evaluateCondition(word.value, condition));
      }
      return true;
    });

    return filteredValues;
  } catch (error) {
    return defaultData;
  }
};

// eslint-disable-next-line max-len
export const applyWordCloudFilter = (expressions:string[], defaultData:WordType[]) => {
  let newData: WordType[] = [];
  let valuesFilter: string = '';
  expressions.forEach((expression, index) => {
    const hasValuesFilter = expression.includes('values');
    if (hasValuesFilter) {
      if (index === 0) {
        valuesFilter = expression;
      } else {
        valuesFilter = `${valuesFilter}&&${expression}`;
      }
    }
  });
  if (valuesFilter !== '') {
    newData = applyValuesFilter(
      valuesFilter,
      defaultData
    );
  }
  return newData;
};
