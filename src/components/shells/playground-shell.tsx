'use client';

import { siteConfig } from '@/config/site';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  Suspense,
  useState
} from 'react';
import dynamic from 'next/dynamic';
import {
  AxisChartData,
  CalendarData,
  FunnelData,
  HierarchyData,
  NodeLinkData,
  ScatterData,
  TimelineData,
  WordCloudData
} from 'types/visualizations';
import { catchError } from '@/lib/utils';
import {
  axisChartDataSchema,
  calendarDataSchema,
  hierarchySchema,
  nodeLinkDataSchema,
  pieChartFunnelDataSchema,
  scatterDataSchema,
  timelineDataSchema,
  wordCloudDataSchema
} from '@/lib/validation/visualizations';
import { generateErrorMessage } from 'zod-error';
import prettifyZodError from '@/lib/validation/prettifyError';
import { Button } from '../ui/button';
// import CodeViewer from '../ui/playground/components/code-viewer';

import PresetSelector from '../ui/playground/preset-selector';
import { Textarea } from '../ui/textarea';
import Separator from '../ui/separator';
import Fallback from '../ui/fallback';
import { ShowDiagramState } from './theme-shell';

const MatrixView = dynamic(
  () => import('@/components/views/matrix'),
  {
    ssr: false
  }
);
const TimelineView = dynamic(
  () => import('@/components/views/timeline'),
  {
    ssr: false
  }
);
const SankeyGraphView = dynamic(
  () => import('@/components/views/sankey-diagram'),
  {
    ssr: false
  }
);

const ForcedLayoutGraphView = dynamic(
  () => import('@/components/views/forced-layout-graph'),
  {
    ssr: false
  }
);
const HierarchicalEdgeBundlingView = dynamic(
  () => import('@/components/views/hierarchical-edge-bundling'),
  {
    ssr: false
  }
);
const CalendarView = dynamic(
  () => import('@/components/views/calendar-graph'),
  {
    ssr: false
  }
);

const WordCloudView = dynamic(() => import('@/components/views/wordcloud'), {
  ssr: false
});

