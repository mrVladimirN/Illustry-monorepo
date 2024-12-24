import { VisualizationTypes, TransformerTypes } from '@illustry/types';

const computeCategoriesCalendar = (calendarData: VisualizationTypes.CalendarType[]) => [
  ...new Set(
    calendarData.map((cal) => cal.category)
  )
];

const computeColors = (categories: string[], colors: string[]) => {
  const color: { [key: string]: string } = {};
  categories.forEach((cat, index) => {
    color[cat] = colors[index] as string;
  });
  return color;
};

const computeLegendColors = (categories: string[], colors: string[]) => {
  const color: { [key: string]: string } = {};
  categories.forEach((cat, index) => {
    color[cat] = colors[index] as string;
  });
  return color;
};

const computeElementsCalendar = (element: VisualizationTypes.CalendarType) => {
  const { date, value, category } = element;
  return {
    date,
    value: value || 1,
    category
  };
};

const computePropertiesForToolTip = (
  properties: string | Record<string, string | number> | null,
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

const computeCalendar = (
  calendarData: VisualizationTypes.CalendarType[],
  textColor: string
) => {
  const years = [
    ...new Set(
      calendarData.map((cal) => new Date(cal.date).getFullYear())
    )
  ];

  const groupedByYears = calendarData.reduce((group: { [key: string]: (TransformerTypes.CalendarType)[] }, event) => {
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

export {
  computeCategoriesCalendar,
  computeColors,
  computeLegendColors,
  computePropertiesForToolTip,
  computeCalendar
};
