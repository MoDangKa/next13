import { Button } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";
import FollowingList from "./following-list";

export default function FollowingContainer() {
  const t = useTranslations();
  const [cnt, setCnt] = useState(1);

  const pages = [];
  for (let i = 0; i < cnt; i++) {
    pages.push(<FollowingList key={`followingList-${i}`} index={i} />);
  }

  return (
    <div className="flex flex-col gap-5">
      <ul>{pages}</ul>
      <div className="flex justify-center">
        <Button
          type="primary"
          htmlType="submit"
          className="ant-btn__custom"
          onClick={() => setCnt((prev) => prev + 1)}
        >
          {t("common.loadMore")}
        </Button>
      </div>
    </div>
  );
}
