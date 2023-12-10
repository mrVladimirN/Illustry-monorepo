import {
  VisualizationTypesEnum,
  VisualizationUpdate
} from 'types/visualizations';
import _ from 'lodash';
import { visualizationPropertiesExtractor } from '../../../utils/helper';
import {
  nodesLinksExtractorCsvOrExcel,
  nodeLinksExtractorXml
} from './transformers/nodeLinkTransformers';
import {
  wordCloudExtractorCsvOrExcel,
  wordCloudExtractorXml
} from './transformers/wordCloudTransformer';
import {
  axisChartExtractorCsvOrExcel,
  axisChartExtractorXml
} from './transformers/axisChartTransformer';
import {
  calendarExtractorCsvOrExcel,
  calendarExtractorXml
} from './transformers/calendarTransformers';
import {
  hierarchyExtractorCsvOrExcel,
  hierarchyExtractorXml
} from './transformers/hierarchyTransformers';
import matrixExtractorXml from './transformers/matrixTransformer';
import {
  pieChartFunnelExtractorCsvOrExcel,
  pieChartFunnelExtractorXml
} from './transformers/pieChartFunnelTransformer';
import {
  scatterExtractorCsvOrExcel,
  scatterExtractorXml
} from './transformers/scatterTransformer';

export const exelOrCsvdataProvider = (
  type: VisualizationTypesEnum,
  computedRows: Record<string, unknown>[],
  allFileDetails: boolean
) => {
  const data: VisualizationUpdate = {};
  switch (type) {
    case VisualizationTypesEnum.WORD_CLOUD:
      if (allFileDetails) {
        const visualizationProperties = visualizationPropertiesExtractor(computedRows);
        _.set(
          data,
          'data',
          wordCloudExtractorCsvOrExcel(visualizationProperties.data)
        );
        _.set(data, 'name', visualizationProperties.name);
        _.set(data, 'description', visualizationProperties.description);
        _.set(data, 'tags', visualizationProperties.tags);
        _.set(data, 'type', type);
        return data;
      }
      _.set(data, 'data', wordCloudExtractorCsvOrExcel(computedRows));
      _.set(data, 'type', type);
      return data;

    case VisualizationTypesEnum.FORCE_DIRECTED_GRAPH:
    case VisualizationTypesEnum.SANKEY:
    case VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING:
      if (allFileDetails) {
        const visualizationProperties = visualizationPropertiesExtractor(computedRows);
        _.set(
          data,
          'data',
          nodesLinksExtractorCsvOrExcel(visualizationProperties.data)
        );
        _.set(data, 'name', visualizationProperties.name);
        _.set(data, 'description', visualizationProperties.description);
        _.set(data, 'tags', visualizationProperties.tags);
        _.set(data, 'type', type);
        return data;
      }
      _.set(data, 'data', nodesLinksExtractorCsvOrExcel(computedRows));
      _.set(data, 'type', type);
      return data;

    case VisualizationTypesEnum.CALENDAR:
      if (allFileDetails) {
        const visualizationProperties = visualizationPropertiesExtractor(computedRows);
        _.set(
          data,
          'data',
          calendarExtractorCsvOrExcel(visualizationProperties.data)
        );
        _.set(data, 'name', visualizationProperties.name);
        _.set(data, 'description', visualizationProperties.description);
        _.set(data, 'tags', visualizationProperties.tags);
        _.set(data, 'type', type);
        return data;
      }
      _.set(data, 'data', calendarExtractorCsvOrExcel(computedRows));
      _.set(data, 'type', type);
      return data;

    case VisualizationTypesEnum.BAR_CHART:
    case VisualizationTypesEnum.LINE_CHART:
      if (allFileDetails) {
        const visualizationProperties = visualizationPropertiesExtractor(computedRows);
        _.set(
          data,
          'data',
          axisChartExtractorCsvOrExcel(visualizationProperties.data)
        );
        _.set(data, 'name', visualizationProperties.name);
        _.set(data, 'description', visualizationProperties.description);
        _.set(data, 'tags', visualizationProperties.tags);
        _.set(data, 'type', type);
        return data;
      }
      _.set(data, 'data', axisChartExtractorCsvOrExcel(computedRows));
      _.set(data, 'type', type);
      return data;

    case VisualizationTypesEnum.FUNNEL:
    case VisualizationTypesEnum.PIE_CHART:
      if (allFileDetails) {
        const visualizationProperties = visualizationPropertiesExtractor(computedRows);
        _.set(
          data,
          'data',
          pieChartFunnelExtractorCsvOrExcel(visualizationProperties.data)
        );
        _.set(data, 'name', visualizationProperties.name);
        _.set(data, 'description', visualizationProperties.description);
        _.set(data, 'tags', visualizationProperties.tags);
        _.set(data, 'type', type);
        return data;
      }
      _.set(data, 'data', pieChartFunnelExtractorCsvOrExcel(computedRows));
      _.set(data, 'type', type);
      return data;

    case VisualizationTypesEnum.SCATTER:
      if (allFileDetails) {
        const visualizationProperties = visualizationPropertiesExtractor(computedRows);
        _.set(
          data,
          'data',
          scatterExtractorCsvOrExcel(visualizationProperties.data)
        );
        _.set(data, 'name', visualizationProperties.name);
        _.set(data, 'description', visualizationProperties.description);
        _.set(data, 'tags', visualizationProperties.tags);
        _.set(data, 'type', type);
        return data;
      }
      _.set(data, 'data', scatterExtractorCsvOrExcel(computedRows));
      _.set(data, 'type', type);
      return data;

    case VisualizationTypesEnum.TREEMAP:
    case VisualizationTypesEnum.SUNBURST:
      if (allFileDetails) {
        const visualizationProperties = visualizationPropertiesExtractor(computedRows);
        _.set(
          data,
          'data',
          hierarchyExtractorCsvOrExcel(visualizationProperties.data)
        );
        _.set(data, 'name', visualizationProperties.name);
        _.set(data, 'description', visualizationProperties.description);
        _.set(data, 'tags', visualizationProperties.tags);
        _.set(data, 'type', type);
        return data;
      }
      _.set(data, 'data', hierarchyExtractorCsvOrExcel(computedRows));
      _.set(data, 'type', type);
      return data;

    default:
      return null;
  }
};

