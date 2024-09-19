import { TimelineData } from 'types/visualizations';
// eslint-disable-next-line import/no-cycle
import { evaluateCondition } from './generic';

export const timelineWords = ['types', 'dates', 'authors'];

const applyDatesFilter = (
  datesFilter: string,
  defaultData: TimelineData
) => {
  try {
    let datesOperations: string[] = [];
    const matchesValues = datesFilter.match(/dates\s*([><=!]*)\s*(['"]?)(\d{4}-\d{2}-\d{2})\2/g);

    if (matchesValues) {
      datesOperations = matchesValues.map((match) => {
        const matchResult = match.match(/dates\s*([><=!]*)\s*(['"]?)(\d{4}-\d{2}-\d{2})\2/);

        if (matchResult) {
          const [, operator, , values] = matchResult;
          const filterValue = (values as string).trim();
          return `${operator}${filterValue}`;
        }
        return '';
      });
    }

    const filteredKeys = Object.keys(defaultData)
      .filter((date) => {
        if (datesOperations.length > 0) {
          return datesOperations
            .every((condition) => evaluateCondition(date, condition, true));
        }
        return true;
      });
    const filteredValues: TimelineData = {};

    filteredKeys.forEach((key) => {
      const value = defaultData[key];
      if (value) {
        filteredValues[key] = value;
      }
    });

    return filteredValues;
  } catch (error) {
    return defaultData;
  }
};
const applyEventsFilter = (
  filter: string,
  defaultData: TimelineData,
  filterType: string
) => {
  const included: string[] = [];
  const excluded: string[] = [];

  try {
    if (filter === '') {
      throw Error('No filter');
    }
    const regexPattern = new RegExp(
      `${filterType}\\s*([!=]+)\\s*\\[([^\\]]+)\\]`,
      'g'
    );
    const matches = filter.match(regexPattern);

    if (matches) {
      matches.forEach((match) => {
        const innerRegexPattern = new RegExp(
          `${filterType}\\s*([!=]+)\\s*\\[([^\\]]+)\\]`
        );
        const matchResult = match.match(innerRegexPattern);
        if (matchResult) {
          const [, operator, values] = matchResult;
          const filterCategories = (values as string)
            .replace(/'/g, '')
            .split(/\s*,\s*/)
            .filter(Boolean);
          if (operator === '=') {
            included.push(...filterCategories);
          } else if (operator === '!=') {
            excluded.push(...filterCategories);
          }
        }
      });
    }
    const filteredData: TimelineData = {};

    Object.keys(defaultData).forEach((date) => {
      const events = defaultData[date]?.events || [];

      const filteredEvents = events.filter((event) => {
        const eventData = filterType === 'authors' ? event.author : event.type;

        if (
          (included.length === 0 || included.includes(eventData))
          && (excluded.length === 0 || !excluded.includes(eventData))
        ) {
          return true;
        }
        return false;
      });
      if (filteredEvents.length > 0) {
        filteredData[date] = {
          ...(defaultData[date] || {}),
          events: filteredEvents
        };
      }
    });

    return filteredData;
  } catch (error) {
    return defaultData;
  }
};
export const applyTimelineFilter = (expressions:string[], defaultData: TimelineData) => {
  let newData: TimelineData = { ...defaultData };
  let datesFilter: string = '';
  let authorsFilter: string = '';
  let typesFilter: string = '';
  expressions.forEach((expression, index) => {
    const hasAuthors = expression.includes('authors');
    const hasDatesFilter = expression.includes('dates');
    const hasTypesFilter = expression.includes('types');
    if (hasDatesFilter) {
      if (index === 0) {
        datesFilter = expression;
      } else {
        datesFilter = `${datesFilter}&&${expression}`;
      }
    }
    if (hasAuthors) {
      if (index === 0) {
        authorsFilter = expression;
      } else {
        authorsFilter = `${authorsFilter}&&${expression}`;
      }
    }
    if (hasTypesFilter) {
      if (index === 0) {
        typesFilter = expression;
      } else {
        typesFilter = `${typesFilter}&&${expression}`;
      }
    }
  });
  if (datesFilter !== '') {
    newData = applyDatesFilter(datesFilter, newData);
  }
  if (authorsFilter !== '') {
    newData = applyEventsFilter(authorsFilter, newData, 'authors');
  }
  if (typesFilter !== '') {
    newData = applyEventsFilter(typesFilter, newData, 'types');
  }
  return newData;
};
