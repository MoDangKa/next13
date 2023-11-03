import { Button, Form, Input } from "antd";
import { useTranslations } from "next-intl";
import { useSWRConfig } from "swr";

type FieldType = {
  content?: string;
};

export default function PostForm() {
  const { mutate } = useSWRConfig();
  const t = useTranslations();
  const [form] = Form.useForm();

  function onReset() {
    form.resetFields();
  }

  async function onFinish(values: FieldType) {
    console.log(values);

    const result = await fetch("/api/posts", {
      method: "post",
      body: JSON.stringify({ content: values.content }),
    });

    if (result.ok) {
      onReset();
      mutate((key) => typeof key === "string" && key.startsWith("/api/posts"));
    }
  }

  return (
    <Form
      form={form}
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
      >
        <Input.TextArea
          className="ant-input__custom"
          rows={3}
          placeholder={t("common.whatIsHappening")}
        />
      </Form.Item>
      <div>
        <Button type="primary" htmlType="submit" className="ant-btn__custom">
          {t("common.post")}
        </Button>
      </div>
    </Form>
  );
}
