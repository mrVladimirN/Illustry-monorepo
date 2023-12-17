/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarType } from 'types/visualizations';

export const computeCategoriesCalendar = (calendarData: CalendarType[]) => [
  ...new Set(
    calendarData.map((cal) => cal.category)
  )
];

export const computeColors = (categories: string[], colors: string[]) => {
  const color: { [key: string]: string } = {};
  categories.forEach((cat, index) => {
    color[cat] = colors[index] as string;
  });
  return color;
};
export const computeLegendColors = (categories: string[], colors: string[]) => {
  const color: { [key: string]: string } = {};
  categories.forEach((cat, index) => {
    color[cat] = colors[index] as string;
  });
  return color;
};
// eslint-disable-next-line max-len
export const computeElementsCalendar = (element: CalendarType) => [element.date, element.value ? element.value : 1, element.category];

export const computePropertiesForToolTip = (
  properties: any,
  value?: number | string
) => {
  let prop = '';
  if (properties) {
    if (typeof properties === 'object') {
      Object.entries(properties).forEach(([key]) => {
        if (Object.hasOwnProperty.call(properties, key)) {
          const propValue = properties[key];
          prop += `<div style="font-weight: bold">${key}:${propValue}</div>`;
        }
      });
    } else if (typeof properties === 'string') {
      prop += properties;
    }
  }
  if (value) {
    prop += `<div style="font-weight: bold">value:${value}</div>`;
  }

  return prop;
};

export const computeCalendar = (
  calendarData: CalendarType[],
  isDarkTheme: boolean
) => {
  const years = [
    ...new Set(
      calendarData.map((cal) => new Date(cal.date).getFullYear())
    )
  ];
  const textColor = isDarkTheme ? '#888' : '#333';

  const groupedByYears = calendarData.reduce((group: any, event) => {
    const eventDate = new Date(event.date);
    const eventYear = eventDate.getFullYear();

    if (eventYear && !group[eventYear]) {
      // eslint-disable-next-line no-param-reassign
      group[eventYear] = [];
      group[eventYear]?.push(computeElementsCalendar(event));
    } else {
      group[eventYear]?.push(computeElementsCalendar(event));
    }
    return group;
  }, {});
  const series = Object.entries(groupedByYears).map(
    ([, events], index) => ({
      type: 'heatmap',
      coordinateSystem: 'calendar',
      calendarIndex: index,
      data: events
    })
  );
  return {
    calendar: years.map((year, index) => ({
      top: (index + 1) * 150,
      left: 30,
      right: 30,
      cellSize: ['auto', 13],
      range: year.toString(),
      itemStyle: {
        borderWidth: 0.5
      },
      orient: 'horizontal',
      dayLabel: {
        show: true,
        fontSize: 14,
        textStyle: {
          color: textColor
        }
      },
      monthLabel: {
        show: true,
        fontSize: 14,
        textStyle: {
          color: textColor
        }
      },
      yearLabel: {
        show: true,
        fontSize: 14,
        position: 'top',
        textStyle: {
          color: textColor
        }
      }
    })),
    series
  };
};
