import { createContext, useContext, useEffect, useState } from "react";

type ColorTheme = "default" | "purple" | "green";

type CustomeThemeProviderProps = {
  children: React.ReactNode;
  defaultColorTheme?: ColorTheme;
  storageKey?: string;
};

type CustomeThemeProviderState = {
  colorTheme: ColorTheme;
  setColorTheme: (colorTheme: ColorTheme) => void;
};

const initialState: CustomeThemeProviderState = {
  colorTheme: "default",
  setColorTheme: () => null,
};

const ColorThemeProviderContext =
  createContext<CustomeThemeProviderState>(initialState);

export function ColorThemeProvider({
  children,
  defaultColorTheme = "default",
  storageKey = "color-theme",
  ...props
}: CustomeThemeProviderProps) {
  const [colorTheme, setColorTheme] = useState<ColorTheme>(defaultColorTheme);

  useEffect(() => {
    const body = window.document.body;
    body.classList.remove("theme-default", "theme-purple", "theme-green");
    body.classList.add(`theme-${colorTheme}`);
  }, [colorTheme]);

  const value = {
    colorTheme,
    setColorTheme: (colorTheme: ColorTheme) => {
      setColorTheme(colorTheme);
    },
  };

  return (
    <ColorThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ColorThemeProviderContext.Provider>
  );
}

export const useColorTheme = () => {
  const context = useContext(ColorThemeProviderContext);

  if (context === undefined)
    throw new Error("useColorTheme must be used within a ColorThemeProvider");

  return context;
};
