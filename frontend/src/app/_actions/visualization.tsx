'use server';

import 'dotenv/config';
import { revalidateTag } from 'next/cache';
import {
  VisualizationTypes
} from '@illustry/types';
import makeRequest from '@/lib/request';

export const browseVisualizations = async (filter?: VisualizationTypes.VisualizationFilter) => {
  let newFilter: VisualizationTypes.VisualizationFilter = {};
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
  return makeRequest<VisualizationTypes.ExtendedVisualizationType>(request, ['visualizations'])
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.debug(error.message);
    });
};

export const deleteVisualization = async (
  visualizationFilter: VisualizationTypes.VisualizationFilter
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
  return makeRequest<VisualizationTypes.VisualizationType>(request, ['visualizations']);
};

export const findOneVisualization = async (
  visualizationFilter: VisualizationTypes.VisualizationFilter
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
  return makeRequest<VisualizationTypes.VisualizationType>(request, ['visualizations']);
};
