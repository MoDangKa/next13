"use client";
import dynamic from "next/dynamic";
const FeedContainer = dynamic(() => import("@/components/feed/feed-container"));

export default function FeedPage() {
  return <FeedContainer />;
}
