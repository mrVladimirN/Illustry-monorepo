"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import { createContext } from "react";
import { cloneDeep } from "@/lib/utils";
import { DeepPartial } from "types/utils";
interface OptionAction {
  type: "apply";
  modifiedData?: DeepPartial<ThemeColors>;
}
interface AuxProps {
  children: React.ReactNode;
}
export interface ThemeColors {
  calendar: {
    dark: {
      colors: string[];
    };
    light: {
      colors: string[];
    };
  };
  heb: {
    dark: {
      colors: string[];
    };
    light: {
      colors: string[];
    };
  };
  flg: {
    dark: {
      colors: string[];
    };
    light: {
      colors: string[];
    };
  };
  sankey: {
    dark: {
      colors: string[];
    };
    light: {
      colors: string[];
    };
  };
  wordcloud: {
    dark: {
      colors: string[];
    };
    light: {
      colors: string[];
    };
  };
  lineChart: {
    dark: {
      colors: string[];
    };
    light: {
      colors: string[];
    };
  };
  barChart: {
    dark: {
      colors: string[];
    };
    light: {
      colors: string[];
    };
  };
  scatter: {
    dark: {
      colors: string[];
    };
    light: {
      colors: string[];
    };
  };
  pieChart: {
    dark: {
      colors: string[];
    };
    light: {
      colors: string[];
    };
  };
  treeMap: {
    dark: {
      colors: string[];
    };
    light: {
      colors: string[];
    };
  };
}
export const initialThemeColors: ThemeColors = {
  calendar: {
    dark: {
      colors: [
        "#5DBE6E",
        "#4C8BF5",
        "#F0AC40",
        "#D73D6C",
        "#1D7A8A",
        "#B65911",
        "#84BA5B",
      ],
    },
    light: {
      colors: [
        "#5DBE6E",
        "#4C8BF5",
        "#F0AC40",
        "#D73D6C",
        "#1D7A8A",
        "#B65911",
        "#84BA5B",
      ],
    },
  },
  flg: {
    dark: {
      colors: [
        "#5DBE6E",
        "#4C8BF5",
        "#F0AC40",
        "#D73D6C",
        "#1D7A8A",
        "#B65911",
        "#84BA5B",
      ],
    },
    light: {
      colors: [
        "#5DBE6E",
        "#4C8BF5",
        "#F0AC40",
        "#D73D6C",
        "#1D7A8A",
        "#B65911",
        "#84BA5B",
      ],
    },
  },
  sankey: {
    dark: {
      colors: [
        "#5DBE6E",
        "#4C8BF5",
        "#F0AC40",
        "#D73D6C",
        "#1D7A8A",
        "#B65911",
        "#84BA5B",
      ],
    },
    light: {
      colors: [
        "#5DBE6E",
        "#4C8BF5",
        "#F0AC40",
        "#D73D6C",
        "#1D7A8A",
        "#B65911",
        "#84BA5B",
      ],
    },
  },
  wordcloud: {
    dark: {
      colors: [
        "#5DBE6E",
        "#4C8BF5",
        "#F0AC40",
        "#D73D6C",
        "#1D7A8A",
        "#B65911",
        "#84BA5B",
      ],
    },
    light: {
      colors: [
        "#5DBE6E",
        "#4C8BF5",
        "#F0AC40",
        "#D73D6C",
        "#1D7A8A",
        "#B65911",
        "#84BA5B",
      ],
    },
  },
  heb: {
    dark: {
      colors: [
        "#5DBE6E",
        "#4C8BF5",
        "#F0AC40",
        "#D73D6C",
        "#1D7A8A",
        "#B65911",
        "#84BA5B",
      ],
    },
    light: {
      colors: [
        "#5DBE6E",
        "#4C8BF5",
        "#F0AC40",
        "#D73D6C",
        "#1D7A8A",
        "#B65911",
        "#84BA5B",
      ],
    },
  },
  lineChart: {
    dark: {
      colors: [
        "#5DBE6E",
        "#4C8BF5",
        "#F0AC40",
        "#D73D6C",
        "#1D7A8A",
        "#B65911",
        "#84BA5B",
      ],
    },
    light: {
      colors: [
        "#5DBE6E",
        "#4C8BF5",
        "#F0AC40",
        "#D73D6C",
        "#1D7A8A",
        "#B65911",
        "#84BA5B",
      ],
    },
  },
  barChart: {
    dark: {
      colors: [
        "#5DBE6E",
        "#4C8BF5",
        "#F0AC40",
        "#D73D6C",
        "#1D7A8A",
        "#B65911",
        "#84BA5B",
      ],
    },
    light: {
      colors: [
        "#5DBE6E",
        "#4C8BF5",
        "#F0AC40",
        "#D73D6C",
        "#1D7A8A",
        "#B65911",
        "#84BA5B",
      ],
    },
  },
  scatter: {
    dark: {
      colors: [
        "#5DBE6E",
        "#4C8BF5",
        "#F0AC40",
        "#D73D6C",
        "#1D7A8A",
        "#B65911",
        "#84BA5B",
      ],
    },
    light: {
      colors: [
        "#5DBE6E",
        "#4C8BF5",
        "#F0AC40",
        "#D73D6C",
        "#1D7A8A",
        "#B65911",
        "#84BA5B",
      ],
    },
  },
  pieChart: {
    dark: {
      colors: [
        "#5DBE6E",
        "#4C8BF5",
        "#F0AC40",
        "#D73D6C",
        "#1D7A8A",
        "#B65911",
        "#84BA5B",
      ],
    },
    light: {
      colors: [
        "#5DBE6E",
        "#4C8BF5",
        "#F0AC40",
        "#D73D6C",
        "#1D7A8A",
        "#B65911",
        "#84BA5B",
      ],
    },
  },
  treeMap: {
    dark: {
      colors: [
        "#5DBE6E",
        "#4C8BF5",
        "#F0AC40",
        "#D73D6C",
        "#1D7A8A",
        "#B65911",
        "#84BA5B",
      ],
    },
    light: {
      colors: [
        "#5DBE6E",
        "#4C8BF5",
        "#F0AC40",
        "#D73D6C",
        "#1D7A8A",
        "#B65911",
        "#84BA5B",
      ],
    },
  },
};

