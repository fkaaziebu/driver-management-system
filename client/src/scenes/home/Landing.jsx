import React from "react";
import Navbar from "../../components/Navbar";
import Register from "../../components/Register";
import ArrowDown from "../../components/ArrowDown";

function Landing() {
  return (
    <div className="container-fluid p-0 bg-img">
      <Navbar />
      <Register />
      <ArrowDown />
    </div>
  );
}

export default Landing;
