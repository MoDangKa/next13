"use client";
import { useEffect, useState } from "react";

export default function BTNSwitch() {
  const [isCheck, setIsCheck] = useState<boolean>(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsCheck(false);
    } else {
      document.documentElement.classList.remove("dark");
      setIsCheck(true);
    }
  }, []);

  function handleClick() {
    const theme = localStorage.getItem("theme");
    if (theme) {
      if (theme === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setIsCheck(false);
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setIsCheck(true);
      }
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setIsCheck(true);
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setIsCheck(false);
      }
    }
  }

  return (
    <div className="sun-and-moon">
      <input
        id="sun-and-moon-checkbox"
        type="checkbox"
        className="sun-and-moon__input"
        checked={isCheck}
        onChange={handleClick}
      />
      <label className="sun-and-moon__label" htmlFor="sun-and-moon-checkbox">
        <span className="sun-and-moon__indicator"></span>
        <span className="sun-and-moon__decoration"></span>
      </label>
    </div>
  );
}
