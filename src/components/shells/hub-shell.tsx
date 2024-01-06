import { Suspense } from 'react';
import {
  CalendarData,
  AxisChartData,
  NodeLinkData,
  VisualizationType,
  WordCloudData,
  ScatterData,
  HierarchyData,
  FunnelData,
  TimelineData
} from 'types/visualizations';
import { PieChartData } from 'index';
import Fallback from '../ui/fallback';
import SankeyGraphShellView from './sankey/sankey-shell';
import WordCloudShellView from './wordcloud-shell';
import TreeMapShellView from './treemap-shell';
import SunBurstShellView from './sunburst-shell';
import ScatterShellView from './scatter-shell';
import PieChartShellView from './pie-chart/piechart-shell';
import ForcedLayoutGraphShellView from './forced-layout-graph/forced-layout-graph-shell';
import CalendarGraphShellView from './calendar/calendar-shell';
import FunnelShellView from './funnel/funnel-shell';
import AxisChartsShellView from './axis/axis-shell';
import TimelineShellView from './timeline-shell';
import MatrixShellView from './matrix/matrix-shell';
import HierarchicalEdgeBundlingShellView from './hierarchical-edge-bundling/hierarchical-edge-bundling-shell';

interface HubShellProps {
  data?: VisualizationType;
}

function HubShell({ data }: HubShellProps) {
  const renderGraph = () => {
    if (data) {
      switch (data.type) {
        case 'hierarchical-edge-bundling':
          return (
            <Suspense fallback={<Fallback />}>
              <HierarchicalEdgeBundlingShellView
                data={data.data as NodeLinkData}
                legend={true}
                options={true}
                filter={true}
                containered={false}
              />
            </Suspense>
          );
        case 'force-directed-graph':
          return (
            <Suspense fallback={<Fallback />}>
              <ForcedLayoutGraphShellView
                data={data.data as NodeLinkData}
                legend={true}
                options={true}
                filter={true}
              />
            </Suspense>
          );
        case 'sankey':
          return (
            <Suspense fallback={<Fallback />}>
               <SankeyGraphShellView
                data={data.data as NodeLinkData}
                legend={true}
                options={true}
                filter={true}
              />
              </Suspense>
          );
        case 'calendar':
          return (
            <Suspense fallback={<Fallback />}>
              <CalendarGraphShellView
                data={data.data as CalendarData}
                legend={true}
                options={true}
                filter={true}
              />
            </Suspense>
          );
        case 'word-cloud':
          return (
            <Suspense fallback={<Fallback />}>
              <WordCloudShellView
                data={data.data as WordCloudData}
                legend={true}
                options={true}
              />
            </Suspense>
          );
        case 'matrix':
          return (
            <Suspense fallback={<Fallback />}>
              <MatrixShellView
                data={data.data as NodeLinkData}
                legend={true}
                options={true}
                filter={false}
              />
            </Suspense>
          );
        case 'line-chart':
          return (
            <Suspense fallback={<Fallback />}>
              <AxisChartsShellView
                data={data.data as AxisChartData}
                legend={true}
                options={true}
                type="line"
                filter={true}
              />
            </Suspense>
          );
        case 'bar-chart':
          return (
            <Suspense fallback={<Fallback />}>
              <AxisChartsShellView
                data={data.data as AxisChartData}
                legend={true}
                options={true}
                type="bar"
                filter={true}
              />
            </Suspense>
          );
        case 'pie-chart':
          return (
            <Suspense fallback={<Fallback />}>
              <PieChartShellView
                data={data.data as PieChartData}
                legend={true}
                options={true}
                filter={true}
              />
            </Suspense>
          );
        case 'funnel':
          return (
            <Suspense fallback={<Fallback />}>
              <FunnelShellView
                data={data.data as FunnelData}
                legend={true}
                options={true}
                filter={true}
              />
            </Suspense>
          );
        case 'scatter':
          return (
            <Suspense fallback={<Fallback />}>
              <ScatterShellView
                data={data.data as ScatterData}
                legend={true}
                options={true}
              />
            </Suspense>
          );
        case 'treemap':
          return (
            <Suspense fallback={<Fallback />}>
              <TreeMapShellView
                data={data.data as HierarchyData}
                legend={true}
                options={true}
              />
            </Suspense>
          );
        case 'sunburst':
          return (
            <Suspense fallback={<Fallback />}>
              <SunBurstShellView
                data={data.data as HierarchyData}
                legend={true}
                options={true}
              />
            </Suspense>
          );
        case 'timeline':
          return (
            <Suspense fallback={<Fallback />}>
              <TimelineShellView
                data={data.data as TimelineData}
                legend={true}
                options={true}
              />
            </Suspense>
          );
        default:
          return null;
      }
    }
    return null;
  };

  return <div>{renderGraph()}</div>;
}

export default HubShell;
