import { Button } from "antd";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import useSWR, { mutate } from "swr";

type UsernamePageHeaderProps = {
  username: string;
};

export default function UsernamePageHeader({
  username,
}: UsernamePageHeaderProps) {
  const t = useTranslations();
  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useSWR(`/api/users?username=${username}`);
  const {
    data: followData,
    error: followError,
    isLoading: followIsLoading,
  } = useSWR(() => `/api/follows?user_id=${userData.data[0].id}`);

  if (userError || followError) return <div>failed to load</div>;
  if (userIsLoading || followIsLoading) return <div> loading...</div>;

  if (userData.data.length === 0) {
    notFound();
  }

  const user = userData.data[0];

  async function handleUnfollow() {
    const result = await fetch(`/api/follows/${user.id}`, { method: "delete" });
    if (result.ok) {
      mutate(`/api/follows?user_id=${user.id}`);
    }
  }

  async function handleFollow() {
    const result = await fetch("/api/follows", {
      method: "post",
      body: JSON.stringify({ user_id: user.id }),
    });
    if (result.ok) {
      mutate(`/api/follows?user_id=${user.id}`);
    }
  }

  return (
    <header className="flex flex-row gap-4 items-center justify-between flex-nowrap">
      <h5>{username}</h5>
      {followData.data.length > 0 ? (
        <Button
          type="dashed"
          className="ant-btn__custom"
          onClick={handleUnfollow}
        >
          {t("common.unfollow")}
        </Button>
      ) : (
        <Button
          type="primary"
          className="ant-btn__custom"
          onClick={handleFollow}
        >
          {t("common.follow")}
        </Button>
      )}
    </header>
  );
}
