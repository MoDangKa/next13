"use client";
import dynamic from "next/dynamic";
const FollowingContainer = dynamic(
  () => import("@/components/pages/following-page/following-container")
);

export default function FollowingPage() {
  return <FollowingContainer />;
}
