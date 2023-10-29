"use client";
import FormOne from "@/components/forms/form-one";
import { toastOptions } from "@/providers/toast-provider/config";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type FieldType = {
  username?: string;
  password?: string;
};

function SignInForm() {
  const router = useRouter();

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
      toast.success("sign in success", toastOptions);
      router.push("/feed");
    } else {
      toast.error("sign in failed", toastOptions);
    }
  }

  async function onFinishFailed(errorInfo: any) {
    console.log("Failed:", errorInfo);
    toast.error("sign in failed", toastOptions);
  }

  return (
    <FormOne
      name="sign-in-form"
      title="Sign In"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div>
        <Form.Item<FieldType>
          label="Username"
          name="username"
          className="ant-form-item__custom"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input className="ant-input__custom" placeholder="Username" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          className="ant-form-item__custom"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            className="ant-input__custom"
            placeholder="Password"
          />
        </Form.Item>
      </div>
      <Button type="primary" htmlType="submit" className="ant-btn__custom">
        Sign In
      </Button>
    </FormOne>
  );
}

export default SignInForm;
