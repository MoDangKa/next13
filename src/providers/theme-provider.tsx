"use client";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Themes = "dark" | "light";
type ThemeState = {
  theme: Themes;
  toggleTheme(): void;
};

const key = "color-theme";

const ThemeContext = createContext<ThemeState | null>(null);

export function ThemeProvider(props: PropsWithChildren) {
  const [theme, setTheme] = useState<Themes>("light");

  useEffect(() => {
    if (
      localStorage[key] === "dark" ||
      (!(key in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      set("dark");
    } else {
      set("light");
    }
  }, []);

  function set(t: Themes) {
    localStorage.setItem(key, t);
    setTheme(t);

    if (t === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }

  function toggleTheme() {
    const colorTheme = localStorage.getItem(key);
    if (colorTheme) {
      if (colorTheme === "light") {
        set("dark");
      } else {
        set("light");
      }
    } else {
      if (document.documentElement.classList.contains("dark")) {
        set("light");
      } else {
        set("dark");
      }
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeState {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("Please use ThemeProvider in parent component");
  }

  return context;
}
