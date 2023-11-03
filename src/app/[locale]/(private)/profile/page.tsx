"use client";
import PostForm from "@/components/forms/post-form";
import PostContainer from "@/components/post/post-container";
import useSWR from "swr";

export default function Profile() {
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
