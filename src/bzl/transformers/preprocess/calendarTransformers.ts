import _ from "lodash";
import { visualizationDetailsExtractor } from "../../../utils/helper";
import { CalendarData, CalendarType } from "types/visualizations";

const reformatDate = (date: string): string | null => {
  const dateRegex =
    /\b(?:\d{4}[./-]\d{1,2}[./-]\d{1,2}|\d{1,2}[./-]\d{1,2}[./-]\d{4}|\d{1,2}[./-]\d{1,2}[./-]\d{2}|\d{4}-\d{2}-\d{2}|\d{2}-\d{2}-\d{4}|\d{2}-\d{2}-\d{2})\b/;

  const matches = date.match(dateRegex);

  if (matches && matches.length > 0) {
    const originalDate = matches[0];
    const dateComponents = originalDate.split(/[-./]/);

    const year = parseInt(
      dateComponents.find((component) => component.length === 4) as string
    );

    const [component1, component2] = dateComponents.filter(
      (component) => component.length <= 2 && component !== "0000"
    );

    const tryOrdering = (month: number, day: number) =>
      !isNaN(month) &&
      month > 0 &&
      month <= 12 &&
      !isNaN(day) &&
      day > 0 &&
      day <= 31;

    if (tryOrdering(parseInt(component1), parseInt(component2))) {
      const reformattedDate = `${year}-${String(component1).padStart(
        2,
        "0"
      )}-${String(component2).padStart(2, "0")}`;
      return reformattedDate;
    } else if (tryOrdering(parseInt(component2), parseInt(component1))) {
      const reformattedDate = `${year}-${String(component2).padStart(
        2,
        "0"
      )}-${String(component1).padStart(2, "0")}`;
      return reformattedDate;
    }
  }
  return null;
};
const excelDateToJSDate = (excelDate: number): string | null => {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const daysSinceExcelEpoch = excelDate - 1; // Excel epoch starts from 1
  const millisecondsSinceExcelEpoch = daysSinceExcelEpoch * millisecondsPerDay;
  const jsDate = new Date(millisecondsSinceExcelEpoch);
  if (!_.isNil(jsDate)) {
    const reformattedDate = `${jsDate.getFullYear()}-${String(
      jsDate.getMonth() + 1
    ).padStart(2, "0")}-${String(jsDate.getDate()).padStart(2, "0")}`;
    return reformattedDate;
  } else {
    return null;
  }
};
export const calendarTransformer = (
  mapping: Record<string, unknown>,
  values: unknown[],
  allFileDetails: boolean
) => {
  const baseValues = {
    date:
      typeof values[_.toNumber(mapping.dates)] === "string"
        ? reformatDate(values[_.toNumber(mapping.dates)] as string)
        : excelDateToJSDate(values[_.toNumber(mapping.dates)] as number),
    value:
      typeof values[_.toNumber(mapping.values)] === "string"
        ? +(values[_.toNumber(mapping.values)] as string)
        : values[_.toNumber(mapping.values)],
    category: values[_.toNumber(mapping.categories)],
    properties: values[_.toNumber(mapping.properties)],
  };
  const visualizationDetails = visualizationDetailsExtractor(mapping, values);
  return allFileDetails
    ? { ...{ calendar: baseValues }, ...visualizationDetails }
    : { calendar: baseValues };
};

export const calendarExtractor = (
  data: Record<string, unknown>[]
): CalendarData => {
  const transformedData = data.reduce(
    (result, item) => {
      const calendarData = item.calendar;
      let calendar;
      const { category, date, value, properties } = calendarData as Record<
        string,
        unknown
      >;
      calendar = (result.calendar as CalendarType[]).find(
        (n: CalendarType) => n.date === date && n.category === category
      );
      if (_.isNil(calendar)) {
        calendar = { category, date, value, properties } as CalendarType;
        if (
          !_.isNil(calendar.category) &&
          !_.isNil(calendar.date) &&
          !_.isEmpty(calendar.category) &&
          !_.isEmpty(calendar.date) &&
          !_.isNil(calendar.value)
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
