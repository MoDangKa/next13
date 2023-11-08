import Post from "@/components/post";
import { ClientQuery } from "@/scripts/db";

async function getData() {
  const result = await ClientQuery(
    `select p.*, u.avatar, u.username from posts p
    inner join users u on p.user_id = u.id
    order by created_at desc limit 10`
  );
  return result.rows;
}

export default async function PublicFeedPage() {
  const posts = await getData();
  return (
    <div>
      <h1>PublicFeedPage</h1>
      <div>
        <h2>Recent Posts From the Community</h2>
        {posts.map((post, i) => (
          <Post key={`post-${i}`} post={post} />
        ))}
      </div>
    </div>
  );
}
