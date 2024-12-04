import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import SubscribeUsNow from "@/components/layouts/SubscribeUsNow";
import Messager from "@/components/Messager";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import Brush from "@/components/siteColor/brush";
import { useThemeContext } from "@/contexts/ThemeProvider";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  const { isBoxed } = useThemeContext();
  // Lắng nghe sự kiện 'receiveMessage' từ server
  return (
    <>
      <div
        className={`${
          isBoxed ? "max-w-[1536px]" : "w-screen"
        } transition-all duration-500 ease-in-out mx-auto overflow-hidden relative z-10 bg-white`}
      >
        <Header />
        <main >
          <Brush />
          {/* <ScrollToTopButton /> */}
          <Messager />
          <Outlet />
        </main>
        <SubscribeUsNow />
        <Footer />
      </div>
    </>
  );
};

export default HomeLayout;
