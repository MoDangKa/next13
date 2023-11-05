import { Button } from "antd";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";

export default function SignOutBtn() {
  const router = useRouter();
  const t = useTranslations();

  async function handleSignOut() {
    const result = await fetch("/api/sign-out");
    if (result.ok) {
      router.push("/sign-in");
    }
  }

  return (
    <Button type="link" className="ant-btn__custom" onClick={handleSignOut}>
      {t("common.signOut")}
    </Button>
  );
}
