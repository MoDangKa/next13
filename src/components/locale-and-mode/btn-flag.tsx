"use client";
import { usePathname, useRouter } from "next-intl/client";

type BTNFlagProps = {
  lang: "en" | "th";
  locale: "en" | "th";
};

export default function BTNFlag({ lang, locale }: BTNFlagProps) {
  const router = useRouter();
  const pathname = usePathname();

  function handleClick() {
    router.push(pathname, { locale: lang });
  }

  return (
    <button
      className={`overflow-hidden rounded-full w-5 h-5 grid place-content-center border bg-zinc-50 border-zinc-50 dark:border-zinc-500 ${
        lang !== locale && "grayscale"
      }`}
      onClick={handleClick}
    >
      <span className={`fi fi-${lang === "en" ? "us" : "th"} !w-6 !h-6`} />
    </button>
  );
}
