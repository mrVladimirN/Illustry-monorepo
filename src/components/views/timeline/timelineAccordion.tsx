import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { groupEventsByDate } from '@/lib/visualizations/timeline/helper';
import React from 'react';
import { TimelineData, TimelineEvent } from 'types/visualizations';
import TimelineDialog from './timelineDialog';

export interface TimelineAccordionProps {
  data: TimelineData;
  date: string;
}
const TimelineAccordion = ({
  data,
  date
}: TimelineAccordionProps) => (
    <Accordion type="single" collapsible>
      {data
        && data[date]
        && data[date]?.events
        && Object.keys(
          groupEventsByDate(data[date]?.events as TimelineEvent[])
        ).map((time) => {
          const events = groupEventsByDate(
            data[date]?.events as TimelineEvent[]
          );
          return (
            <AccordionItem key={time} value={time}>
              <AccordionTrigger className="cursor-pointer">
                <span className="capitalize font-medium text-gray-700 dark:text-gray-400 xs:text-sm">
                  {time}
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ul>
                  {events[time]?.map((event) => (
                    <li
                      key={event.summary}
                      className="list-disc ml-4  text-gray-700 dark:text-gray-400"
                    >
                      <TimelineDialog event={event}></TimelineDialog>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          );
        })}
    </Accordion>
);

export default TimelineAccordion;
