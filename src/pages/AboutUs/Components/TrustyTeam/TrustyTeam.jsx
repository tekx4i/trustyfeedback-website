import React from "react";
import Slider from "react-slick";
import "./TrustyTeam.scss";
import teamRobert from "../../../../assets/Aboutus/robert.png";

const TrustyTeam = () => {
  const TrustyTeamSlider = {
    infinite: true,
    speed: 5000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section className="trusty__team sec__padding border__b__after position-relative">
      <div className="container ">
        <h2 className="text-center big_margin">TrustyFeedback’s Team</h2>
      </div>
      <div className="all__team clr__white">
        <Slider {...TrustyTeamSlider}>
          <div className="team__box">
            <div className="team__box__inner">
              <img src={teamRobert} alt="" />
              <div className="team__box__content text-center">
                <h4>Verhoeven</h4>
                <div className="team-designation">Operation Director</div>
              </div>
            </div>
          </div>
          <div className="team__box">
            <div className="team__box__inner">
              <img src={teamRobert} alt="" />
              <div className="team__box__content text-center">
                <h4>Verhoeven</h4>
                <div className="team-designation">Operation Director</div>
              </div>
            </div>
          </div>
          <div className="team__box">
            <div className="team__box__inner">
              <img src={teamRobert} alt="" />
              <div className="team__box__content text-center">
                <h4>Verhoeven</h4>
                <div className="team-designation">Operation Director</div>
              </div>
            </div>
          </div>
          <div className="team__box">
            <div className="team__box__inner">
              <img src={teamRobert} alt="" />
              <div className="team__box__content text-center">
                <h4>Verhoeven</h4>
                <div className="team-designation">Operation Director</div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default TrustyTeam;
