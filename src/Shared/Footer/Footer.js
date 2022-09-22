import React from "react";
import { Facebook, Instagram } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import "./Footer.css";

function Footer() {
  return (
    <div>
      <div className="footer">
        <div className="footer-container">
          <div className="contact">
            <Link to="/contact">CONTACT</Link>
          </div>
          <div className="facebook">
            <Facebook />
          </div>
          <div className="instagram">
            <Instagram />
          </div>
          <div className="about">ABOUT</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
