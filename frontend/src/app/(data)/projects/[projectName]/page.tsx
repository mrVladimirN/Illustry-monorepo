import type { Metadata } from 'next';

import UpdateProjectForm from '@/components/form/update-project-form';
import { findOneProject } from '@/app/_actions/project';

export const metadata: Metadata = {
  title: 'Update Project',
  description: 'Update a product'
};

interface UpdateProjectPageProps {
  params: {
    projectName: string;
  };
}

export default async function UpdateProjectPage({
  params
}: UpdateProjectPageProps) {
  const currentProject = params && params.projectName
    ? await findOneProject(params.projectName)
    : undefined;
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-gray-50 rounded-3xl dark:bg-gray-800">
      <div className="space-y-2.5">
        <UpdateProjectForm project={currentProject} />
      </div>
    </div>
  );
}
