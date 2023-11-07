import { Button, Popconfirm } from "antd";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";

type DeleteBtnProps = {
  post: PostI;
};

export default function DeleteBtn({ post }: DeleteBtnProps) {
  const router = useRouter();
  const t = useTranslations();

  async function handleDeletePost() {
    const result = await fetch(`/api/posts/${post.id}`, { method: "DELETE" });

    if (result.ok) {
      router.push("/profile");
    }
  }

  return (
    <div className="flex justify-center">
      <Popconfirm
        title={t("popConfirm.delete.post.title")}
        description={t("popConfirm.delete.post.description", {
          msg: t("common.post2"),
        })}
        onConfirm={handleDeletePost}
        // onCancel={cancel}
        okText={t("common.yes")}
        cancelText={t("common.no")}
      >
        <Button type="primary" className="ant-btn__custom">
          {t("popConfirm.delete.post.btn")}
        </Button>
      </Popconfirm>
    </div>
  );
}
