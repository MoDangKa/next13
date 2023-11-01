"use client";
import { usePathname, useRouter } from "next-intl/client";
import BTNFlag from "./btn-flag";
import BTNToggleMode from "./btn-toggle-theme";

type LocaleSwitcherProps = {
  locale: Locale;
};

export default function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  function handleClick(lang: Locale) {
    router.replace(pathname, { locale: lang });
  }

  return (
    <nav className="container top-2 left-1/2 -translate-x-1/2 absolute pointer-events-none flex justify-end">
      <div className="flex flex-row gap-2 px-2 sm:px-0 z-50 relative max-w-fit pointer-events-auto">
        <BTNFlag lang="th" locale={locale} onClick={handleClick} />
        <BTNFlag lang="en" locale={locale} onClick={handleClick} />
        <BTNToggleMode />
      </div>
    </nav>
  );
}