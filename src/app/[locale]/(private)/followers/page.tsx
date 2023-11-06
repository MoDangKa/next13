"use client";
import dynamic from "next/dynamic";
const FollowsContainer = dynamic(
  () => import("@/components/follows-page/follows-container")
);

export default function FollowsPage() {
  return <FollowsContainer />;
}
