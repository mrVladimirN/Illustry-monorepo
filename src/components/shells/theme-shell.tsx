"use client";

import { DeepPartial } from "types/utils";
import {
  ThemeColors,
  useThemeColors,
  useThemeColorsDispach,
} from "../theme-provider";
import {
  AccordionContent,
  Accordion,
  AccordionTrigger,
  AccordionItem,
} from "../ui/accordion";
import { Suspense, useEffect, useRef, useState } from "react";
import DefaultThemesAccordion from "../ui/theme/default-themes";
import GenericThemesAccordion from "../ui/theme/generic-themes";
import { ScrollArea } from "../ui/scroll-area";
import Fallback from "../ui/fallback";
import dynamic from "next/dynamic";
import { siteConfig } from "@/config/site";
const SankeyGraphView = dynamic(
  () => import("@/components/views/sankey-diagram"),
  {
    ssr: false,
  }
);

const ForcedLayoutGraphView = dynamic(
  () => import("@/components/views/forced-layout-graph"),
  {
    ssr: false,
  }
);
const HierarchicalEdgeBundlingView = dynamic(
  () => import("@/components/views/hierarchical-edge-bundling"),
  {
    ssr: false,
  }
);
const CalendarView = dynamic(
  () => import("@/components/views/calendar-graph"),
  {
    ssr: false,
  }
);

const WordCloudView = dynamic(() => import("@/components/views/wordcloud"), {
  ssr: false,
});

