import useSWR from "swr";
import User from "@/components/user";

type FollowingListProps = {
  index: number;
};

export default function FollowingList({ index }: FollowingListProps) {
  const { data: userData } = useSWR("/api/users/profile");
  const { data: followerData } = useSWR(
    () => `/api/users/${userData.data.id}/following?page=${index}`
  );

  if (!followerData) return <div>failed to load</div>;

  return (
    <>
      {followerData.data.map((user: UserI, i: number) => (
        <li key={`user-${i}`} className="mb-5 last:mb-0">
          <User user={user} />
        </li>
      ))}
    </>
  );
}
