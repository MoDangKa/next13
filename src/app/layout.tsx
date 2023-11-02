import "@/assets/styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Prompt } from "next/font/google";
import { PropsWithChildren } from "react";
import "react-toastify/dist/ReactToastify.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const prompt = Prompt({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin", "thai"],
  display: "swap",
  variable: "--font-prompt",
});

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={prompt.variable}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
