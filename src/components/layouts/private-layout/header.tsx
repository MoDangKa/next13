"use client";
import User from "@/components/user";
import useSWR from "swr";

export default function Header() {
  const { data, error, isLoading } = useSWR("/api/users/profile");

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div> loading...</div>;

  return (
    <header className="flex flex-row justify-between items-center w-full p-5 basic-card">
      <div>
        <h2 className="text-emerald-500">Next13</h2>
      </div>
      <User user={data.data} href="account" />
    </header>
  );
}
