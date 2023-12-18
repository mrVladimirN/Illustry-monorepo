'use server';

import makeRequest from '@/lib/request';
import 'dotenv/config';
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
    `${process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL as string}/api/visualizations`,
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
    `${process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL as string}/api/visualization`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(visualizationFilter)
    }
  );
  return makeRequest<boolean>(request, ['visualizations']);
};

export const createOrUpdateVisualization = async (
  form: FormData
) => {
  const request = new Request(
    `${process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL as string}/api/visualization`,
    {
      method: 'POST',
      body: form
    }
  );
  return makeRequest<VisualizationType>(request, ['visualizations']);
};

export const findOneVisualization = async (
  visualizationFilter: VisualizationFilter
) => {
  revalidateTag('visualizations');
  const request = new Request(
    `${process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL as string}/api/visualization/${visualizationFilter.name}`,
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
