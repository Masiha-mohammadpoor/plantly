"use client";
import "../globals.css";
import { Rubik } from "next/font/google";
import Providers from "../Providers";
import ProfileHeader from "./profile/ProfileHeader";
import ProfileMenu from "./profile/ProfileMenu";
import { useState } from "react";

const rubik = Rubik({
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [openMenu, setOpenMenu] = useState(true);

  return (
    <html lang="en">
      <body
        className={`antialiased bg-bg ${rubik.className} overflow-x-hidden`}
      >
        <Providers>
          <main className="w-full h-screen overflow-hidden grid grid-cols-15">
            <ProfileMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
            <section className={`${openMenu ? "col-span-12" : "col-span-14"}`}>
              <ProfileHeader />
              <article className="w-full bg-gree-300">{children}</article>
            </section>
          </main>
        </Providers>
      </body>
    </html>
  );
}
