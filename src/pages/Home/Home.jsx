import React, { lazy, Suspense, useEffect, useState } from "react";
import "./Home.scss";
import Loader from "../../Shared/Loader/Loader";
import SEO from "../../Shared/SEO/SEO";
import { apiGet } from "../../services/userAuth";
import { REACT_APP_API_URL } from "../../constants/constants";
import useSEO from "../../helper/SEOHelper";
const HomeBanner = lazy(() => import("./Components/HomeBanner/HomeBanner"));
const LookingFor = lazy(() => import("./Components/LookingFor/LookingFor"));
const TopPickupReviews = lazy(() => import("./Components/TopPickupReviews/TopPickupReviews"));
const BestVerifiedCompanies = lazy(() => import("./Components/BestVerifiedCompanies/BestVerifiedCompanies"));
const DiscoverPeoples = lazy(() => import("./Components/DiscoverPeoples/DiscoverPeoples"));
const AboutUsCta = lazy(() => import("../../Shared/AboutUsCta/AboutUsCta"));
const Business = lazy(() => import("../../Shared/Business/Business"));
const BusinessSearch = lazy(() => import("../../Shared/BusinessSearch/BusinessSearch"));

const Home = () => {
  const { data } = useSEO(`${REACT_APP_API_URL}page/single/?url=home`);

  return (
    <div id="home" className="header__line__animate">
      <SEO title={data?.meta_title || "TrustyFeedback"} description={data?.meta_description} keywords="TrustyFeedback" />
      <div className="bg__animation__wrap">
        <div className="bg_circle_one"></div>
        <div className="bg_circle_two"></div>
        <div className="bg_circle_three"></div>
        <div className="bg_circle_four"></div>
      </div>
      <Suspense fallback={<Loader />}>
        <HomeBanner />
        <LookingFor />
        <TopPickupReviews />
        <BestVerifiedCompanies />
        <AboutUsCta />
        <DiscoverPeoples />
        <Business />
        <BusinessSearch />
      </Suspense>
    </div>
  );
};

export default Home;
