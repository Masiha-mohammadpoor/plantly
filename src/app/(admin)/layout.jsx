"use client";
import "../globals.css";
import { Rubik } from "next/font/google";
import Providers from "../Providers";
import ProfileHeader from "@/components/ProfileHeader";
import Menu from "@/components/Menu";
import { useState } from "react";
import { adminPanelMenuData } from "@/constants/adminPanelMenuData";

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
          <main className="w-full h-screen overflow-hidden grid grid-cols-15 bg-primary-200">
            <Menu openMenu={openMenu} setOpenMenu={setOpenMenu} menuData={adminPanelMenuData}/>
            <section className={`${openMenu ? "col-span-12" : "col-span-14"}`}>
              <ProfileHeader />
              <article className="w-full">
                <section className="w-full bg-white rounded-tl-lg h-screen pt-4">
                  {children}
                </section>
              </article>
            </section>
          </main>
        </Providers>
      </body>
    </html>
  );
}