const AxisChartView = dynamic(() => import('@/components/views/axis-charts'), {
  ssr: false
});
const PieView = dynamic(() => import('@/components/views/pie-chart'), {
  ssr: false
});
const ScatterView = dynamic(() => import('@/components/views/scatter'), {
  ssr: false
});
const TreeMapView = dynamic(() => import('@/components/views/treemap-chart'), {
  ssr: false
});
const SunBurstView = dynamic(
  () => import('@/components/views/sunburst-chart'),
  {
    ssr: false
  }
);
const FunnelView = dynamic(() => import('@/components/views/funnel-chart'), {
  ssr: false
});
function PlaygroundShell() {
  const [showDiagram, setShowDiagram] = useState<ShowDiagramState>({
    sankey: false,
    heb: false,
    flg: false,
    wordCloud: false,
    calendar: false,
    lineChart: false,
    barChart: false,
    scatter: false,
    pieChart: false,
    treeMap: false,
    sunburst: false,
    funnel: false,
    matrix: false,
    timeline: false
  });
  const [textareaValue, setTextareaValue] = useState<string>();
  const [isSubmitable, setIsSubmitable] = useState<boolean>(false);
  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setIsSubmitable(false);
    setTimeout(() => {
      setTextareaValue(event.target.value);
    }, 100);
  };
  const getActiveDiagramKey = (): keyof ShowDiagramState | null => {
    const activeKeys = Object.keys(showDiagram).filter(
      (key) => showDiagram[key as keyof ShowDiagramState]
    );

    return activeKeys.length === 1
      ? (activeKeys[0] as keyof ShowDiagramState)
      : null;
  };

  const toShowDiagram = (name: string, data: Record<string, unknown>) => {
    switch (name) {
      case 'heb':
      case 'flg':
      case 'sankey':
      case 'matrix':
        return nodeLinkDataSchema.safeParse(data);
      case 'calendar':
        return calendarDataSchema.safeParse(data);
      case 'wordCloud':
        return wordCloudDataSchema.safeParse(data);
      case 'lineChart':
      case 'barChart':
        return axisChartDataSchema.safeParse(data);
      case 'pieChart':
      case 'funnel':
        return pieChartFunnelDataSchema.safeParse(data);
      case 'scatter':
        return scatterDataSchema.safeParse(data);
      case 'treemap':
      case 'sunburst':
        return hierarchySchema.safeParse(data);
      case 'timeline':
        return timelineDataSchema.safeParse(data);
      default:
        return null;
    }
  };
  const handleSubmit = () => {
    try {
      const data = JSON.parse(textareaValue as string);
      setIsSubmitable(true);
      const activeKey = getActiveDiagramKey();
      const valid = toShowDiagram(activeKey as string, data);
      if (valid && !valid.success) {
        const errorMessage = generateErrorMessage(
          valid.error.issues,
          prettifyZodError()
        );
        throw new Error(errorMessage);
      }
    } catch (error) {
      setIsSubmitable(false);
      catchError(error);
    }
  };
  const createVisualizations = () => (
    <div className="overflow-auto flex-grow bg-gray-50 rounded-3xl dark:bg-gray-800 p-4 m-4 visualization-div">
      {Object.keys(showDiagram).map(
        (key) => showDiagram[key as keyof ShowDiagramState] && (
            <div key={key} className="w-full h-full">
              <Suspense fallback={<Fallback />}>
                {key === 'barChart' && isSubmitable && (
                  <AxisChartView
                    data={JSON.parse(textareaValue as string) as AxisChartData}
                    legend={false}
                    options={false}
                    type={'bar'}
                  />
                )}
                {key === 'lineChart' && isSubmitable && (
                  <AxisChartView
                    data={JSON.parse(textareaValue as string) as AxisChartData}
                    legend={false}
                    options={false}
                    type={'line'}
                  />
                )}
                {key === 'sankey' && isSubmitable && (
                  <SankeyGraphView
                    data={JSON.parse(textareaValue as string) as NodeLinkData}
                    legend={false}
                    options={false}
                  />
                )}
                {key === 'heb' && isSubmitable && (
                  <HierarchicalEdgeBundlingView
                    data={siteConfig.nodeLink}
                    legend={false}
                    options={false}
                  />
                )}
                {key === 'flg' && isSubmitable && (
                  <ForcedLayoutGraphView
                    data={JSON.parse(textareaValue as string) as NodeLinkData}
                    legend={false}
                    options={false}
                  />
                )}
                {key === 'matrix' && isSubmitable && (
                  <MatrixView
                    data={JSON.parse(textareaValue as string) as NodeLinkData}
                    legend={false}
                    options={false}
                  />
                )}
                {key === 'wordCloud' && isSubmitable && (
                  <WordCloudView
                    data={JSON.parse(textareaValue as string) as WordCloudData}
                    legend={false}
                    options={false}
                  />
                )}
                {key === 'funnel' && isSubmitable && (
                  <FunnelView
                    data={JSON.parse(textareaValue as string) as FunnelData}
                    legend={false}
                    options={false}
                  />
                )}
                {key === 'pieChart' && isSubmitable && (
                  <PieView
                    data={JSON.parse(textareaValue as string) as FunnelData}
                    legend={false}
                    options={false}
                  />
                )}
                {key === 'scatter' && isSubmitable && (
                  <ScatterView
                    data={JSON.parse(textareaValue as string) as ScatterData}
                    legend={false}
                    options={false}
                  />
                )}
                {key === 'sunburst' && isSubmitable && (
                  <SunBurstView
                    data={JSON.parse(textareaValue as string) as HierarchyData}
                    legend={false}
                    options={false}
                  />
                )}
                {key === 'timeline' && isSubmitable && (
                  <TimelineView
                    data={JSON.parse(textareaValue as string) as TimelineData}
                    legend={false}
                    options={false}
                  />
                )}
                {key === 'treeMap' && isSubmitable && (
                  <TreeMapView
                    data={JSON.parse(textareaValue as string) as HierarchyData}
                    legend={false}
                    options={false}
                  />
                )}
                {key === 'calendar' && isSubmitable && (
                  <CalendarView
                    data={JSON.parse(textareaValue as string) as CalendarData}
                    legend={false}
                    options={false}
                  />
                )}
              </Suspense>
            </div>
        )
      )}
    </div>
  );

  return (
    <>
      <div className="md:hidden">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4">
          <h2 className="text-lg font-semibold">Playground</h2>
          <div className="flex w-full space-x-2">
            <PresetSelector
              presets={siteConfig.visualizations}
              setShowDiagram={setShowDiagram}
              setTextareaValue={
                setTextareaValue as Dispatch<SetStateAction<string>>
              }
            />
            {/* <Button type="submit" onClick={saveCanvasAsPNG}>
              Save
            </Button> */}
          </div>
          <Separator />
          <div className="container py-6">
            <Textarea
              defaultValue={textareaValue}
              onChange={handleTextareaChange}
              className="w-full  flex-1 p-4 border-gray-300 bg-gray-50 rounded-3xl dark:border-gray-700 dark:bg-gray-800 md:min-h-[700px] lg:min-h-[700px]"
            />
            <div className="flex items-center space-x-2 mt-4">
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
          {createVisualizations()}
        </div>
      </div>

      <div className="hidden flex-col md:flex">
        <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
          <h2 className="text-lg font-semibold">Playground</h2>
          <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <PresetSelector
              presets={siteConfig.visualizations}
              setShowDiagram={setShowDiagram}
              setTextareaValue={
                setTextareaValue as Dispatch<SetStateAction<string>>
              }
            />
            <div className="hidden space-x-2 md:flex">
              {/* <CodeViewer /> */}
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex h-screen">
          <div className="w-[50%] md:w-1/3 p-4">
            <div className="container h-[93%] py-6 bg-gray-50 rounded-3xl dark:bg-gray-800">
              <Textarea
                defaultValue={textareaValue}
                onChange={handleTextareaChange}
                className="w-full h-[90%] flex-1 p-4 border-gray-300 bg-gray-50 rounded-3xl dark:border-gray-700 dark:bg-gray-800 md:min-h-[530px] lg:min-h-[530px]"
                style={{ overflow: 'hidden', resize: 'none' }}
              />
              <div className="flex items-center space-x-2 mt-4">
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
            </div>
          </div>

          <div className="w-full h-[80%] md:w-2/3">
            {createVisualizations()}
          </div>
        </div>
      </div>
    </>
  );
}

export default PlaygroundShell;
