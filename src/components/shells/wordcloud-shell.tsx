import { WordCloudData } from 'types/visualizations';
import { WithLegend, WithOptions } from '@/lib/types/utils';
import dynamic from 'next/dynamic';

interface WordCloudShellProp extends WithLegend, WithOptions {
    data: WordCloudData;
  }
const WordCloudGraphView = dynamic(
  () => import('@/components/views/wordcloud'),
  { ssr: false }
);
const WordCloudShellView = ({
  data,
  legend,
  options
}:WordCloudShellProp) => {
  const { words } = data;
  return (
      <WordCloudGraphView
        options={options}
        words={words}
        legend={legend}
      />
  );
};
export default WordCloudShellView;
