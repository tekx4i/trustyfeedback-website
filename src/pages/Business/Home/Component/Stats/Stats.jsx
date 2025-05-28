import React from "react";
const Stats = () => {
  return (
    <section className="bussiness__reply__stats">
      <div className="container text-center">
        <h2 className="big_margin">Why businesses rely on TrustyFeedback</h2>
        <div className="stats__boxs">
          <div className="row ">
            <div className="col-md-4 col-sm-6">
              <div className="stats__single__box">
                <div className="stats__count">+300M</div>
                <p className="mb-0">reviews in total written across +1.17 million domains</p>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="stats__single__box">
                <div className="stats__count">+300M</div>
                <p className="mb-0">of US consumers surveyed in 2022 agree that a good Trustpilot score makes them more likely to buy from a brand.</p>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="stats__single__box">
                <div className="stats__count">+300M</div>
                <p className="mb-0">reviews in total written across +1.17 million domains</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
