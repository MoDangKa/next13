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
      method: "post",
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
      <div className="text-center">
        <h1 className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {t("common.signIn")}
        </h1>
      </div>
      <div className="my-3">
        <hr className="border-t-slate-500 dark:border-t-slate-600" />
      </div>
      <div>
        <Form.Item<FieldType>
          label={t("form.username")}
          name="username"
          className="ant-form-item__custom"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input className="ant-input__custom" />
        </Form.Item>
        <Form.Item<FieldType>
          label={t("form.password")}
          name="password"
          className="ant-form-item__custom"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className="ant-input__custom" />
        </Form.Item>
      </div>
      <Button type="primary" htmlType="submit" className="ant-btn__custom">
        {t("common.signIn")}
      </Button>
    </Form>
  );
}
