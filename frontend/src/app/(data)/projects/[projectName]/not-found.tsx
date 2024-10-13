import { Shell } from '@/components/shells/shell';
import ErrorCard from '@/components/ui/error-card';

const ProjecttNotFound = () => (
    <Shell variant="centered">
      <ErrorCard
        title="Project not found"
        description="The project may have expired "
        retryLink={'/projects'}
        retryLinkText="Go to Projects"
      />
    </Shell>
);

export default ProjecttNotFound;
