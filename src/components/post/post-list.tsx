import Post from "@/components/post";
import useSWR from "swr";

type PostListProps = {
  index: number;
  username: string;
};

export default function PostList({ index, username }: PostListProps) {
  const { data, error, isLoading } = useSWR(
    `/api/posts?page=${index}&username=${username}`
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      {data.data.map((post: PostI, i: number) => (
        <li key={i} className="mb-5 last:mb-0">
          <Post post={post} />
        </li>
      ))}
    </>
  );
}
