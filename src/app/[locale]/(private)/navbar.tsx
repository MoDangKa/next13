import { useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import Link from "next-intl/link";

const menus = ["feed", "profile", "following", "followers"];

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <nav className="flex max-w-md w-full p-5 basic-card">
      <ul className="flex flex-row justify-around w-full text-white">
        {menus.map((menu, i) => (
          <li key={`menu-li-${i}`}>
            <Link
              href={`/${menu}`}
              className={
                pathname.startsWith(`/${menu}`) ? "text-emerald-500" : ""
              }
            >
              {t(`common.${menu}`)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
