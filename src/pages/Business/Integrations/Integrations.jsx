import React, { lazy, Suspense, useState } from "react";
import Loader from "../../../Shared/Loader/Loader";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./Integrations.scss";
import Wix from "../../../assets/Integration/wix.png";
import Shopify from "../../../assets/Integration/social.png";
import Wordpress from "../../../assets/Integration/wordpress-logo.png";
import Hubspot from "../../../assets/Integration/hubspot.png";

const BreadCrumb = lazy(() => import("../../../Shared/BreadCrumb/BreadCrumb"));
import { ReactSVG } from "react-svg";
import seacrhIcon from "../../../assets/search.svg";

const BusinessCTA = lazy(() => import("../../../Shared/Business/Business"));
const IntegrationsCard = lazy(() => import("../../../Shared/IntegrationsCard/IntegrationsCard"));
const IntegrationFilterSidebar = lazy(() => import("./Components/IntegrationFilterSidebar/IntegrationFilterSidebar"));
const AboutCTA = lazy(() => import("../../../Shared/AboutUsCta/AboutUsCta"));
const IntegrationModal = lazy(() => import("./Components/Modal")); // Bootstrap Modal Component

const Integrations = () => {
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  const handleCardClick = (integration) => {
    setSelectedIntegration(integration);
    console.log("das");
  };

  const cards = Array(4).fill({ title: "Integration 1", description: "Details about integration" });
  const resultsCards = Array(12).fill({ title: "Integration 2", description: "More details" });

  const data = [
    { img: Shopify, name: "Shopify", description: "Shopify is a leading cross-channel marketing automation technology that allows users to engage customers across all touchpoints." },
    { img: Wix, name: "Wix", description: "Wix is a leading cross-channel marketing automation technology that allows users to engage customers across all touchpoints." },
    { img: Wordpress, name: "Wordpress", description: "Wordpress is a leading cross-channel marketing automation technology that allows users to engage customers across all touchpoints." },
    { img: Hubspot, name: "Hubspot", description: "Hubspot is a leading cross-channel marketing automation technology that allows users to engage customers across all touchpoints." },
  ];

  return (
    <div id="integrations__page">
      <Suspense fallback={<Loader />}>
        <BusinessCTA showButton={false} additionalClasses="green__bg">
          <div className="banner__breadcrumb">
            <BreadCrumb active="Integrations" />
          </div>
        </BusinessCTA>
        <section className="integrations__cards__area fill__sec">
          <div className="container">
            <div className="row">
              {data.map((integration, index) => (
                <IntegrationsCard data={integration} key={index} additionalClasses="integrations__white__card col-lg-3 col-md-4 col-sm-6" onClick={() => handleCardClick(integration)} data-bs-toggle="modal" data-bs-target="#integrationModal" />
              ))}
            </div>
          </div>
        </section>
        {/* <section className="integrations__filters__area">
          <div className="container">
            <div className="row flex-nowrap">
              <div className="integrations__filter__results">
                <div className="result__lists">
                  <div className="row">
                    {resultsCards.map((integration, index) => (
                      <IntegrationsCard key={index} additionalClasses="col-lg-4 col-md-6 col-sm-6" onClick={() => handleCardClick(integration)} data-bs-toggle="modal" data-bs-target="#integrationModal" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <AboutCTA />

        {/* Bootstrap Modal */}
        <IntegrationModal integration={selectedIntegration} />
      </Suspense>
    </div>
  );
};

export default Integrations;
