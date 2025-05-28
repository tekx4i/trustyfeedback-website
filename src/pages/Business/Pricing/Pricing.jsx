import React, { lazy, Suspense, useEffect, useState } from "react";
import Loader from "../../../Shared/Loader/Loader";
import "./Pricing.scss";
import prIcon from "../../../assets/BusinessSite/pr-icon.svg";
import hpIcon from "../../../assets/BusinessSite/hp-icon.svg";
import { ReactSVG } from "react-svg";
import { apiGet } from "../../../services/userAuth";
import { REACT_APP_API_URL } from "../../../constants/constants";
import enterpriseIcon from "../../../assets/enterprise.svg";
import { Link, useNavigate } from "react-router-dom";
import StripeComponent from "./Components/Stripe/Stripe";
import { Sheet } from "react-modal-sheet";
import { getStorage } from "../../../services/storage";
import toast from "react-hot-toast";
import stripeIcon from "../../../assets/stripe.png";
import PricingLoader from "../../../Shared/Loader/PricingLoader";
import useSEO from "../../../helper/SEOHelper";
import SEO from "../../../Shared/SEO/SEO";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../context/slice/cartSlice";
import cartImg from "../../../assets/shopping-cart.png";
import { Toast } from "react-bootstrap";

const BreadCrumb = lazy(() => import("../../../Shared/BreadCrumb/BreadCrumb"));
const AboutUsCta = lazy(() => import("../../../Shared/AboutUsCta/AboutUsCta"));
const BusinessFAQs = lazy(() => import("./Components/BusinessFAQs/BusinessFAQs"));

const Pricing = () => {
  const token = getStorage("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [package_id, setPackage_id] = useState();
  const [dataInd, setDataInd] = useState({});
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const [userInfo, setUserInfo] = useState();
  const { data: SeoData } = useSEO(`${REACT_APP_API_URL}page/single/?url=pricing`);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserInfo = localStorage.getItem("userInfo");

    if (token && storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const getPricingData = async () => {
    setLoading(true);
    try {
      const URL = `${REACT_APP_API_URL}package`;
      const params = {
        role_id: 3,
      };
      const response = await apiGet(URL, params);
      if (response.success === true) {
        const dbValues = response.data.payload.records;
        setData(dbValues);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPricingData();
  }, []);

  const toggleFunction = (id, name, price, days) => {
    if (token) {
      setPackage_id(id);
      setOpen(!isOpen);
      setDataInd({ name: name, price: price, days: days });
    } else {
      toast.error("unauthorized User");
      setTimeout(() => {
        navigate("/business/log-in");
      }, 1000);
    }
  };
  const addCartItem = (data) => {
    dispatch(addItem(data));
    if (data?.id === items[0]?.id) {
      toast.success("Item already added in cart");
    } else toast.success("Item added in cart");
  };

  return (
    <div id="pricing__page">
      <Suspense fallback={<Loader />}>
        <SEO title={SeoData?.meta_title || "TrustyFeedback"} description={SeoData?.meta_description} keywords="TrustyFeedback" />
        <section className="pricing__banner__area fill__sec">
          <div className="container text-center">
            <div className="pr__banner__content breadcrumb__center banner__breadcrumb clr__white">
              <BreadCrumb active="Pricing" />
              <h1>Choose your plan</h1>
              <p className="mb-0">Work out which of our plans and add-ons are the best fit for your business ambitions.</p>
            </div>
          </div>
        </section>
        <section className="pricing__detail__area">
          <div className="container">
            <div className="row">
              {loading
                ? [1, 2].map((i) => (
                    <div className="col-sm-6">
                      <PricingLoader />
                    </div>
                  ))
                : data && data.length > 0
                ? data?.map((i) => (
                    <div className="col-sm-6">
                      <div className="pricing__boxs sb__listing mb-0">
                        <div className="pr__head d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center gap-2">
                            <div className="pr__icon gr__icon">
                              <img src={enterpriseIcon} alt={prIcon} />
                            </div>
                            <h4 className="mb-0">{i.name}</h4>
                          </div>
                          {userInfo && (
                            <div className="btn btn-primary d-flex align-items-center justify-content-center p-2" onClick={() => addCartItem(i)} style={{ transition: "0.3s", cursor: "pointer" }}>
                              <img src={cartImg} width="30" height="30" />
                            </div>
                          )}
                        </div>
                        <div className="pr__price">
                          ${i.price}
                          {/* <span>$301</span> */}
                        </div>
                        <div className="pr__duration">Days {i.days}</div>
                        <p dangerouslySetInnerHTML={{ __html: i.description }}></p>
                        <button onClick={() => toggleFunction(i.id, i.name, i.price, i.days)} className="default__btn green__btn text-white w-100 ">
                          <span className="text-white">Booking an appointment</span>
                        </button>
                      </div>
                    </div>
                  ))
                : "No data found"}
            </div>
            <Sheet
              isOpen={isOpen}
              onClose={() => {
                setOpen(false);
              }}
              detent="content-height"
              onBackdropClick={() => {
                setOpen(false);
              }}
              style={{
                maxWidth: "600px",
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Sheet.Container style={{ borderRadius: "16px 16px 0 0" }}>
                <Sheet.Header />
                <Sheet.Content
                  style={{
                    overflow: "auto",
                    maxHeight: "90vh",
                    padding: "20px",
                    paddingTop: 0,
                    height: "400px",
                  }}
                >
                  <div className="d-flex justify-content-center w-100">
                    <h4>Payment</h4>
                    {/* <img src={stripeIcon} style={{ objectFit: "contain", width: "200px", height: "70px" }} /> */}
                  </div>
                  <p>
                    <strong>Package price :</strong> ${dataInd.price}
                  </p>
                  <p>
                    <strong>Package name :</strong> {dataInd.name}
                  </p>
                  <p>
                    <strong>Package duration :</strong> {dataInd.days} days
                  </p>
                  <StripeComponent setOpen={setOpen} package_id={package_id} />
                </Sheet.Content>
              </Sheet.Container>
              <Sheet.Backdrop />
            </Sheet>
          </div>
        </section>
        <section className="how__pricing__work py-0 pb-4">
          <div className="container">
            {/* <div className="all__pri__stats">
              <div className="d-flex justify-content-center">
                {[1].map((i) => (
                  <div className="col-lg-3 col-sm-6">
                    <div className="how__p__work__box">
                      <div className="howp__icon">
                        <ReactSVG src={hpIcon} />
                      </div>
                      <h4>Choose your plan</h4>
                      <p>Work out which of our plans and add-ons are the best fit for your business ambitions.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
            <div className="text-center">
              <Link to="/business/help-center" className="default__btn">
                <span>Question? Contact us</span>
              </Link>
            </div>
          </div>
        </section>
        <div className="aboutcta__center">
          <AboutUsCta />
        </div>

        <BusinessFAQs />
      </Suspense>
    </div>
  );
};

export default Pricing;
