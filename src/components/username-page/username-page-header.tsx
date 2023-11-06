import useSWR, { mutate } from "swr";

type UsernamePageHeaderProps = {
  username: string;
};

export default function UsernamePageHeader({
  username,
}: UsernamePageHeaderProps) {
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

  console.log(userData, followData);

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
    <header>
      <h1>{username}</h1>
      {followData.data.length > 0 ? (
        <button onClick={handleUnfollow}>Undollow</button>
      ) : (
        <button onClick={handleFollow}>Follow</button>
      )}
    </header>
  );
}
