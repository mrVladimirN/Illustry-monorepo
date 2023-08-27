import { CalendarType } from "types/visualizations";

export const computeCategoriesCalendar = (calendarData: CalendarType[]) => {
  return [
    ...new Set(
      calendarData.map((cal) => {
        return cal.category;
      })
    ),
  ];
};

export const computeColors = (categories: string[], colors: string[]) => {
  const color: { [key: string]: string } = {};
  categories.forEach((cat, index) => {
    color[cat] = colors[index] as string;
  });
  return color;
};
export const computeElementsCalendar = (element: CalendarType) => {
  return [element.date, element.value ? element.value : 1, element.category];
};

export const computePropertiesForToolTip = (
  properties: any,
  value?: number | string
) => {
  let prop = "";
  if (properties) {
    if (typeof properties === "object") {
      for (const key in properties) {
        if (Object.hasOwnProperty.call(properties, key)) {
          const propValue = properties[key];
          prop += `<div style="font-weight: bold">${key}:${propValue}</div>`;
        }
      }
    
    } else if (typeof properties === "string") {
      prop += properties;
    }
  }
  if (value) {
    prop += `<div style="font-weight: bold">value:${value}</div>`;
  }

  return prop;
};

export const computeCalendar = (calendarData: CalendarType[]) => {
  const years = [
    ...new Set(
      calendarData.map((cal) => {
        return new Date(cal.date).getFullYear();
      })
    ),
  ];
  const groupedByYears = calendarData.reduce((group: any, event) => {
    const eventDate = new Date(event.date);
    const eventYear = eventDate.getFullYear();

    if (eventYear && !group[eventYear]) {
      group[eventYear] = [];
      group[eventYear]?.push(computeElementsCalendar(event));
    } else {
      group[eventYear]?.push(computeElementsCalendar(event));
    }
    return group;
  }, {});
  const series = Object.entries(groupedByYears).map(
    ([year, events], index) => ({
      type: "heatmap",
      coordinateSystem: "calendar",
      calendarIndex: index,
      data: events,
    })
  );
  return {
    calendar: years.map((year, index) => {
      return {
        top: (index + 1) * 150,
        left: 30,
        right: 30,
        cellSize: ["auto", 13],
        range: year.toString(),
        itemStyle: {
          borderWidth: 0.5,
        },
        orient: "horizontal",
        yearLabel: { show: true, fontSize: 14, position: "top" },
      };
    }),
    series: series,
  };
};
