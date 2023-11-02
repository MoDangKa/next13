import Image from "next/image";
import Link from 'next-intl/link';

type UserProps = {
  user: UserI;
  href?: string;
};

function User({ user, href }: UserProps) {
  return (
    <div>
      <Link
        href={`/${href || user.username}`}
        className="flex flex-row items-center"
      >
        <div>
          {user.avatar ? (
            <Image
              alt={user.username}
              src={user.avatar}
              width={50}
              height={50}
              className="rounded-full mr3"
            />
          ) : (
            <div className="bg-slate-600 rounded-full mr-3 w-[50px] h-[50px]"></div>
          )}
        </div>
        <div className="text-white">{user.username}</div>
      </Link>
    </div>
  );
}

export default User;
