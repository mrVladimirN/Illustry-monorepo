'use client';

import { siteConfig } from '@/config/site';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  Suspense,
  useState
} from 'react';
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
import SankeyGraphShellView from './sankey/sankey-shell';
import WordCloudShellView from './wordcloud/wordcloud-shell';
import TreeMapShellView from './treemap-shell';
import SunBurstShellView from './sunburst-shell';
import ScatterShellView from './scatter/scatter-shell';
import PieChartShellView from './pie-chart/piechart-shell';
import ForcedLayoutGraphShellView from './forced-layout-graph/forced-layout-graph-shell';
import CalendarGraphShellView from './calendar/calendar-shell';
import FunnelShellView from './funnel/funnel-shell';
import AxisChartsShellView from './axis/axis-shell';
import TimelineShellView from './timeline/timeline-shell';
import MatrixShellView from './matrix/matrix-shell';
import HierarchicalEdgeBundlingShellView from './hierarchical-edge-bundling/hierarchical-edge-bundling-shell';

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
                  <AxisChartsShellView
                    data={JSON.parse(textareaValue as string) as AxisChartData}
                    legend={false}
                    options={false}
                    type={'bar'}
                    filter={false}
                  />
                )}
                {key === 'lineChart' && isSubmitable && (
                  <AxisChartsShellView
                    data={JSON.parse(textareaValue as string) as AxisChartData}
                    legend={false}
                    options={false}
                    type={'line'}
                    filter={false}
                  />
                )}
                {key === 'sankey' && isSubmitable && (
                  <SankeyGraphShellView
                    data={JSON.parse(textareaValue as string) as NodeLinkData}
                    legend={false}
                    options={false}
                    filter={true}
                  />
                )}
                {key === 'heb' && isSubmitable && (
                  <HierarchicalEdgeBundlingShellView
                    data={siteConfig.nodeLink}
                    legend={false}
                    options={false}
                    filter={false}
                    containered={true}
                  />
                )}
                {key === 'flg' && isSubmitable && (
                  <ForcedLayoutGraphShellView
                    data={JSON.parse(textareaValue as string) as NodeLinkData}
                    legend={false}
                    options={false}
                    filter={false}
                  />
                )}
                {key === 'matrix' && isSubmitable && (
                  <MatrixShellView
                    data={JSON.parse(textareaValue as string) as NodeLinkData}
                    legend={false}
                    options={false}
                    filter={false}
                  />
                )}
                {key === 'wordCloud' && isSubmitable && (
                  <WordCloudShellView
                    data={JSON.parse(textareaValue as string) as WordCloudData}
                    legend={false}
                    options={false}
                    filter={false}
                  />
                )}
                {key === 'funnel' && isSubmitable && (
                  <FunnelShellView
                    data={JSON.parse(textareaValue as string) as FunnelData}
                    legend={false}
                    options={false}
                    filter={false}
                  />
                )}
                {key === 'pieChart' && isSubmitable && (
                  <PieChartShellView
                    data={JSON.parse(textareaValue as string) as FunnelData}
                    legend={false}
                    options={false}
                    filter={false}
                  />
                )}
                {key === 'scatter' && isSubmitable && (
                  <ScatterShellView
                    data={JSON.parse(textareaValue as string) as ScatterData}
                    legend={false}
                    options={false}
                    filter={false}
                  />
                )}
                {key === 'sunburst' && isSubmitable && (
                  <SunBurstShellView
                    data={JSON.parse(textareaValue as string) as HierarchyData}
                    legend={false}
                    options={false}
                  />
                )}
                {key === 'timeline' && isSubmitable && (
                  <TimelineShellView
                    data={JSON.parse(textareaValue as string) as TimelineData}
                    legend={false}
                    options={false}
                    filter={false}

                  />
                )}
                {key === 'treeMap' && isSubmitable && (
                  <TreeMapShellView
                    data={JSON.parse(textareaValue as string) as HierarchyData}
                    legend={false}
                    options={false}
                  />
                )}
                {key === 'calendar' && isSubmitable && (
                  <CalendarGraphShellView
                    data={JSON.parse(textareaValue as string) as CalendarData}
                    legend={false}
                    options={false}
                    filter={false}
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
                    setIsSubmitable ={setIsSubmitable}
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
