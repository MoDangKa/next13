"use client";
import BTNFlag from "./btn-flag";
import BTNSwitch from "./btn-switch";

type LocaleAndModeProps = {
  locale: "en" | "th";
};

export default function LocaleAndMode({ locale }: LocaleAndModeProps) {
  return (
    <nav className="container top-2 left-1/2 -translate-x-1/2 absolute">
      <div className="flex flex-row justify-end items-center gap-2 px-2 sm:px-0 z-50 relative">
        <BTNFlag lang="th" locale={locale} />
        <BTNFlag lang="en" locale={locale} />
        <BTNSwitch />
      </div>
    </nav>
  );
}
