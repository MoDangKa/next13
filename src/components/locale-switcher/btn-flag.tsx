type BTNFlagProps = {
  lang: Locale;
  locale: Locale;
  onClick(lang: Locale): void;
};

export default function BTNFlag({ lang, locale, onClick }: BTNFlagProps) {
  return (
    <button
      className={`overflow-hidden rounded-full w-5 h-5 grid place-content-center border bg-zinc-50 border-zinc-50 dark:border-zinc-500 ${
        lang !== locale && "grayscale"
      }`}
      onClick={() => onClick(lang)}
    >
      <span className={`fi fi-${lang === "en" ? "us" : "th"} !w-6 !h-6`} />
    </button>
  );
}
