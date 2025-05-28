import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import detailArrow from "../../../../assets/detail-arrow.svg";
import "./FAQs.scss";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const items = [
    { title: "What is the purpose of a review website?", content: "Our review platform allows customers to share their honest experiences with products, services, or businesses. It helps consumers make informed decisions while giving businesses valuable feedback to improve their offerings." },
    {
      title: "How can reading reviews benefit me as a consumer?",
      content: "Our review platform allows customers to share their honest experiences with products, services, or businesses. It helps consumers make informed decisions while giving businesses valuable feedback to improve their offerings.",
    },
    { title: "How does having reviews help businesses?", content: "Our review platform allows customers to share their honest experiences with products, services, or businesses. It helps consumers make informed decisions while giving businesses valuable feedback to improve their offerings." },
    {
      title: "Can businesses respond to reviews on your platform?",
      content: "Our review platform allows customers to share their honest experiences with products, services, or businesses. It helps consumers make informed decisions while giving businesses valuable feedback to improve their offerings.",
    },
    { title: "How can I trust the reviews posted here?", content: "Our review platform allows customers to share their honest experiences with products, services, or businesses. It helps consumers make informed decisions while giving businesses valuable feedback to improve their offerings." },
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faqs__area sec__padding">
      <div className="container">
        <div className="faqs__head text-center">
          <h2>Frequently Asked Questions</h2>
          <p>Here are some common questions about our Reviews and their answers</p>
        </div>
        <div className="accordion__wrap">
          {items?.map((item, index) => (
            <div key={index} className={`accordion__item ${activeIndex === index ? "active" : "inactive"}`}>
              <div className="accordion__title" onClick={() => handleToggle(index)}>
                {item?.title}
                <div className="accordion__arrow-wrapper">
                  <ReactSVG src={detailArrow} />
                </div>
              </div>
              <div className="accordion__content">{item?.content}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
