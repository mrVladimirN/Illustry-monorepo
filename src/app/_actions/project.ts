"use server";

import { makeRequest } from "@/lib/request";

export const browseProjects = async (filter?: any) => {
  let newFilter: any = {};
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
  
  return await makeRequest<any>(request,['projects']);
};

export const deleteProject = async (projectName: string) => {
  const request = new Request(`http://localhost:7000/api/project`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: projectName,
    }),
  });
  return await makeRequest<boolean>(request,['projects']);
};

export const updateProject = async (project: any) => {
  const request = new Request("http://localhost:7000/api/projecta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
  try {
  return await makeRequest<any>(request,['projects']);
  } catch(err) {
    console.log(err)
  }
};

export const createProject = async (project: any) => {
  const newProject = {
    projectName: project.name,
    projectDescription: project.description,
  };
  const request = new Request(`http://localhost:7000/api/project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProject),
  });
  return await makeRequest<any>(request,['projects']);
};
