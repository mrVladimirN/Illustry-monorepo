import React from "react";
import { env } from "@/env.mjs";
import { Metadata } from "next";
import { browseProjects } from "@/app/_actions/project";
import { ProjectFilter } from "@/types";
import { ProjectsTableShell } from "@/components/shells/projects-table-shell";
export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Projects",
  description: "Manage your projects",
};

interface ProjectsProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const Projects = async ({ searchParams }: ProjectsProps) => {
  const { page, text, per_page, sort } = searchParams;
  
  const projects = await browseProjects({
    page: page ? Number(page) : 1,
    text: text,
    per_page: per_page ? Number(per_page) : 10,
    sort: sort
      ? {
          sortOrder: (sort as string).split(".")[1] === "asc" ? 1 : 0,
          element: (sort as string).split(".")[0],
        }
      : undefined,
  } as ProjectFilter);
  console.log(projects.pagination)
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-gray-50 rounded-3xl dark:bg-gray-800">
      <div className="space-y-2.5">
        <ProjectsTableShell
          data={projects.projects}
          pageCount={Math.ceil(projects.pagination?.pageCount as number)}
        ></ProjectsTableShell>
      </div>
    </div>
  );
};

export default Projects;
