'use server';

import makeRequest from '@/lib/request';
import { env } from '@/env.mjs';
import { revalidateTag } from 'next/cache';
import {
  ExtendedVisualizationType,
  VisualizationFilter,
  VisualizationType
} from 'types/visualizations';

export const browseVisualizations = async (filter?: VisualizationFilter) => {
  let newFilter: VisualizationFilter = {};
  if (filter) {
    newFilter = filter;
  }
  revalidateTag('visualizations');
  const request = new Request(
    `${env.NEXT_PUBLIC_BACKEND_PUBLIC_URL}/api/visualizations`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFilter)
    }
  );
  return makeRequest<ExtendedVisualizationType>(request, ['visualizations']);
};

export const deleteVisualization = async (
  visualizationFilter: VisualizationFilter
) => {
  revalidateTag('visualizations');
  const request = new Request(
    `${env.NEXT_PUBLIC_BACKEND_PUBLIC_URL}/api/visualization`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(visualizationFilter)
    }
  );
  return makeRequest(request, ['visualizations']);
};

export const updateVisualization = async (
  VisualizationCreate: VisualizationType
) => {
  const request = new Request(
    `${env.NEXT_PUBLIC_BACKEND_PUBLIC_URL}/api/visualization`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(VisualizationCreate)
    }
  );
  return makeRequest(request, ['visualizations']);
};

export const findOneVisualization = async (
  visualizationFilter: VisualizationFilter
) => {
  revalidateTag('visualizations');
  const request = new Request(
    `${env.NEXT_PUBLIC_BACKEND_PUBLIC_URL}/api/visualization/${visualizationFilter.name}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(visualizationFilter)
    }
  );
  return makeRequest<VisualizationType>(request, ['visualizations']);
};
