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
  const [showMenu, setShowMenu] = useState(false);

  return (
    <html lang="en">
      <body
        className={`antialiased bg-bg ${rubik.className} overflow-x-hidden`}
      >
        <Providers>
          <main className="w-full h-screen overflow-hidden grid grid-cols-15 bg-primary-200">
            <Menu
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              menuData={adminPanelMenuData}
              closeMenu={() => setShowMenu(false)}
            />
            <section
              className={`${
                openMenu
                  ? "col-span-15 lg:col-span-12"
                  : "col-span-15 lg:col-span-14"
              }`}
            >
              <ProfileHeader setShowMenu={() => setShowMenu((prev) => !prev)} />
              <article className="w-full">
                <section className="w-full bg-white lg:rounded-tl-lg h-screen pt-4">
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
