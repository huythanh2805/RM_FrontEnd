import ReservationForm from "@/components/layouts/ReservationForm";
import { useThemeContext } from "@/contexts/ThemeProvider";
import React from "react";
import OurStory from "./OurStory";
import Menu from "@/components/layouts/Menu";
import Slider from "@/components/layouts/Silder";

const Home = () => {
  const { isBoxed } = useThemeContext();

  return (
    <>
      {/* <section className={`${isBoxed ? "px-0" : ""} relative z-10 bg-white mx-auto`}>
      </section> */}
      <Slider />
      <section className={`${isBoxed ? "px-0" : ""} relative z-10 bg-white mx-auto`}>
        <OurStory />
        <ReservationForm />
        <Menu/>
      </section>
    </>
  );
};

export default Home;
