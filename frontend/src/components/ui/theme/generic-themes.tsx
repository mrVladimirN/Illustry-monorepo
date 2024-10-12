/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-unused-vars */
import { Dispatch, RefObject, SetStateAction } from 'react';
import { useThemeColors } from '@/components/theme-provider';
import Icons from '@/components/icons';
import ColorPicker from '../colorPicker';
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from '../tabs';

type GenericThemesProps = {
  activeColorPickerIndex: number | null;
  handleColorChange: (
    newColor: string,
    index: number,
    visualization: string,
    theme: string
  ) => void;
  colorPickerRef: RefObject<HTMLDivElement>;
  setActiveColorPickerIndex: Dispatch<
    SetStateAction<number | null>
  >;
  visualization: string;
  handleColorDelete: (visualization: string, theme: string) => void;
  handleColorAdd: (visualization: string, theme: string) => void;
}

const GenericThemesAccordion = ({
  activeColorPickerIndex,
  handleColorChange,
  setActiveColorPickerIndex,
  colorPickerRef,
  visualization,
  handleColorDelete,
  handleColorAdd
}: GenericThemesProps) => {
  // State to hold input values and their validation statuses
  const activeTheme = useThemeColors();
  // @ts-ignore
  const activeVisualization = activeTheme[visualization];
  const darkColorsLength = activeVisualization.dark.colors.length;
  return (
    <Tabs defaultValue="theme" className="w-[100%]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Light">Light</TabsTrigger>
        <TabsTrigger value="Dark">Dark</TabsTrigger>
      </TabsList>
      <TabsContent value="Light">
        <div className="flex items-start mt-[5%]">
          <div className="text-sm font-medium pr-4">
            Colors
            {activeColorPickerIndex !== null && (
              <div className="mt-2" ref={colorPickerRef}>
                <ColorPicker
                  initialColor={
                    activeVisualization.light.colors[
                      activeColorPickerIndex
                    ] as string
                  }
                  changeColor={(newColor:string) => handleColorChange(
                    newColor,
                    activeColorPickerIndex,
                    visualization,
                    'light'
                  )}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-end ml-auto">
            {Object.values(activeVisualization.light.colors).map(
              (color, index) => (
                <div className="flex items-center mb-2" key={index}>
                  <input
                    readOnly
                    type="text"
                    className="w-[60%] rounded p-1 border border-gray-300"
                    value={color as string}
                  />
                  <div
                    onClick={() => setActiveColorPickerIndex(index)}
                    key={index}
                    style={{ backgroundColor: color as string }}
                    className="w-5 h-5 ml-2 border border-gray-300 rounded flex items-center justify-center cursor-pointer"
                  />
                </div>
              )
            )}
            <div className="flex items-center">
              <div
                className={`w-4 h-4 ml-2 mr-1 border border-gray-300 rounded flex items-center justify-center cursor-pointer ${
                  darkColorsLength >= 10 ? 'opacity-50 pointer-events-none' : ''
                }`}
                onClick={() => {
                  if (darkColorsLength < 10) {
                    return handleColorAdd(visualization, 'light');
                  }
                  return null;
                }}
              >
                <Icons.add
                  className={`text-gray-500 w-3 h-3 ${
                    darkColorsLength >= 10 ? 'opacity-50' : ''
                  }`}
                />
              </div>
              <div
                className={`w-4 h-4 border border-gray-300 rounded flex items-center justify-center cursor-pointer ${
                  darkColorsLength < 4 ? 'opacity-50 pointer-events-none' : ''
                }`}
                onClick={() => {
                  if (darkColorsLength >= 4) {
                    return handleColorDelete(visualization, 'light');
                  }
                  return null;
                }}
              >
                <Icons.remove
                  className={`text-gray-500 w-3 h-3 ${
                    darkColorsLength < 4 ? 'opacity-50' : ''
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="Dark">
        <div className="flex items-start mt-[5%]">
          <div className="text-sm font-medium pr-4">
            Colors
            {activeColorPickerIndex !== null && (
              <div className="mt-2" ref={colorPickerRef}>
                <ColorPicker
                  initialColor={
                    // @ts-ignore
                    activeVisualization.dark.colors[
                      activeColorPickerIndex
                    ] as string
                  }
                  changeColor={(newColor:string) => handleColorChange(
                    newColor,
                    activeColorPickerIndex,
                    visualization,
                    'dark'
                  )}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-end ml-auto">
            {Object.values(activeVisualization.dark.colors).map(
              (color, index) => (
                <div className="flex items-center mb-2" key={index}>
                  <input
                    readOnly
                    type="text"
                    className="w-[60%] rounded p-1 border border-gray-300"
                    value={color as string}
                  />
                  <div
                    onClick={() => setActiveColorPickerIndex(index)}
                    key={index}
                    style={{ backgroundColor: color as string }}
                    className="w-5 h-5 ml-2 border border-gray-300 rounded flex items-center justify-center cursor-pointer"
                  />
                </div>
              )
            )}
            <div className="flex items-center">
              <div
                className={`w-4 h-4 ml-2 mr-1 border border-gray-300 rounded flex items-center justify-center cursor-pointer ${
                  darkColorsLength >= 10 ? 'opacity-50 pointer-events-none' : ''
                }`}
                onClick={() => {
                  if (darkColorsLength < 10) {
                    return handleColorAdd(visualization, 'dark');
                  }
                  return null;
                }}
              >
                <Icons.add
                  className={`text-gray-500 w-3 h-3 ${
                    darkColorsLength >= 10 ? 'opacity-50' : ''
                  }`}
                />
              </div>
              <div
                className={`w-4 h-4 border border-gray-300 rounded flex items-center justify-center cursor-pointer ${
                  darkColorsLength < 4 ? 'opacity-50 pointer-events-none' : ''
                }`}
                onClick={() => {
                  if (darkColorsLength >= 4) {
                    return handleColorDelete(visualization, 'dark');
                  }
                  return null;
                }}
              >
                <Icons.remove
                  className={`text-gray-500 w-3 h-3 ${
                    darkColorsLength < 4 ? 'opacity-50' : ''
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default GenericThemesAccordion;
