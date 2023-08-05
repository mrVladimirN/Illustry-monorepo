"use server";

import { makeRequest } from "@/lib/request";
import {
  ProjectFilter,
  ExtendedProjectType,
  ProjectType,
  ProjectCreate,
} from "@/types";
import { revalidateTag } from "next/cache";
export const browseProjects = async (filter?: ProjectFilter) => {
  revalidateTag("projects");
  let newFilter: ProjectFilter = {};

  if (filter) {
    newFilter = filter;
  }
  const request = new Request("http://localhost:7000/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newFilter),
  });
  return await makeRequest<ExtendedProjectType>(request, ["projects"]);
};

export const deleteProject = async (projectName: string) => {
  revalidateTag("projects");
  const request = new Request(`http://localhost:7000/api/project`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: projectName,
    }),
  });
  return await makeRequest<boolean>(request, ["projects"]);
};

export const updateProject = async (project: ProjectType) => {
  revalidateTag("projects");
  const request = new Request("http://localhost:7000/api/project", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });

  return await makeRequest<ProjectType>(request, ["projects"]);
};

export const createProject = async (project: ProjectCreate) => {
  const newProject = {
    projectName: project.name,
    projectDescription: project.description,
    isActive: project.isActive,
  };
  const request = new Request(`http://localhost:7000/api/project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProject),
  });
  return await makeRequest<ProjectType>(request, ["projects"]);
};

export const findOneProject = async (projectName: string) => {
  const request = new Request(
    `http://localhost:7000/api/project/${projectName}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: projectName }),
    }
  );
  return await makeRequest<ProjectType>(request, ["projects"]);
};
