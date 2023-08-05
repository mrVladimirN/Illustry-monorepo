import { Shell } from "@/components/shells/shell"
import { ErrorCard } from "@/components/ui/error-card"


export default function ProductNotFound( ) {

  return (
    <Shell variant="centered">
      <ErrorCard
        title="Project not found"
        description="The project may have expired "
        retryLink={`/projects`}
        retryLinkText="Go to Products"
      />
    </Shell>
  )
}
