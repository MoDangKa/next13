"use client";
import dynamic from "next/dynamic";
const FollowingContainer = dynamic(
  () => import("@/components/following/following-container")
);

export default function FollowingPage() {
  return <FollowingContainer />;
}
