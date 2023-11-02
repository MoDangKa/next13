import Post from "@/components/post";
import useSWR from "swr";

type FeedListProps = {
  index: number;
};

function FeedList({ index }: FeedListProps) {
  const { data, error, isLoading } = useSWR("/api/posts/feed?page=" + index);

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

export default FeedList;
