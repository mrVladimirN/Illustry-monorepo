"use client";

import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  initialColor: string;
  changeColor: ((newColor: string) => void) | undefined;
}
export const ColorPicker = ({
  initialColor,
  changeColor,
}: ColorPickerProps) => {
  
  return <HexColorPicker color={initialColor} onChange={changeColor}/>;
};
