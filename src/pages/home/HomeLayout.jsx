import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import Slider from "@/components/layouts/Silder";
import SubscribeUsNow from "@/components/layouts/SubscribeUsNow";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Brush from "@/components/siteColor/brush";
import { useThemeContext } from "@/contexts/ThemeProvider";
import React from "react";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  const { isBoxed } = useThemeContext();
  return (
    <>
      <div
        className={`${
          isBoxed ? "max-w-[1536px]" : "w-screen"
        } transition-all duration-500 ease-in-out mx-auto overflow-hidden relative z-10 bg-white`}
      >
        <Header />
        <main className="">
          <Brush />
          <ScrollToTopButton />
          <Outlet />
        </main>
        <SubscribeUsNow />
        <Footer />
      </div>
    </>
  );
};

export default HomeLayout;
