import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import ReservationForm from "@/components/layouts/Reservation";
import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Header />
      <main className="mt-[100px]">
        <section>
          <ReservationForm />
        <Outlet />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
