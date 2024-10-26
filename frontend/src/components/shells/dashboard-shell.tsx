'use client';

import React, { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { DashboardTypes, VisualizationTypes } from '@illustry/types';
import { usePathname, useRouter } from 'next/navigation';
import {
  Card, CardContent, CardHeader, CardTitle
} from '@/components/ui/card';
import { updateDashboard } from '@/app/_actions/dashboard';
import HubShell from './hub-shell';

const ResponsiveGridLayout = WidthProvider(Responsive);

type VisualizationData = {
  dashboard: DashboardTypes.DashboardType;
};

const ResizableDashboard = ({ dashboard }: VisualizationData) => {
  const router = useRouter();
  const pathname = usePathname();
  const initialLayout = dashboard.layouts?.length ? dashboard.layouts
    : (dashboard.visualizations as VisualizationTypes.VisualizationType[])
      .map((viz, index) => ({
        i: index.toString(),
        x: 4 * (index % 3),
        y: Math.floor(index / 3) * 2,
        w: 10,
        h: 4,
        minW: 4,
        minH: 2
      })) as DashboardTypes.Layout[];

  const [layout, setLayout] = useState<DashboardTypes.Layout[]>(initialLayout);
  const [hasLayoutChanged, setHasLayoutChanged] = useState(false);

  const onLayoutChange = (newLayout: DashboardTypes.Layout[]) => {
    setLayout(newLayout);
    setHasLayoutChanged(true);
  };

  const updateDashboardLayout = async () => {
    const updatedDash = { ...dashboard, layouts: layout };
    delete updatedDash.visualizations;
    await updateDashboard(updatedDash);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (hasLayoutChanged) {
        updateDashboardLayout();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasLayoutChanged, layout, pathname]);

  const handleCardClick = (viz: VisualizationTypes.VisualizationType) => {
    const url = `/visualizationhub?name=${viz.name}&type=${viz.type}`;
    router.push(url);
  };

  return (
    <div className="p-4">
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{
          lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0
        }}
        cols={{
          lg: 12, md: 10, sm: 6, xs: 4, xxs: 2
        }}
        rowHeight={150}
        onLayoutChange={onLayoutChange}
        isDraggable={true}
        isResizable={true}
        draggableHandle=".draggable-corner"
      >
        {(dashboard.visualizations as VisualizationTypes.VisualizationType[]).map((viz, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg shadow-sm overflow-hidden"
          >
            <Card className="h-full">
              <div className="relative h-full">
                <div className="draggable-corner absolute top-0 left-0 w-[10%] h-[10%] cursor-move bg-transparent"></div>
                <div className="draggable-corner absolute top-0 right-0 w-[10%] h-[10%] cursor-move bg-transparent"></div>
                <div className="draggable-corner absolute bottom-0 left-0 w-[10%] h-[10%] cursor-move bg-transparent"></div>
                <div className="draggable-corner absolute bottom-0 right-0 w-[10%] h-[10%] cursor-move bg-transparent"></div>
                <CardHeader
                  className="cursor-pointer flex justify-center items-center h-[4rem]"
                  onClick={() => handleCardClick(viz)}
                >
                  <CardTitle className="text-center">
                    {viz.name} ({(viz.type as string).charAt(0).toUpperCase() + viz.type.slice(1)} Chart)
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-4rem)]">
                  <HubShell data={viz} fullScreen={false} filter={false} legend={true} />
                </CardContent>
              </div>
            </Card>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default ResizableDashboard;
