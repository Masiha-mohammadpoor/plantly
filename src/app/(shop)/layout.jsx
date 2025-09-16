import Header from "@/components/Header";
import "../globals.css";
import { Rubik } from "next/font/google";
import Providers from "../Providers";
import "swiper/css";

const rubik = Rubik({
  subsets: ["latin"],
});

export const metadata = {
  title: "plantly",
  description: "plant shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-bg ${rubik.className} overflow-x-hidden`}
      >
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
