import { capitalizeFirstLetter } from "@/util/helper";
import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import Link from "next-intl/link";

const links = ["feed", "profile", "following", "followers"];

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <nav className="flex max-w-md w-full p-5 basic-card">
      <ul className="flex flex-row justify-around w-full text-white">
        {links.map((link, i) => (
          <li key={"li-" + i}>
            <Link
              href={`/${link}`}
              className={
                pathname.startsWith(`/${link}`) ? "text-emerald-500" : ""
              }
            >
              {t(`common.${link}`)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
