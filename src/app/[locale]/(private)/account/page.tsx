"use client";
import dynamic from "next/dynamic";
import useSWR from "swr";
const Avatar = dynamic(() => import("@/components/avatar"));
const AvatarUpload = dynamic(
  () => import("@/components/account/avatar-upload")
);
const SignOutBtn = dynamic(() => import("@/components/account/sign-out-btn"));

export default function AccountPage() {
  const { data, error, isLoading } = useSWR("/api/users/profile");

  if (error) return <div>filed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const user = data.data;

  return (
    <div>
      <h3 className="mb-3">Account</h3>
      <div className="flex justify-center mb-3">
        <Avatar alt={user.username} src={user.avatar} size={200} />
      </div>
      <AvatarUpload />
      <hr className="my-5" />
      <div className="flex justify-center">
        <SignOutBtn />
      </div>
    </div>
  );
}
