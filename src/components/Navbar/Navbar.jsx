import React from "react";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <div className="sticky-top" style={{ backgroundColor: "rgb(35, 35, 35)" }}>
      <nav className="nav" style={{ maxWidth: "700px", margin: "auto" }}>
        <div className="nav-item text-warning">
          astragram
          <img
            src="https://fonts.gstatic.com/s/e/notoemoji/latest/2728/512.gif"
            alt="✨"
            width="30"
            height="30"
            className="mx-1"
          />
        </div>
        <div className="nav-item fs-6">
          <a
            href="https://api.nasa.gov/"
            target="__blank"
            className="text-decoration-none text-light"
          >
            NASA API <i className="bi bi-box-arrow-up-right"> </i>
          </a>
          <a
            href="https://github.com/scriptwes1337/astragram"
            target="__blank"
            className="text-decoration-none text-light"
          >
            Code
            <i
              className="bi bi-github"
              style={{ color: "white", padding: "0 0.5rem" }}
            ></i>
          </a>
        </div>
      </nav>
    </div>
  );
};
