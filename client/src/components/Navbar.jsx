import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container-fluid py-2 m-2 mx-lg-5">
        <a className="nav-link link-light fs-1" href="#home">
          DMS
        </a>
        <a className="nav-link link-light fs-5" href="#home">
          LOGIN
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
