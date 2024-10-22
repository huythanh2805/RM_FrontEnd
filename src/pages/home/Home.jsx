import ReservationForm from "@/components/layouts/ReservationForm";
import { useThemeContext } from "@/contexts/ThemeProvider";
import React from "react";
import OurStory from "./OurStory";
import Slider from "@/components/layouts/Silder";
import StatsCounter from "@/components/layouts/StatsCounter";
import Menu from "./Menu";

const Home = () => {
  const { isBoxed } = useThemeContext();

  return (
    <>
      <Slider />
      <section
        className={`${isBoxed ? "px-0" : ""} relative z-10 bg-white mx-auto`}
      >
        <OurStory />
        <ReservationForm />
        <Menu limit={6} />
      </section>
      <StatsCounter />
    </>
  );
};

export default Home;
