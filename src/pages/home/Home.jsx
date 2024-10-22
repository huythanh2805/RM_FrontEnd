import ReservationForm from "@/components/layouts/ReservationForm";
import { useThemeContext } from "@/contexts/ThemeProvider";
import React from "react";
import OurStory from "./OurStory";
import Menu from "@/components/layouts/Menu";
import Slider from "@/components/layouts/Silder";
import StatsCounter from "@/components/layouts/StatsCounter";

const Home = () => {
  const { isBoxed } = useThemeContext();

  return (
    <>
      <Slider />
      <section className={`${isBoxed ? "px-0" : ""} relative z-10 bg-white mx-auto`}>
        <OurStory />
        <ReservationForm />
        <Menu />
      </section>
      <StatsCounter />
    </>
  );
};

export default Home;
