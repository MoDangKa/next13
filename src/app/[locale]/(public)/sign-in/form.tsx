"use client";
import { toastOptions } from "@/providers/toast-provider/config";
import { Button, Form, Input } from "antd";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type FieldType = {
  username?: string;
  password?: string;
};

function SignInForm() {
  const router = useRouter();
  const t = useTranslations();
  const [form] = Form.useForm();

  function onReset() {
    form.resetFields();
  }

  async function onFinish(values: FieldType) {
    console.log("Success:", values);

    const result = await fetch("/api/sign-in", {
      method: "post",
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    });

    if (result.ok) {
      toast.success(
        t("toast.success", { msg: t("common.signIn") }),
        toastOptions
      );
      router.push("/feed");
    } else {
      toast.error(t("toast.error", { msg: t("common.signIn") }), toastOptions);
      onReset();
    }
  }

  async function onFinishFailed(errorInfo: any) {
    console.log("Failed:", errorInfo);
  }

  return (
    <Form
      form={form}
      name="sign-in-form"
      className="ant-form__custom ant-form__sign-iu"
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
        <hr className="border-t-slate-700 dark:border-t-slate-600" />
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

export default SignInForm;
