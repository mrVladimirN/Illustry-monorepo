import _ from 'lodash';
import { CalendarData, CalendarType } from 'types/visualizations';
import { visualizationDetailsExtractor } from '../../../../utils/helper';

const reformatDate = (date: string): string | null => {
  const dateRegex = /\b(?:\d{4}[./-]\d{1,2}[./-]\d{1,2}|\d{1,2}[./-]\d{1,2}[./-]\d{4}|\d{1,2}[./-]\d{1,2}[./-]\d{2}|\d{4}-\d{2}-\d{2}|\d{2}-\d{2}-\d{4}|\d{2}-\d{2}-\d{2})\b/;

  const matches = date.match(dateRegex);

  if (matches && matches.length > 0) {
    const originalDate = matches[0];
    const dateComponents = originalDate.split(/[-./]/);

    const year = parseInt(
      dateComponents.find((component) => component.length === 4) as string,
      10
    );

    const [component1, component2] = dateComponents.filter(
      (component) => component.length <= 2 && component !== '0000'
    );

    const tryOrdering = (month: number, day: number) => !Number.isNaN(month)
      && month > 0
      && month <= 12
      && !Number.isNaN(day)
      && day > 0
      && day <= 31;

    if (tryOrdering(parseInt(component1, 10), parseInt(component2, 10))) {
      const reformattedDate = `${year}-${String(component1).padStart(
        2,
        '0'
      )}-${String(component2).padStart(2, '0')}`;
      return reformattedDate;
    } if (tryOrdering(parseInt(component2, 10), parseInt(component1, 10))) {
      const reformattedDate = `${year}-${String(component2).padStart(
        2,
        '0'
      )}-${String(component1).padStart(2, '0')}`;
      return reformattedDate;
    }
  }
  return null;
};
const excelDateToJSDate = (excelDate: number): string | null => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const daysSinceExcelEpoch = excelDate - 25569; // Adjust for Excel epoch starting from 1900-01-01
  const millisecondsSinceExcelEpoch = daysSinceExcelEpoch * millisecondsPerDay;
  const jsDate = new Date(millisecondsSinceExcelEpoch);

  if (!Number.isNaN(jsDate.getTime())) {
    const reformattedDate = `${jsDate.getFullYear()}-${String(
      jsDate.getMonth() + 1
    ).padStart(2, '0')}-${String(jsDate.getDate()).padStart(2, '0')}`;
    return reformattedDate;
  }
  return null;
};
export const calendarTransformer = (
  mapping: Record<string, unknown>,
  values: unknown[],
  allFileDetails: boolean
) => {
  const baseValues = {
    date:
      typeof values[_.toNumber(mapping.dates)] === 'string'
        ? reformatDate(values[_.toNumber(mapping.dates)] as string)
        : excelDateToJSDate(values[_.toNumber(mapping.dates)] as number),
    value:
      typeof values[_.toNumber(mapping.values)] === 'string'
        ? +(values[_.toNumber(mapping.values)] as string)
        : values[_.toNumber(mapping.values)],
    category:
      typeof values[_.toNumber(mapping.categories)] === 'string'
        ? values[_.toNumber(mapping.categories)]
        : _.toString(values[_.toNumber(mapping.categories)]),
    properties:
      typeof values[_.toNumber(mapping.properties)] === 'string'
        ? values[_.toNumber(mapping.properties)]
        : _.toString(values[_.toNumber(mapping.properties)])
  };
  const visualizationDetails = visualizationDetailsExtractor(mapping, values);
  return allFileDetails
    ? { ...{ calendar: baseValues }, ...visualizationDetails }
    : { calendar: baseValues };
};

export const calendarExtractorCsvOrExcel = (
  data: Record<string, unknown>[]
): CalendarData => {
  const transformedData = data.reduce(
    (result, item) => {
      const calendarData = item.calendar;
      let calendar;
      const {
        category, date, value, properties
      } = calendarData as Record<
        string,
        unknown
      >;
      calendar = (result.calendar as CalendarType[]).find(
        (n: CalendarType) => n.date === date && n.category === category
      );
      if (_.isNil(calendar)) {
        calendar = {
          category, date, value, properties
        } as CalendarType;
        if (
          !_.isNil(calendar.category)
          && !_.isNil(calendar.date)
          && !_.isEmpty(calendar.category)
          && !_.isEmpty(calendar.date)
          && !_.isNil(calendar.value)
        ) {
          (result.calendar as CalendarType[]).push(calendar);
        }
      }

      return result;
    },
    { calendar: [] }
  );
  return transformedData as unknown as CalendarData;
};

const calendarEventExtractorXml = (
  calendar: Record<string, unknown>[]
): CalendarType[] => calendar.map((el: Record<string, unknown>) => ({
  category:
        typeof (el.value as string[])[0] === 'string'
          ? (el.category as string[])[0]
          : _.toString(typeof (el.value as string[])[0] === 'string'),
  date: reformatDate((el.date as string)[0]),
  value:
        typeof (el.value as string[])[0] === 'string'
          ? +(el.value as string[])[0]
          : (el.value as string[])[0],
  properties:
        el.properties && (el.properties as Record<string, unknown>[]).length
          ? (el.properties as string[])[0]
          : undefined
})) as unknown as CalendarType[];
export const calendarExtractorXml = (
  xmlData: Record<string, unknown>,
  allFileDetails: boolean
) => {
  const {
    name, description, tags, type, data, calendar
  } = xmlData.root as Record<string, unknown>;
  const finalData = {
    data: {
      calendar: allFileDetails
        ? calendarEventExtractorXml(
          ((data as Record<string, unknown>[])[0].calendar) as Record<string, unknown>[]
        )
        : calendarEventExtractorXml(calendar as Record<string, unknown>[])
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
