import ReservationForm from "@/components/layouts/ReservationForm";
import { useThemeContext } from "@/contexts/ThemeProvider";
import React from "react";
import OurStory from "./OurStory";
import Slider from "@/components/layouts/Silder";
import StatsCounter from "@/components/layouts/StatsCounter";
import Menu from "./Menu";
import ButtonViewMore from "@/components/ButtonViewMore";
import ChefProfile from "./ChefProfile";
import ChefChoice from "./ChefChoice";
import ContactUs from "./ContactUs";
import Testimonial from "./Testimonial";
import Chefs from "./Chefs";
const Home = () => {
  const { isBoxed } = useThemeContext();

  return (
    <>
      <Slider />
      <section
        className={`${isBoxed ? "px-0" : ""} relative z-10 bg-white mx-auto`}
      >
        {/* <OurStory />
        <ChefChoice/>
        <ReservationForm /> */}

        <ChefProfile className="w-full" />
        <Menu limit={6} isFilter={false} />
        <ButtonViewMore />
        <Chefs />
        <Testimonial />
        <StatsCounter />
      </section>
      <ContactUs />
    </>
  );
};

export default Home;
