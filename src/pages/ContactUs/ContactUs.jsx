import React, { lazy, Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { apiPost } from "../../services/userAuth";
import { REACT_APP_API_URL } from "../../constants/constants";
import toast from "react-hot-toast";
import useSEO from "../../helper/SEOHelper";
import SEO from "../../Shared/SEO/SEO";

const Breadcrumb = lazy(() => import("../../Shared/BreadCrumb/BreadCrumb"));

const Contact = () => {
  const [loading, setLoading] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const url = `${REACT_APP_API_URL}contact`;
    const params = {
      name: data.name,
      email: data.email,
      message: data.message,
    };

    try {
      const response = await apiPost(url, params);
      if (response.success === true) {
        toast.success("Your query has been submitted");
        setLoading(false);
        reset();
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const { data: SeoData } = useSEO(`${REACT_APP_API_URL}page/single/?url=how-it-works`);

  return (
    <div className=" mb-5">
      <SEO title={SeoData?.meta_title || "TrustyFeedback"} description={SeoData?.meta_description} keywords="TrustyFeedback" />

      <div className="bg__animation__wrap">
        <div className="bg_circle_one"></div>
        <div className="bg_circle_two"></div>
        <div className="bg_circle_three"></div>
        <div className="bg_circle_four"></div>
      </div>
      <section className="how_works_hero">
        <div className="container">
          <div className="hows_work_top text-center my-5">
            <div className="d-flex justify-content-center">
              <Suspense fallback={<div>Loading...</div>}>
                <Breadcrumb active={"Contact us"} />
              </Suspense>
            </div>
            <div className="container">
              <h1 className="text-center">Contact Us</h1>
              <p className="text-center">Want to get in touch? Learn how you can reach us</p>
              <form className="py-5 my-4" style={{ maxWidth: "600px", margin: "auto" }} onSubmit={handleSubmit(onSubmit)}>
                <h3>How can we help?</h3>
                <div className="row">
                  <div className="col-sm-6 mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="rounded-2" id="name" placeholder="Name" {...register("name", { required: "Name is required" })} />
                    {errors.name && <p className="text-danger">{errors.name.message}</p>}
                  </div>
                  <div className="col-sm-6 mb-3">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="rounded-2" id="email" placeholder="name@example.com" {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" } })} />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                  </div>
                  <div className="col-sm-12 mb-3">
                    <label htmlFor="message">Message</label>
                    <textarea className="rounded-2" id="message" placeholder="Leave a message here" style={{ height: "100px" }} {...register("message", { required: "Message is required" })}></textarea>
                    {errors.message && <p className="text-danger">{errors.message.message}</p>}
                  </div>
                </div>
                <button type="submit" className="default__btn w-100">
                  <span>Submit</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
