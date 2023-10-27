"use client";
import FormOne from "@/components/forms/form-one";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";

type FieldType = {
  username?: string;
  password?: string;
  confirmPassword?: string;
};

function SignUpForm() {
  const router = useRouter();

  async function onFinish(values: FieldType) {
    console.log("Success:", values);

    const result = await fetch("/api/sign-up", {
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
      alert("sign up failed");
    }
  }

  async function onFinishFailed(errorInfo: any) {
    console.log("Failed:", errorInfo);
  }

  return (
    <FormOne
      name="sign-up-form"
      title="Sign Up"
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
    </FormOne>
  );
}

export default SignUpForm;
