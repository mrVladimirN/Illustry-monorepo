import { FunnelData, PieChartData } from 'types/visualizations';
// eslint-disable-next-line import/no-cycle
import { evaluateCondition } from './generic';

export const funnelPieWords = ['values'];

const applyValuesFilter = (
  valuesFilter: string,
  defaultData: FunnelData | PieChartData
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
    const filteredValues: { [key: string]: number } = {};
    Object.entries(defaultData.values).forEach(([key, value]) => {
      if (valuesOperations.length === 0
        || valuesOperations.every((condition) => evaluateCondition(value, condition))) {
        filteredValues[key] = value;
      }
    });

    return filteredValues;
  } catch (error) {
    return defaultData.values;
  }
};

// eslint-disable-next-line max-len
export const applyFunnelPieFilter = (expressions:string[], defaultData: FunnelData | PieChartData) => {
  const newData: FunnelData| PieChartData = {
    values: {}
  };
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
    newData.values = applyValuesFilter(
      valuesFilter,
      defaultData
    );
  }
  return newData;
};
