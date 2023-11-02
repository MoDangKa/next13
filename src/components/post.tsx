import { useFormatter } from "next-intl";
import Link from "next-intl/link";
import Avatar from "./avatar";

type PostProps = { post: PostI };

function Post({ post }: PostProps) {
  const format = useFormatter();
  //   const options: Intl.DateTimeFormatOptions = {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //     hour: "numeric",
  //     minute: "numeric",
  //   };
  //   const createdAt = new Date(post.created_at);
  // createdAt.toLocaleDateString("en-us", options)}
  return (
    <div className="flex flex-row gap-3">
      <Link href={`/${post.username}`} className="grow-0 shrink-0">
        <Avatar alt={post.username} src={post.avatar} />
      </Link>
      <div className="basis-auto shrink grow">
        <div className="flex flex-col">
          <Link href={`/${post.username}`} className="text-emerald-500">
            {post.username}
          </Link>
          <p className=" text-slate-600 text-xs">
            {format.dateTime(new Date(post.created_at), {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </p>
        </div>
        <div className="text-sm text-slate-400">{post.content}</div>
      </div>
    </div>
  );
}

export default Post;
