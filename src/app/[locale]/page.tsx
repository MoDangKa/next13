"use client";
import LocaleSwitcher from "@/components/locale-switcher";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Home() {
  const t = useTranslations();
  const params = useParams();
  const locale = params?.locale as string;

  return (
    <>
      <nav className="container top-2 left-1/2 -translate-x-1/2 absolute pointer-events-none flex justify-end">
        <LocaleSwitcher />
      </nav>
      <main className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-800 rounded-lg text-white">
          <div className="text-center my-4">
            <h1>{t("home.title")}</h1>
          </div>
          <div>
            <Link
              href="/sign-in"
              locale={locale}
              className=" bg-slate-900 my-4 p-3 rounded-lg block text-center"
            >
              {t("common.signIn")}
            </Link>
          </div>
          <div>
            <Link
              href="/sign-up"
              locale={locale}
              className=" bg-slate-900 my-4 p-3 rounded-lg block text-center"
            >
              {t("common.signUp")}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
