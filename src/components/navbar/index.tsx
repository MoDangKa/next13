"use client";
import SwitchMode from "./switch-mode";

function Navbar() {
  return (
    <nav className="container mx-auto w-full">
      <div className="flex flex-row justify-end py-2">
        <SwitchMode />
      </div>
    </nav>
  );
}

export default Navbar;
