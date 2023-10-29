"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-800 rounded-lg text-white">
        <div className="text-center my-4">
          <h1>{t("title")}</h1>
        </div>
        <div>
          <Link
            href="/sign-in"
            className=" bg-slate-900 my-4 p-3 rounded-lg block text-center"
          >
            Sign In
          </Link>
        </div>
        <div>
          <Link
            href="/sign-up"
            className=" bg-slate-900 my-4 p-3 rounded-lg block text-center"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
