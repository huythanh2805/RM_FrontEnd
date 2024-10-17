import ReservationForm from "@/components/layouts/Reservation";
import { useThemeContext } from "@/contexts/ThemeProvider";
import React from "react";

const Home = () => {
  const {isBoxed} = useThemeContext()
  return (
    <section className={`${isBoxed ? 'px-0' : ''} relative z-10 bg-white mx-auto`}>
      <ReservationForm />
    </section>
  );
};

export default Home;
