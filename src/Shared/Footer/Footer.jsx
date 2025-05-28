import React from "react";
import "./Footer.scss";
import { ReactSVG } from "react-svg";
import logo from "../../assets/logo_0.svg";
import BusinessLogo from "../../assets/BusinessSite/Logo_0.svg";
import { Link } from "react-router-dom";
import Facebook from "../../assets/Social-icons/🦆 icon _Facebook v1 icon_.svg";
import Twitter from "../../assets/Social-icons/🦆 icon _Twitter icon_.svg";
import Instagram from "../../assets/Social-icons/🦆 icon _Instagram icon_.svg";
import LinkedIn from "../../assets/Social-icons/🦆 icon _Whatsapp_.svg";

const Footer = ({ business }) => {
  const linkSections = [
    {
      title: "Quick Links",
      links: [
        { name: "About Us", path: "/about-us" },
        { name: "Contact us", path: "/contact" },
        { name: "How it works", path: "/how-it-works" },
        { name: "Blog", path: "/blog" },
        { name: "Categories", path: "/categories" },
      ],
    },
    {
      title: "Community",
      links: [
        { name: "Write a review", path: "/write-a-review" },
        { name: "Help Center", path: "/business/help-center" },
        { name: "Log In", path: "/auth/login" },
        { name: "Sign Up", path: "/auth/signup" },
      ],
    },
    {
      title: "Businesses",
      links: [
        { name: "Own a business", path: "/business" },
        { name: "Products", path: "/categories" },
        { name: "Plan & Pricing", path: "/business/pricing" },
        { name: "Business Login", path: "/business/login" },
        { name: "Blog for Business", path: "/business/blog" },
      ],
    },
    {
      title: "Other Links",
      links: [
        { name: "Legal", path: "/legal" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms & Conditions", path: "/terms-and-conditions" },
        { name: "Guidelines", path: "/guidelines" },
        { name: "System Status", path: "/system-status" },
      ],
    },
  ];

  return (
    <div id="footer" className={business === true ? "m-0 rounded-0 bg-color-business" : ""}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="footer-logo">
              <Link to="/">
                <ReactSVG src={business === true ? BusinessLogo : logo} />
              </Link>
            </div>
            <p>Our vision is to become a global symbol of trust, empowering consumers to shop confidently.</p>
            <h4>Follow Us:</h4>
            <div className="social-icons">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <ReactSVG src={Facebook} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <ReactSVG src={Twitter} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <ReactSVG src={Instagram} />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <ReactSVG src={LinkedIn} />
              </a>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="row">
              {linkSections?.map((section, index) => (
                <div key={index} className="col-md-3">
                  <h4 className="pb-3">{section.title}</h4>
                  <ul className="m-0 p-0" style={{ listStyle: "none" }}>
                    {section.links?.map((link, i) => (
                      <li className="footer-links">
                        <Link key={i} to={link.path}>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className={business && "border-white"} />
        <div className="text-center">
          <p className="mb-0 pb-0">
            &#169; Copyright 2025 All Rights Reserved by <strong>TrustyFeedback</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
