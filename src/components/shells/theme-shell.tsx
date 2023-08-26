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
import { Input } from "../ui/input";

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
  return (
    <div className="fixed w-1/4 p-4 overflow-auto h-full border-r-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="cursor-pointer">
            Default Schemes
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(colorPalette).map((schemeName, index) => (
                <div
                  key={index}
                  className="flex flex-wrap border border-gray-300 rounded cursor-pointer justify-between"
                  onClick={() => {
                    const appliedThemeColors: DeepPartial<ThemeColors> = {
                      flg: {
                        dark: { colors: colorPalette[schemeName] },
                        light: { colors: colorPalette[schemeName] },
                      },
                      sankey: {
                        dark: { colors: colorPalette[schemeName] },
                        light: { colors: colorPalette[schemeName] },
                      },
                      calendar: {
                        dark: { colors: colorPalette[schemeName] },
                        light: { colors: colorPalette[schemeName] },
                      },
                      wordcloud: {
                        dark: { colors: colorPalette[schemeName] },
                        light: { colors: colorPalette[schemeName] },
                      },
                      heb: {
                        dark: {
                          initialColor: colorPalette[schemeName]?.at(3),
                          colorin: colorPalette[schemeName]?.at(1),
                          colorout: colorPalette[schemeName]?.at(2),
                          nodeColor: colorPalette[schemeName]?.at(3),
                          linkColor: colorPalette[schemeName]?.at(3),
                        },
                        light: {
                          initialColor: colorPalette[schemeName]?.at(3),
                          colorin: colorPalette[schemeName]?.at(1),
                          colorout: colorPalette[schemeName]?.at(2),
                          nodeColor: colorPalette[schemeName]?.at(3),
                          linkColor: colorPalette[schemeName]?.at(3),
                        },
                      },
                    };
                    if (themeDispatch) {
                      themeDispatch({
                        type: "apply",
                        modifiedData: appliedThemeColors,
                      });
                    }
                  }}
                >
                  {colorPalette[schemeName]?.map((color, index) => (
                    <div
                      key={index}
                      style={{ backgroundColor: color }}
                      className="w-4 h-4 m-1 border border-gray-300 rounded flex items-center justify-center"
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="cursor-pointer">
            Sankey Diagram
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-start">
              <div className="text-sm font-medium pr-4">Colors</div>
              <div className="flex flex-col justify-end ml-[50%]">
                {Object.values(activeTheme.sankey.light.colors).map(
                  (color, index) => (
                    <div className="flex items-center mb-2" key={index}>
                      <input
                        type="text"
                        className="w-[60%] rounded p-1 border border-gray-300"
                        value={color}
                      />
                      <div
                        key={index}
                        style={{ backgroundColor: color }}
                        className="w-5 h-5 ml-2 border border-gray-300 rounded flex items-center justify-center"
                      ></div>
                    </div>
                  )
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="cursor-pointer">
            Calendar
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-start">
              <div className="text-sm font-medium pr-4">Colors</div>
              <div className="flex flex-col justify-end ml-[50%]">
                {Object.values(activeTheme.sankey.light.colors).map(
                  (color, index) => (
                    <div className="flex items-center mb-2" key={index}>
                      <input
                        type="text"
                        className="w-[60%] rounded p-1 border border-gray-300"
                        value={color}
                      />
                      <div
                        key={index}
                        style={{ backgroundColor: color }}
                        className="w-5 h-5 ml-2 border border-gray-300 rounded flex items-center justify-center"
                      ></div>
                    </div>
                  )
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="cursor-pointer">
            Forced-Layout-Graph
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-start">
              <div className="text-sm font-medium pr-4">Colors</div>
              <div className="flex flex-col justify-end ml-[50%]">
                {Object.values(activeTheme.sankey.light.colors).map(
                  (color, index) => (
                    <div className="flex items-center mb-2" key={index}>
                      <input
                        type="text"
                        className="w-[60%] rounded p-1 border border-gray-300"
                        value={color}
                      />
                      <div
                        key={index}
                        style={{ backgroundColor: color }}
                        className="w-5 h-5 ml-2 border border-gray-300 rounded flex items-center justify-center"
                      ></div>
                    </div>
                  )
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="cursor-pointer">
            Hierarchical-Edge-Bundling
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex items-start">
              <div className="text-sm font-medium pr-4">Colors</div>
              <div className="flex flex-col justify-end ml-[50%]">
                {Object.values(activeTheme.sankey.light.colors).map(
                  (color, index) => (
                    <div className="flex items-center mb-2" key={index}>
                      <input
                        type="text"
                        className="w-[60%] rounded p-1 border border-gray-300"
                        value={color}
                      />
                      <div
                        key={index}
                        style={{ backgroundColor: color }}
                        className="w-5 h-5 ml-2 border border-gray-300 rounded flex items-center justify-center"
                      ></div>
                    </div>
                  )
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
