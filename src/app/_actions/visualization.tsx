
  "use server";

import { makeRequest } from "@/lib/request";
import { VisualizationType, VisualizationFilter, ExtendedVisualizationType } from "@/types";
import { revalidateTag } from "next/cache";
  export const createOrUpdateVisualizations = async (formData: FormData) => {
    
    revalidateTag('visualizations')
    const request = new Request(`http://localhost:7000/api/visualization`, {
      method: "POST",
      body: formData,
    });
    return await makeRequest<VisualizationType[]>(request,['visualizations']);
  };
  
  export const browseVisualizations = async (filter?: VisualizationFilter) => {
    let newFilter: VisualizationFilter = {};
    if (filter) {
      newFilter = filter;
    }
    revalidateTag('visualizations')
    const request = new Request(`http://localhost:7000/api/visualizations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFilter),
    });
    return await makeRequest<ExtendedVisualizationType>(request,['visualizations']);
  };
  
  export const deleteVisualization = async (
    VisualizationFilter: VisualizationFilter
  ) => {
    revalidateTag('visualizations')
    const request = new Request(`http://localhost:7000/api/visualization`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(VisualizationFilter),
    });
    return await makeRequest(request,['visualizations']);
  };
  
  export const updateVisualization = async (
    VisualizationCreate: VisualizationType
  ) => {
    const request = new Request(`http://localhost:7000/api/visualization`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(VisualizationCreate),
    });
    return await makeRequest(request,['visualizations']);
  };
  
  export const findOneVisualization = async (
    visualizationFilter: VisualizationFilter
  ) => {
    const request = new Request(
      `http://localhost:7000/api/visualization/${visualizationFilter.name}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visualizationFilter),
      }
    );
    return await makeRequest(request,['visualizations']);
  };
  