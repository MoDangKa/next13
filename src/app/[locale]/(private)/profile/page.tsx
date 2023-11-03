"use client";
import dynamic from "next/dynamic";
import useSWR from "swr";
const PostForm = dynamic(() => import("@/components/forms/post-form"));
const PostContainer = dynamic(() => import("@/components/post/post-container"));

export default function ProfilePage() {
  const { data, error, isLoading } = useSWR("/api/users/profile");

  if (error) return <div>filed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="w-full flex flex-col">
      <PostForm />
      <hr className="my-5" />
      <PostContainer username={data.data.username} />
    </div>
  );
}
