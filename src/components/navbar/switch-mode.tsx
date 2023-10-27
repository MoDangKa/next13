"use client";
import { useEffect, useState } from "react";

function SwitchMode() {
  const [light, setLight] = useState<boolean>(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setLight(false);
    } else {
      document.documentElement.classList.remove("dark");
      setLight(true);
    }
  }, []);

  function handleClick() {
    const colorTheme = localStorage.getItem("color-theme");
    if (colorTheme) {
      if (colorTheme === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
        setLight(false);
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
        setLight(true);
      }
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
        setLight(true);
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
        setLight(false);
      }
    }
  }

  return (
    <div className="sun-and-moon">
      <input
        type="checkbox"
        className="sun-and-moon__input"
        id="sun-and-moon-checkbox"
        checked={light}
        onClick={handleClick}
      />
      <label className="sun-and-moon__label" htmlFor="sun-and-moon-checkbox">
        <span className="sun-and-moon__indicator"></span>
        <span className="sun-and-moon__decoration"></span>
      </label>
    </div>
  );
}

export default SwitchMode;
