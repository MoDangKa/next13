import { PropsWithChildren } from "react";
import Header from "./header";
import Navbar from "./navbar";
import Footer from "./footer";

export default function PrivateLayout({ children }: PropsWithChildren) {
  return (
    <div className="basic-card">
      <Header />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
