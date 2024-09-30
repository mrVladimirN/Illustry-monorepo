'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { VisualizationTypes } from '@illustry/types';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import TimelineAccordion from './timeline/timelineAccordion';
import TimelineElement from './timeline/timelineElement';

interface TimelineProp extends WithLegend, WithOptions {
  data: VisualizationTypes.TimelineData;
}

const TimelineView = ({
  data
}: TimelineProp) => {
  const theme = typeof window !== 'undefined' ? localStorage.getItem('theme') : 'light';
  const isDarkTheme = theme === 'dark';
  const { ref, inView } = useInView({
    triggerOnce: true
  });
  const sortedKeys = Object.keys(data).sort();

  const elementsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;
  const displayedDates = sortedKeys.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (endIndex < sortedKeys.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="mt-[10%] mr-[20%]" ref={ref}>
      <VerticalTimeline
        layout="1-column-left"
        animate={true}
        lineColor={!isDarkTheme ? 'rgb(245, 245, 245)' : 'rgb(66, 66, 66)'}
      >
        {displayedDates.map((date) => (
            <TimelineElement
              date={date}
              isDarkTheme={isDarkTheme}
              inView={inView}
              key={date}
            >
              <h3 className="vertical-timeline-element-title text-gray-700 dark:text-gray-400 text-center my-2 text-xm md:text-xl">
                {data[date]?.summary?.title}
              </h3>
              <span className="capitalize font-medium text-gray-700 dark:text-gray-400 xs:text-sm">
                {formatDate(date)}
              </span>
              <TimelineAccordion data={data} date={date}></TimelineAccordion>
            </TimelineElement>
        ))}
      </VerticalTimeline>
      <div className="flex justify-center mt-[5%] mb-[10%]">
        <Button
          suppressHydrationWarning
          aria-label="Go to previous page"
          variant="outline"
          size="icon"
          className="hidden h-8 w-8 lg:flex"
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
        </Button>
        <Button
          suppressHydrationWarning
          aria-label="Go to next page"
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={handleNextPage}
          disabled={endIndex >= sortedKeys.length}
        >
          <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
};

export default TimelineView;
