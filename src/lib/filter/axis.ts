import { AxisChartData } from 'types/visualizations';

export const axisWords = ['headers', 'values'];

function getMatchingIndices(initialArray: string[], filterArray: string[]) {
  const matchingIndices = [];

  for (let i = 0; i < initialArray.length; i += 1) {
    if (filterArray.includes(initialArray[i] as string)) {
      matchingIndices.push(i);
    }
  }

  return matchingIndices;
}
function parseCondition(condition: string) {
  const match = condition.match(/([><=!]+)\s*(\d+)/);
  if (match) {
    const [, operator, targetValue] = match;
    return [operator, parseFloat(targetValue as string)];
  }
  throw new Error(`Invalid condition: ${condition}`);
}
function evaluateCondition(value: string | number, condition: string) {
  const [operator, targetValue] = parseCondition(condition);
  const numericValue = parseFloat(value as string);

  switch (operator) {
    case '>':
      return numericValue > (targetValue as number);
    case '<':
      return numericValue < (targetValue as number);
    case '>=':
      return numericValue >= (targetValue as number);
    case '<=':
      return numericValue <= (targetValue as number);
    case '!=':
      return numericValue !== (targetValue as number);
    case '=':
    default:
      return numericValue === (targetValue as number);
  }
}
const applyValuesFilter = (
  valuesFilter: string,
  validValuesPosition: number[],
  defaultData: AxisChartData
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
    const filteredValues = Object.fromEntries(
      Object.entries(defaultData.values)
        .map(([key, values]) => {
          const filteredArray = values
            .filter((_value, valueIndex) => validValuesPosition.includes(valueIndex))
            .map((_value) => {
              if (valuesOperations.length > 0) {
                if (valuesOperations.every((condition) => evaluateCondition(_value, condition))) {
                  return _value;
                }
                return 0;
              }
              return _value;
            });
          return [key, filteredArray];
        })
    );
    return filteredValues;
  } catch (error) {
    return defaultData.values;
  }
};

const applyHeadersFilter = (headersFilter: string, defaultData: AxisChartData): string[] => {
  const includedHeaders: string[] = [];
  const excludedHeaders: string[] = [];

  try {
    if (headersFilter === '') {
      throw Error('No headersFilter');
    }
    const matches = headersFilter.match(/headers\s*([!=]+)\s*\[([^\]]+)\]/g);

    if (matches) {
      matches.forEach((match) => {
        const matchResult = match.match(/headers\s*([!=]+)\s*\[([^\]]+)\]/);
        if (matchResult) {
          const [, operator, values] = matchResult;
          const filterHeaders = (values as string)
            .replace(/'/g, '')
            .split(/\s*,\s*/)
            .filter(Boolean);
          if (operator === '=') {
            includedHeaders.push(...filterHeaders);
          } else if (operator === '!=') {
            excludedHeaders.push(...filterHeaders);
          }
        }
      });
      const filteredHeaders = defaultData.headers.filter(
        (header) => (includedHeaders.length && includedHeaders.includes(header))
          || (excludedHeaders.length && !excludedHeaders.includes(header))
      );
      return filteredHeaders;
    }
  } catch (error) {
    return defaultData.headers;
  }
  return [];
};

export const applyAxisFilter = (expressions:string[], defaultData: AxisChartData) => {
  const newData: AxisChartData = {
    headers: [],
    values: {}
  };
  let headersFilter: string = '';
  let valuesFilter: string = '';
  expressions.forEach((expression, index) => {
    const hasHeaders = expression.includes('headers');
    const hasValuesFilter = expression.includes('values');
    if (hasHeaders) {
      if (index === 0) {
        headersFilter = expression;
      } else {
        headersFilter = `${headersFilter}&&${expression}`;
      }
    }
    if (hasValuesFilter) {
      if (index === 0) {
        valuesFilter = expression;
      } else {
        valuesFilter = `${valuesFilter}&&${expression}`;
      }
    }
  });
  const initialHeaders = defaultData.headers.slice();
  newData.headers = applyHeadersFilter(headersFilter, defaultData);
  const validValuesPosition = getMatchingIndices(
    initialHeaders,
    newData.headers
  );
  newData.values = applyValuesFilter(
    valuesFilter,
    validValuesPosition,
    defaultData
  );
  return newData;
};
