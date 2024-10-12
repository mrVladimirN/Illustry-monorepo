'use server';

import 'dotenv/config';
import { revalidateTag } from 'next/cache';
import { ProjectTypes } from '@illustry/types';
import makeRequest from '@/lib/request';

const browseProjects = async (filter?: ProjectTypes.ProjectFilter) => {
  revalidateTag('projects');
  let newFilter: ProjectTypes.ProjectFilter = {};

  if (filter) {
    newFilter = filter;
  }
  const request = new Request(`${process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL as string}/api/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newFilter)
  });
  return makeRequest<ProjectTypes.ExtendedProjectType>(request, ['projects'])
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.debug(error.message);
    });
};

const deleteProject = async (projectName: string) => {
  revalidateTag('projects');
  const request = new Request(`${process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL as string}/api/project`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: projectName
    })
  });
  return makeRequest<boolean>(request, ['projects']);
};

const updateProject = async (project: ProjectTypes.ProjectUpdate) => {
  revalidateTag('projects');
  const request = new Request(`${process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL as string}/api/project`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
  });

  return makeRequest<ProjectTypes.ProjectType>(request, ['projects']);
};

const createProject = async (project: ProjectTypes.ProjectCreate) => {
  const newProject = {
    projectName: project.name,
    projectDescription: project.description,
    isActive: project.isActive
  };
  const request = new Request(`${process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL as string}/api/project`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newProject)
  });
  return makeRequest<ProjectTypes.ProjectType>(request, ['projects']);
};

const findOneProject = async (projectName: string) => {
  const request = new Request(
    `${process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL as string}/api/project/${projectName}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: projectName })
    }
  );
  return makeRequest<ProjectTypes.ProjectType>(request, ['projects']);
};

export {
  createProject,
  browseProjects,
  deleteProject,
  updateProject,
  findOneProject
};
