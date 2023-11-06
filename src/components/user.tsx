import Link from "next-intl/link";
import Avatar from "./avatar";

type UserProps = {
  user: UserI;
  href?: string;
};

function User({ user, href }: UserProps) {
  return (
    <div>
      <Link
        href={`/${href || user.username}`}
        className="flex flex-row gap-3 items-center"
      >
        <Avatar alt={user.username} src={user.avatar} />
        <div className="text-white">{user.username}</div>
      </Link>
    </div>
  );
}

export default User;
