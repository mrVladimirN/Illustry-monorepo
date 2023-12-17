import { ReactNode } from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';

export interface TimelineElementProps {
    date: string,
    isDarkTheme:boolean,
    inView: boolean,
    children: ReactNode
}
const TimelineElement = ({
  date, isDarkTheme, inView, children
}:TimelineElementProps) => (
    <VerticalTimelineElement
      contentStyle={{
        background: !isDarkTheme ? 'rgb(245, 245, 245)' : 'rgb(66, 66, 66)',
        color: !isDarkTheme ? 'rgb(245, 245, 245)' : 'rgb(66, 66, 66)'
      }}
      iconStyle={{
        background: !isDarkTheme ? 'rgb(245, 245, 245)' : 'rgb(66, 66, 66)',
        color: !isDarkTheme ? 'rgb(245, 245, 245)' : 'rgb(66, 66, 66)'
      }}
      contentArrowStyle={{
        visibility: 'hidden'
      }}
      key={date}
      visible={inView}
      icon={<></>}
    >
      {children}
    </VerticalTimelineElement>
);

export default TimelineElement;
