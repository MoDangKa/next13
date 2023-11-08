"use client";

import dynamic from "next/dynamic";
import useSWR from "swr";

const EditPostForm = dynamic(
  () => import("@/components/pages/edit-post-page/edit-post-form")
);
const DeleteBtn = dynamic(
  () => import("@/components/pages/edit-post-page/delete-btn")
);

type EditPostPageProps = {
  params: { id: number };
};

export default function EditPostPage({ params }: EditPostPageProps) {
  const { data, error, isLoading } = useSWR(`/api/posts/${params.id}`);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="w-full flex flex-col">
      <EditPostForm post={data.data} />
      <hr className="my-5" />
      <DeleteBtn post={data.data} />
    </div>
  );
}
