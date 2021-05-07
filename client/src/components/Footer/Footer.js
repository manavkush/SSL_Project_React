import React, { Component } from "react";
import "./Footer.css";
import logo from "../HomeDetails/logog.png";

function Footer() {
  return (
    <div className="desk-footer">
      <div className="footer-container">
        <div className="footer-main">
          <img src={logo} alt="IIT Dharwad" className="footer-logo" />
        </div>
        <div className="footer-second">
            <div className="footer-main-content">
            <div>
                This website is meant to automate the book issueing and printer
                management processes.
            </div>
            </div>
            <div className="list-to-reach">
            <div>
                <h3>Contact US</h3>
                <i className="fa fa-envelope" aria-hidden="true"></i>{"  "}
                library.iitdh.ac.in
            </div>
            <div>
            <div>
            <i className="fa fa-phone" aria-hidden="true"></i>{"  "}
            +91 8806295075
            </div>

            <div>
            <i className="fa fa-map-marker" aria-hidden="true"></i>{" "} 
            Campus Hall Complex, IIT Dharwad, WALMI Campus, Pb Road, near High Court, Karnataka 580011
            </div>

            </div>
            </div>

        </div>
      </div>
      <div className="footer-credits">
        Copyright © 2020, Indian Institute of Technology, Dharwad. All Rights
        Reserved.
      </div>
    </div>
  );
}

export default Footer;
