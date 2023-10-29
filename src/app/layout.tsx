import "@/assets/styles/globals.css";
import Navbar from "@/components/navbar";
import ToastProvider from "@/providers/toast-provider";
import { ConfigProvider, ThemeConfig } from "antd";
import type { Metadata } from "next";
import { Inter, Prompt } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const prompt = Prompt({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin", "thai"],
  display: "swap",
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// config ant-design
const config: ThemeConfig = {
  token: {
    // fontSize: 16,
    // screenXS: 640,
    // screenSM: 640,
    // screenMD: 768,
    // screenLG: 1024,
    // screenXL: 1280,
    // screenXXL: 1536,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${prompt.variable}`}>
      <body>
        <ToastProvider>
          <Navbar />
          <ConfigProvider theme={config}>{children}</ConfigProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
