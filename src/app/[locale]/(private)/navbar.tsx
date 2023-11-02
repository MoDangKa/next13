import { capitalizeFirstLetter } from "@/util/helper";
import { usePathname } from "next-intl/client";
import Link from "next-intl/link";

const links: string[] = ["feed", "profile", "following", "followers"];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex max-w-md w-full p-5 bg-slate-800 rounded-lg my-2">
      <ul className="flex flex-row justify-around w-full text-white">
        {links.map((link, i) => (
          <li key={"li-" + i}>
            <Link
              href={`/${link}`}
              className={
                pathname.startsWith(`/${link}`) ? "text-green-400" : ""
              }
            >
              {capitalizeFirstLetter(link)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
