'use client';

import { VisualizationTypes } from '@illustry/types';
import { Dispatch, SetStateAction, useState } from 'react';
import dynamic from 'next/dynamic';
import { WithFullScreen, WithLegend, WithOptions } from '@/lib/types/utils';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

type FilteredWordCloudShellProp = {
  words: VisualizationTypes.WordType[]
} & WithLegend
  & WithOptions
  & WithFullScreen

const WordCloudGraphView = dynamic(
  () => import('@/components/views/wordcloud'),
  { ssr: false }
);

const FilteredWordCloudGraphShellView = ({
  words,
  legend,
  options,
  fullScreen
}: FilteredWordCloudShellProp) => {
  const [filteredData, setFilteredData] = useState<VisualizationTypes.WordType[]>(words);
  return (
    <>
      <CollapsableSearchBar
        data={words}
        setFilteredData={
          setFilteredData as Dispatch<
            SetStateAction<VisualizationTypes.WordType[]>
          >
        }
        type={VisualizationTypes.VisualizationTypesEnum.WORD_CLOUD}
      />
      <>
        <WordCloudGraphView
          options={options}
          words={filteredData}
          legend={legend}
          fullScreen={fullScreen} />
      </>
    </>
  );
};

export default FilteredWordCloudGraphShellView;