const LineChartView = dynamic(() => import("@/components/views/line-chart"), {
  ssr: false,
});
interface ShowDiagramState {
  heb: boolean;
  sankey: boolean;
  calendar: boolean;
  flg: boolean;
  wordCloud: boolean;
  lineChart: boolean;
}
export function ThemeShell() {
  const colorPalette: { [key: string]: string[] } = {
    FreshMeadow: [
      "#5DBE6E",
      "#4C8BF5",
      "#F0AC40",
      "#D73D6C",
      "#1D7A8A",
      "#B65911",
      "#84BA5B",
    ],
    OceanBreeze: [
      "#348AA7",
      "#54968F",
      "#8AB8A8",
      "#EFC050",
      "#45B29D",
      "#F07A18",
      "#D9544D",
    ],
    SunsetVibes: [
      "#FF6B6B",
      "#FFE66D",
      "#6B5B95",
      "#70C1B3",
      "#F9A03F",
      "#F7CAC9",
      "#92A8D1",
    ],
    EnchantedForest: [
      "#00539C",
      "#89BD9E",
      "#5DBE6E",
      "#FF9933",
      "#EFC88B",
      "#5A7247",
      "#360745",
    ],
    CityLights: [
      "#F6D55C",
      "#3CAEA3",
      "#ED553B",
      "#20639B",
      "#173F5F",
      "#3B5998",
      "#F05D23",
    ],
    VintageHues: [
      "#DE8A5A",
      "#9A8B4F",
      "#005792",
      "#3C1053",
      "#7A306C",
      "#8D5B4C",
      "#C98344",
    ],
    DreamyPastels: [
      "#FFD700",
      "#FF9A8B",
      "#87CEFA",
      "#D4AF37",
      "#98FB98",
      "#B19CD9",
      "#FFC0CB",
    ],
    TropicalParadise: [
      "#F2AA4C",
      "#0077B6",
      "#90BE6D",
      "#DA627D",
      "#5E60CE",
      "#577590",
      "#6A0572",
    ],
    MidnightMagic: [
      "#23022E",
      "#65187A",
      "#8A3B6B",
      "#2C5F2D",
      "#1D262A",
      "#4C2C69",
      "#51344D",
    ],
    EarthyTones: [
      "#BC8B66",
      "#393D3F",
      "#63707D",
      "#48484A",
      "#6B4226",
      "#C4C8C5",
      "#3A3D40",
    ],
  };
  const activeTheme = useThemeColors();

  const themeDispatch = useThemeColorsDispach();
  const [activeColorPickerIndex, setActiveColorPickerIndex] = useState<
    number | null
  >(null);
  const [showDiagram, setShowDiagram] = useState<ShowDiagramState>({
    sankey: false,
    heb: false,
    flg: false,
    wordCloud: false,
    calendar: false,
    lineChart: false,
  });
  const theme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : "light";
  const isDarkTheme = theme === "dark";
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (event: any) => {
    if (
      colorPickerRef.current &&
      !colorPickerRef.current.contains(event.target)
    ) {
      setActiveColorPickerIndex(null);
    }
  };
  const handleApplyTheme = (themeName: string) => {
    const appliedThemeColors: DeepPartial<ThemeColors> = {
      flg: {
        dark: { colors: colorPalette[themeName] },
        light: { colors: colorPalette[themeName] },
      },
      sankey: {
        dark: { colors: colorPalette[themeName] },
        light: { colors: colorPalette[themeName] },
      },
      calendar: {
        dark: { colors: colorPalette[themeName] },
        light: { colors: colorPalette[themeName] },
      },
      wordcloud: {
        dark: { colors: colorPalette[themeName] },
        light: { colors: colorPalette[themeName] },
      },
      heb: {
        dark: { colors: colorPalette[themeName] },
        light: { colors: colorPalette[themeName] },
      },
    };
    if (themeDispatch) {
      themeDispatch({
        type: "apply",
        modifiedData: appliedThemeColors,
      });
    }
  };
  const handleColorChange = (
    newColor: string,
    index: number,
    visualization: string,
    theme: string
  ) => {
    const updatedTheme = { ...activeTheme };
    //@ts-ignore
    updatedTheme[visualization][theme].colors[index] = newColor;
    if (themeDispatch) {
      setTimeout(() => {
        themeDispatch({
          type: "apply",
          modifiedData: updatedTheme,
        });
      }, 200);
    }
  };
  const handleColorAdd = (visualization: string, theme: string) => {
    const updatedTheme = { ...activeTheme };
    //@ts-ignore
    updatedTheme[visualization][theme].colors.push("#FFFFFF");
    if (themeDispatch) {
      themeDispatch({
        type: "apply",
        modifiedData: updatedTheme,
      });
    }
  };
  const handleColorDelete = (visualization: string, theme: string) => {
    const updatedTheme = { ...activeTheme };
    //@ts-ignore
    updatedTheme[visualization][theme].colors.pop();
    if (themeDispatch) {
      themeDispatch({
        type: "apply",
        modifiedData: updatedTheme,
      });
    }
  };
  const setShowDiagramHandler = (keyToSet?: keyof ShowDiagramState) => {
    setShowDiagram((prev) => {
      // Create a new object with all keys set to false
      const newState = Object.fromEntries(
        Object.keys(prev).map((key) => [key, false])
      );
      if (keyToSet) {
        // Set the specified key to true
        newState[keyToSet] = true;
      }
      return newState as unknown as ShowDiagramState;
    });
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex h-screen">
      <ScrollArea className="fixed w-1/4 p-4 overflow-y-auto h-screen border-r-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" onClick={() => setShowDiagramHandler()}>
            <AccordionTrigger className="cursor-pointer">
              Default Schemes
            </AccordionTrigger>
            <AccordionContent>
              <DefaultThemesAccordion
                colorPalette={colorPalette}
                handleApplyTheme={handleApplyTheme}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            onClick={() => setShowDiagramHandler("sankey")}
          >
            <AccordionTrigger className="cursor-pointer">
              Sankey Diagram
            </AccordionTrigger>
            <AccordionContent>
              <GenericThemesAccordion
                activeColorPickerIndex={activeColorPickerIndex}
                handleColorChange={handleColorChange}
                handleColorDelete={handleColorDelete}
                handleColorAdd={handleColorAdd}
                setActiveColorPickerIndex={setActiveColorPickerIndex}
                visualization="sankey"
                colorPickerRef={colorPickerRef}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            onClick={() => setShowDiagramHandler("calendar")}
          >
            <AccordionTrigger className="cursor-pointer">
              Calendar
            </AccordionTrigger>
            <AccordionContent>
              <GenericThemesAccordion
                activeColorPickerIndex={activeColorPickerIndex}
                handleColorChange={handleColorChange}
                handleColorDelete={handleColorDelete}
                handleColorAdd={handleColorAdd}
                setActiveColorPickerIndex={setActiveColorPickerIndex}
                visualization="calendar"
                colorPickerRef={colorPickerRef}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-4"
            onClick={() => setShowDiagramHandler("flg")}
          >
            <AccordionTrigger className="cursor-pointer">
              Forced-Layout-Graph
            </AccordionTrigger>
            <AccordionContent>
              <GenericThemesAccordion
                activeColorPickerIndex={activeColorPickerIndex}
                handleColorChange={handleColorChange}
                handleColorDelete={handleColorDelete}
                handleColorAdd={handleColorAdd}
                setActiveColorPickerIndex={setActiveColorPickerIndex}
                visualization="flg"
                colorPickerRef={colorPickerRef}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger
              className="cursor-pointer"
              onClick={() => setShowDiagramHandler("heb")}
            >
              Hierarchical-Edge-Bundling
            </AccordionTrigger>
            <AccordionContent>
              <GenericThemesAccordion
                activeColorPickerIndex={activeColorPickerIndex}
                handleColorChange={handleColorChange}
                handleColorDelete={handleColorDelete}
                handleColorAdd={handleColorAdd}
                setActiveColorPickerIndex={setActiveColorPickerIndex}
                visualization="heb"
                colorPickerRef={colorPickerRef}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger
              className="cursor-pointer"
              onClick={() => setShowDiagramHandler("wordCloud")}
            >
              Word-Cloud
            </AccordionTrigger>
            <AccordionContent>
              <GenericThemesAccordion
                activeColorPickerIndex={activeColorPickerIndex}
                handleColorChange={handleColorChange}
                handleColorDelete={handleColorDelete}
                handleColorAdd={handleColorAdd}
                setActiveColorPickerIndex={setActiveColorPickerIndex}
                visualization="wordcloud"
                colorPickerRef={colorPickerRef}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger
              className="cursor-pointer"
              onClick={() => setShowDiagramHandler("lineChart")}
            >
              Line-Chart
            </AccordionTrigger>
            <AccordionContent>
              <GenericThemesAccordion
                activeColorPickerIndex={activeColorPickerIndex}
                handleColorChange={handleColorChange}
                handleColorDelete={handleColorDelete}
                handleColorAdd={handleColorAdd}
                setActiveColorPickerIndex={setActiveColorPickerIndex}
                visualization="lineChart"
                colorPickerRef={colorPickerRef}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
      {showDiagram.sankey && (
        <div className="flex-grow p-4">
          <Suspense fallback={<Fallback />}>
            <SankeyGraphView
              data={siteConfig.nodeLink}
              colors={
                isDarkTheme
                  ? activeTheme.sankey.dark.colors
                  : activeTheme.sankey.light.colors
              }
            />
          </Suspense>
        </div>
      )}
      {showDiagram.calendar && (
        <div className="flex-grow p-4">
          <Suspense fallback={<Fallback />}>
            <CalendarView
              data={{ calendar: siteConfig.calendar }}
              colors={
                isDarkTheme
                  ? activeTheme.calendar.dark.colors
                  : activeTheme.calendar.light.colors
              }
              isDarkTheme={isDarkTheme}
            />
          </Suspense>
        </div>
      )}
      {showDiagram.flg && (
        <div className="flex-grow p-4">
          <Suspense fallback={<Fallback />}>
            <ForcedLayoutGraphView
              data={siteConfig.nodeLink}
              colors={
                isDarkTheme
                  ? activeTheme.flg.dark.colors
                  : activeTheme.flg.light.colors
              }
            />
          </Suspense>
        </div>
      )}
      {showDiagram.wordCloud && (
        <div className="flex-grow p-4">
          <Suspense fallback={<Fallback />}>
            <WordCloudView
              data={{ words: siteConfig.words }}
              colors={
                isDarkTheme
                  ? activeTheme.wordcloud.dark.colors
                  : activeTheme.wordcloud.light.colors
              }
            />
          </Suspense>
        </div>
      )}
      {showDiagram.heb && (
        <div className="flex-grow p-4">
          <Suspense fallback={<Fallback />}>
            <HierarchicalEdgeBundlingView
              data={siteConfig.nodeLink}
              colors={
                isDarkTheme
                  ? activeTheme.heb.dark.colors
                  : activeTheme.heb.light.colors
              }
            />
          </Suspense>
        </div>
      )}
      {showDiagram.lineChart && (
        <div className="flex-grow p-4">
          <Suspense fallback={<Fallback />}>
            <LineChartView
              data={siteConfig.lineChart}
              colors={
                isDarkTheme
                  ? activeTheme.lineChart.dark.colors
                  : activeTheme.lineChart.light.colors
              }
            />
          </Suspense>
        </div>
      )}
    </div>
  );
}
