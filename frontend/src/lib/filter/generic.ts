const acceptedConstructions = ['>', '<', '=', '>=', '<=', '!='];

const parseCondition = (condition: string, isDate = false) => {
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
};

const evaluateCondition = (
  value: string | number,
  condition: string,
  isDate = false
) => {
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
};

const getMatchingIndices = (
  initialArray: string[],
  filterArray: string[]
) => {
  const matchingIndices = [];
  for (let i = 0; i < initialArray.length; i += 1) {
    if (filterArray.includes(initialArray[i] as string)) {
      matchingIndices.push(i);
    }
  }

  return matchingIndices;
};

const validateExpressions = (
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
      const word = parts[0]?.trim();
      if (word && words.includes(word)) {
        return expression;
      }
      throw new Error(`Invalid expression: Word '${word}' not found.`);
    } else {
      throw new Error('Invalid expression: Construction not found.');
    }
  });

  return validatedExpressions;
};

export {
  parseCondition, validateExpressions, getMatchingIndices, evaluateCondition
};
