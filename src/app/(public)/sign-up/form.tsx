"use client";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";

type FieldType = {
  username?: string;
  password?: string;
  confirmPassword?: string;
};

function SignInForm() {
  const router = useRouter();

  async function onFinish(values: FieldType) {
    console.log("Success:", values);

    const result = await fetch("/api/log-in", {
      method: "post",
      body: JSON.stringify({
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
      }),
    });

    if (result.ok) {
      router.push("/sign-in");
    } else {
      alert("log in failed");
    }
  }

  async function onFinishFailed(errorInfo: any) {
    console.log("Failed:", errorInfo);
  }

  return (
    <Form
      name="sign-up-form"
      className="ant-form__custom ant-form__sign-iu"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="text-center">
        <h1 className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Sign Up
        </h1>
      </div>

      <div className="my-3">
        <hr className="border-t-slate-700" />
      </div>

      <div>
        <Form.Item<FieldType>
          label="Username"
          name="username"
          className="ant-form-item__custom"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input className="ant-input__custom" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          className="ant-form-item__custom"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password className="ant-input__custom" />
        </Form.Item>
        <Form.Item<FieldType>
          label="Confirm-Password"
          name="confirmPassword"
          className="ant-form-item__custom"
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password className="ant-input__custom" />
        </Form.Item>
      </div>

      <Button type="primary" htmlType="submit" className="ant-btn__custom">
        Sign Up
      </Button>
    </Form>
  );
}

export default SignInForm;
