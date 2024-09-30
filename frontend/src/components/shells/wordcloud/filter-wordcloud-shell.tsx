'use client';

import { VisualizationTypes } from '@illustry/types';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import { Dispatch, SetStateAction, useState } from 'react';
import { visualizationTypesEnum } from '@/lib/validation/visualizations';
import dynamic from 'next/dynamic';
import CollapsableSearchBar from '../../ui/collapsable-searchbar';

interface FilteredWordCloudShellProp extends WithLegend, WithOptions {
  words: VisualizationTypes.WordType[]
}
const WordCloudGraphView = dynamic(
  () => import('@/components/views/wordcloud'),
  { ssr: false }
);
const FilteredWordCloudGraphShellView = ({
  words,
  legend,
  options
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
        type={visualizationTypesEnum.WORD_CLOUD}
      />
      <>
        <WordCloudGraphView options={options} words={filteredData} legend={legend} />
      </>
    </>
  );
};
export default FilteredWordCloudGraphShellView;
