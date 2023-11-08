"use client";
import type { PutBlobResult } from "@vercel/blob";
import { useRouter } from "next-intl/client";
import { SyntheticEvent, useRef, useState } from "react";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const router = useRouter();

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
    router.push("/account");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}
