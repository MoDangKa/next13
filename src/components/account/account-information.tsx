import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useState } from "react";
import useSWR from "swr";
const Avatar = dynamic(() => import("@/components/avatar"));

function normFile(e: any) {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
}

export default function AccountInformation() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { data, error, isLoading } = useSWR("/api/users/profile");
  const t = useTranslations();

  if (error) return <div>filed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const user = data.data;

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <>
      <div className="flex justify-center mb-3">
        <Avatar alt={user.username} src={user.avatar} size={200} />
      </div>
      <Upload {...props} className="ant-upload__custom">
        <Button
          type="primary"
          icon={<UploadOutlined />}
          className="ant-btn__custom"
        >
          {t("common.selectFile")}
        </Button>
      </Upload>
    </>
  );
}
