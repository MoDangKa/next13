import "@/assets/styles/globals.css";
import { PropsWithChildren } from "react";
import "react-toastify/dist/ReactToastify.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default async function RootLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
