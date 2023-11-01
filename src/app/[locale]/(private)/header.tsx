"use client"
import useSWR from "swr";

const fetcher = async (url: RequestInfo | URL) => {
  const result = await fetch(url);
  if (result.ok) {
    const msg = "An error occurred while fetching";
    const info = await result.json();
    const status = result.status;
    const error = new Error(msg);
    console.error(info, status);
    throw error;
  }
};

export default function Header() {
  const { data, error, isLoading } = useSWR("/api/users/profile", fetcher);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div> loading...</div>;

  console.log(data);

  return <header>Header</header>;
}
