'use server';

import makeRequest from '@/lib/request';
import 'dotenv/config';
import { revalidateTag } from 'next/cache';
import {
  ExtendedProjectType, ProjectCreate, ProjectFilter, ProjectType, ProjectUpdate
} from 'types/project';

export const browseProjects = async (filter?: ProjectFilter) => {
  revalidateTag('projects');
  let newFilter: ProjectFilter = {};

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
  return makeRequest<ExtendedProjectType>(request, ['projects'])
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.debug(error.message);
    });
};

export const deleteProject = async (projectName: string) => {
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

export const updateProject = async (project: ProjectUpdate) => {
  revalidateTag('projects');
  const request = new Request(`${process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL as string}/api/project`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
  });

  return makeRequest<ProjectType>(request, ['projects']);
};

export const createProject = async (project: ProjectCreate) => {
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
  return makeRequest<ProjectType>(request, ['projects']);
};

export const findOneProject = async (projectName: string) => {
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
  return makeRequest<ProjectType>(request, ['projects']);
};
