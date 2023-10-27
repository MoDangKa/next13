"use client";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_ENV);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-800 rounded-lg">
        <div className="text-center my-4">
          <h1>Next13</h1>
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
