"use client";
import fetcher from "@/util/fetcher";
import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";
import { SWRConfig } from "swr";
const Header = dynamic(() => import("@/components/private-page/header"));
const Navbar = dynamic(() => import("@/components/private-page/navbar"));
const Footer = dynamic(() => import("@/components/private-page/footer"));

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <SWRConfig value={{ fetcher }}>
      <div className="flex flex-col items-center justify-center gap-2 min-h-screen max-w-md my-3 mx-auto">
        <Header />
        <Navbar />
        <main className="w-full p-5 basic-card">{children}</main>
        <Footer />
      </div>
    </SWRConfig>
  );
}