const ThemeColorsContext = createContext<ThemeColors>(initialThemeColors);
const ThemeDispatchContext = createContext<
  React.Dispatch<OptionAction> | undefined
>(undefined);
const themeColorsReducer = (
  data: ThemeColors,
  action: OptionAction
): ThemeColors => {
  if (action.type === "apply" && action.modifiedData) {
    const newData: ThemeColors = cloneDeep(data);
    // Iterate through properties of action.modifiedData
    for (const key in action.modifiedData) {
      if (key in newData) {
        newData[key as keyof ThemeColors] = {
          ...newData[key as keyof ThemeColors],
          ...(action.modifiedData as any)[key], // Using any type assertion here
        };
      }
    }

    return newData;
  } else {
    const newData: ThemeColors = cloneDeep(data);
    return newData;
  }
};
export function ThemeColorsProvider({ children }: AuxProps) {
  let initialTheme = initialThemeColors;
  if (typeof window !== "undefined" && window.localStorage) {
    const storedTheme = localStorage.getItem("colorTheme");
    initialTheme = storedTheme ? JSON.parse(storedTheme) : initialThemeColors;
  }
  const [themeProv, dispatchDataProv] = React.useReducer(
    themeColorsReducer,
    initialTheme
  );
  // Add a useEffect to update localStorage whenever themeProv changes
  React.useEffect(() => {
    localStorage.setItem("colorTheme", JSON.stringify(themeProv));
  }, [themeProv]);
  return (
    <ThemeColorsContext.Provider value={themeProv}>
      <ThemeDispatchContext.Provider value={dispatchDataProv}>
        {children}
      </ThemeDispatchContext.Provider>
    </ThemeColorsContext.Provider>
  );
}
export function useThemeColors() {
  return React.useContext(ThemeColorsContext);
}
export function useThemeColorsDispach() {
  return React.useContext(ThemeDispatchContext);
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
