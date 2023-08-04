"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

export interface ContextValue {
  screenSize: number | undefined;
  activeMenu: boolean;
  setActiveMenu: Dispatch<SetStateAction<boolean>>;
  setScreenSize: Dispatch<SetStateAction<number | undefined>>;
}
const StateContext = createContext<ContextValue>({
  activeMenu: true,
  setActiveMenu: () => {},
  screenSize: undefined,
  setScreenSize: () => {},
});
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
  const [activeMenu, setActiveMenu] = useState<boolean>(true);

  const contextValue: ContextValue = {
    activeMenu,
    screenSize,
    setScreenSize,
    setActiveMenu,
  };
  return (
    <StateContext.Provider value={contextValue}>
      <NextThemesProvider {...props}>
        {children}
      </NextThemesProvider>
    </StateContext.Provider>
  );
}
export const useStateContext = (): ContextValue | undefined => {
  const context = useContext(StateContext);

  return context;
};
