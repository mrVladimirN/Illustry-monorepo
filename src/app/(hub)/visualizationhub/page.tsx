import { findOneVisualization } from "@/app/_actions/visualization";
import { HubShell } from "@/components/shells/hub-shell";
import { env } from "@/env.mjs";
import { Metadata } from "next";
import { VisualizationFilter } from "types/visualizations";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Visualizations",
  description: "Manage your Visualizations",
};

interface VisualizationsProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Hub = async ({ searchParams }: VisualizationsProps) => {
  const { name, type } = searchParams;
  const visualization = await findOneVisualization({
    name: name,
    type: type,
  } as VisualizationFilter);
  return (
    <>
      <HubShell data={visualization}></HubShell>
    </>
  );
};

export default Hub;
