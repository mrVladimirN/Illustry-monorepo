import { VisualizationTypes } from '@illustry/types';
import { toStringWithDefault, visualizationDetailsExtractor } from '../../../../utils/helper';

const reformatDate = (date: string): string | null => {
  // eslint-disable-next-line max-len
  const dateRegex = /\b(?:\d{4}[./-]\d{1,2}[./-]\d{1,2}|\d{1,2}[./-]\d{1,2}[./-]\d{4}|\d{1,2}[./-]\d{1,2}[./-]\d{2}|\d{4}-\d{2}-\d{2}|\d{2}-\d{2}-\d{4}|\d{2}-\d{2}-\d{2})\b/;
  const matches = date.match(dateRegex);

  if (matches && matches.length > 0) {
    const originalDate = matches[0];
    const dateComponents = originalDate.split(/[-./]/);

    const year = +dateComponents.find((component) => component.length === 4)!;
    const [component1, component2] = dateComponents.filter(
      (component) => component.length <= 2 && component !== '0000'
    );

    const tryOrdering = (month: number, day: number) => month > 0 && month <= 12 && day > 0 && day <= 31;

    if (tryOrdering(+component1, +component2)) {
      return `${year}-${String(component1).padStart(2, '0')}-${String(component2).padStart(2, '0')}`;
    }
    if (tryOrdering(+component2, +component1)) {
      return `${year}-${String(component2).padStart(2, '0')}-${String(component1).padStart(2, '0')}`;
    }
  }
  return null;
};

const excelDateToJSDate = (excelDate: number): string | null => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const daysSinceExcelEpoch = excelDate - 25569;
  const millisecondsSinceExcelEpoch = daysSinceExcelEpoch * millisecondsPerDay;
  const jsDate = new Date(millisecondsSinceExcelEpoch);

  if (!Number.isNaN(jsDate.getTime())) {
    // eslint-disable-next-line max-len
    return `${jsDate.getFullYear()}-${String(jsDate.getMonth() + 1).padStart(2, '0')}-${String(jsDate.getDate()).padStart(2, '0')}`;
  }
  return null;
};

const calendarTransformer = (
  mapping: Record<string, unknown>,
  values: string[] | number[],
  allFileDetails: boolean
) => {
  const baseValues = {
    date:
      typeof values[Number(mapping.dates)] === 'string'
        ? reformatDate(values[Number(mapping.dates)] as string)
        : excelDateToJSDate(values[Number(mapping.dates)] as number),
    value:
      typeof values[Number(mapping.values)] === 'string'
        ? +(values[Number(mapping.values)] as string)
        : values[Number(mapping.values)],
    category:
      typeof values[Number(mapping.categories)] === 'string'
        ? values[Number(mapping.categories)]
        : toStringWithDefault(values[Number(mapping.categories)]),
    properties:
      typeof values[Number(mapping.properties)] === 'string'
        ? values[Number(mapping.properties)]
        : toStringWithDefault(values[Number(mapping.properties)])
  };
  const visualizationDetails = visualizationDetailsExtractor(mapping, values);
  return allFileDetails
    ? { ...{ calendar: baseValues }, ...visualizationDetails }
    : { calendar: baseValues };
};

const calendarExtractorCsvOrExcel = (
  data: Record<string, unknown>[]
): VisualizationTypes.CalendarData => {
  const transformedData = data.reduce(
    (result, item) => {
      const calendarData = item.calendar as Record<string, unknown>;
      let calendar = (result.calendar as VisualizationTypes.CalendarType[]).find(
        (n: VisualizationTypes.CalendarType) => n.date === calendarData.date && n.category === calendarData.category
      );

      if (!calendar) {
        calendar = {
          category: calendarData.category,
          date: calendarData.date,
          value: calendarData.value,
          properties: calendarData.properties
        } as VisualizationTypes.CalendarType;

        if (
          calendar.category
          && calendar.date
          && calendar.value
        ) {
          (result.calendar as VisualizationTypes.CalendarType[]).push(calendar);
        }
      }

      return result;
    },
    { calendar: [] }
  );
  return transformedData as unknown as VisualizationTypes.CalendarData;
};

const calendarEventExtractorXml = (
  calendar: Record<string, unknown>[]
): VisualizationTypes.CalendarType[] => calendar.map((el: Record<string, unknown>) => ({
  category: typeof (el.value as string[])[0] === 'string'
    ? (el.category as string[])[0]
    : (typeof (el.value as string[])[0] === 'string').toString(),
  date: reformatDate((el.date as string)[0]),
  value: typeof (el.value as string[])[0] === 'string'
    ? +(el.value as string[])[0]
    : (el.value as string[])[0],
  properties: el.properties && (el.properties as Record<string, unknown>[]).length
    ? (el.properties as string[])[0]
    : undefined
})) as VisualizationTypes.CalendarType[];

const calendarExtractorXml = (
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
        name: (name as string[])[0],
        description: (description as string[])[0],
        tags: tags as string[],
        type: type as string
      }
    }
    : finalData;
};

export { calendarTransformer, calendarExtractorCsvOrExcel, calendarExtractorXml };
