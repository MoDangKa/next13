"use client";
import SwitchMode from "./switch-mode";

function Navbar() {
  return (
    <div className="container mx-auto w-full">
      <div className="flex flex-row justify-end py-2">
        <SwitchMode />
      </div>
    </div>
  );
}

export default Navbar;
