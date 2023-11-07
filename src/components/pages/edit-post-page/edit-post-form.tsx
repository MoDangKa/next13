import { Button, Form, Input } from "antd";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import { useSWRConfig } from "swr";

type EditPostFormProps = {
  post: PostI;
};

type FieldType = {
  content?: string;
};

export default function EditPostForm({ post }: EditPostFormProps) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const t = useTranslations();
  const [form] = Form.useForm();

  function onReset() {
    form.resetFields();
  }

  async function onFinish(values: FieldType) {
    console.log(values);

    const result = await fetch(`/api/posts/${post.id}`, {
      method: "PATCH",
      body: JSON.stringify({ content: values.content }),
    });

    if (result.ok) {
      onReset();
      mutate((key) => typeof key === "string" && key.startsWith("/api/posts"));
      router.push("/profile");
    }
  }

  return (
    <Form
      name="post-form"
      className="ant-form__custom"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        name="content"
        className="ant-form-item__custom"
        rules={[
          {
            required: true,
            message: t("form.error.pattern1", { msg: t("common.content2") }),
          },
        ]}
        initialValue={post.content}
      >
        <Input.TextArea
          className="ant-input__custom"
          rows={3}
          placeholder={t("common.whatIsHappening")}
        />
      </Form.Item>
      <div>
        <Button type="primary" htmlType="submit" className="ant-btn__custom">
          {t("common.updatePost")}
        </Button>
      </div>
    </Form>
  );
}
