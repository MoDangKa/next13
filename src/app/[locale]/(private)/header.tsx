"use client";
import User from "@/components/user";
import useSWR from "swr";

export default function Header() {
  const { data, error, isLoading } = useSWR("/api/users/profile");
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div> loading...</div>;

  return (
    <header className="w-full py-5 bg-slate-800">
      <div className="container px-2 sm:px-0 flex flex-row justify-between items-center">
        <div>
          <h1 className="text-white">Next13</h1>
        </div>
        <User user={data.data} href="account" />
      </div>
    </header>
  );
}
