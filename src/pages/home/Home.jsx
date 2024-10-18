import ReservationForm from "@/components/layouts/ReservationForm";
import { useThemeContext } from "@/contexts/ThemeProvider";
import React from "react";
import OurStory from "./OurStory";

const Home = () => {
  const { isBoxed } = useThemeContext();

  return (
    <>
      <section className={`${isBoxed ? "px-0" : ""} relative z-10 bg-white mx-auto`}>
        <OurStory />
      </section>
      <section className={`${isBoxed ? "px-0" : ""} relative z-10 bg-white mx-auto`}>
        <ReservationForm />
      </section>
    </>
  );
};

export default Home;
