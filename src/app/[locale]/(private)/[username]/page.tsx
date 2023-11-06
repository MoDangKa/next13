"use client";
import dynamic from "next/dynamic";
const UsernamePageHeader = dynamic(
  () => import("@/components/username-page/username-page-header")
);

type UsernamePageProps = {
  params: { username: string };
};

export default function UsernamePage({ params }: UsernamePageProps) {
  return (
    <div>
      <UsernamePageHeader username={params.username} />
      <div>post container {params.username}</div>
    </div>
  );
}
