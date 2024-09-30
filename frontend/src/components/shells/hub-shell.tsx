import { Suspense } from 'react';
import { VisualizationTypes } from '@illustry/types';
import Fallback from '../ui/fallback';
import SankeyGraphShellView from './sankey/sankey-shell';
import WordCloudShellView from './wordcloud/wordcloud-shell';
import TreeMapShellView from './treemap/treemap-shell';
import SunBurstShellView from './sunburst/sunburst-shell';
import ScatterShellView from './scatter/scatter-shell';
import PieChartShellView from './pie-chart/piechart-shell';
import ForcedLayoutGraphShellView from './forced-layout-graph/forced-layout-graph-shell';
import CalendarGraphShellView from './calendar/calendar-shell';
import FunnelShellView from './funnel/funnel-shell';
import AxisChartsShellView from './axis/axis-shell';
import TimelineShellView from './timeline/timeline-shell';
import MatrixShellView from './matrix/matrix-shell';
import HierarchicalEdgeBundlingShellView from './hierarchical-edge-bundling/hierarchical-edge-bundling-shell';

interface HubShellProps {
  data?: VisualizationTypes.VisualizationType;
}

function HubShell({ data }: HubShellProps) {
  const renderGraph = () => {
    if (data) {
      switch (data.type) {
        case 'hierarchical-edge-bundling':
          return (
            <Suspense fallback={<Fallback />}>
              <HierarchicalEdgeBundlingShellView
                data={data.data as VisualizationTypes.NodeLinkData}
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
                data={data.data as VisualizationTypes.NodeLinkData}
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
                data={data.data as VisualizationTypes.NodeLinkData}
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
                data={data.data as VisualizationTypes.CalendarData}
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
                data={data.data as VisualizationTypes.WordCloudData}
                legend={true}
                options={true}
                filter={true}
              />
            </Suspense>
          );
        case 'matrix':
          return (
            <Suspense fallback={<Fallback />}>
              <MatrixShellView
                data={data.data as VisualizationTypes.NodeLinkData}
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
                data={data.data as VisualizationTypes.AxisChartData}
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
                data={data.data as VisualizationTypes.AxisChartData}
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
                data={data.data as VisualizationTypes.PieChartData}
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
                data={data.data as VisualizationTypes.FunnelData}
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
                data={data.data as VisualizationTypes.ScatterData}
                legend={true}
                options={true}
                filter={true}
              />
            </Suspense>
          );
        case 'treemap':
          return (
            <Suspense fallback={<Fallback />}>
              <TreeMapShellView
                data={data.data as VisualizationTypes.HierarchyData}
                legend={true}
                options={true}
                filter={false}
              />
            </Suspense>
          );
        case 'sunburst':
          return (
            <Suspense fallback={<Fallback />}>
              <SunBurstShellView
                data={data.data as VisualizationTypes.HierarchyData}
                legend={true}
                options={true}
                filter={false}
              />
            </Suspense>
          );
        case 'timeline':
          return (
            <Suspense fallback={<Fallback />}>
              <TimelineShellView
                data={data.data as VisualizationTypes.TimelineData}
                legend={true}
                options={true}
                filter={true}
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
