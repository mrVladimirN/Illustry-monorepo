import { AxisChartData } from 'types/visualizations';
import { applyAxisFilter } from './axis';
import { visualizationTypesEnum } from '../validation/visualizations';

const acceptedSeparators = ['&&'];
const acceptedConstructions = ['>', '<', '=', '>=', '<=', '!='];

export const validateExpressions = (expressions:string[], words:string[]): string[] => {
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
  data: AxisChartData,
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
      (expressions.filter((part) => part !== undefined) as string[]),
      words
    );

    switch (type) {
      case visualizationTypesEnum.LINE_CHART:
      case visualizationTypesEnum.BAR_CHART:
        return applyAxisFilter(
          (expressions.filter((part) => part !== undefined) as string[]),
          data
        );
      default:
        return data;
    }
  } catch (error: unknown) {
    throw new Error(`The expression could not be parsed. ${(error as Error).message}`);
  }
};
