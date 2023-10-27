"use client";
import { useEffect } from "react";

function Navbar() {
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  function switchMode(checked: boolean) {
    const checkBoxElement = document.getElementById(
      "sun-and-moon-checkbox"
    ) as HTMLInputElement;
    if (checkBoxElement && checkBoxElement.type === "checkbox")
      checkBoxElement.checked = checked;
  }

  function handleClick(e: React.FormEvent<HTMLInputElement>) {
    console.log(e.currentTarget.checked);
    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      }
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
    }
  }

  return (
    <div className="container mx-auto h-4 w-full">
      <div className="flex flex-row justify-end">
        <div className="sun-and-moon">
          <input
            type="checkbox"
            className="sun-and-moon__input"
            id="sun-and-moon-checkbox"
            defaultChecked={true}
            onClick={handleClick}
          />
          <label
            className="sun-and-moon__label"
            htmlFor="sun-and-moon-checkbox"
          >
            <span className="sun-and-moon__indicator"></span>
            <span className="sun-and-moon__decoration"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
