import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Header />
      <main className="mt-[100px]">
      <section>
        <h1>Welcome to our website!</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel sapien
          nec massa euismod condimentum. Integer vel sem vel ligula fermentum
          condimentum. Donec interdum, nunc vel consectetur dignissim, ligula
          eros tempus felis, eu consectetur ligula velit vel velit.
        </p>
      </section>
      <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
