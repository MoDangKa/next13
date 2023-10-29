import ModeSwitchButton from "./mode-switch-button";

function LocaleAndMode() {
  return (
    <nav className="container top-2 left-1/2 -translate-x-1/2 absolute">
      <div className="flex flex-row justify-end items-center gap-4 px-2 sm:px-0 z-50 relative">
        <ModeSwitchButton />
      </div>
    </nav>
  );
}

export default LocaleAndMode;
