/* eslint-disable import/no-cycle */
import {
  AxisChartData,
  CalendarType,
  FunnelData,
  HierarchyNode,
  Link,
  Node,
  PieChartData,
  TimelineData,
  WordType
} from 'types/visualizations';
import { applyAxisFilter } from './axis';
import { visualizationTypesEnum } from '../validation/visualizations';
import { applyCalendarFilter } from './calendar';
import { AllVisualizationsShell } from '../types/utils';
import { applyNodeLinkFilter } from './nodeLink';
import { applyFunnelPieFilter } from './funnelPie';
import { applyWordCloudFilter } from './wordcloud';
import { applyScatterFilter } from './scatter';
import { applyTimelineFilter } from './timeline';
import { applyHierachyFilter } from './hierarchy';

const acceptedSeparators = ['&&'];
const acceptedConstructions = ['>', '<', '=', '>=', '<=', '!='];

export function parseCondition(condition: string, isDate = false) {
  const regex = !isDate
    ? /([><=!]+)\s*(\d+)/
    : /([><=!]+)\s*(['"]?)(\d{4}-\d{2}-\d{2}|\d+)['"]?/;
  const match = condition.match(regex);
  if (match) {
    if (isDate) {
      const [, operator, , targetValue] = match;
      return [operator, targetValue];
    }
    const [, operator, targetValue] = match;
    return [operator, targetValue];
  }
  throw new Error(`Invalid condition: ${condition}`);
}

export function evaluateCondition(
  value: string | number,
  condition: string,
  isDate = false
) {
  const [operator, targetValue] = parseCondition(condition, isDate);
  switch (operator) {
    case '>':
      return targetValue && value > targetValue;
    case '<':
      return targetValue && value < targetValue;
    case '>=':
      return targetValue && value >= targetValue;
    case '<=':
      return targetValue && value <= targetValue;
    case '!=':
      return targetValue && value !== targetValue;
    case '=':
    default:
      return targetValue && value === targetValue;
  }
}
export function getMatchingIndices(
  initialArray: string[],
  filterArray: string[]
) {
  const matchingIndices = [];

  for (let i = 0; i < initialArray.length; i += 1) {
    if (filterArray.includes(initialArray[i] as string)) {
      matchingIndices.push(i);
    }
  }

  return matchingIndices;
}

export const validateExpressions = (
  expressions: string[],
  words: string[]
): string[] => {
  const validatedExpressions = expressions.map((expression) => {
    const constructionRegex = new RegExp(
      `(${acceptedConstructions.join('|')})`
    );
    const match = expression.match(constructionRegex);
    if (match) {
      const construction = match[0];
      const parts = expression.split(construction);
      const word = (parts[0] as unknown as string).trim();
      if (words.includes(word)) {
        return expression;
      }
      throw new Error(`Invalid expression: Word '${word}' not found.`);
    } else {
      throw new Error('Invalid expression: Construction not found.');
    }
  });

  return validatedExpressions;
};
export const parseFilter = (
  expression: string,
  data: AllVisualizationsShell,
  words: string[],
  type: visualizationTypesEnum
) => {
  try {
    const separatorsRegex = new RegExp(
      acceptedSeparators
        .map(
          (sep) => `(${sep
            .replace(/[-\\/\\^$*+?.()|[\]{}]/g, '\\$&')
            .replace(/\|\|/g, '|')})`
        )
        .join('|'),
      'g'
    );

    const separators = [];
    const expressions = expression.split(separatorsRegex).map((part) => {
      if (acceptedSeparators.includes(part)) {
        separators.push(part);
        return undefined;
      }

      return part;
    });
    validateExpressions(
      expressions.filter((part) => part !== undefined) as string[],
      words
    );

    switch (type) {
      case visualizationTypesEnum.LINE_CHART:
      case visualizationTypesEnum.BAR_CHART:
        return applyAxisFilter(
          expressions.filter((part) => part !== undefined) as string[],
          data as AxisChartData
        );
      case visualizationTypesEnum.CALENDAR:
        return applyCalendarFilter(
          expressions.filter((part) => part !== undefined) as string[],
          data as {
            categories: string[];
            calendar: CalendarType[];
          }
        );
      case visualizationTypesEnum.FORCE_DIRECTED_GRAPH:
      case visualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING:
      case visualizationTypesEnum.MATRIX:
      case visualizationTypesEnum.SANKEY:
        return applyNodeLinkFilter(
          expressions.filter((part) => part !== undefined) as string[],
          data as {
            nodes: Node[];
            links: Link[];
          }
        );
      case visualizationTypesEnum.FUNNEL:
      case visualizationTypesEnum.PIE_CHART:
        return applyFunnelPieFilter(
          expressions.filter((part) => part !== undefined) as string[],
          data as PieChartData | FunnelData
        );
      case visualizationTypesEnum.WORD_CLOUD:
        return applyWordCloudFilter(
            expressions.filter((part) => part !== undefined) as string[],
            data as WordType[]
        );
      case visualizationTypesEnum.SCATTER:
        return applyScatterFilter(
              expressions.filter((part) => part !== undefined) as string[],
              data as {
                points: (string | number)[][];
                categories: string[];
              }
        );
      case visualizationTypesEnum.TIMELINE:
        return applyTimelineFilter(
              expressions.filter((part) => part !== undefined) as string[],
              data as TimelineData
        );
      case visualizationTypesEnum.SUNBURST:
      case visualizationTypesEnum.TREEMAP:
        return applyHierachyFilter(
              expressions.filter((part) => part !== undefined) as string[],
              data as {
                categories: string[]
                nodes: HierarchyNode[]
                }
        );
      default:
        return data;
    }
  } catch (error: unknown) {
    throw new Error(
      `The expression could not be parsed. ${(error as Error).message}`
    );
  }
};
