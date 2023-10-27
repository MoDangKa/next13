import { Form } from "antd";

type FormOneProps = {
  name: string;
  title: string;
  onFinish: (values: any) => void;
  onFinishFailed: (errorInfo: any) => void;
  children: React.ReactNode;
};

function FormOne({
  name,
  title,
  onFinish,
  onFinishFailed,
  children,
}: FormOneProps) {
  return (
    <Form
      name={name}
      className="ant-form__custom ant-form__sign-iu"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="text-center">
        <h1 className="text-transparent font-semibold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {title}
        </h1>
      </div>
      <div className="my-3">
        <hr className="border-t-slate-700 dark:border-t-slate-600" />
      </div>
      {children}
    </Form>
  );
}

export default FormOne;
