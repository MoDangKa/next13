import Image from "next/image";
import { Fragment } from "react";

type AvatarProps = { src?: string; alt: string; size?: number };

function Avatar({ src, alt, size = 50 }: AvatarProps) {
  return (
    <div
      className={`bg-slate-600 rounded-full w-[${size}px] h-[${size}px] overflow-hidden`}
    >
      {src ? (
        <Image alt={alt} src={src} width={size} height={size} />
      ) : (
        <Fragment />
      )}
    </div>
  );
}

export default Avatar;
