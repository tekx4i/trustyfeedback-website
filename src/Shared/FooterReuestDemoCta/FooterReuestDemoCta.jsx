import React, { useState } from "react";
import "./FooterReuestDemoCta.scss";
import { ReactSVG } from "react-svg";
import rdemoOverly from "../../assets/BusinessSite/requestdemoverly.svg";

const FooterReuestDemoCta = () => {
  const [input, setInput] = useState("");

  return (
    <section className="request__demo__cta fill__sec increase__footer__height">
      <div className="container">
        <div className="redemo__wrap text-center clr__white">
          <h2>Ready to unlock the full potential of reviews?</h2>
          <p>Register with us to build trust through authentic reviews. Showcase your services, engage with your audience.</p>
          <div className="redemo__form mx-auto position-relative">
            <form action="">
              <div className="single- mb-0">
                <input value={input} onChange={(e) => setInput(e.target.value)} type="email" placeholder="Enter email address" />
              </div>
              <button type="submit" className="default__btn">
                {" "}
                <span>Request a demo</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterReuestDemoCta;
