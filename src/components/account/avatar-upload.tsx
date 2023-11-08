"use client";
import type { PutBlobResult } from "@vercel/blob";
import { Button } from "antd";
import { useTranslations } from "next-intl";
import { SyntheticEvent, useRef, useState } from "react";
import { mutate } from "swr";

export default function AvatarUploadPage() {
  const t = useTranslations();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }
    const file = (inputFileRef.current?.files)![0];
    const response = await fetch(`/api/avatar/upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });
    const newBlob = (await response.json()) as PutBlobResult;
    setBlob(newBlob);
    mutate(
      (key) => typeof key === "string" && key.startsWith("/api/users/profile")
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 justify-center overflow-hidden"
    >
      <input name="file" ref={inputFileRef} type="file" required />
      <Button type="primary" htmlType="submit" className="ant-btn__custom">
        {t("common.upload")}
      </Button>
      {blob && (
        <div>
          Blob url:{" "}
          <a
            href={blob.url}
            target="_blank"
            className="text-ellipsis overflow-hidden"
          >
            {blob.url}
          </a>
        </div>
      )}
    </form>
  );
}
