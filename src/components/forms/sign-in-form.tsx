"use client";
import { toastOptions } from "@/configs/toast-config";
import { Button, Form, Input } from "antd";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import { toast } from "react-toastify";

type FieldType = {
  username?: string;
  password?: string;
};

export default function SignInForm() {
  const router = useRouter();
  const t = useTranslations();
  const [form] = Form.useForm();

  function onReset() {
    form.resetFields();
  }

  async function onFinish(values: FieldType) {
    const result = await fetch("/api/sign-in", {
      method: "POST",
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    });

    if (result.ok) {
      router.push("/feed");
      toast.success(
        t("toast.success", { msg: t("common.signIn") }),
        toastOptions
      );
    } else {
      toast.error(t("toast.error", { msg: t("common.signIn") }), toastOptions);
      onReset();
    }
  }

  return (
    <Form
      form={form}
      name="sign-in-form"
      className="ant-form__custom basic-form"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <h1 className="text-center text-transparent font-semibold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        {t("common.signIn")}
      </h1>
      <hr className="my-3" />
      <div>
        <Form.Item<FieldType>
          label={t("form.username")}
          name="username"
          className="ant-form-item__custom"
          rules={[
            {
              required: true,
              message: t("form.error.pattern1", { msg: t("form.username") }),
            },
          ]}
        >
          <Input className="ant-input__custom" />
        </Form.Item>
        <Form.Item<FieldType>
          label={t("form.password")}
          name="password"
          className="ant-form-item__custom"
          rules={[
            {
              required: true,
              message: t("form.error.pattern1", { msg: t("form.password") }),
            },
          ]}
        >
          <Input.Password className="ant-input__custom" />
        </Form.Item>
      </div>
      <div>
        <Button type="primary" htmlType="submit" className="ant-btn__custom">
          {t("common.signIn")}
        </Button>
      </div>
    </Form>
  );
}
