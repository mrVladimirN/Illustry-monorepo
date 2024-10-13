import { Shell } from '@/components/shells/shell';
import ErrorCard from '@/components/ui/error-card';

const DashboardtNotFound = () => (
    <Shell variant="centered">
      <ErrorCard
        title="Dashboard not found"
        description="The Dashboard may have expired "
        retryLink={'/dashboards'}
        retryLinkText="Go to Dashboards"
      />
    </Shell>
);

export default DashboardtNotFound;
