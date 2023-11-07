import { Button } from "antd";
import { useFormatter, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import Link from "next-intl/link";
import { Fragment } from "react";
import Avatar from "./avatar";

type PostProps = { post: PostI };

function Post({ post }: PostProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const format = useFormatter();
  const createdAt = new Date(post.created_at);

  const pathname1 = `/${post.username}`;
  const pathname2 = `/profile/edit-post/${post.id}`;
  const href = !pathname.startsWith("/profile") ? pathname1 : pathname2;

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
    <div className="flex flex-row gap-5 items-start">
      <div className="flex flex-row gap-3 grow">
        <Link href={href} className="grow-0 shrink-0">
          <Avatar alt={post.username} src={post.avatar} />
        </Link>
        <div className="basis-auto shrink grow">
          <div className="flex flex-col">
            <Link href={href} className="text-emerald-500">
              {post.username}
            </Link>
            <p className=" text-slate-600 text-xs">
              {format.dateTime(createdAt, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
          <div className="text-sm text-slate-300">{post.content}</div>
        </div>
      </div>
      {pathname.startsWith("/profile") ? (
        <div>
          <Button
            type="link"
            className="ant-btn__custom"
            onClick={() => router.push(pathname2)}
          >
            {t("common.edit")}
          </Button>
        </div>
      ) : (
        <Fragment />
      )}
    </div>
  );
}

export default Post;
