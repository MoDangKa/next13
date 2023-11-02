"use client";
import { SWRConfig } from "swr";
import { PropsWithChildren } from "react";
import Header from "./header";
import Navbar from "./navbar";
import Footer from "./footer";
import fetcher from "@/util/fetcher";

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <SWRConfig value={{ fetcher }}>
      <div className="flex flex-col items-center justify-center gap-2 min-h-screen max-w-md my-3 mx-auto">
        <Header />
        <Navbar />
        <main className="w-full p-5 basic-card">
          {children}
        </main>
        <Footer />
      </div>
    </SWRConfig>
  );
}
