'use client';

import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState
} from 'react';
import { visualizationTypesEnum } from '@/lib/validation/visualizations';
import { parseFilter } from '@/lib/filter/generic';
import { axisWords } from '@/lib/filter/axis';
import { catchError } from '@/lib/utils';
import { calendarWords } from '@/lib/filter/calendar';
import { AllVisualizationsShell } from '@/lib/types/utils';
import { nodeLinksWords } from '@/lib/filter/nodeLink';
import { funnelPieWords } from '@/lib/filter/funnelPie';
import { wordCloudWords } from '@/lib/filter/wordcloud';
import { scatterWords } from '@/lib/filter/scatter';
import { timelineWords } from '@/lib/filter/timeline';
import { hierarchyWords } from '@/lib/filter/hierarchy';
import { Button } from './button';

interface CollapsableSearchBarProps<T> {
  data: T;
  setFilteredData: Dispatch<SetStateAction<T>>;
  type: visualizationTypesEnum;
}

const CollapsableSearchBar = <
  T extends AllVisualizationsShell
>({
    data,
    setFilteredData,
    type
  }: CollapsableSearchBarProps<T>) => {
  const [initialData] = useState(() => data);
  const [searchValue, setSearchValue] = useState('');
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (!isInputClicked) {
      setIsInputClicked(true);
    }
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    let words: string[] = [];
    switch (type) {
      case visualizationTypesEnum.LINE_CHART:
      case visualizationTypesEnum.BAR_CHART:
        words = axisWords;
        break;
      case visualizationTypesEnum.CALENDAR:
        words = calendarWords;
        break;
      case visualizationTypesEnum.FORCE_DIRECTED_GRAPH:
      case visualizationTypesEnum.MATRIX:
      case visualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING:
      case visualizationTypesEnum.SANKEY:
        words = nodeLinksWords;
        break;
      case visualizationTypesEnum.FUNNEL:
      case visualizationTypesEnum.PIE_CHART:
        words = funnelPieWords;
        break;
      case visualizationTypesEnum.WORD_CLOUD:
        words = wordCloudWords;
        break;
      case visualizationTypesEnum.SCATTER:
        words = scatterWords;
        break;
      case visualizationTypesEnum.TIMELINE:
        words = timelineWords;
        break;
      case visualizationTypesEnum.TREEMAP:
      case visualizationTypesEnum.SUNBURST:
        words = hierarchyWords;
        break;
      default:
        words = [];
        break;
    }
    try {
      setFilteredData(parseFilter(searchValue, data, words, type) as T);
    } catch (error) {
      catchError(error);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleRefresh = () => {
    setFilteredData(initialData);
  };

  return (
    <form
      action=""
      className="relative mx-auto mt-[2%] w-max"
      onSubmit={handleSearch}
    >
      <div className="flex items-center w-[75%] mx-auto">
        <input
          type="search"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`peer relative z-10 h-12 w-12 cursor-pointer 
          rounded-full border bg-transparent pl-12 outline-none transition-all duration-500 ${
            isFocused || searchValue.trim() !== '' ? 'w-screen' : 'w-12'
          } focus:border-lime-300 focus:pl-16 focus:pr-4`}
        />
        {isInputClicked && searchValue.trim() !== '' && (
          <Button
            type="submit"
            variant="default"
            size="default"
            className="ml-2"
          >
            Filter
          </Button>
        )}
        {isInputClicked && (
          <Button
            type="button"
            onClick={handleRefresh}
            variant="default"
            size="default"
            className="ml-2"
          >
            Refresh
          </Button>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-y-0 my-auto h-8 w-12 cursor-pointer border-r border-transparent
          stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </form>
  );
};

export default CollapsableSearchBar;