export const jsonDataProvider = (
  type: VisualizationTypesEnum,
  computedData: Record<string, unknown>,
  allFileDetails: boolean
) => {
  const data: VisualizationUpdate = {};
  if (!allFileDetails) {
    _.set(data, 'data', computedData);
    _.set(data, 'type', type);
    return data;
  }
  return computedData;
};

export const xmlDataProvider = (
  type: VisualizationTypesEnum,
  computedData: Record<string, unknown>,
  allFileDetails: boolean
) => {
  switch (type) {
    case VisualizationTypesEnum.FORCE_DIRECTED_GRAPH:
    case VisualizationTypesEnum.SANKEY:
    case VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING:
      return nodeLinksExtractorXml(computedData, allFileDetails);
    case VisualizationTypesEnum.WORD_CLOUD:
      return wordCloudExtractorXml(computedData, allFileDetails);
    case VisualizationTypesEnum.CALENDAR:
      return calendarExtractorXml(computedData, allFileDetails);
    case VisualizationTypesEnum.LINE_CHART:
    case VisualizationTypesEnum.BAR_CHART:
      return axisChartExtractorXml(computedData, allFileDetails);
    case VisualizationTypesEnum.PIE_CHART:
    case VisualizationTypesEnum.FUNNEL:
      return pieChartFunnelExtractorXml(computedData, allFileDetails);
    case VisualizationTypesEnum.SCATTER:
      return scatterExtractorXml(computedData, allFileDetails);
    case VisualizationTypesEnum.SUNBURST:
    case VisualizationTypesEnum.TREEMAP:
      return hierarchyExtractorXml(computedData, allFileDetails);
    case VisualizationTypesEnum.MATRIX:
      return matrixExtractorXml(computedData, allFileDetails);
    default:
      return null;
  }
};
