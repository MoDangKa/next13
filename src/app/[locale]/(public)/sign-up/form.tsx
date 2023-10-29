"use client";
import FormOne from "@/components/forms/form-one";
import { toastOptions } from "@/providers/toast-provider/config";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
      }),
    });

    if (result.ok) {
      toast.success("sign up success", toastOptions);
      router.push("/sign-in");
    } else {
      toast.error("sign up failed", toastOptions);
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
                return Promise.reject(new Error("Passwords do not match."));
              },
            }),
          ]}
        >
          <Input.Password
            className="ant-input__custom"
            placeholder="Confirm password"
          />
        </Form.Item>
      </div>
      <Button type="primary" htmlType="submit" className="ant-btn__custom">
        Sign Up
      </Button>
    </FormOne>
  );
}

export default SignUpForm;
