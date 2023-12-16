import { TimelineData, TimelineEvent } from 'types/visualizations';

export const computeColors = (types: string[], colors: string[]) => {
  const color: { [key: string]: string } = {};
  types.forEach((cat, index) => {
    color[cat] = colors[index] as string;
  });
  return color;
};

export const extractTimelineDataTypes = (data: TimelineData): string[] => {
  let timelineDataTypes: string[] = [];

  Object.keys(data).forEach((date) => {
    if (data[date] && data[date]?.events) {
      const types = data[date]?.events.map((event) => event.type);
      timelineDataTypes = timelineDataTypes.concat(types as string[]);
    }
  });

  return Array.from(new Set(timelineDataTypes));
};
export const groupEventsByDate = (events: TimelineEvent[]): { [date: string]: TimelineEvent[] } => {
  const groupedEvents: { [date: string]: TimelineEvent[] } = {};

  return events.reduce((groupedEvents, event) => {
    const { date } = event;

    if (!groupedEvents[date]) {
      groupedEvents[date] = [];
    }

    groupedEvents[date]?.push(event);

    return groupedEvents;
  }, groupedEvents);
};
