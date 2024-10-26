'use server';

import 'dotenv/config';
import { revalidateTag } from 'next/cache';
import { DashboardTypes } from '@illustry/types';
import makeRequest from '@/lib/request';

const browseDashboards = async (filter?: DashboardTypes.DashboardFilter) => {
  revalidateTag('dashboards');
  let newFilter: DashboardTypes.DashboardFilter = {};

  if (filter) {
    newFilter = filter;
  }
  const request = new Request(`${process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL as string}/api/dashboards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newFilter)
  });
  return makeRequest<DashboardTypes.ExtendedDashboardType>(request, ['dashboards']);
};

const deleteDashboard = async (dashboardName: string) => {
  revalidateTag('dashboards');
  const request = new Request(`${process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL as string}/api/dashboard`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: dashboardName
    })
  });
  return makeRequest<boolean>(request, ['dashboards']);
};

const updateDashboard = async (dashboard: DashboardTypes.DashboardUpdate) => {
  revalidateTag('dashboards');
  const request = new Request(`${process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL as string}/api/dashboard`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dashboard)
  });

  return makeRequest<DashboardTypes.DashboardType>(request, ['dashboards']);
};

const createDashboard = async (dashboard: DashboardTypes.DashboardCreate) => {
  const newDashboard = {
    projectName: dashboard.projectName,
    visualizations: dashboard.visualizations,
    description: dashboard.description,
    name: dashboard.name
  };
  const request = new Request(`${process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL as string}/api/dashboard`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newDashboard)
  });
  return makeRequest<DashboardTypes.DashboardType>(request, ['dashboards']);
};

const findOneDashboard = async (dashboardName: string, fullVisualizations: boolean = false) => {
  revalidateTag('dashboards');
  const request = new Request(
    `${process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL as string}/api/dashboard/${dashboardName}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: dashboardName, fullVisualizations })
    }
  );
  return makeRequest<DashboardTypes.DashboardType>(request, ['dashboards']);
};

export {
  browseDashboards,
  deleteDashboard,
  updateDashboard,
  createDashboard,
  findOneDashboard
};
