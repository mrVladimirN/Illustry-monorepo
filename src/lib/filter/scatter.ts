// eslint-disable-next-line import/no-cycle
import { evaluateCondition } from './generic';

export const scatterWords = [
  'categories',
  'xCoord',
  'yCoord'
];

const applyCategoriesFilter = (categoriesFilter: string, defaultData: {
    points: (string | number)[][];
    categories: string[];
  }): string[] => {
  const includedCategories: string[] = [];
  const excludedCategories: string[] = [];

  try {
    if (categoriesFilter === '') {
      throw Error('No CategoriesFilter');
    }
    const matches = categoriesFilter.match(/categories\s*([!=]+)\s*\[([^\]]+)\]/g);

    if (matches) {
      matches.forEach((match) => {
        const matchResult = match.match(/categories\s*([!=]+)\s*\[([^\]]+)\]/);
        if (matchResult) {
          const [, operator, values] = matchResult;
          const filterCategories = (values as string)
            .replace(/'/g, '')
            .split(/\s*,\s*/)
            .filter(Boolean);
          if (operator === '=') {
            includedCategories.push(...filterCategories);
          } else if (operator === '!=') {
            excludedCategories.push(...filterCategories);
          }
        }
      });
      const filteredCategories = defaultData.categories.filter(
        (cat) => (includedCategories.length && includedCategories.includes(cat))
            || (excludedCategories.length && !excludedCategories.includes(cat))
      );
      return filteredCategories;
    }
  } catch (error) {
    return defaultData.categories;
  }
  return [];
};

const applyPointsFilter = (
  filter: string,
  defaultData: {
        points: (string | number)[][];
        categories: string[];
      },
  filterType: string
) => {
  try {
    let valuesOperations: string[] = [];
    const regexPattern = new RegExp(
      `${filterType}\\s*([><=!]*)\\s*(\\d+)`,
      'g'
    );
    const matchesValues = filter.match(regexPattern);
    if (matchesValues) {
      valuesOperations = matchesValues.map((match) => {
        const internRegexPattern = new RegExp(
          `${filterType}\\s*([><=!]*)\\s*(\\d+)`
        );
        const matchResult = match.match(internRegexPattern);
        if (matchResult) {
          const [, operator, values] = matchResult;
          const filterValue = (values as string).trim();
          return `${operator}${filterValue}`;
        }
        return '';
      });
    }
    const filteredPoints = defaultData.points.map((point) => {
      if (valuesOperations.length > 0) {
        if (valuesOperations.every((condition) => evaluateCondition(filterType === 'xCoord' ? point[0] as number : point[1] as number, condition))) {
          return point;
        }
        return [0, 0];
      }
      return point;
    });
    return filteredPoints;
  } catch (error) {
    return defaultData.points;
  }
};

export const applyScatterFilter = (
  expressions: string[],
  defaultData: {
    points: (string | number)[][];
    categories: string[];
  }
) => {
  const newData: {
    points: (string | number)[][];
    categories: string[];
  } = { points: [...defaultData.points], categories: [...defaultData.categories] };
  let categoriesFilter: string = '';
  let xCoordFilter: string = '';
  let yCoordFilter: string = '';
  expressions.forEach((expression, index) => {
    const hasCategories = expression.includes('categories');
    const hasXCoordFilter = expression.includes('xCoord');
    const hasYCoordFilter = expression.includes('yCoord');
    if (hasCategories) {
      if (index === 0) {
        categoriesFilter = expression;
      } else {
        categoriesFilter = `${categoriesFilter}&&${expression}`;
      }
    }
    if (hasXCoordFilter) {
      if (index === 0) {
        xCoordFilter = expression;
      } else {
        xCoordFilter = `${xCoordFilter}&&${expression}`;
      }
    }
    if (hasYCoordFilter) {
      if (index === 0) {
        yCoordFilter = expression;
      } else {
        yCoordFilter = `${yCoordFilter}&&${expression}`;
      }
    }
  });
  if (categoriesFilter !== '') {
    newData.categories = applyCategoriesFilter(categoriesFilter, newData);
  }
  if (yCoordFilter !== '') {
    newData.points = applyPointsFilter(yCoordFilter, newData, 'yCoord');
  }
  if (xCoordFilter !== '') {
    newData.points = applyPointsFilter(xCoordFilter, newData, 'xCoord');
  }
  return newData;
};
