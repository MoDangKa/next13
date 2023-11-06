"use client";
import PostContainer from "@/components/post/post-container";
import dynamic from "next/dynamic";
const UsernamePageHeader = dynamic(
  () => import("@/components/pages/username-page/username-page-header")
);

type UsernamePageProps = {
  params: { username: string };
};

export default function UsernamePage({ params }: UsernamePageProps) {
  return (
    <div className="flex flex-col gap-5">
      <UsernamePageHeader username={params.username} />
      <PostContainer username={params.username} />
    </div>
  );
}
