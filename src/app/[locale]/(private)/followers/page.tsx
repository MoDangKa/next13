"use client";
import dynamic from "next/dynamic";
const FollowsContainer = dynamic(
  () => import("@/components/follows/follows-container")
);

export default function FollowsPage() {
  return <FollowsContainer />;
}
