import { Link, Node } from 'types/visualizations';
// eslint-disable-next-line import/no-cycle
import { evaluateCondition } from './generic';

export const nodeLinksWords = [
  'categories',
  'sources',
  'targets',
  'names',
  'values'
];

const applyNodeNameFilter = (
  filter: string,
  defaultData: {
    nodes: Node[];
    links: Link[];
  },
  filterType: string
) => {
  const included: string[] = [];
  const excluded: string[] = [];

  try {
    if (filter === '') {
      throw Error('No filter');
    }
    const regexPattern = new RegExp(
      `${filterType}\\s*([!=]+)\\s*\\[([^\\]]+)\\]`,
      'g'
    );
    const matches = filter.match(regexPattern);

    if (matches) {
      matches.forEach((match) => {
        const innerRegexPattern = new RegExp(
          `${filterType}\\s*([!=]+)\\s*\\[([^\\]]+)\\]`
        );
        const matchResult = match.match(innerRegexPattern);
        if (matchResult) {
          const [, operator, values] = matchResult;
          const filterCategories = (values as string)
            .replace(/'/g, '')
            .split(/\s*,\s*/)
            .filter(Boolean);
          if (operator === '=') {
            included.push(...filterCategories);
          } else if (operator === '!=') {
            excluded.push(...filterCategories);
          }
        }
      });
      if (filterType === 'categories' || filterType === 'names') {
        const filteredNodes = defaultData.nodes.filter(
          (node) => (included.length
              && included.includes(
                filterType === 'categories' ? node.category : node.name
              ))
            || (excluded.length
              && !excluded.includes(
                filterType === 'categories' ? node.category : node.name
              ))
        );
        const remainingNodesNames = filteredNodes.map((node) => node.name);
        const filteredLinks = defaultData.links.filter(
          (link) => remainingNodesNames.length
            && remainingNodesNames.includes(link.source)
            && remainingNodesNames.includes(link.target)
        );
        return { nodes: filteredNodes, links: filteredLinks };
      }
      const filteredLinks = defaultData.links.filter(
        (link) => (included.length
            && included.includes(
              filterType === 'sources' ? link.source : link.target
            ))
          || (excluded.length
            && !excluded.includes(
              filterType === 'sources' ? link.source : link.target
            ))
      );
      const remainingNodesNames = [...new Set(filteredLinks
        .flatMap((link) => [link.source, link.target]))];
      const filteredNodes = defaultData.nodes
        .filter((node) => remainingNodesNames.includes(node.name));
      return { nodes: filteredNodes, links: filteredLinks };
    }
  } catch (error) {
    return defaultData;
  }
  return defaultData;
};

const applyValuesFilter = (
  valuesFilter: string,
  defaultData: {
    nodes: Node[];
    links: Link[];
  }
) => {
  try {
    let valuesOperations: string[] = [];
    const matchesValues = valuesFilter.match(/values\s*([><=!]*)\s*(\d+)/g);
    if (matchesValues) {
      valuesOperations = matchesValues.map((match) => {
        const matchResult = match.match((/values\s*([><=!]*)\s*(\d+)/));
        if (matchResult) {
          const [, operator, values] = matchResult;
          const filterValue = (values as string).trim();
          return `${operator}${filterValue}`;
        }
        return '';
      });
    }
    const filteredLinks = defaultData.links.map((link) => {
      if (valuesOperations.length > 0) {
        if (valuesOperations.every((condition) => evaluateCondition(link.value, condition))) {
          return link;
        }
        return {
          source: '', target: '', value: 0, properties: ''
        };
      }
      return link;
    });
    const remainingNodesNames = [...new Set(filteredLinks
      .flatMap((link) => [link.source, link.target]))];
    const filteredNodes = defaultData.nodes
      .filter((node) => remainingNodesNames.includes(node.name));
    return { nodes: filteredNodes, links: filteredLinks };
  } catch (error) {
    return defaultData;
  }
};

export const applyNodeLinkFilter = (
  expressions: string[],
  defaultData: {
    nodes: Node[];
    links: Link[];
  }
) => {
  let newData: {
    nodes: Node[];
    links: Link[];
  } = { nodes: [...defaultData.nodes], links: [...defaultData.links] };
  let categoriesFilter: string = '';
  let sourcesFilter: string = '';
  let targetsFilter: string = '';
  let namesFilter: string = '';
  let valuesFilter: string = '';
  expressions.forEach((expression, index) => {
    const hasCategories = expression.includes('categories');
    const hasSourcesFilter = expression.includes('sources');
    const hasTargetsFilter = expression.includes('targets');
    const hasNamesFilter = expression.includes('names');
    const hasValuesFilter = expression.includes('values');
    if (hasCategories) {
      if (index === 0) {
        categoriesFilter = expression;
      } else {
        categoriesFilter = `${categoriesFilter}&&${expression}`;
      }
    }
    if (hasSourcesFilter) {
      if (index === 0) {
        sourcesFilter = expression;
      } else {
        sourcesFilter = `${sourcesFilter}&&${expression}`;
      }
    }
    if (hasTargetsFilter) {
      if (index === 0) {
        targetsFilter = expression;
      } else {
        targetsFilter = `${targetsFilter}&&${expression}`;
      }
    }
    if (hasNamesFilter) {
      if (index === 0) {
        namesFilter = expression;
      } else {
        namesFilter = `${namesFilter}&&${expression}`;
      }
    }
    if (hasValuesFilter) {
      if (index === 0) {
        valuesFilter = expression;
      } else {
        valuesFilter = `${valuesFilter}&&${expression}`;
      }
    }
  });
  if (categoriesFilter !== '') {
    newData = applyNodeNameFilter(categoriesFilter, newData, 'categories');
  }
  if (sourcesFilter !== '') {
    newData = applyNodeNameFilter(sourcesFilter, newData, 'sources');
  }
  if (targetsFilter !== '') {
    newData = applyNodeNameFilter(targetsFilter, newData, 'targets');
  }
  if (namesFilter !== '') {
    newData = applyNodeNameFilter(namesFilter, newData, 'names');
  }
  if (valuesFilter !== '') {
    newData = applyValuesFilter(valuesFilter, newData);
  }
  return newData;
};
