import { env } from '@/env.mjs';
import { Metadata } from 'next';
import { browseProjects } from '@/app/_actions/project';
import ProjectsTableShell from '@/components/shells/projects-table-shell';
import { ProjectFilter } from 'types/project';

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'Projects',
  description: 'Manage your projects'
};

interface ProjectsProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const Projects = async ({ searchParams }: ProjectsProps) => {
  const {
    page, text, per_page: perPage, sort
  } = searchParams;

  const projects = await browseProjects({
    page: page ? Number(page) : 1,
    text,
    per_page: perPage ? Number(perPage) : 10,
    sort: sort
      ? {
        sortOrder: (sort as string).split('.')[1] === 'asc' ? 1 : -1,
        element: (sort as string).split('.')[0]
      }
      : undefined
  } as ProjectFilter);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-gray-50 rounded-3xl dark:bg-gray-800">
      <div className="space-y-2.5">
        <ProjectsTableShell
          data={projects ? projects.projects : []}
          pageCount={projects ? Math.ceil(projects.pagination?.pageCount as number) : 1}
        ></ProjectsTableShell>
      </div>
    </div>
  );
};

export default Projects;
