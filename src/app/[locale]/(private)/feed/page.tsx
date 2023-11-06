"use client";
import dynamic from "next/dynamic";
const FeedContainer = dynamic(
  () => import("@/components/pages/feed-page/feed-container")
);

export default function FeedPage() {
  return <FeedContainer />;
}
