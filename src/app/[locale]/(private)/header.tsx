"use client";
import User from "@/components/user";
import useSWR from "swr";

export default function Header() {
  const { data, error, isLoading } = useSWR("/api/users/profile");
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div> loading...</div>;

  return (
    <header className="flex flex-row justify-between items-center w-full p-5 my-2 bg-slate-800 rounded-lg">
      <div>
        <h1 className="text-white">Next13</h1>
      </div>
      <User user={data.data} href="account" />
    </header>
  );
}
